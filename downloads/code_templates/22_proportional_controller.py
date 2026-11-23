#!/usr/bin/env python3
"""
Lesson 22: Closed-Loop Proportional (P) Controller
Controls position using error feedback: Output = Kp * error.
"""
import math
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32

class ProportionalPositionController(Node):
    def __init__(self):
        super().__init__('p_position_controller')
        self.pub_cmd = self.create_publisher(Twist, '/cmd_vel', 10)
        self.sub_enc = self.create_subscription(Float32, '/titan0/m_0/encoder', self.enc_cb, 10)
        
        self.current_pos = None
        self.target_pos = 0.80 # Target: 0.80 meters
        self.kp = 1.8          # Proportional gain

    def enc_cb(self, msg):
        if self.current_pos is None:
            self.start_pos = msg.data
        self.current_pos = msg.data - self.start_pos

    def run_controller(self):
        while self.current_pos is None and rclpy.ok():
            rclpy.spin_once(self, timeout_sec=0.1)

        self.get_logger().info(f"Target Position: {self.target_pos}m | Kp={self.kp}")
        cmd = Twist()

        for _ in range(250): # 5 seconds at 50Hz
            rclpy.spin_once(self, timeout_sec=0.02)
            error = self.target_pos - self.current_pos
            
            # P Controller equation
            u = self.kp * error
            # Clamp output to robot max speed
            cmd.linear.x = max(-0.35, min(0.35, u))
            self.pub_cmd.publish(cmd)

            if abs(error) < 0.005: # 5mm tolerance
                self.get_logger().info(f"Converged! Error: {error*1000:.1f} mm")
                break
            time.sleep(0.02)

        self.pub_cmd.publish(Twist())

def main():
    rclpy.init()
    node = ProportionalPositionController()
    try:
        node.run_controller()
    finally:
        node.pub_cmd.publish(Twist())
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
