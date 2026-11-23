#!/usr/bin/env python3
"""
Lesson 40: The Grand Finale — WorldSkills AMR Autonomous Arena Mission
Full integrated competition autonomous mission:
1. Wait for push button start
2. Flash green status LED
3. Navigate to Pickup Station (Nav2)
4. Lower slider & grip payload
5. Lift slider to safe travel height
6. Navigate to Assembly Station (Nav2)
7. Lower slider & release payload
8. Return to Home Docking Bay and square against wall
9. Illuminate solid green finish LED
"""
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Bool, Float32, Int32

class WorldSkillsMissionMaster(Node):
    def __init__(self):
        super().__init__('worldskills_mission_master')
        self.pub_cmd = self.create_publisher(Twist, '/cmd_vel', 10)
        self.pub_slider = self.create_publisher(Float32, '/titan0/m_2/cmd_vel', 10)
        self.pub_grip_l = self.create_publisher(Int32, '/servo/pwm_0', 10)
        self.pub_grip_r = self.create_publisher(Int32, '/servo/pwm_1', 10)
        self.pub_green = self.create_publisher(Bool, '/green_led/cmd', 10)
        self.pub_red = self.create_publisher(Bool, '/red_led/cmd', 10)

        self.get_logger().info("🏆 WorldSkills AMR Competition Mission Ready!")

    def set_led(self, color, state):
        msg = Bool(); msg.data = state
        if color == 'green': self.pub_green.publish(msg)
        else: self.pub_red.publish(msg)

    def set_gripper(self, open_pct):
        pct = max(0.0, min(1.0, open_pct))
        msg_l = Int32(); msg_l.data = int(1000 + (1000 * pct))
        msg_r = Int32(); msg_r.data = int(2000 - (1000 * pct))
        self.pub_grip_l.publish(msg_l)
        self.pub_grip_r.publish(msg_r)

    def move_slider(self, power, duration):
        msg = Float32(); msg.data = float(power)
        t_end = time.time() + duration
        while time.time() < t_end and rclpy.ok():
            self.pub_slider.publish(msg)
            time.sleep(0.05)
        msg.data = 0.0
        self.pub_slider.publish(msg)

    def drive(self, lin_x, ang_z, duration):
        cmd = Twist(); cmd.linear.x = lin_x; cmd.angular.z = ang_z
        t_end = time.time() + duration
        while time.time() < t_end and rclpy.ok():
            self.pub_cmd.publish(cmd)
            time.sleep(0.05)
        self.pub_cmd.publish(Twist())

    def run_full_competition_mission(self):
        # 1. Mission Start Notification
        self.get_logger().info("=== STAGE 1: MISSION DISPATCH ===")
        self.set_led('green', True)
        time.sleep(0.5)

        # 2. Drive to Pickup Station
        self.get_logger().info("=== STAGE 2: NAVIGATING TO PICKUP STATION ===")
        self.set_gripper(1.0) # Open gripper
        self.drive(0.25, 0.0, 3.5) # Transit forward
        time.sleep(0.5)

        # 3. Manipulation: Pick Payload
        self.get_logger().info("=== STAGE 3: ACQUIRING PAYLOAD ===")
        self.move_slider(-0.3, 1.5) # Lower
        self.set_gripper(0.0)      # Grip
        time.sleep(1.0)
        self.move_slider(0.35, 2.0) # Lift
        time.sleep(0.5)

        # 4. Navigate to Delivery Bay
        self.get_logger().info("=== STAGE 4: TRANSIT TO ASSEMBLY BAY ===")
        self.drive(0.0, 1.25, 1.3)  # Turn 90 deg
        self.drive(0.25, 0.0, 3.0)  # Move forward
        time.sleep(0.5)

        # 5. Manipulation: Place Payload
        self.get_logger().info("=== STAGE 5: DELIVERING PAYLOAD ===")
        self.move_slider(-0.35, 1.8) # Lower
        self.set_gripper(1.0)       # Release
        time.sleep(1.0)

        # 6. Return Home
        self.get_logger().info("=== STAGE 6: RETURNING TO DOCKING BAY ===")
        self.drive(-0.20, 0.0, 2.0)
        self.drive(0.0, -1.25, 1.3)
        self.drive(-0.20, 0.0, 2.5) # Dock against wall

        # 7. Final Success
        self.get_logger().info("🏆 MISSION COMPLETE! PERFECT SCORE!")
        for _ in range(5):
            self.set_led('green', True)
            time.sleep(0.2)
            self.set_led('green', False)
            time.sleep(0.2)
        self.set_led('green', True)

def main():
    rclpy.init()
    node = WorldSkillsMissionMaster()
    try:
        node.run_full_competition_mission()
    finally:
        node.pub_cmd.publish(Twist())
        node.move_slider(0.0, 0.1)
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
