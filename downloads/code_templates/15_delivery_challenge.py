#!/usr/bin/env python3
"""
Lesson 15: The Autonomous Warehouse Delivery Challenge
Executes a timed delivery loop: Start -> Station A -> Station B -> Home.
"""
import time
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class WarehouseDeliveryNode(Node):
    def __init__(self):
        super().__init__('warehouse_delivery')
        self.pub = self.create_publisher(Twist, '/cmd_vel', 10)

    def execute_move(self, lin_x, ang_z, duration, label):
        self.get_logger().info(f"Executing: {label} (lin={lin_x}, ang={ang_z}, {duration}s)")
        cmd = Twist()
        cmd.linear.x = lin_x
        cmd.angular.z = ang_z
        t_end = time.time() + duration
        while time.time() < t_end and rclpy.ok():
            self.pub.publish(cmd)
            time.sleep(0.05)
        self.pub.publish(Twist()) # Stop
        time.sleep(0.5)

    def run_challenge(self):
        self.get_logger().info("Starting Autonomous Delivery Route...")
        # Leg 1: Drive from Start to Station A
        self.execute_move(0.25, 0.0, 2.5, "Leg 1: Move to Station A")
        time.sleep(2.0) # Unload payload simulation

        # Leg 2: Turn 90 deg Left
        self.execute_move(0.0, 1.25, 1.3, "Turn 90 Left towards Station B")

        # Leg 3: Drive to Station B
        self.execute_move(0.25, 0.0, 2.0, "Leg 3: Move to Station B")
        time.sleep(2.0) # Load payload simulation

        # Leg 4: Spin 180 deg to return home
        self.execute_move(0.0, 1.25, 2.6, "Spin 180 to face Home")

        # Leg 5: Drive back to Start
        self.execute_move(0.30, 0.0, 3.2, "Leg 5: Return to Home Bay")
        self.get_logger().info("Delivery Challenge Complete! Mission Successful.")

def main():
    rclpy.init()
    node = WarehouseDeliveryNode()
    try:
        node.run_challenge()
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
