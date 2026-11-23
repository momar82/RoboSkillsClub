#!/usr/bin/env python3
"""
Lesson 12: Controlling Speed & Direction
Executes a forward drive, brief pause, reverse drive back to start, and halt.
"""
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class ForwardReverseNode(Node):
    def __init__(self):
        super().__init__('forward_reverse_node')
        self.pub = self.create_publisher(Twist, '/cmd_vel', 10)

    def send_velocity(self, linear_x, angular_z, duration_sec):
        cmd = Twist()
        cmd.linear.x = float(linear_x)
        cmd.angular.z = float(angular_z)

        start = time.time()
        while time.time() - start < duration_sec and rclpy.ok():
            self.pub.publish(cmd)
            time.sleep(0.05)

    def execute_shuttle(self):
        self.get_logger().info("Step 1: Moving Forward (0.25 m/s, 2s)...")
        self.send_velocity(0.25, 0.0, 2.0)

        self.get_logger().info("Step 2: Pausing (1.0s)...")
        self.send_velocity(0.0, 0.0, 1.0)

        self.get_logger().info("Step 3: Moving Reverse (-0.25 m/s, 2s)...")
        self.send_velocity(-0.25, 0.0, 2.0)

        self.get_logger().info("Step 4: All stop!")
        self.send_velocity(0.0, 0.0, 0.5)

def main(args=None):
    rclpy.init(args=args)
    node = ForwardReverseNode()
    try:
        node.execute_shuttle()
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
