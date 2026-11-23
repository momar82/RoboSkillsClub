#!/usr/bin/env python3
"""
Lesson 31: Vertical Slider Motor Control on Titan M2
Drives the lead-screw / belt vertical lift mechanism on motor channel M2.
Topic: /titan0/m_2/cmd_vel
"""
import time
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

class VerticalSliderNode(Node):
    def __init__(self):
        super().__init__('vertical_slider_node')
        self.pub_slider = self.create_publisher(Float32, '/titan0/m_2/cmd_vel', 10)

    def move_slider(self, power: float, duration_sec: float):
        """power: -1.0 (down) to +1.0 (up)"""
        msg = Float32()
        msg.data = float(power)
        self.get_logger().info(f"Moving Slider: power={power:.2f} for {duration_sec}s...")
        
        t_end = time.time() + duration_sec
        while time.time() < t_end and rclpy.ok():
            self.pub_slider.publish(msg)
            time.sleep(0.05)

        # Halt slider
        msg.data = 0.0
        self.pub_slider.publish(msg)
        self.get_logger().info("Slider halted.")

def main():
    rclpy.init()
    node = VerticalSliderNode()
    try:
        # Move up at 30% power for 1.5 seconds
        node.move_slider(0.30, 1.5)
        time.sleep(1.0)
        # Move down at 30% power for 1.5 seconds
        node.move_slider(-0.30, 1.5)
    finally:
        node.move_slider(0.0, 0.1)
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
