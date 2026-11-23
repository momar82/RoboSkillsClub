#!/usr/bin/env python3
"""
Lesson 36: Reading & Filtering sensor_msgs/LaserScan
Extracts forward safety cone (+/- 25 degrees) to find the closest obstacle.
"""
import math
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan

class LaserScanFilterNode(Node):
    def __init__(self):
        super().__init__('laserscan_filter')
        self.sub_scan = self.create_subscription(LaserScan, '/scan', self.scan_cb, 10)
        self.get_logger().info("Subscribed to /scan. Monitoring forward 50° safety cone...")

    def scan_cb(self, msg: LaserScan):
        forward_ranges = []
        cone_deg = 25.0 # +/- 25 degrees

        for i, r in enumerate(msg.ranges):
            # Calculate angle in degrees
            angle_rad = msg.angle_min + (i * msg.angle_increment)
            angle_deg = math.degrees(angle_rad)
            # Wrap to [-180, 180]
            angle_deg = (angle_deg + 180) % 360 - 180

            if abs(angle_deg) <= cone_deg:
                if msg.range_min < r < msg.range_max:
                    forward_ranges.append(r)

        if forward_ranges:
            min_dist = min(forward_ranges)
            status = "⚠️ HAZARD DETECTED!" if min_dist < 0.40 else "CLEAR"
            print(f"\r[Forward Cone] Closest Obstacle: {min_dist:4.2f} m  [{status}]   ", end="", flush=True)

def main():
    rclpy.init()
    node = LaserScanFilterNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        print("\nExiting.")
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
