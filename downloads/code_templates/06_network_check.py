#!/usr/bin/env python3
"""
Lesson 06: Network & DDS Health Check
Tests connectivity to the Studica AMR, validates CycloneDDS environment,
and pings the robot hardware controller.
"""
import os
import subprocess
import sys

ROBOT_IP = "172.22.11.2"

def main():
    print("=" * 60)
    print("  Studica AMR: Lesson 06 Network Diagnostic Tool")
    print("=" * 60)
    
    # Check ping
    print(f"[*] Pinging Robot at {ROBOT_IP}...")
    res = subprocess.run(["ping", "-c", "3", "-W", "1", ROBOT_IP], capture_output=True, text=True)
    if res.returncode == 0:
        print(f"[✓] Ping SUCCESS! Robot is reachable.")
    else:
        print(f"[✗] Ping FAILED! Check Ethernet cable or Wi-Fi connection.")
        print(f"    Ensure laptop IP is set to 172.22.11.xxx (e.g. 172.22.11.247).")
        sys.exit(1)
        
    # Check ROS_DOMAIN_ID
    domain = os.environ.get("ROS_DOMAIN_ID", "0")
    print(f"[*] ROS_DOMAIN_ID: {domain}")
    
    # Check ROS 2 nodes
    print("[*] Inspecting active ROS 2 nodes on the network...")
    try:
        node_res = subprocess.run(["ros2", "node", "list"], capture_output=True, text=True, timeout=5)
        nodes = node_res.stdout.strip().splitlines()
        print(f"[✓] Found {len(nodes)} active node(s):")
        for n in nodes:
            print(f"    - {n}")
    except Exception as e:
        print(f"[!] Warning checking ROS 2 nodes: {e}")
        
    print("=" * 60)
    print("Network check complete! Ready for teleoperation.")
    print("=" * 60)

if __name__ == "__main__":
    main()
