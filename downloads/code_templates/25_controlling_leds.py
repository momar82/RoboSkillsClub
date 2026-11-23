#!/usr/bin/env python3
"""
Lesson 25: Controlling Indicator LEDs
Controls Red LED (Ch 21) and Green LED (Ch 20) with blinking sequences
and robot operational state patterns.
"""
import time
import rclpy
from rclpy.node import Node
from std_msgs.msg import Bool

class LEDControllerNode(Node):
    def __init__(self):
        super().__init__('led_controller')
        self.pub_red = self.create_publisher(Bool, '/red_led/cmd', 10)
        self.pub_green = self.create_publisher(Bool, '/green_led/cmd', 10)

    def set_leds(self, red: bool, green: bool):
        msg_r = Bool(); msg_r.data = red
        msg_g = Bool(); msg_g.data = green
        self.pub_red.publish(msg_r)
        self.pub_green.publish(msg_g)

    def run_patterns(self):
        self.get_logger().info("Pattern 1: Alternating Police Flasher (3 seconds)...")
        for _ in range(6):
            self.set_leds(True, False)
            time.sleep(0.25)
            self.set_leds(False, True)
            time.sleep(0.25)

        self.get_logger().info("Pattern 2: Robot Ready (Solid Green, Red Off)...")
        self.set_leds(False, True)
        time.sleep(2.0)

        self.get_logger().info("Pattern 3: System Alert (Blinking Red)...")
        for _ in range(4):
            self.set_leds(True, False)
            time.sleep(0.3)
            self.set_leds(False, False)
            time.sleep(0.3)

        self.get_logger().info("All LEDs turned off.")
        self.set_leds(False, False)

def main():
    rclpy.init()
    node = LEDControllerNode()
    try:
        node.run_patterns()
    finally:
        node.set_leds(False, False)
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
