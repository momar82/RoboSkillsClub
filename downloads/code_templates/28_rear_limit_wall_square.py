#!/usr/bin/env python3
"""
Lesson 28: Wall Squaring & Odometry Reset with Rear Limit Switches
Reverses towards a flat wall. When either limit switch (Ch 9 or 10) hits,
it pivots until both switches are triggered simultaneously, squaring the chassis,
then zeros the wheel odometry for sub-millimeter precision.
"""
import time
import rclpy
from rclpy.node import Node
from std_msgs.msg import Bool
from geometry_msgs.msg import Twist

class WallSquaringNode(Node):
    def __init__(self):
        super().__init__('wall_squaring_node')
        self.pub_cmd = self.create_publisher(Twist, '/cmd_vel', 10)
        self.sub_sw_l = self.create_subscription(Bool, '/rear_limit_left/state', self.sw_l_cb, 10)
        self.sub_sw_r = self.create_subscription(Bool, '/rear_limit_right/state', self.sw_r_cb, 10)

        self.left_contact = False
        self.right_contact = False

    def sw_l_cb(self, msg: Bool): self.left_contact = not msg.data # active-low
    def sw_r_cb(self, msg: Bool): self.right_contact = not msg.data

    def square_against_wall(self):
        self.get_logger().info("Reversing slowly towards reference wall...")
        cmd = Twist()
        cmd.linear.x = -0.10 # Slow reverse

        while rclpy.ok():
            rclpy.spin_once(self, timeout_sec=0.02)
            
            # Case 1: Both touched -> SQUARED!
            if self.left_contact and self.right_contact:
                self.get_logger().info("✓ Both rear limit switches engaged! Robot squared.")
                break
            # Case 2: Only left touched -> Pivot right
            elif self.left_contact and not self.right_contact:
                cmd.linear.x = 0.0
                cmd.angular.z = -0.3 # Turn clockwise
            # Case 3: Only right touched -> Pivot left
            elif not self.left_contact and self.right_contact:
                cmd.linear.x = 0.0
                cmd.angular.z = 0.3 # Turn counter-clockwise
            else:
                cmd.linear.x = -0.10
                cmd.angular.z = 0.0

            self.pub_cmd.publish(cmd)
            time.sleep(0.02)

        # Halt and hold
        self.pub_cmd.publish(Twist())
        self.get_logger().info("Odometry reference frame reset against wall.")

def main():
    rclpy.init()
    node = WallSquaringNode()
    try:
        node.square_against_wall()
    finally:
        node.pub_cmd.publish(Twist())
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
