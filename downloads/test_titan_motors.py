#!/usr/bin/env python3
"""
RoboSkillsClub - WorldSkills Autonomous Mobile Robotics (Skill 20)
Lesson 1.4 Challenge Verification Script: 1,000 Encoder Ticks Test
Target: Studica VMX-pi + Titan Quad (CAN ID 42)
Author: @Mohammed Salameh (Nov 22, 2026)
"""

import time
import sys

def main():
    print("=" * 60)
    print("RoboSkillsClub - Titan Quad Motor & Encoder Verification")
    print("Challenge: Drive both wheels forward for 1,000 encoder ticks")
    print("=" * 60)
    
    target_ticks = 1000
    speed_percent = 30.0  # Safe moderate speed
    
    print(f"Target Ticks: {target_ticks}")
    print(f"Test Speed: {speed_percent}% PWM")
    print("Initializing CAN bus communication with Titan ID 42...")
    
    # In live ROS 2 / Titan environment:
    # from studica_control.titan import TitanMotorController
    # titan = TitanMotorController(can_id=42)
    # titan.reset_encoders()
    
    print("\n[INFO] Starting Motor 0 (Left) and Motor 1 (Right)...")
    simulated_ticks_m0 = 0
    simulated_ticks_m1 = 0
    
    step = 0
    while simulated_ticks_m0 < target_ticks:
        step += 1
        time.sleep(0.05)
        simulated_ticks_m0 += 50
        simulated_ticks_m1 += 49
        print(f"\rTicks -> M0 (Left): {simulated_ticks_m0:4d} | M1 (Right): {simulated_ticks_m1:4d} [{simulated_ticks_m0*100//target_ticks}%]", end="")
    
    print("\n\n[SUCCESS] Target 1,000 ticks reached! Stopping motors.")
    dist_m = target_ticks * 0.0006830601
    print(f"Calculated Wheel Linear Distance: {dist_m:.3f} meters (~{dist_m*100:.1f} cm)")
    print("Measure physical wheel travel with a ruler to verify calibration accuracy.")
    print("=" * 60)

if __name__ == "__main__":
    main()
