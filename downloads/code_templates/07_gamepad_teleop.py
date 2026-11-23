#!/usr/bin/env python3
"""
Lesson 07: Gamepad Teleoperation Node
Translates standard joystick inputs into /cmd_vel Twist messages
with deadman safety enable button (L1 / Button 4).
"""
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Joy
from geometry_msgs.msg import Twist

class GamepadTeleopNode(Node):
    def __init__(self):
        super().__init__('gamepad_teleop')
        self.pub_cmd_vel = self.create_publisher(Twist, '/cmd_vel', 10)
        self.sub_joy = self.create_subscription(Joy, '/joy', self.joy_callback, 10)
        
        # Velocity limits
        self.max_linear_speed = 0.40  # m/s
        self.max_angular_speed = 1.50 # rad/s
        self.deadman_button_idx = 4   # L1 bumper on standard controller
        
        self.get_logger().info("Gamepad Teleop initialized. Hold L1/LB to drive!")

    def joy_callback(self, joy_msg: Joy):
        twist = Twist()
        # Deadman check: only move if safety bumper is held
        is_enabled = False
        if len(joy_msg.buttons) > self.deadman_button_idx:
            is_enabled = bool(joy_msg.buttons[self.deadman_button_idx])
            
        if is_enabled and len(joy_msg.axes) >= 2:
            # Left stick vertical: Linear X
            twist.linear.x = joy_msg.axes[1] * self.max_linear_speed
            # Left stick horizontal: Angular Z
            twist.angular.z = joy_msg.axes[0] * self.max_angular_speed
        else:
            twist.linear.x = 0.0
            twist.angular.z = 0.0

        self.pub_cmd_vel.publish(twist)

def main(args=None):
    rclpy.init(args=args)
    node = GamepadTeleopNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.pub_cmd_vel.publish(Twist()) # Emergency zero on shutdown
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
