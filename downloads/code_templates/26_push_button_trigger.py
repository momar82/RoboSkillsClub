#!/usr/bin/env python3
"""
Lesson 26: Push Button Event Triggering
Monitors the Ch 11 push button with debouncing. When clicked,
it flashes the green LED and executes an autonomous drive sequence.
"""
import time
import rclpy
from rclpy.node import Node
from std_msgs.msg import Bool
from geometry_msgs.msg import Twist

class PushButtonTriggerNode(Node):
    def __init__(self):
        super().__init__('push_button_trigger')
        self.pub_cmd = self.create_publisher(Twist, '/cmd_vel', 10)
        self.pub_green = self.create_publisher(Bool, '/green_led/cmd', 10)
        self.sub_btn = self.create_subscription(Bool, '/push_button/state', self.btn_cb, 10)

        self.mission_started = False
        self.get_logger().info("Waiting for push button (Ch 11) press to START mission...")

    def btn_cb(self, msg: Bool):
        # Active-low: True = released, False = pressed
        if not msg.data and not self.mission_started:
            self.mission_started = True
            self.get_logger().info("🔘 Button PRESSED! Launching mission in 1 second...")
            self.launch_mission()

    def launch_mission(self):
        # Flash Green LED
        g = Bool(); g.data = True
        self.pub_green.publish(g)

        # Drive forward 1 meter
        cmd = Twist(); cmd.linear.x = 0.25
        t_end = time.time() + 2.0
        while time.time() < t_end and rclpy.ok():
            self.pub_cmd.publish(cmd)
            time.sleep(0.05)

        self.pub_cmd.publish(Twist()) # Stop
        g.data = False
        self.pub_green.publish(g)
        self.get_logger().info("Mission Completed successfully!")

def main():
    rclpy.init()
    node = PushButtonTriggerNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.pub_cmd.publish(Twist())
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
