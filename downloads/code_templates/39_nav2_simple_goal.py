#!/usr/bin/env python3
"""
Lesson 39: Autonomous Navigation with Nav2 Action Client
Sends 2D navigation goal coordinates (X, Y, Yaw) to the ROS 2 Nav2 Navigation Stack.
"""
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator, TaskResult

def main():
    rclpy.init()
    navigator = BasicNavigator()

    print("=" * 60)
    print("  Studica AMR: Nav2 Autonomous Waypoint Dispatcher")
    print("=" * 60)

    # Define target goal pose
    goal_pose = PoseStamped()
    goal_pose.header.frame_id = 'map'
    goal_pose.header.stamp = navigator.get_clock().now().to_msg()
    goal_pose.pose.position.x = 2.0  # 2.0 meters forward
    goal_pose.pose.position.y = 1.0  # 1.0 meter left
    goal_pose.pose.orientation.w = 1.0 # 0 degrees yaw

    print(f"[*] Navigating to Goal: X={goal_pose.pose.position.x}m, Y={goal_pose.pose.position.y}m...")
    navigator.goToPose(goal_pose)

    while not navigator.isTaskComplete():
        feedback = navigator.getFeedback()
        if feedback:
            print(f"\rDistance remaining: {feedback.distance_remaining:.2f} m", end="", flush=True)

    result = navigator.getResult()
    if result == TaskResult.SUCCEEDED:
        print("\n[✓] Goal reached successfully!")
    elif result == TaskResult.CANCELED:
        print("\n[!] Goal was canceled.")
    elif result == TaskResult.FAILED:
        print("\n[✗] Goal failed!")

    rclpy.shutdown()

if __name__ == '__main__':
    main()
