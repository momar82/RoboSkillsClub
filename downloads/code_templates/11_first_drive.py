#!/usr/bin/env python3
"""
Lesson 11: First Python Drive
Drives the robot forward at 0.20 m/s for 2.0 seconds, then stops smoothly.
Topic: /cmd_vel
Type: geometry_msgs/msg/Twist
"""
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class FirstDriveNode(Node):
    def __init__(self):
        super().__init__('first_drive_node')
        self.publisher = self.create_publisher(Twist, '/cmd_vel', 10)
        self.get_logger().info("First Drive Node started! Driving forward for 2.0 seconds...")

    def drive_and_stop(self):
        # 1. Prepare Move Forward Command
        move_cmd = Twist()
        move_cmd.linear.x = 0.20  # 0.20 m/s forward
        move_cmd.angular.z = 0.0

        # Send command at 10 Hz for 2.0 seconds
        start_time = time.time()
        while time.time() - start_time < 2.0 and rclpy.ok():
            self.publisher.publish(move_cmd)
            time.sleep(0.1)

        # 2. Stop Robot
        stop_cmd = Twist()
        self.publisher.publish(stop_cmd)
        self.get_logger().info("Drive complete! Robot stopped safely.")

def main(args=None):
    rclpy.init(args=args)
    node = FirstDriveNode()
    try:
        node.drive_and_stop()
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
