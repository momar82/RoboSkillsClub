#!/usr/bin/env python3
"""
Lesson 23: Full PID Velocity Controller
Implements Proportional-Integral-Derivative control with anti-windup:
u(t) = Kp*e(t) + Ki*int(e(t)) + Kd*de(t)/dt
"""
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32

class PIDVelocityController(Node):
    def __init__(self):
        super().__init__('pid_velocity_controller')
        self.pub_cmd = self.create_publisher(Twist, '/cmd_vel', 10)
        self.sub_rpm = self.create_subscription(Float32, '/titan0/m_0/rpm', self.rpm_cb, 10)

        # PID Gains
        self.kp = 0.008
        self.ki = 0.002
        self.kd = 0.0005

        self.target_rpm = 60.0 # Target 60 RPM
        self.measured_rpm = 0.0
        self.integral = 0.0
        self.prev_error = 0.0
        self.prev_time = time.time()

    def rpm_cb(self, msg: Float32):
        self.measured_rpm = msg.data

    def step_pid(self):
        now = time.time()
        dt = max(0.001, now - self.prev_time)
        
        error = self.target_rpm - self.measured_rpm
        self.integral += error * dt
        # Anti-windup clamping
        self.integral = max(-10.0, min(10.0, self.integral))
        
        derivative = (error - self.prev_error) / dt

        output = (self.kp * error) + (self.ki * self.integral) + (self.kd * derivative)
        
        self.prev_error = error
        self.prev_time = now
        return output

    def control_loop(self):
        self.get_logger().info(f"Running PID Velocity loop at Target RPM: {self.target_rpm}...")
        cmd = Twist()
        for _ in range(300): # 6 seconds
            rclpy.spin_once(self, timeout_sec=0.02)
            u = self.step_pid()
            cmd.linear.x = max(-0.4, min(0.4, u))
            self.pub_cmd.publish(cmd)
            time.sleep(0.02)
        self.pub_cmd.publish(Twist())

def main():
    rclpy.init()
    node = PIDVelocityController()
    try:
        node.control_loop()
    finally:
        node.pub_cmd.publish(Twist())
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
