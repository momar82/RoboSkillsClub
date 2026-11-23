#!/usr/bin/env python3
"""
Lesson 20: Reading the 9-Axis NavX IMU
Subscribes to /imu/data, converts quaternion orientation to Euler angles
(Yaw, Pitch, Roll in degrees), and logs angular velocity.
"""
import math
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Imu

def quaternion_to_euler(x, y, z, w):
    # Yaw (Z-axis rotation)
    siny_cosp = 2 * (w * z + x * y)
    cosy_cosp = 1 - 2 * (y * y + z * z)
    yaw = math.atan2(siny_cosp, cosy_cosp)
    return math.degrees(yaw)

class NavXImuReader(Node):
    def __init__(self):
        super().__init__('navx_imu_reader')
        self.sub_imu = self.create_subscription(Imu, '/imu/data', self.imu_cb, 10)
        self.get_logger().info("NavX IMU Reader online. Displaying real-time heading...")

    def imu_cb(self, msg: Imu):
        q = msg.orientation
        yaw_deg = quaternion_to_euler(q.x, q.y, q.z, q.w)
        gyro_z = msg.angular_velocity.z # rad/s
        print(f"\r[NavX IMU] Heading: {yaw_deg:+6.1f}° | Gyro Z: {gyro_z:+5.2f} rad/s", end="", flush=True)

def main():
    rclpy.init()
    node = NavXImuReader()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        print("\nDone.")
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
