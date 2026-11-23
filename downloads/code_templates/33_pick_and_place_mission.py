#!/usr/bin/env python3
"""
Lesson 33: Complete Pick-and-Place Manipulation Sequence
Combines chassis navigation, vertical slider lift, and dual gripper actuation:
1. Approach payload
2. Lower slider
3. Close gripper around object
4. Raise slider with payload
5. Drive to drop zone
6. Lower slider and release gripper
7. Back away safely
"""
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32, Int32

class PickAndPlaceMission(Node):
    def __init__(self):
        super().__init__('pick_and_place_mission')
        self.pub_cmd = self.create_publisher(Twist, '/cmd_vel', 10)
        self.pub_slider = self.create_publisher(Float32, '/titan0/m_2/cmd_vel', 10)
        self.pub_gripper_l = self.create_publisher(Int32, '/servo/pwm_0', 10)
        self.pub_gripper_r = self.create_publisher(Int32, '/servo/pwm_1', 10)

    def set_gripper(self, open_pct: float):
        pct = max(0.0, min(1.0, open_pct))
        msg_l = Int32(); msg_l.data = int(1000 + (1000 * pct))
        msg_r = Int32(); msg_r.data = int(2000 - (1000 * pct))
        self.pub_gripper_l.publish(msg_l)
        self.pub_gripper_r.publish(msg_r)

    def move_slider(self, power: float, duration: float):
        msg = Float32(); msg.data = float(power)
        t_end = time.time() + duration
        while time.time() < t_end and rclpy.ok():
            self.pub_slider.publish(msg)
            time.sleep(0.05)
        msg.data = 0.0
        self.pub_slider.publish(msg)

    def drive(self, lin_x: float, duration: float):
        cmd = Twist(); cmd.linear.x = float(lin_x)
        t_end = time.time() + duration
        while time.time() < t_end and rclpy.ok():
            self.pub_cmd.publish(cmd)
            time.sleep(0.05)
        self.pub_cmd.publish(Twist())

    def run_mission(self):
        self.get_logger().info("Step 1: Open Gripper")
        self.set_gripper(1.0)
        time.sleep(1.0)

        self.get_logger().info("Step 2: Approach Payload (Drive Forward 0.35m)")
        self.drive(0.15, 2.0)
        time.sleep(0.5)

        self.get_logger().info("Step 3: Close Gripper around payload")
        self.set_gripper(0.0)
        time.sleep(1.5)

        self.get_logger().info("Step 4: Lift Slider to transport height")
        self.move_slider(0.35, 2.0)
        time.sleep(0.5)

        self.get_logger().info("Step 5: Transport payload to Drop Zone")
        self.drive(0.20, 3.0)
        time.sleep(0.5)

        self.get_logger().info("Step 6: Lower Slider and Release Payload")
        self.move_slider(-0.35, 1.8)
        self.set_gripper(1.0)
        time.sleep(1.0)

        self.get_logger().info("Step 7: Back away cleanly")
        self.drive(-0.15, 1.5)
        self.get_logger().info("Mission Complete!")

def main():
    rclpy.init()
    node = PickAndPlaceMission()
    try:
        node.run_mission()
    finally:
        node.pub_cmd.publish(Twist())
        node.move_slider(0.0, 0.1)
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
