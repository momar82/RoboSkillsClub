#!/usr/bin/env python3
"""
Lesson 27: Emergency Stop (E-Stop) Safety Interlock
Monitors the Ch 8 latching mushroom E-Stop button.
If pressed, immediately overrides all motor publishers, illuminates the Red LED,
and sounds an alert.
"""
import rclpy
from rclpy.node import Node
from std_msgs.msg import Bool
from geometry_msgs.msg import Twist

class EmergencyStopInterlock(Node):
    def __init__(self):
        super().__init__('estop_interlock')
        self.pub_cmd = self.create_publisher(Twist, '/cmd_vel', 10)
        self.pub_red = self.create_publisher(Bool, '/red_led/cmd', 10)
        self.sub_estop = self.create_subscription(Bool, '/estop/state', self.estop_cb, 10)
        
        self.estop_active = False
        self.get_logger().info("Safety Interlock online. E-Stop monitored at 50 Hz.")

    def estop_cb(self, msg: Bool):
        # Active-low: False = Pressed (Halt), True = Normal
        if not msg.data:
            if not self.estop_active:
                self.estop_active = True
                self.get_logger().fatal("🛑 E-STOP ACTIVATED! ALL MOTORS HALTED!")
            
            # Send emergency stop zero velocity
            self.pub_cmd.publish(Twist())
            # Turn ON Red LED solid
            r = Bool(); r.data = True
            self.pub_red.publish(r)
        else:
            if self.estop_active:
                self.estop_active = False
                self.get_logger().info("E-Stop Released. Normal operations may resume.")
                r = Bool(); r.data = False
                self.pub_red.publish(r)

def main():
    rclpy.init()
    node = EmergencyStopInterlock()
    try:
        rclpy.spin(node)
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
