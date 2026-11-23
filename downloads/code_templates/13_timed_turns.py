#!/usr/bin/env python3
"""
Lesson 13: Turning and Spinning
Demonstrates on-the-spot spinning (point turns) and sweeping arc turns.
"""
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class TimedTurnsNode(Node):
    def __init__(self):
        super().__init__('timed_turns_node')
        self.pub = self.create_publisher(Twist, '/cmd_vel', 10)

    def drive(self, lin_x, ang_z, duration):
        msg = Twist()
        msg.linear.x = lin_x
        msg.angular.z = ang_z
        t_end = time.time() + duration
        while time.time() < t_end and rclpy.ok():
            self.pub.publish(msg)
            time.sleep(0.05)
        # Brief stop
        self.pub.publish(Twist())
        time.sleep(0.5)

    def run_demonstration(self):
        # 1. Point turn left (spin on spot)
        self.get_logger().info("Spinning Counter-Clockwise (Left)...")
        self.drive(0.0, 1.2, 1.5)

        # 2. Point turn right (spin on spot)
        self.get_logger().info("Spinning Clockwise (Right)...")
        self.drive(0.0, -1.2, 1.5)

        # 3. Sweeping Arc turn forward-right
        self.get_logger().info("Driving Forward Arc...")
        self.drive(0.20, -0.8, 2.5)

def main():
    rclpy.init()
    node = TimedTurnsNode()
    try:
        node.run_demonstration()
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
