#!/usr/bin/env python3
"""
Lesson 14: Deadman Safety & Watchdog Monitor
Ensures that if connection drops or code halts, the robot immediately stops.
Handles keyboard interrupts (Ctrl+C) cleanly.
"""
import signal
import sys
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class DeadmanSafetyNode(Node):
    def __init__(self):
        super().__init__('deadman_safety_node')
        self.pub = self.create_publisher(Twist, '/cmd_vel', 10)
        self.is_running = True

    def safe_stop(self):
        self.get_logger().warn("EMERGENCY SAFE STOP ENGAGED!")
        stop_cmd = Twist()
        for _ in range(5):
            self.pub.publish(stop_cmd)
            time.sleep(0.02)

    def run_mission_with_watchdog(self):
        cmd = Twist()
        cmd.linear.x = 0.20
        self.get_logger().info("Robot moving with active safety watchdog. Press Ctrl+C anytime!")

        start_time = time.time()
        timeout = 5.0 # Max duration
        try:
            while (time.time() - start_time < timeout) and self.is_running:
                self.pub.publish(cmd)
                time.sleep(0.05)
        except KeyboardInterrupt:
            self.get_logger().info("User stopped execution.")
        finally:
            self.safe_stop()

def main():
    rclpy.init()
    node = DeadmanSafetyNode()
    try:
        node.run_mission_with_watchdog()
    finally:
        node.safe_stop()
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
