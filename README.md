# 🤖 RoboSkillsClub — Autonomous Mobile Robotics Training Platform

[![Live Platform](https://img.shields.io/badge/Platform-Live-brightgreen)](https://roboskillsclub.web.app)
[![Hardware](https://img.shields.io/badge/Hardware-Studica%20VMX--pi%20%2B%20Titan%20Quad-orange)](#)
[![ROS 2](https://img.shields.io/badge/ROS%202-Humble%20%2F%20Iron-blueviolet)](#)
[![Lead Author](https://img.shields.io/badge/Lead%20Author-Dr.%20Mohammed%20Salameh-blue)](#)

---

## 📌 Overview
**RoboSkillsClub** ([https://roboskillsclub.web.app](https://roboskillsclub.web.app)) is an online training hub and interactive learning platform dedicated to **Autonomous Mobile Robotics** using **Studica Robotics Kits** as the premier educational and industrial robotics platform.

The platform provides complete hardware breakdowns, wiring schematics, ROS 2 configuration parameters, terminal commands, an interactive 6-tab companion **Robot Dashboard** application, automated student grading, and verifiable **Certificates of Achievement**.

---

## 👨‍🏫 Curriculum Leadership
* **Lead Author & Chief Robotics Scientist:** **Dr. Mohammed Salameh, PhD in Robotics, SLAM and VSLAM**
* **Super Admin Email:** `m.omar82@gmail.com`
* **Focus:** Autonomous Navigation, Simultaneous Localization & Mapping (SLAM), Visual SLAM (VSLAM), and Embedded ROS 2 Control Systems.

---

## 🛠️ Studica Robotics Kit Specifications
* **Brain & Compute:** Studica VMX-pi (Raspberry Pi 4 Model B + real-time FPGA coprocessor + 9-DOF navX-sensor IMU).
* **Actuation:** Titan Quad Controller (4-channel DC motor H-bridge, 20A per channel, 15.6 kHz PWM, SocketCAN interface at 1 Mbps, CAN ID 42).
* **Motors & Encoders:** 2× 12V DC Maverick gear motors (14:1 ratio) with optical quadrature encoders (1,464 ticks/rev).
* **Servos:** Multi-Mode Smart Servos (Standard Mode 0°–300° and Continuous Rotation Mode) connected to High-Current DIO 14/15.
* **Safety System:** Dual-layer Emergency Stop (Hardware 12V battery power cutoff + Flex DIO 11 software halt interlock).
* **Sensors:**
  * 360° 2D RPLiDAR (SLAM navigation).
  * SR Pro USB Camera (Marker / AprilTag vision).
  * Sharp GP2Y0A21YK0F infrared distance sensor (Analog 22, 10–80 cm).
  * HC-SR04 ultrasonic sonar (Flex DIO 8 Ping / DIO 9 Echo, 2–400 cm).
  * Phototransistor contrast light sensor (Analog 23, 0–1023 ADC).

---

## 👥 Role Hierarchy & Approval Workflow
1. **Super Admin (`m.omar82@gmail.com`):**
   * Authenticated via Google/Gmail.
   * Full authority: Create and manage Admins, Teachers, and Students.
   * Create and manage Courses, Modules, and Lessons.
   * Assign students to courses, teachers to courses/students, and admins to oversight.
2. **Admin:**
   * Monitor course creation, student progress, teacher grading, and assignments.
   * Approve pending teacher applications and set their maximum student enrollment quota (`maxStudents`).
   * Approve students who did not select a course with an assigned teacher.
   * Adjust assignment due dates.
3. **Teacher:**
   * Monitor assigned students' achievements.
   * Mark and grade student assignments (assign score 0–100, write feedback).
   * Directly add students to courses (up to their approved quota).
   * Approve students registering for their assigned courses.
   * Edit assignment submission due dates (default: 7 days from lesson completion).
4. **Student:**
   * Register with education details (School vs University, Major, Degree level).
   * Study interactive lessons, copy code, download scripts, and run the Robot Dashboard simulator.
   * Submit assignments before due date.
   * Earn official, verifiable **Certificate of Achievement** signed by Dr. Mohammed Salameh upon 100% course completion.

---

## 📚 Curriculum: Module 1
**Title:** *Robot Hardware Foundations: VMX, Titan & Robot Dashboard*  
**Format:** 8 hands-on lessons (90 minutes each) following `Concept → Wiring → Test in Dashboard → Challenge`.

1. **Lesson 1.1: Meet the VMX and Titan** — Connector blocks, Titan Quad ports, and safety jumpers.
2. **Lesson 1.2: Laptop to Robot Over Ethernet** — Direct RJ45 static networking (`192.168.1.100`), SSH credentials, and ROS 2 environment.
3. **Lesson 1.3: Powering and Linking the Titan** — 12V power distribution, JST-VH harness, SocketCAN 1 Mbps bus, and heartbeat monitoring.
4. **Lesson 1.4: Two DC Motors with Encoders** — Titan M0/M1 wiring, distance-per-tick derivation (0.000683 m/tick), and 1,000-tick calibration test.
5. **Lesson 1.5: Servo Motors and Servo Modes** — Multi-Mode Smart Servos, Standard (0°–300°) vs Continuous mode.
6. **Lesson 1.6: Inputs: Push Button, Limit Switch & E-Stop** — Dual-layer safety interlock, active-low pull-up logic, and software watchdogs.
7. **Lesson 1.7: Outputs: Red and Green Status LEDs** — High-Current DIO 18/19, current-limiting resistors, and robot state machine beacons.
8. **Lesson 1.8: Sensors: Sharp IR, Ultrasonic & Light Sensor** — Optical triangulation vs acoustic time-of-flight benchmark at 30 cm.

---

## 🚀 Quick Start Guide

### 1. Provision Robot Hardware:
```bash
wget https://roboskillsclub.web.app/downloads/setup_studica_robot.sh
chmod +x setup_studica_robot.sh
sudo ./setup_studica_robot.sh
```

### 2. Connect Over Ethernet:
1. Connect Ethernet cable between laptop and VMX controller.
2. Set laptop Ethernet IPv4 address to `192.168.1.50` (Subnet `255.255.255.0`).
3. SSH into robot:
```bash
ssh vmx@192.168.1.100
# Password: studica
```

### 3. Launch Drivers & Dashboard:
```bash
robot-start
```
