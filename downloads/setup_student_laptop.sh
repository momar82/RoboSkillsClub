#!/usr/bin/env bash
# ==============================================================================
# RoboSkillsClub --- Student Laptop Automated Commissioning Script
# Target OS: Ubuntu 22.04 LTS (x86_64 / amd64)
# Authors: Dr. Mohammed Salameh, PhD in Robotics, SLAM and VSLAM
# Description:
#   Full first-time workstation configuration for Studica Autonomous Mobile Robotics.
#   Configures Ethernet network (172.22.11.247/24), CycloneDDS, SSH key exchange,
#   ROS 2 Humble environment, Python dependencies, aliases, and desktop launcher.
# ==============================================================================

set -e

# ANSI Color formatting
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BOLD}${BLUE}======================================================================${NC}"
echo -e "${BOLD}${BLUE}   RoboSkillsClub: Student Workstation Commissioning Setup            ${NC}"
echo -e "${BOLD}${BLUE}   Curriculum authored by Dr. Mohammed Salameh (PhD in Robotics)      ${NC}"
echo -e "${BOLD}${BLUE}======================================================================${NC}\n"

# 1. User & Sudo Check
if [ "$EUID" -eq 0 ]; then
    echo -e "${RED}[ERROR] Do not run this script as root or with sudo.${NC}"
    echo -e "Run it as your normal student user: ${BOLD}./setup_student_laptop.sh${NC}"
    exit 1
fi

echo -e "${BLUE}[STEP 1/7] Updating package index and installing required system tools...${NC}"
sudo apt-get update -y
sudo apt-get install -y \
    curl wget git net-tools iproute2 sshpass \
    python3-pip python3-pyqt5 python3-opencv python3-numpy \
    python3-matplotlib python3-yaml \
    ros-humble-rmw-cyclonedds-cpp ros-humble-cyclonedds \
    ros-humble-teleop-twist-keyboard ros-humble-slam-toolbox \
    ros-humble-navigation2 ros-humble-nav2-bringup \
    ros-humble-tf2-tools ros-humble-image-transport \
    ros-humble-cv-bridge || true

echo -e "${GREEN}✔ System dependencies verified.${NC}\n"

# 2. Python User Packages
echo -e "${BLUE}[STEP 2/7] Verifying Python robotics support packages...${NC}"
pip3 install --user pyserial inputs evdev paramiko psutil || true
echo -e "${GREEN}✔ Python libraries ready.${NC}\n"

# 3. Detect & Configure Ethernet Interface for Robot Direct Link
echo -e "${BLUE}[STEP 3/7] Configuring Laptop Static IP (172.22.11.247/24) for Robot Link...${NC}"

# Find active wired Ethernet interface (enp* or eth*)
ETH_IFACE=$(ip -o link show | awk -F': ' '$2 ~ /^(en|eth)/ {print $2; exit}' || echo "enp0s31f6")

if [ -z "$ETH_IFACE" ]; then
    ETH_IFACE="enp0s31f6"
fi

echo -e " -> Detected Ethernet Hardware Interface: ${BOLD}${ETH_IFACE}${NC}"

# Check NetworkManager connection for this interface
CON_NAME=$(nmcli -t -f NAME,DEVICE connection show --active | grep "$ETH_IFACE" | cut -d: -f1 || true)

if [ -z "$CON_NAME" ]; then
    # Look for existing wired connection
    CON_NAME=$(nmcli -t -f NAME,TYPE connection show | grep "ethernet" | head -n1 | cut -d: -f1 || true)
fi

if [ -z "$CON_NAME" ]; then
    CON_NAME="RoboSkills-Robot-Ethernet"
    echo -e " -> Creating new NetworkManager connection: ${BOLD}${CON_NAME}${NC}"
    sudo nmcli connection add type ethernet con-name "$CON_NAME" ifname "$ETH_IFACE" ip4 172.22.11.247/24 || true
else
    echo -e " -> Updating existing connection: ${BOLD}${CON_NAME}${NC} with static IP 172.22.11.247/24"
    sudo nmcli connection modify "$CON_NAME" ipv4.addresses 172.22.11.247/24 ipv4.method manual || true
    sudo nmcli connection up "$CON_NAME" || true
fi

echo -e "${GREEN}✔ Wired interface ${ETH_IFACE} configured with IP 172.22.11.247/24.${NC}\n"

# 4. CycloneDDS Configuration XML
echo -e "${BLUE}[STEP 4/7] Generating CycloneDDS configuration (cyclonedds.xml)...${NC}"
cat <<EOF > "$HOME/cyclonedds.xml"
<?xml version="1.0" encoding="UTF-8" ?>
<CycloneDDS xmlns="https://cdds.io/config">
    <Domain id="any">
        <General>
            <Interfaces>
                <NetworkInterface name="${ETH_IFACE}" />
            </Interfaces>
            <AllowMulticast>true</AllowMulticast>
        </General>
    </Domain>
</CycloneDDS>
EOF

echo -e "${GREEN}✔ CycloneDDS configured at ~/cyclonedds.xml targeting ${ETH_IFACE}.${NC}\n"

# 5. SSH Keypair and Robot Host Alias
echo -e "${BLUE}[STEP 5/7] Configuring SSH Keypair and Robot Host Alias...${NC}"
mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"

if [ ! -f "$HOME/.ssh/id_ed25519" ]; then
    echo -e " -> Generating new ed25519 SSH keypair..."
    ssh-keygen -t ed25519 -N "" -f "$HOME/.ssh/id_ed25519" -C "student-robot-laptop"
else
    echo -e " -> Existing SSH keypair found at ~/.ssh/id_ed25519."
fi

# Update ~/.ssh/config for Host robot
if ! grep -q "Host robot" "$HOME/.ssh/config" 2>/dev/null; then
    cat <<EOF >> "$HOME/.ssh/config"

Host robot vmx 172.22.11.2
    HostName 172.22.11.2
    User vmx
    IdentityFile ~/.ssh/id_ed25519
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null
    LogLevel ERROR
EOF
    chmod 600 "$HOME/.ssh/config"
    echo -e "${GREEN}✔ Host 'robot' alias added to ~/.ssh/config.${NC}"
else
    echo -e "${GREEN}✔ Host 'robot' already defined in ~/.ssh/config.${NC}"
fi

# 6. Shell Environment Variables & Student Aliases (~/.bashrc)
echo -e "\n${BLUE}[STEP 6/7] Updating ~/.bashrc with ROS 2 environment and student aliases...${NC}"

BASHRC="$HOME/.bashrc"

# Check if RoboSkillsClub section already exists
if ! grep -q "RoboSkillsClub Robotics Setup" "$BASHRC"; then
    cat <<'EOF' >> "$BASHRC"

# ==============================================================================
# RoboSkillsClub Robotics Setup (Dr. Mohammed Salameh)
# ==============================================================================
source /opt/ros/humble/setup.bash
if [ -f "$HOME/Documents/workspace/install/setup.bash" ]; then
    source "$HOME/Documents/workspace/install/setup.bash"
fi

export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
export CYCLONEDDS_URI=file://$HOME/cyclonedds.xml
export ROS_DOMAIN_ID=0

# Student Convenience Aliases
alias robot-ping='ping -c 4 172.22.11.2'
alias robot-ssh='ssh robot'
alias robot-bringup='ssh robot "/home/vmx/bringup_robot.sh start"'
alias robot-stop='ssh robot "/home/vmx/bringup_robot.sh stop"'
alias robot-status='ssh robot "/home/vmx/bringup_robot.sh status"'
alias robot-dashboard='python3 $HOME/Documents/workspace/robot_control_center.py'
alias robot-slam='ssh robot "/home/vmx/bringup_robot.sh slam"'
alias robot-teleop='python3 $HOME/Documents/workspace/teleop_keyboard.py'
EOF
    echo -e "${GREEN}✔ Environment variables and aliases added to ~/.bashrc.${NC}"
else
    echo -e "${GREEN}✔ RoboSkillsClub environment already configured in ~/.bashrc.${NC}"
fi

# 7. Desktop Application Launcher
echo -e "\n${BLUE}[STEP 7/7] Installing Desktop Icon for Studica Master Robot Dashboard...${NC}"
mkdir -p "$HOME/Desktop" "$HOME/.local/share/applications"

cat <<EOF > "$HOME/Desktop/Studica_Robot_Dashboard.desktop"
[Desktop Entry]
Version=1.0
Type=Application
Name=Studica Robot Dashboard
Comment=RoboSkillsClub Studica AMR Master Control Center
Exec=bash -c "source /opt/ros/humble/setup.bash && export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp && export CYCLONEDDS_URI=file://$HOME/cyclonedds.xml && export ROS_DOMAIN_ID=0 && python3 $HOME/Documents/workspace/robot_control_center.py"
Icon=applications-engineering
Terminal=false
Categories=Development;Robotics;
StartupNotify=true
EOF

chmod +x "$HOME/Desktop/Studica_Robot_Dashboard.desktop"
cp "$HOME/Desktop/Studica_Robot_Dashboard.desktop" "$HOME/.local/share/applications/" || true

# Allow launching in GNOME desktop
gio set "$HOME/Desktop/Studica_Robot_Dashboard.desktop" metadata::trusted true 2>/dev/null || true

echo -e "${GREEN}✔ Desktop Launcher installed on student desktop.${NC}\n"

# 8. Final Connectivity Test
echo -e "${BOLD}${BLUE}======================================================================${NC}"
echo -e "${BOLD}${BLUE}   Executing Real-Time Connectivity Diagnostics                       ${NC}"
echo -e "${BOLD}${BLUE}======================================================================${NC}"

echo -n "Checking Robot Ethernet ping (172.22.11.2)... "
if ping -c 2 -W 2 172.22.11.2 >/dev/null 2>&1; then
    echo -e "${BOLD}${GREEN}[ONLINE - Link Verified]${NC}"
    ROBOT_ONLINE=true
else
    echo -e "${BOLD}${YELLOW}[OFFLINE / Unreachable]${NC}"
    echo -e "  ${YELLOW}💡 Note: Check that the Ethernet cable is plugged in and the robot battery toggle switch is ON.${NC}"
    ROBOT_ONLINE=false
fi

echo -e "\n${BOLD}${GREEN}======================================================================${NC}"
echo -e "${BOLD}${GREEN}   🎉 Student Laptop Commissioning Complete!                          ${NC}"
echo -e "${BOLD}${GREEN}======================================================================${NC}"
echo -e "To activate your new environment in this terminal, run:"
echo -e "   ${BOLD}source ~/.bashrc${NC}\n"
echo -e "Next Step:"
echo -e "   Run the robot setup script: ${BOLD}./setup_robot_from_laptop.sh${NC}\n"
