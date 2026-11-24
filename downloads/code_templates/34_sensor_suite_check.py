#!/usr/bin/env python3
"""
Lesson 34: Sensor Suite Diagnostics & Frequency Audit
Measures publishing frequencies (Hz) across all active perception sensors:
- YDLidar X4: /scan
- NavX IMU: /imu/data
- Wheel Encoders: /titan0/m_0/encoder
- Depth Camera: /camera/color/image_raw
"""
import time
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan, Imu, Image
from std_msgs.msg import Float32

class SensorRateAuditor(Node):
    def __init__(self):
        super().__init__('sensor_rate_auditor')
        self.counts = {"LiDAR": 0, "IMU": 0, "Encoder": 0, "Camera": 0}
        self.rates = {"LiDAR": 0.0, "IMU": 0.0, "Encoder": 0.0, "Camera": 0.0}

        self.create_subscription(LaserScan, '/scan', lambda m: self.inc("LiDAR"), 10)
        self.create_subscription(Imu, '/imu/data', lambda m: self.inc("IMU"), 10)
        self.create_subscription(Float32, '/titan0/m_0/encoder', lambda m: self.inc("Encoder"), 10)
        self.create_subscription(Image, '/camera/color/image_raw', lambda m: self.inc("Camera"), 10)

        self.last_time = time.time()
        self.timer = self.create_timer(1.0, self.calc_rates)
        self.get_logger().info("Measuring sensor publishing rates (Hz)...")

    def inc(self, key):
        self.counts[key] += 1

    def calc_rates(self):
        now = time.time()
        dt = now - self.last_time
        print("\033[H\033[J", end="")
        print("=" * 50)
        print("    Studica AMR: Sensor Frequency Audit")
        print("=" * 50)
        for k in self.counts:
            hz = self.counts[k] / dt
            status = "🟢 HEALTHY" if hz > 2.0 else "⚠️ LOW / INACTIVE"
            print(f"  {k:<12} : {hz:6.1f} Hz  [{status}]")
            self.counts[k] = 0
        print("=" * 50)
        self.last_time = now

def main():
    rclpy.init()
    node = SensorRateAuditor()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
