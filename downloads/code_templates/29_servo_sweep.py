#!/usr/bin/env python3
"""
Lesson 29: Servo PWM Control & Calibration
Sends standard 50 Hz PWM pulse widths (1000 µs to 2000 µs) to test servo range.
PWM Channel 0: Left Gripper | PWM Channel 1: Right Gripper
"""
import time
import rclpy
from rclpy.node import Node
from std_msgs.msg import Int32

class ServoSweepNode(Node):
    def __init__(self):
        super().__init__('servo_sweep_node')
        self.pub_pwm0 = self.create_publisher(Int32, '/servo/pwm_0', 10)

    def sweep(self):
        self.get_logger().info("Sweeping Servo: 0° (1000 µs) -> 90° (1500 µs) -> 180° (2000 µs)")
        
        positions = [(1000, "0 Degrees (Fully Closed)"),
                     (1500, "90 Degrees (Neutral)"),
                     (2000, "180 Degrees (Fully Open)")]
        
        for pulse, label in positions:
            self.get_logger().info(f"Setting: {label} -> {pulse} µs")
            msg = Int32(); msg.data = pulse
            self.pub_pwm0.publish(msg)
            time.sleep(1.5)

def main():
    rclpy.init()
    node = ServoSweepNode()
    try:
        node.sweep()
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
