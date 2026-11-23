#!/usr/bin/env python3
"""
Lesson 37: Reactive Virtual Bumper Obstacle Avoidance
Drives forward autonomously; if an obstacle is detected closer than 0.45 meters,
the virtual bumper triggers: the robot stops, spins away from the obstacle,
and continues forward.
"""
import math
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from sensor_msgs.msg import LaserScan

class VirtualBumperNode(Node):
    def __init__(self):
        super().__init__('virtual_bumper_node')
        self.pub_cmd = self.create_publisher(Twist, '/cmd_vel', 10)
        self.sub_scan = self.create_subscription(LaserScan, '/scan', self.scan_cb, 10)
        
        self.forward_clear = True
        self.turn_direction = 1.0 # 1.0 for left, -1.0 for right
        self.safety_threshold = 0.45 # meters

    def scan_cb(self, msg: LaserScan):
        left_sector = []
        right_sector = []

        for i, r in enumerate(msg.ranges):
            angle = math.degrees(msg.angle_min + i * msg.angle_increment)
            angle = (angle + 180) % 360 - 180

            if msg.range_min < r < msg.range_max:
                if 0 <= angle <= 40:
                    left_sector.append(r)
                elif -40 <= angle < 0:
                    right_sector.append(r)

        min_l = min(left_sector) if left_sector else 9.99
        min_r = min(right_sector) if right_sector else 9.99
        min_front = min(min_l, min_r)

        if min_front < self.safety_threshold:
            self.forward_clear = False
            # Spin away from closer side
            self.turn_direction = -1.0 if min_l < min_r else 1.0
        else:
            self.forward_clear = True

    def run_wander(self):
        self.get_logger().info("Virtual Bumper active! Cruising forward safely...")
        cmd = Twist()

        while rclpy.ok():
            rclpy.spin_once(self, timeout_sec=0.02)
            if self.forward_clear:
                cmd.linear.x = 0.22
                cmd.angular.z = 0.0
            else:
                self.get_logger().warn("Obstacle ahead! Executing reactive avoidance turn...")
                cmd.linear.x = 0.0
                cmd.angular.z = 0.8 * self.turn_direction

            self.pub_cmd.publish(cmd)
            time.sleep(0.02)

def main():
    rclpy.init()
    node = VirtualBumperNode()
    try:
        node.run_wander()
    finally:
        node.pub_cmd.publish(Twist())
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
