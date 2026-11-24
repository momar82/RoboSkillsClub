#!/usr/bin/env python3
"""
Lesson 24: Digital I/O Overview & Hardware Inspection
Scans and displays states of all configured DIO channels:
- Red LED (HiCurrDIO Ch 21)
- Green LED (HiCurrDIO Ch 20)
- Push Button (FlexDIO Ch 11)
- E-Stop (FlexDIO Ch 8)
- Rear Limit Switches (FlexDIO Ch 9 & 10)
"""
import rclpy
from rclpy.node import Node
from std_msgs.msg import Bool

class DigitalIOScanner(Node):
    def __init__(self):
        super().__init__('dio_scanner')
        self.states = {}

        self.create_subscription(Bool, '/red_led/state', lambda m: self.update('Red LED (Ch 21)', m.data), 10)
        self.create_subscription(Bool, '/green_led/state', lambda m: self.update('Green LED (Ch 20)', m.data), 10)
        self.create_subscription(Bool, '/push_button/state', lambda m: self.update('Push Button (Ch 11)', m.data), 10)
        self.create_subscription(Bool, '/estop/state', lambda m: self.update('E-Stop (Ch 8)', m.data), 10)
        self.create_subscription(Bool, '/rear_limit_left/state', lambda m: self.update('Rear Left Limit (Ch 9)', m.data), 10)
        self.create_subscription(Bool, '/rear_limit_right/state', lambda m: self.update('Rear Right Limit (Ch 10)', m.data), 10)

        self.timer = self.create_timer(0.5, self.print_table)
        self.get_logger().info("Scanning DIO channels. Press buttons or flip switches...")

    def update(self, name, val):
        self.states[name] = val

    def print_table(self):
        print("\033[H\033[J", end="") # Clear console
        print("=" * 55)
        print("   Studica AMR: Digital I/O Status Table")
        print("=" * 55)
        for ch, state in sorted(self.states.items()):
            symbol = "🟢 ON / HIGH" if state else "⚫ OFF / LOW"
            print(f"  {ch:<28} : {symbol}")
        print("=" * 55)

def main():
    rclpy.init()
    node = DigitalIOScanner()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
