#!/usr/bin/env python3
"""
Lesson 35: LiDAR Principles & Polar Range Visualizer
Reads 360-degree point ranges from /scan and prints an ASCII polar sector summary.
"""
import math
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan

class LidarPolarSummary(Node):
    def __init__(self):
        super().__init__('lidar_polar_summary')
        self.sub_scan = self.create_subscription(LaserScan, '/scan', self.scan_cb, 10)

    def scan_cb(self, msg: LaserScan):
        # YDLidar X4 provides ~720 samples across 360 degrees
        n = len(msg.ranges)
        if n == 0: return

        # Sectors: Front (0°), Left (90°), Back (180°), Right (270°)
        def get_sector_min(center_deg, span_deg=30):
            half = span_deg / 2.0
            valid = []
            for i, r in enumerate(msg.ranges):
                deg = math.degrees(msg.angle_min + i * msg.angle_increment)
                # Normalize deg to [-180, 180]
                deg = (deg + 180) % 360 - 180
                if abs(deg - center_deg) <= half:
                    if msg.range_min < r < msg.range_max:
                        valid.append(r)
            return min(valid) if valid else 9.99

        f_dist = get_sector_min(0)
        l_dist = get_sector_min(90)
        b_dist = get_sector_min(180)
        r_dist = get_sector_min(-90)

        print(f"\r[LiDAR Sectors] Front: {f_dist:4.2f}m | Left: {l_dist:4.2f}m | Right: {r_dist:4.2f}m | Rear: {b_dist:4.2f}m", end="", flush=True)

def main():
    rclpy.init()
    node = LidarPolarSummary()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        print("\nDone.")
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
