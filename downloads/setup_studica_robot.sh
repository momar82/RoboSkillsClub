#!/usr/bin/env bash
# ==============================================================================
# RoboSkillsClub - WorldSkills Autonomous Mobile Robotics (Skill 20)
# Studica Robotics Kit: VMX-pi Controller & Titan Quad Environment Setup
# Target Hardware: Raspberry Pi 4 Model B (4GB/8GB) with VMX-pi Hat
# Target OS: Ubuntu 22.04 LTS (Jammy) + ROS 2 Humble Hawksbill
# Author: @Mohammed Salameh (Published Nov 22, 2026)
# GitHub: https://github.com/momar82/RoboSkillsClub
# ==============================================================================

set -e

# ANSI Color codes for clean terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}===================================================================${NC}"
echo -e "${CYAN}   ____       _           ____  _     _ _       ____ _       _     ${NC}"
echo -e "${CYAN}  |  _ \ ___ | |__   ___ / ___|| | __(_) |___  / ___| |_   _| |__  ${NC}"
echo -e "${CYAN}  | |_) / _ \| '_ \ / _ \\___ \| |/ /| | / __|| |   | | | | | '_ \ ${NC}"
echo -e "${CYAN}  |  _ < (_) | |_) | (_) |___) |   < | | \__ \| |___| | |_| | |_) |${NC}"
echo -e "${CYAN}  |_| \_\___/|_.__/ \___/|____/|_|\_\|_|_|___/ \____|_|\__,_|_.__/ ${NC}"
echo -e "${BLUE}===================================================================${NC}"
echo -e "${YELLOW}   WorldSkills AMR Skill 20 - Studica VMX & Titan Provisioning     ${NC}"
echo -e "${BLUE}===================================================================${NC}"

# Check for root / sudo
if [ "$EUID" -ne 0 ]; then
  echo -e "${YELLOW}[INFO] Re-running script with sudo privileges...${NC}"
  exec sudo bash "$0" "$@"
fi

CURRENT_USER=${SUDO_USER:-$USER}
USER_HOME=$(getent passwd "$CURRENT_USER" | cut -d: -f6)
ROS_DISTRO="humble"
WS_DIR="$USER_HOME/ros2_ws"

echo -e "\n${GREEN}[1/8] Updating package index and installing base dependencies...${NC}"
apt-get update -y
apt-get install -y \
  curl \
  wget \
  git \
  build-essential \
  python3-pip \
  python3-colcon-common-extensions \
  python3-rosdep \
  python3-vcstool \
  can-utils \
  net-tools \
  ethtool \
  i2c-tools \
  libusb-1.0-0-dev \
  v4l-utils

echo -e "\n${GREEN}[2/8] Verifying ROS 2 ($ROS_DISTRO) environment...${NC}"
if [ ! -f "/opt/ros/$ROS_DISTRO/setup.bash" ]; then
  echo -e "${YELLOW}[WARN] ROS 2 $ROS_DISTRO not detected in /opt/ros/$ROS_DISTRO.${NC}"
  echo -e "Adding official ROS 2 apt repository..."
  curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | tee /etc/apt/sources.list.d/ros2.list > /dev/null
  apt-get update -y
  apt-get install -y ros-$ROS_DISTRO-ros-base ros-$ROS_DISTRO-teleop-twist-keyboard ros-$ROS_DISTRO-image-transport ros-$ROS_DISTRO-cv-bridge
fi

echo -e "\n${GREEN}[3/8] Configuring SocketCAN Interface for Titan Quad Controller...${NC}"
# Enable CAN overlay in config.txt if present (Raspberry Pi OS / Ubuntu ARM)
RPI_CONFIG=""
if [ -f "/boot/firmware/config.txt" ]; then
  RPI_CONFIG="/boot/firmware/config.txt"
elif [ -f "/boot/config.txt" ]; then
  RPI_CONFIG="/boot/config.txt"
fi

if [ -n "$RPI_CONFIG" ]; then
  echo -e "Ensuring SPI and CAN overlays are enabled in $RPI_CONFIG..."
  if ! grep -q "dtoverlay=mcp2515-can0" "$RPI_CONFIG"; then
    echo "dtparam=spi=on" >> "$RPI_CONFIG"
    echo "dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25" >> "$RPI_CONFIG"
  fi
fi

# Create systemd network interface for can0
cat << 'EOF' > /etc/network/interfaces.d/can0
auto can0
iface can0 can static
    bitrate 1000000
    up /sbin/ip link set $IFACE txqueuelen 1000
EOF

# Also create a systemd service fallback for can0 link
cat << 'EOF' > /etc/systemd/system/can0-setup.service
[Unit]
Description=Setup CAN0 interface for Titan Quad Controller
After=network.target

[Service]
Type=oneshot
ExecStart=/sbin/ip link set can0 up type can bitrate 1000000
ExecStartPost=/sbin/ip link set can0 txqueuelen 1000
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable can0-setup.service || true

echo -e "\n${GREEN}[4/8] Setting up udev rules for VMX USB, RPLiDAR, and SR Pro Camera...${NC}"
cat << 'EOF' > /etc/udev/rules.d/99-studica-robotics.rules
# VMX-pi Serial communication and USB interfaces
SUBSYSTEM=="tty", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", MODE="0666", SYMLINK+="vmx_serial"
SUBSYSTEM=="tty", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="ea60", MODE="0666", SYMLINK+="rplidar"

# Video Camera devices (SR Pro Camera)
KERNEL=="video*", MODE="0666", GROUP="video"

# Titan USB-to-CAN bridge / Apollo manager
SUBSYSTEM=="usb", ATTRS{idVendor}=="1209", MODE="0666"
EOF
udevadm control --reload-rules && udevadm trigger || true

echo -e "\n${GREEN}[5/8] Creating ROS 2 Workspace & Studica Control package structure...${NC}"
sudo -u "$CURRENT_USER" mkdir -p "$WS_DIR/src/studica_control/config"
sudo -u "$CURRENT_USER" mkdir -p "$WS_DIR/src/studica_control/launch"
sudo -u "$CURRENT_USER" mkdir -p "$WS_DIR/src/studica_control/scripts"

# Copy or download default params.yaml if not present
PARAMS_FILE="$WS_DIR/src/studica_control/config/params.yaml"
if [ ! -f "$PARAMS_FILE" ]; then
  echo -e "Writing default RoboSkillsClub params.yaml..."
  curl -sSL "https://raw.githubusercontent.com/momar82/RoboSkillsClub/main/downloads/params.yaml" -o "$PARAMS_FILE" 2>/dev/null || cat << 'EOF' > "$PARAMS_FILE"
control_server:
  ros__parameters:
    titan:
      enabled: true
      sensors: ["drive_base"]
      drive_base:
        can_id: 42
        motor_freq: 15600
        m_0: { name: "left_wheel", encoder_mode: "quadrature", dist_per_tick: 0.0006830601, inverted: false }
        m_1: { name: "right_wheel", encoder_mode: "quadrature", dist_per_tick: 0.0006830601, inverted: true }
    imu:
      enabled: true
      name: "navx_imu"
      frame_id: "imu_link"
    dio:
      enabled: true
      inputs:
        estop: { port: 11, active_low: true }
        button: { port: 10, active_low: true }
      outputs:
        led_red: { port: 18, initial_state: false }
        led_green: { port: 19, initial_state: true }
    ultrasonic:
      enabled: true
      sensors: ["front_sonar"]
      front_sonar: { ping: 8, echo: 9, frame_id: "front_sonar_link" }
    servo:
      enabled: true
      sensors: ["gripper"]
      gripper: { port: 14, type: "standard", default_angle: 45.0 }
EOF
  chown -R "$CURRENT_USER:$CURRENT_USER" "$WS_DIR"
fi

echo -e "\n${GREEN}[6/8] Configuring Static Ethernet & Wi-Fi Hotspot for Robot Dashboard...${NC}"
# Configure eth0 static fallback IP: 192.168.1.100 / 24 so students can always connect directly
ETH_IFACE=$(ip -o link show | awk -F': ' '{print $2}' | grep -E '^eth|^en' | head -n1 || echo "eth0")
if [ -n "$ETH_IFACE" ]; then
  echo "Setting up network manager alias for $ETH_IFACE (192.168.1.100/24)..."
  if command -v nmcli &> /dev/null; then
    nmcli con add type ethernet con-name "Studica-Ethernet" ifname "$ETH_IFACE" ip4 192.168.1.100/24 gw4 192.168.1.1 2>/dev/null || true
  fi
fi

echo -e "\n${GREEN}[7/8] Installing helpful Studica Robotics bash aliases for students...${NC}"
BASHRC="$USER_HOME/.bashrc"
if ! grep -q "ROBOSKILLS_ALIASES" "$BASHRC"; then
  cat << 'EOF' >> "$BASHRC"

# >>> RoboSkillsClub Studica Aliases (Skill 20) >>>
export ROBOSKILLS_ALIASES=true
source /opt/ros/humble/setup.bash 2>/dev/null || true
[ -f ~/ros2_ws/install/setup.bash ] && source ~/ros2_ws/install/setup.bash

alias robot-start="ros2 launch studica_control control.launch.py"
alias robot-stop="killall -9 ros2 2>/dev/null; echo 'Robot nodes terminated.'"
alias robot-status="ros2 node list; echo '--- ROS 2 Topics ---'; ros2 topic list"
alias robot-teleop="ros2 run teleop_twist_keyboard teleop_twist_keyboard"
alias robot-params="nano ~/ros2_ws/src/studica_control/config/params.yaml"
alias titan-check="candump can0 -n 10"
alias vmx-reboot="sudo systemctl restart studica-robot"
# <<< RoboSkillsClub Studica Aliases <<<
EOF
fi

echo -e "\n${GREEN}[8/8] Permissions and environment finalization...${NC}"
usermod -aG dialout,video,i2c "$CURRENT_USER" || true

echo -e "\n${CYAN}===================================================================${NC}"
echo -e "${GREEN}✔ RoboSkillsClub Studica VMX-pi & Titan Setup Complete!${NC}"
echo -e "${CYAN}===================================================================${NC}"
echo -e "Next steps for students & coaches:"
echo -e "  1. Connect your laptop to the VMX Ethernet port."
echo -e "  2. Open Robot Dashboard on your laptop."
echo -e "  3. Ping robot: ${YELLOW}ping 192.168.1.100${NC} (or your DHCP IP)."
echo -e "  4. SSH login:  ${YELLOW}ssh vmx@192.168.1.100${NC} (Password: ${YELLOW}studica${NC})"
echo -e "  5. Launch drivers: ${GREEN}robot-start${NC}"
echo -e "${BLUE}===================================================================${NC}"
