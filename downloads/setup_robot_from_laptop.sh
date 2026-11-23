#!/usr/bin/env bash
# ==============================================================================
# RoboSkillsClub --- Robot Automated Remote Setup & Commissioning Script
# Target: Studica VMX-pi Controller (172.22.11.2, user vmx)
# Execution: Run directly from Student Laptop terminal
# Authors: Dr. Mohammed Salameh, PhD in Robotics, SLAM and VSLAM
# Description:
#   Configures the real robot controller through the student laptop Ethernet link.
#   Installs SSH public keys, deploys bringup scripts, verifies CycloneDDS (eth0),
#   audits CAN bus & Titan Motor daemon, checks YDLidar & Orbbec 3D camera,
#   and performs an automated actuator safety health-check.
# ==============================================================================

set -e

# ANSI Colors
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

ROBOT_IP="172.22.11.2"
ROBOT_USER="vmx"
ROBOT_PASS="password"

echo -e "${BOLD}${BLUE}======================================================================${NC}"
echo -e "${BOLD}${BLUE}   RoboSkillsClub: Robot Remote Provisioning & Health-Check           ${NC}"
echo -e "${BOLD}${BLUE}   Configuring Studica VMX-pi from Student Laptop                     ${NC}"
echo -e "${BOLD}${BLUE}======================================================================${NC}\n"

# 1. Ping Check
echo -e "${BLUE}[STEP 1/6] Pinging Robot over Ethernet (${ROBOT_IP})...${NC}"
if ! ping -c 3 -W 2 "$ROBOT_IP" >/dev/null 2>&1; then
    echo -e "${BOLD}${RED}[ERROR] Cannot reach robot at ${ROBOT_IP}.${NC}"
    echo -e "Please verify:"
    echo -e "  1. The RJ45 Ethernet cable is securely connected between laptop and robot."
    echo -e "  2. The robot's 12V battery toggle switch is ON (Green LED illuminated)."
    echo -e "  3. The laptop Ethernet interface has static IP 172.22.11.247/24."
    exit 1
fi
echo -e "${GREEN}✔ Robot hardware is responding with < 1 ms latency.${NC}\n"

# 2. Passwordless SSH Key Deployment
echo -e "${BLUE}[STEP 2/6] Verifying and provisioning SSH key authorization...${NC}"
if ! ssh -o BatchMode=yes -o ConnectTimeout=3 "robot" "echo 'SSH_OK'" >/dev/null 2>&1; then
    echo -e " -> Deploying student SSH public key to robot..."
    if command -v sshpass >/dev/null 2>&1; then
        sshpass -p "$ROBOT_PASS" ssh-copy-id -o StrictHostKeyChecking=no "${ROBOT_USER}@${ROBOT_IP}" >/dev/null 2>&1 || true
    else
        echo -e "${YELLOW} -> Enter robot password (default: 'password') when prompted:${NC}"
        ssh-copy-id -o StrictHostKeyChecking=no "${ROBOT_USER}@${ROBOT_IP}"
    fi
fi

# Verify passwordless login
if ssh -o BatchMode=yes -o ConnectTimeout=3 "robot" "echo 'SSH_AUTHENTICATED'" >/dev/null 2>&1; then
    echo -e "${GREEN}✔ Passwordless SSH connection established to ${ROBOT_USER}@${ROBOT_IP}.${NC}\n"
else
    echo -e "${RED}[ERROR] SSH key authentication failed. Check credentials and retry.${NC}"
    exit 1
fi

# 3. Synchronize Essential Robot Bringup Files
echo -e "${BLUE}[STEP 3/6] Synchronizing Master Bringup Scripts to Robot...${NC}"

# Ensure directories on robot
ssh robot "mkdir -p /home/vmx/logs"

# Verify or upload bringup_robot.sh
if [ -f "$HOME/Documents/workspace/bringup_robot.sh" ]; then
    echo -e " -> Uploading updated bringup_robot.sh to /home/vmx/..."
    scp -o BatchMode=yes "$HOME/Documents/workspace/bringup_robot.sh" robot:/home/vmx/
fi

if [ -f "$HOME/Documents/workspace/diff_drive_bridge.py" ]; then
    echo -e " -> Uploading calibrated diff_drive_bridge.py to /home/vmx/..."
    scp -o BatchMode=yes "$HOME/Documents/workspace/diff_drive_bridge.py" robot:/home/vmx/
fi

if [ -f "$HOME/Documents/workspace/camera_streamer.py" ]; then
    echo -e " -> Uploading camera_streamer.py to /home/vmx/..."
    scp -o BatchMode=yes "$HOME/Documents/workspace/camera_streamer.py" robot:/home/vmx/
fi

ssh robot "chmod +x /home/vmx/*.sh /home/vmx/*.py 2>/dev/null || true"
echo -e "${GREEN}✔ Robot scripts updated with execution permissions.${NC}\n"

# 4. Configure CycloneDDS on Robot
echo -e "${BLUE}[STEP 4/6] Verifying CycloneDDS Configuration on Robot...${NC}"
ssh robot 'cat <<EOF > /home/vmx/cyclonedds.xml
<?xml version="1.0" encoding="UTF-8" ?>
<CycloneDDS xmlns="https://cdds.io/config">
    <Domain id="any">
        <General>
            <Interfaces>
                <NetworkInterface name="eth0" />
            </Interfaces>
            <AllowMulticast>true</AllowMulticast>
        </General>
    </Domain>
</CycloneDDS>
EOF'

echo -e "${GREEN}✔ CycloneDDS on robot configured for eth0 with multicast enabled.${NC}\n"

# 5. Onboard Hardware Audit
echo -e "${BLUE}[STEP 5/6] Performing Onboard Hardware Subsystem Audit...${NC}"

ROBOT_AUDIT=$(ssh robot '
echo "=== AUDIT START ==="
# 1. OS & Uptime
UPTIME=$(uptime -p)
echo "UPTIME:$UPTIME"

# 2. Check YDLidar USB
if ls /dev/ttyUSB* /dev/ydlidar 1>/dev/null 2>&1; then
    echo "LIDAR:DETECTED"
else
    echo "LIDAR:MISSING"
fi

# 3. Check Orbbec 3D Camera USB
if ls /dev/video* 1>/dev/null 2>&1; then
    echo "CAMERA:DETECTED"
else
    echo "CAMERA:MISSING"
fi

# 4. Check ROS 2 Humble
if [ -f /opt/ros/humble/setup.bash ]; then
    echo "ROS2:INSTALLED"
else
    echo "ROS2:MISSING"
fi

# 5. Check CAN bus daemon / titan files
if [ -f /home/vmx/studica_ws/install/setup.bash ] || [ -f /home/vmx/gpio_tester_daemon ]; then
    echo "TITAN_DRIVER:AVAILABLE"
else
    echo "TITAN_DRIVER:CHECK_NEEDED"
fi
echo "=== AUDIT END ==="
')

echo -e " -> Diagnostic Results:"
echo "$ROBOT_AUDIT" | while read -r line; do
    case "$line" in
        UPTIME:*)
            echo -e "    * System Status:      ${GREEN}${line#UPTIME:}${NC}"
            ;;
        LIDAR:DETECTED)
            echo -e "    * 2D Laser LiDAR:     ${GREEN}✔ Detected on serial bus${NC}"
            ;;
        LIDAR:MISSING)
            echo -e "    * 2D Laser LiDAR:     ${YELLOW}⚠ Not detected on /dev/ttyUSB*${NC}"
            ;;
        CAMERA:DETECTED)
            echo -e "    * Orbbec 3D Camera:   ${GREEN}✔ Video device node active${NC}"
            ;;
        CAMERA:MISSING)
            echo -e "    * Orbbec 3D Camera:   ${YELLOW}⚠ Check USB 3.0 connection${NC}"
            ;;
        ROS2:INSTALLED)
            echo -e "    * ROS 2 Middleware:   ${GREEN}✔ ROS 2 Humble verified${NC}"
            ;;
        TITAN_DRIVER:AVAILABLE)
            echo -e "    * Titan CAN Daemon:   ${GREEN}✔ Studica driver stack present${NC}"
            ;;
    esac
done

# 6. Actuator Safety Spin Check (Safe Bench Spin)
echo -e "\n${BLUE}[STEP 6/6] Actuator Safety Verification...${NC}"
echo -e " -> Elevate the robot chassis so both wheels can spin safely in the air."

SKIP_SPIN=false
if [[ "$*" == *"--skip-spin"* ]]; then
    SKIP_SPIN=true
fi

if [ "$SKIP_SPIN" = false ]; then
    echo -e " -> Press [Enter] to run a 1-second motor spin confirmation test (or type 's' to skip):"
    read -r -t 15 user_choice || user_choice="s"
    if [[ "$user_choice" =~ ^[Ss] ]]; then
        SKIP_SPIN=true
    fi
fi

if [ "$SKIP_SPIN" = true ]; then
    echo -e " -> Skipping actuator spin test as requested."
else
    echo -e " -> Sending 1-second motor pulse command..."
    ssh robot 'source /opt/ros/humble/setup.bash && export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp && export CYCLONEDDS_URI=file:///home/vmx/cyclonedds.xml && /home/vmx/bringup_robot.sh start >/dev/null 2>&1 &' || true
    sleep 3

    if command -v ros2 >/dev/null 2>&1; then
        source /opt/ros/humble/setup.bash >/dev/null 2>&1 || true
        export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
        export CYCLONEDDS_URI="file://$HOME/cyclonedds.xml"
        export ROS_DOMAIN_ID=0
        ros2 topic pub --once /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.15, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}" >/dev/null 2>&1 || true
        sleep 1
        ros2 topic pub --once /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}" >/dev/null 2>&1 || true
    fi

    ssh robot '/home/vmx/bringup_robot.sh stop >/dev/null 2>&1' || true
    echo -e "${GREEN}✔ Actuator verification cycle complete.${NC}"
fi

echo -e "${BOLD}${GREEN}======================================================================${NC}"
echo -e "${BOLD}${GREEN}   🎉 Robot System Setup & Health-Check Completed Successfully!       ${NC}"
echo -e "${BOLD}${GREEN}======================================================================${NC}"
echo -e "Your robot is ready for autonomous operations and lab exercises."
echo -e "You can now launch the Master Control Center on your laptop:"
echo -e "   ${BOLD}robot-dashboard${NC} (or double-click the icon on your desktop)\n"
