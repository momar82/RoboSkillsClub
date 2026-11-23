#!/usr/bin/env python3
"""
Lesson 18: Move Exact Distance (Closed-Loop Encoder Control)
Drives the robot forward until the wheel encoder measures exactly 1.00 meter,
then halts immediately.
"""
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32

class MoveExactDistanceNode(Node):
    def __init__(self):
        super().__init__('move_exact_distance')
        self.pub_cmd = self.create_publisher(Twist, '/cmd_vel', 10)
        self.sub_enc0 = self.create_subscription(Float32, '/titan0/m_0/encoder', self.enc_cb, 10)
        self.current_dist = 0.0
        self.start_dist = None
        self.target_dist = 1.00 # Target distance in meters

    def enc_cb(self, msg: Float32):
        self.current_dist = msg.data
        if self.start_dist is None:
            self.start_dist = msg.data

    def drive_distance(self):
        # Wait for first encoder reading
        while self.start_dist is None and rclpy.ok():
            rclpy.spin_once(self, timeout_sec=0.1)

        self.get_logger().info(f"Starting closed-loop move of {self.target_dist:.2f} meters...")
        cmd = Twist()
        cmd.linear.x = 0.20 # Forward velocity

        while rclpy.ok():
            rclpy.spin_once(self, timeout_sec=0.02)
            traveled = abs(self.current_dist - self.start_dist)
            remaining = self.target_dist - traveled

            if remaining <= 0.01: # Target reached!
                break
            
            # Simple slowdown as we approach target
            if remaining < 0.20:
                cmd.linear.x = max(0.08, remaining * 1.0)
            
            self.pub_cmd.publish(cmd)
            time.sleep(0.02)

        # Stop
        self.pub_cmd.publish(Twist())
        self.get_logger().info(f"Target reached! Traveled: {abs(self.current_dist - self.start_dist):.3f} m")

def main():
    rclpy.init()
    node = MoveExactDistanceNode()
    try:
        node.drive_distance()
    finally:
        node.pub_cmd.publish(Twist())
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
