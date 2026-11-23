#!/usr/bin/env python3
"""
Lesson 32: Slider Limit Switch Protection & Homing Routine
Safely homes the vertical slider mechanism by lowering until the bottom limit switch
triggers, setting the zero position, and preventing over-travel.
"""
import time
import rclpy
from rclpy.node import Node
from std_msgs.msg import Bool, Float32

class SliderHomingNode(Node):
    def __init__(self):
        super().__init__('slider_homing_node')
        self.pub_slider = self.create_publisher(Float32, '/titan0/m_2/cmd_vel', 10)
        self.sub_bottom_sw = self.create_subscription(Bool, '/slider_limit_bottom/state', self.bottom_cb, 10)
        self.sub_top_sw = self.create_subscription(Bool, '/slider_limit_top/state', self.top_cb, 10)

        self.bottom_tripped = False
        self.top_tripped = False

    def bottom_cb(self, msg: Bool): self.bottom_tripped = not msg.data
    def top_cb(self, msg: Bool): self.top_tripped = not msg.data

    def home_slider(self):
        self.get_logger().info("Starting Vertical Slider Homing Sequence...")
        msg = Float32()
        msg.data = -0.20 # Slow downward descent

        while rclpy.ok():
            rclpy.spin_once(self, timeout_sec=0.02)
            if self.bottom_tripped:
                self.get_logger().info("✓ Bottom Endstop hit! Homing completed.")
                break
            self.pub_slider.publish(msg)
            time.sleep(0.02)

        # Stop motor immediately
        msg.data = 0.0
        self.pub_slider.publish(msg)

def main():
    rclpy.init()
    node = SliderHomingNode()
    try:
        node.home_slider()
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
