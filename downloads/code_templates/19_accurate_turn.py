#!/usr/bin/env python3
"""
Lesson 19: Making Accurate 90-Degree Turns Using Encoders
Track width W = 0.200 m (distance between drive wheels).
Arc length for 90 deg turn: S = (pi * W) / 4 = 0.157 m.
"""
import math
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32

class AccurateTurnNode(Node):
    def __init__(self):
        super().__init__('accurate_turn_node')
        self.pub_cmd = self.create_publisher(Twist, '/cmd_vel', 10)
        self.sub_enc0 = self.create_subscription(Float32, '/titan0/m_0/encoder', self.enc0_cb, 10)
        self.sub_enc1 = self.create_subscription(Float32, '/titan0/m_1/encoder', self.enc1_cb, 10)
        
        self.track_width = 0.200 # 200mm track width
        self.left_enc = None
        self.right_enc = None

    def enc0_cb(self, msg): self.left_enc = msg.data
    def enc1_cb(self, msg): self.right_enc = msg.data

    def turn_degrees(self, target_deg):
        # Wait for encoder inputs
        while (self.left_enc is None or self.right_enc is None) and rclpy.ok():
            rclpy.spin_once(self, timeout_sec=0.1)

        start_l = self.left_enc
        start_r = self.right_enc
        target_rad = math.radians(target_deg)
        required_arc = abs(target_rad * (self.track_width / 2.0))

        self.get_logger().info(f"Turning {target_deg} deg (Required wheel arc: {required_arc*1000:.1f} mm)...")

        cmd = Twist()
        # Set spin direction
        cmd.angular.z = 1.0 if target_deg > 0 else -1.0

        while rclpy.ok():
            rclpy.spin_once(self, timeout_sec=0.02)
            delta_l = abs(self.left_enc - start_l)
            delta_r = abs(self.right_enc - start_r)
            avg_arc = (delta_l + delta_r) / 2.0

            if avg_arc >= required_arc:
                break
            self.pub_cmd.publish(cmd)
            time.sleep(0.02)

        self.pub_cmd.publish(Twist())
        self.get_logger().info("Turn completed accurately!")

def main():
    rclpy.init()
    node = AccurateTurnNode()
    try:
        node.turn_degrees(90.0) # Execute 90 deg left turn
    finally:
        node.pub_cmd.publish(Twist())
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
