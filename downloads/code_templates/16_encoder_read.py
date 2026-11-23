#!/usr/bin/env python3
"""
Lesson 16: Reading Wheel Encoders
Subscribes to Titan motor encoder streams (/titan0/m_0/encoder and /titan0/m_1/encoder)
and converts ticks into motor shaft and wheel output revolutions.
"""
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

TICKS_PER_MOTOR_REV = 28 # Raw motor encoder ticks per motor turn
GEAR_RATIO = 60.0         # 60:1 planetary gearbox
TICKS_PER_OUTPUT_REV = TICKS_PER_MOTOR_REV * GEAR_RATIO # 1680 ticks/rev

class EncoderReadNode(Node):
    def __init__(self):
        super().__init__('encoder_read_node')
        self.sub_m0 = self.create_subscription(Float32, '/titan0/m_0/encoder', self.m0_callback, 10)
        self.sub_m1 = self.create_subscription(Float32, '/titan0/m_1/encoder', self.m1_callback, 10)
        
        self.left_distance = 0.0
        self.right_distance = 0.0
        
        # Periodic display timer
        self.timer = self.create_timer(0.25, self.display_telemetry)
        self.get_logger().info("Encoder Reader active. Manually spin wheels to observe change!")

    def m0_callback(self, msg: Float32):
        self.left_distance = msg.data

    def m1_callback(self, msg: Float32):
        self.right_distance = msg.data

    def display_telemetry(self):
        print(f"\r[Encoders] Left (M0): {self.left_distance:+.3f} m  |  Right (M1): {self.right_distance:+.3f} m", end="", flush=True)

def main():
    rclpy.init()
    node = EncoderReadNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        print("\nExiting.")
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
