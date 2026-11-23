#!/usr/bin/env python3
"""
Lesson 30: Synchronized Dual Servo Gripper
Controls two opposing 180° servos mounted on the slider to grab and release objects.
PWM 0: Left Finger | PWM 1: Right Finger (Mirrored angles)
"""
import time
import rclpy
from rclpy.node import Node
from std_msgs.msg import Int32

class DualGripperController(Node):
    def __init__(self):
        super().__init__('dual_gripper_controller')
        self.pub_left = self.create_publisher(Int32, '/servo/pwm_0', 10)
        self.pub_right = self.create_publisher(Int32, '/servo/pwm_1', 10)

    def set_gripper(self, open_percentage: float):
        """0.0 = fully closed (grip), 1.0 = fully open"""
        pct = max(0.0, min(1.0, open_percentage))
        # Left finger: 1000µs (close) to 2000µs (open)
        left_pulse = int(1000 + (1000 * pct))
        # Right finger: mirrored 2000µs (close) to 1000µs (open)
        right_pulse = int(2000 - (1000 * pct))

        msg_l = Int32(); msg_l.data = left_pulse
        msg_r = Int32(); msg_r.data = right_pulse

        self.pub_left.publish(msg_l)
        self.pub_right.publish(msg_r)
        self.get_logger().info(f"Gripper position: {pct*100:.0f}% (L: {left_pulse}µs, R: {right_pulse}µs)")

    def demo(self):
        self.get_logger().info("Opening Gripper...")
        self.set_gripper(1.0)
        time.sleep(2.0)

        self.get_logger().info("Closing Gripper (Grip Payload)...")
        self.set_gripper(0.0)
        time.sleep(2.0)

def main():
    rclpy.init()
    node = DualGripperController()
    try:
        node.demo()
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
