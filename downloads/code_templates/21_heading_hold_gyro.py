#!/usr/bin/env python3
"""
Lesson 21: Heading-Hold Gyroscope Straight-Line Drive
Uses continuous gyroscope yaw feedback to correct wheel motor imbalance,
keeping the robot on an exact target heading indefinitely.
"""
import math
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from sensor_msgs.msg import Imu

def get_yaw_deg(msg: Imu):
    q = msg.orientation
    siny_cosp = 2 * (q.w * q.z + q.x * q.y)
    cosy_cosp = 1 - 2 * (q.y * q.y + q.z * q.z)
    return math.degrees(math.atan2(siny_cosp, cosy_cosp))

class HeadingHoldNode(Node):
    def __init__(self):
        super().__init__('heading_hold_node')
        self.pub_cmd = self.create_publisher(Twist, '/cmd_vel', 10)
        self.sub_imu = self.create_subscription(Imu, '/imu/data', self.imu_cb, 10)
        
        self.current_yaw = None
        self.target_yaw = None
        self.kp_heading = 0.035 # Proportional gain for heading correction

    def imu_cb(self, msg: Imu):
        self.current_yaw = get_yaw_deg(msg)
        if self.target_yaw is None:
            self.target_yaw = self.current_yaw

    def drive_straight(self, duration_sec):
        while self.current_yaw is None and rclpy.ok():
            rclpy.spin_once(self, timeout_sec=0.1)

        self.get_logger().info(f"Target Heading locked: {self.target_yaw:.1f}°. Driving straight...")
        cmd = Twist()
        cmd.linear.x = 0.25 # Desired forward speed

        t_end = time.time() + duration_sec
        while time.time() < t_end and rclpy.ok():
            rclpy.spin_once(self, timeout_sec=0.02)
            # Calculate heading error with wrapping (-180 to +180)
            error = self.target_yaw - self.current_yaw
            while error > 180: error -= 360
            while error < -180: error += 360

            # Proportional angular correction
            cmd.angular.z = error * self.kp_heading
            self.pub_cmd.publish(cmd)
            time.sleep(0.02)

        self.pub_cmd.publish(Twist())
        self.get_logger().info("Straight line run complete!")

def main():
    rclpy.init()
    node = HeadingHoldNode()
    try:
        node.drive_straight(5.0) # Run for 5 seconds
    finally:
        node.pub_cmd.publish(Twist())
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
