#!/usr/bin/env python3
"""
Lesson 17: Wheel Geometry Math & Calibration
Calculates theoretical vs measured distance for 100mm wheels.
Wheel Diameter D = 0.100 m -> Circumference C = pi * D = 0.314159 m
Ticks per Revolution = 1680
Meters per Tick = C / 1680 = 0.000187 m
"""
import math
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

class WheelCalibrationNode(Node):
    def __init__(self):
        super().__init__('wheel_calibration')
        self.wheel_diameter_m = 0.100
        self.wheel_circ = math.pi * self.wheel_diameter_m
        self.ticks_per_rev = 1680.0
        self.meters_per_tick = self.wheel_circ / self.ticks_per_rev

        print("=" * 60)
        print("  Studica AMR: Wheel Kinematics Calibration")
        print("=" * 60)
        print(f"Wheel Diameter:       {self.wheel_diameter_m * 1000:.1f} mm")
        print(f"Wheel Circumference:  {self.wheel_circ * 1000:.2f} mm")
        print(f"Gearbox Output Ticks: {self.ticks_per_rev:.0f} ticks/rev")
        print(f"Scale Factor:         {self.meters_per_tick * 1000:.4f} mm/tick")
        print("=" * 60)

def main():
    rclpy.init()
    node = WheelCalibrationNode()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
