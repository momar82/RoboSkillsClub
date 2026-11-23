/**
 * RoboSkillsClub — Autonomous Mobile Robotics Training Platform
 * Powered by Studica Robotics Kits (VMX-pi & Titan Quad Controller)
 * Author: Dr. Mohammed Salameh, PhD in Robotics, SLAM and VSLAM
 */

// =============================================================================
// 1. Firebase Configuration & Initialization
// =============================================================================
const firebaseConfig = {
  projectId: "roboskillsclub",
  appId: "1:64704218458:web:cfc80b2fbbfe47991d9f63",
  storageBucket: "roboskillsclub.firebasestorage.app",
  apiKey: "AIzaSyCbbArr_y_zxqXBL-2AgE03hAppnWMg32o",
  authDomain: "roboskillsclub.firebaseapp.com",
  messagingSenderId: "64704218458",
  projectNumber: "64704218458"
};

let db = null;
let auth = null;
let isFirebaseOnline = false;

try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    isFirebaseOnline = true;
    console.log("✔ Firebase initialized for RoboSkillsClub");
  }
} catch (e) {
  console.warn("Firebase initialization notice:", e.message);
}

// Super Admin Email
const SUPER_ADMIN_EMAIL = "m.omar82@gmail.com";
const LEAD_AUTHOR = "Dr. Mohammed Salameh, PhD in Robotics, SLAM and VSLAM";

// =============================================================================
// 2. Comprehensive Course & Curriculum Hierarchy
// =============================================================================
const DEFAULT_COURSES = [
  {
    id: "course-amr-101",
    title: "Autonomous Mobile Robotics Foundations",
    shortCode: "AMR-101",
    description: "Comprehensive hands-on training for the Studica VMX-pi controller, Titan Quad motor driver, ROS 2 parameters, and 6-tab companion Robot Dashboard.",
    author: LEAD_AUTHOR,
    assignedTeacherId: "teacher_sarah",
    assignedTeacherName: "Prof. Sarah Jenkins",
    modules: [
      {
        id: "module-1",
        number: 1,
        title: "Module 1: Robot Hardware Foundations: VMX, Titan & Robot Dashboard",
        lessons: [
          {
            id: "lesson-1-1",
            number: "1.1",
            title: "Meet the VMX and Titan",
            duration: "90 min",
            youtubeId: "5o3fFr_gkEA",
            concept: `
              <h3>1. Architectural Overview: Brain & Muscle</h3>
              <p>In autonomous mobile robotics, the <strong>Studica VMX Controller</strong> serves as the robot's high-level brain, while the <strong>Titan Quad Controller</strong> provides the heavy-current muscular actuation.</p>
              <p>The VMX integrates a <strong>Raspberry Pi 4 Model B</strong> (running Ubuntu Linux and ROS 2) coupled with an onboard real-time FPGA and a 9-axis <strong>navX Inertial Measurement Unit (IMU)</strong>. The Titan Quad is a 4-channel closed-loop H-bridge motor driver communicating with the VMX over an industrial <strong>Controller Area Network (CAN bus)</strong> operating at 1 Mbps.</p>

              <h3>2. Connector Blocks & Pin Mapping</h3>
              <table class="pinout-table">
                <thead>
                  <tr><th>Port Group</th><th>Channel Range</th><th>Voltage / Logic</th><th>Primary Robotic Function</th></tr>
                </thead>
                <tbody>
                  <tr><td><code>Flex DIO</code></td><td>DIO 8 – 11</td><td>5V / 3.3V selectable</td><td>High-speed quadrature encoders, Ultrasonic ping/echo, E-Stop monitoring, push buttons</td></tr>
                  <tr><td><code>High-Current DIO</code></td><td>DIO 12 – 21</td><td>5V / 3.3V (Up to 2A total)</td><td>Multi-Mode Smart Servos, status indicator LEDs, limit switches</td></tr>
                  <tr><td><code>Analog Inputs</code></td><td>Analog 22 – 25</td><td>0 – 5V (12-bit ADC)</td><td>Sharp GP2Y0A21YK0F infrared distance sensors, light line sensors</td></tr>
                  <tr><td><code>JST GH I2C/SPI</code></td><td>Channels 0 – 7</td><td>3.3V</td><td>Auxiliary sensors, ToF ranging sensors, external OLED displays</td></tr>
                  <tr><td><code>CAN Weidmuller</code></td><td>CAN_H / CAN_L</td><td>1 Mbps Differential</td><td>High-speed bus link to Titan Quad Controller (CAN ID 42)</td></tr>
                  <tr><td><code>RPi 4 Ports</code></td><td>USB 3.0 & Gigabit Ethernet</td><td>5V USB / 1000Base-T</td><td>Ethernet programming link to laptop, RPLiDAR 2D scanner, SR Pro USB camera</td></tr>
                </tbody>
              </table>

              <h3>3. Essential Hardware Jumpers</h3>
              <div class="callout amber">
                <div class="callout-title">⚠️ Critical Jumper Safety Configuration:</div>
                <div class="callout-body">
                  <ul>
                    <li><strong>High-Current DIO Direction Jumper:</strong> Configures High-Current DIO 12–21 as either ALL INPUTS or ALL OUTPUTS. Never drive active output signals into pins configured as outputs!</li>
                    <li><strong>Flex DIO Voltage Jumper:</strong> Selects between 3.3V and 5.0V pull-up rail. Studica sensors and encoders require the 5.0V setting.</li>
                    <li><strong>CAN Termination Jumper:</strong> 120Ω bus terminating resistor must be enabled on the last physical node (Titan Quad).</li>
                  </ul>
                </div>
              </div>
            `,
            wiring: `
              <h3>Wiring Verification Checklist</h3>
              <ol>
                <li>Inspect VMX-pi flex connector ribbon cable seated securely into the Raspberry Pi 4 GPIO header.</li>
                <li>Verify the Flex DIO voltage selector jumper is firmly positioned on <strong>5V</strong>.</li>
                <li>Verify the Titan Quad 120-ohm terminating resistor switch is set to <strong>ON</strong>.</li>
                <li>Inspect Weidmuller screwless CAN terminals: Green wire = <strong>CAN_L</strong>, Yellow wire = <strong>CAN_H</strong>.</li>
              </ol>
            `,
            test: `
              <h3>Dashboard Verification Steps (Tab 1)</h3>
              <p>1. Open Robot Dashboard on your laptop.</p>
              <p>2. Navigate to <strong>Tab 1 (Connection)</strong>.</p>
              <p>3. Confirm that the VMX power LED (Blue) and navX IMU indicator (Green) are illuminated solid.</p>
            `,
            challenge: `
              <h3>Challenge 1.1: Hardware Port & Pinout Identification</h3>
              <p>Review the VMX and Titan schematics. In the submission desk below, correctly pair each of the following 8 components with its exact physical connector port and explain why:</p>
              <ol>
                <li>Maverick DC Motor Left</li>
                <li>Maverick DC Motor Right</li>
                <li>Left Wheel Optical Encoder</li>
                <li>Multi-Mode Smart Servo Gripper</li>
                <li>Emergency E-Stop Auxiliary Signal</li>
                <li>Autonomous Start Push Button</li>
                <li>Sharp Infrared Distance Sensor</li>
                <li>HC-SR04 Ultrasonic Trigger Pulse</li>
              </ol>
            `,
            codeSnippet: `# Verify VMX FPGA and communication over SPI in terminal:
ls -l /dev/vmx*
vmx-pi-test --info

# Output confirms:
# Hardware Model: Studica VMX-pi Revision B
# navX IMU: Present (Firmware v3.1.4)
# FPGA Core Clock: 50.00 MHz`,
            githubLink: "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/params.yaml",
            downloads: [
              { name: "setup_studica_robot.sh", url: "downloads/setup_studica_robot.sh", label: "Robot Provisioning Script (.sh)" },
              { name: "params.yaml", url: "downloads/params.yaml", label: "ROS 2 Parameters (.yaml)" }
            ]
          },
          {
            id: "lesson-1-2",
            number: "1.2",
            title: "Laptop to Robot Over Ethernet",
            duration: "90 min",
            youtubeId: "r-r6rZc66g0",
            concept: `
              <h3>1. Reliable Field Networking</h3>
              <p>In mobile robotics development, direct Gigabit Ethernet via RJ45 provides low-latency, deterministic communication for parameter tuning, camera streaming, and ROS 2 diagnostics.</p>
              <h3>2. IP Addressing Architecture</h3>
              <ul>
                <li><strong>DHCP Client:</strong> Automatically requests an IP if connected to an institutional router.</li>
                <li><strong>Static Link-Local Fallback:</strong> If no DHCP server exists (laptop directly linked to robot), VMX assigns static IP <code>192.168.1.100</code> on subnet <code>255.255.255.0</code>.</li>
              </ul>
            `,
            wiring: `
              <h3>Wiring Guide:</h3>
              <p>Connect a Cat6 RJ45 patch cable from your laptop's Ethernet adapter to the Raspberry Pi 4 Ethernet port on the VMX stack.</p>
              <p>Configure laptop IPv4 adapter: IP <code>192.168.1.50</code>, Mask <code>255.255.255.0</code>, Gateway <code>192.168.1.1</code>.</p>
            `,
            test: `
              <h3>Dashboard Test (Tab 1 - Connection):</h3>
              <p>Click <strong>Auto-Scan Subnet</strong>, select <code>192.168.1.100</code>, enter credentials (<code>vmx</code> / <code>studica</code>), and observe <strong>LINK ESTABLISHED (1000 Mbps)</strong>.</p>
            `,
            challenge: `
              <h3>Challenge 1.2: Remote Terminal Access & ROS 2 Daemon Check</h3>
              <p>Establish an SSH session to the robot from your terminal. Query the ROS 2 active node tree and echo the domain ID. Paste the complete command output into the submission desk.</p>
            `,
            codeSnippet: `# Connect to the VMX controller over SSH:
ssh vmx@192.168.1.100

# Verify active ROS 2 environment:
echo "ROS_DISTRO: $ROS_DISTRO | ROS_DOMAIN_ID: $ROS_DOMAIN_ID"
ros2 daemon status
ros2 node list`,
            githubLink: "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/setup_studica_robot.sh",
            downloads: [
              { name: "setup_studica_robot.sh", url: "downloads/setup_studica_robot.sh", label: "Setup Script (.sh)" }
            ]
          },
          {
            id: "lesson-1-3",
            number: "1.3",
            title: "Powering and Linking the Titan",
            duration: "90 min",
            youtubeId: "L939H15zIms",
            concept: `
              <h3>1. 12V Power Distribution Architecture</h3>
              <p>Robotic rigs require strict isolation between logic electronics (Raspberry Pi 4 / VMX) and inductive power electronics (high-current DC motors). A sudden motor surge must never cause a brownout reset.</p>
              <h3>2. CAN Communication Protocol (ID 42)</h3>
              <p>The Titan Quad communicates with the VMX via SocketCAN at 1 Mbps. The primary drive Titan is assigned <strong>CAN ID 42</strong>.</p>
            `,
            wiring: `
              <h3>Wiring Instructions:</h3>
              <p>12V Battery → E-Stop Switch → Titan BATT (+/-) terminals. Titan 12V Aux Output → VMX Power Input (JST-VH 2-pin harness). CAN High (Yellow) to VMX CAN_H, CAN Low (Green) to VMX CAN_L.</p>
            `,
            test: `
              <h3>Dashboard Test (Tab 1 & Tab 2):</h3>
              <p>Observe Titan Quad status LEDs: Blue Heartbeat blinking at 2 Hz, Green CAN Link flashing rapidly, Battery voltage reading ~12.4V to 13.2V.</p>
            `,
            challenge: `
              <h3>Challenge 1.3: CAN Frame Sniffing & Voltage Monitoring</h3>
              <p>Run <code>candump can0 -n 10</code> on the robot terminal to capture raw CAN frames. Decode the battery telemetry frame and report the exact voltage value in your submission.</p>
            `,
            codeSnippet: `# Check SocketCAN interface:
ip link show can0

# Dump live CAN traffic from Titan (CAN ID 0x2A = 42 decimal):
candump can0 -n 10`,
            githubLink: "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/params.yaml",
            downloads: [
              { name: "params.yaml", url: "downloads/params.yaml", label: "params.yaml" }
            ]
          },
          {
            id: "lesson-1-4",
            number: "1.4",
            title: "Two DC Motors with Encoders",
            duration: "90 min",
            youtubeId: "u-30k5H460s",
            concept: `
              <h3>1. Closed-Loop Velocity & Odometry</h3>
              <p>Mobile robotics odometry relies on optical quadrature encoders mounted to the rear shaft of the DC gear motors.</p>
              <h3>2. Distance Per Tick Derivation</h3>
              <p>Wheel Circumference = π × D = 3.14159 × 0.100 m = 0.314159 m.</p>
              <p>Counts per revolution = 1,464 ticks. Distance Per Tick = 0.314159 / 1464 ≈ <strong>0.0006830601 meters/tick (~0.683 mm/tick)</strong>.</p>
            `,
            wiring: `
              <p>Left Motor red/black leads → Titan Motor 0 (M0); encoder harness → Encoder 0. Right Motor leads → Titan Motor 1 (M1); encoder harness → Encoder 1.</p>
            `,
            test: `
              <p>In Tab 2, drag M0 slider to +30%. Confirm positive tick accumulation. Drag M1 to +30% (toggle Invert Direction if spinning backwards). Click Reset Encoders.</p>
            `,
            challenge: `
              <h3>Challenge 1.4: 1,000 Encoder Ticks Calibration Test</h3>
              <p>Drive both motors simultaneously until the left wheel accumulates exactly <strong>1,000 ticks</strong>. Measure physical distance traveled on the floor. Compare physical measurement with theoretical calculation (68.3 cm). Submit your observed distance and percentage error.</p>
            `,
            codeSnippet: `# Python verification script: Drive until 1,000 ticks
from studica_control.titan import TitanMotorController
import time

titan = TitanMotorController(can_id=42)
titan.reset_encoders()
titan.set_motor_speed(m0=0.30, m1=0.30)

while abs(titan.get_encoder_ticks(0)) < 1000:
    time.sleep(0.01)

titan.set_motor_speed(m0=0.0, m1=0.0)
print(f"Target reached: M0={titan.get_encoder_ticks(0)} ticks")`,
            githubLink: "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/test_titan_motors.py",
            downloads: [
              { name: "test_titan_motors.py", url: "downloads/test_titan_motors.py", label: "Motor Test Script (.py)" }
            ]
          },
          {
            id: "lesson-1-5",
            number: "1.5",
            title: "Servo Motors and Servo Modes",
            duration: "90 min",
            youtubeId: "F1c7k0XfI58",
            concept: `
              <h3>1. Multi-Mode Smart Servos</h3>
              <p>Studica Multi-Mode Smart Servos operate in two modes: <strong>Standard Angular Mode</strong> (0° to 300° positional control) and <strong>Continuous Rotation Mode</strong> (velocity and direction control).</p>
            `,
            wiring: `
              <p>Connect servo 3-wire harness into <strong>High-Current DIO 14</strong> for gripper. Confirm VMX direction jumper is set to <strong>OUTPUT</strong>.</p>
            `,
            test: `
              <p>In Tab 2, slide Gripper from 45° (open preset) to 120° (closed preset). Confirm smooth travel without buzzing.</p>
            `,
            challenge: `
              <h3>Challenge 1.5: Program an Automated Gripper Cycle</h3>
              <p>Create a Python routine or ROS 2 node that opens gripper to 45°, pauses 1.5s, closes securely onto a 40 mm game block at 115°, pauses 2.0s, and releases. Submit code and terminal log.</p>
            `,
            codeSnippet: `# ROS 2 CLI publish command to test gripper angle:
ros2 topic pub --once /studica_control/servo/gripper std_msgs/msg/Float64 "{data: 45.0}"
sleep 1.5
ros2 topic pub --once /studica_control/servo/gripper std_msgs/msg/Float64 "{data: 115.0}"`,
            githubLink: "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/params.yaml",
            downloads: [
              { name: "params.yaml", url: "downloads/params.yaml", label: "params.yaml" }
            ]
          },
          {
            id: "lesson-1-6",
            number: "1.6",
            title: "Inputs: Push Button, Limit Switch & E-Stop",
            duration: "90 min",
            youtubeId: "9qU7c030y8k",
            concept: `
              <h3>1. Dual-Layer Safety Architecture</h3>
              <p>Layer 1: Physical twist-to-release E-Stop cuts raw 12V battery power from Titan H-bridges. Layer 2: Auxiliary normally-closed contact connects to VMX Flex DIO 11 for software daemon halt.</p>
            `,
            wiring: `
              <p>Start Push Button to Flex DIO 10 (Active LOW). E-Stop Auxiliary Sense to Flex DIO 11 (Normally Closed, High=OK, Low=Halt).</p>
            `,
            test: `
              <p>In Tab 3, press Start button: observe Channel 10 turns Amber. Hit E-Stop: observe Channel 11 turns Red (ESTOP TRIP).</p>
            `,
            challenge: `
              <h3>Challenge 1.6: Software Safety Interlock Logic</h3>
              <p>Implement a safety watchdog loop in Python that monitors Flex DIO 11. If the contact opens for even 1 ms, command Titan speeds to 0.0 and print an alert. Submit your code.</p>
            `,
            codeSnippet: `# Watchdog snippet for E-Stop digital sense on DIO 11:
from studica_control.dio import DigitalInput

estop_sensor = DigitalInput(port=11)

def check_safety():
    if estop_sensor.read() == 0:  # Contact opened
        print("CRITICAL: E-STOP ENGAGED! Halting all drive actuators.")
        return False
    return True`,
            githubLink: "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/params.yaml",
            downloads: [
              { name: "params.yaml", url: "downloads/params.yaml", label: "params.yaml" }
            ]
          },
          {
            id: "lesson-1-7",
            number: "1.7",
            title: "Outputs: Red and Green Status LEDs",
            duration: "90 min",
            youtubeId: "k_gE4x2fD50",
            concept: `
              <h3>1. Human-Robot Interaction & Beacons</h3>
              <p>Solid Green: Robot ready. Blinking Green: Autonomous mission executing. Solid Red: E-Stop active or fault. 220Ω series resistors protect the LEDs from 5.0V output.</p>
            `,
            wiring: `
              <p>Red LED Anode (+) through 220Ω resistor → High-Current DIO 18; Cathode (-) → GND. Green LED Anode (+) through 220Ω resistor → High-Current DIO 19; Cathode (-) → GND.</p>
            `,
            test: `
              <p>In Tab 3, toggle Pin 18 (Red LED) and Pin 19 (Green LED) switches to verify illumination.</p>
            `,
            challenge: `
              <h3>Challenge 1.7: Robot State Machine Beacon</h3>
              <p>Write an automated beacon node in Python coordinating states: Idle (Green solid), Mission running (Green flashing at 4 Hz), Fault (Red solid). Submit your code.</p>
            `,
            codeSnippet: `# Turn LEDs ON/OFF via ROS 2 CLI:
ros2 topic pub --once /studica_control/dio/led_green std_msgs/msg/Bool "{data: true}"
ros2 topic pub --once /studica_control/dio/led_red std_msgs/msg/Bool "{data: true}"`,
            githubLink: "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/params.yaml",
            downloads: [
              { name: "params.yaml", url: "downloads/params.yaml", label: "params.yaml" }
            ]
          },
          {
            id: "lesson-1-8",
            number: "1.8",
            title: "Sensors: Sharp IR, Ultrasonic & Light Sensor",
            duration: "90 min",
            youtubeId: "8Z08gRz7zL0",
            concept: `
              <h3>1. Sensor Modality Complementarity</h3>
              <p>Sharp GP2Y IR (10–80 cm, optical triangulation, narrow beam). HC-SR04 Ultrasonic (2–400 cm, acoustic ToF, 15° cone). Light Sensor (0–1023 ADC contrast on foam arena tiles).</p>
            `,
            wiring: `
              <p>Sharp IR to Analog 22. Light Sensor to Analog 23. HC-SR04 Ping to Flex DIO 8, Echo to Flex DIO 9.</p>
            `,
            test: `
              <p>In Tab 3, move hand between 10 cm and 50 cm. Observe live Sharp IR and Ultrasonic distance gauges and light sensor threshold.</p>
            `,
            challenge: `
              <h3>Challenge 1.8: Obstacle Detection Benchmark (30 cm)</h3>
              <p>Place obstacle at exactly 30.0 cm. Record 50 consecutive distance samples from both Sharp IR and Ultrasonic. Calculate Mean and Standard Deviation. Submit data table and comparison.</p>
            `,
            codeSnippet: `# Read analog voltage from Sharp IR on channel 22:
from studica_control.analog import AnalogInput

sharp_ir = AnalogInput(channel=22)
voltage = sharp_ir.get_voltage()
distance_cm = 27.86 * (voltage ** -1.15) if voltage > 0.4 else 80.0
print(f"Voltage: {voltage:.3f} V -> Distance: {distance_cm:.1f} cm")`,
            githubLink: "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/test_titan_motors.py",
            downloads: [
              { name: "test_sensors.py", url: "downloads/test_titan_motors.py", label: "Sensor Benchmark Script (.py)" }
            ]
          }
        ]
      }
    ]
  }
];

// Active Course & Module
let currentCourse = DEFAULT_COURSES[0];
let activeLessonIndex = 0;

// =============================================================================
// 3. User & RBAC State Management
// =============================================================================
let currentUser = null;
let currentRole = "guest"; // guest, student, teacher, admin, super_admin
let userProgress = {};     // { [lessonId]: boolean }
let assignmentDueDates = {}; // { [lessonId]: ISOString }

function initAuthSession() {
  // Theme initialization
  const savedTheme = localStorage.getItem("roboskills_theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  // Restore user session
  const savedUser = localStorage.getItem("roboskills_user");
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      currentRole = currentUser.role || "student";
      updateNavAuthUI();
      loadUserProgress();
    } catch (e) {
      console.error("Failed to restore session", e);
    }
  }

  // Firebase Auth listener
  if (auth) {
    auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        let role = "student";
        if (firebaseUser.email && firebaseUser.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
          role = "super_admin";
        }
        
        currentUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          role: role,
          status: "approved",
          country: "International",
          institution: "Robotics Academy"
        };
        currentRole = role;
        localStorage.setItem("roboskills_user", JSON.stringify(currentUser));
        updateNavAuthUI();
        loadUserProgress();
        showToast(`Welcome back, ${currentUser.displayName}!`, "success");
      }
    });
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  localStorage.setItem("roboskills_theme", isLight ? "light" : "dark");
  const icon = document.getElementById("theme-toggle-icon");
  if (icon) {
    icon.innerHTML = isLight ? '🌙' : '☀️';
  }
  showToast(isLight ? "Paper Reading Mode active" : "Slate Studio Mode active");
}

function updateNavAuthUI() {
  const authContainer = document.getElementById("nav-auth-container");
  if (!authContainer) return;

  if (currentUser) {
    const rolePillClass = `role-${currentUser.role.replace('_', '-')}`;
    const roleDisplay = currentUser.role === "super_admin" ? "SUPER ADMIN" :
                        currentUser.role === "admin" ? "ADMIN" :
                        currentUser.role === "teacher" ? "TEACHER" : "STUDENT";

    authContainer.innerHTML = `
      <div class="user-badge-container" onclick="openProfileModal()">
        <span class="role-pill ${rolePillClass}">${roleDisplay}</span>
        <span style="font-size:0.85rem; font-weight:600;">${currentUser.displayName}</span>
      </div>
      <button class="btn btn-outline btn-sm" onclick="signOutUser()">Sign Out</button>
    `;

    // Role-based portal links
    const adminLink = document.getElementById("nav-admin-link");
    const teacherLink = document.getElementById("nav-teacher-link");
    if (adminLink) {
      adminLink.style.display = (currentUser.role === "super_admin" || currentUser.role === "admin") ? "inline-block" : "none";
    }
    if (teacherLink) {
      teacherLink.style.display = (currentUser.role === "super_admin" || currentUser.role === "admin" || currentUser.role === "teacher") ? "inline-block" : "none";
    }
  } else {
    authContainer.innerHTML = `
      <button class="btn btn-outline btn-sm" onclick="openSignInModal()">Sign In</button>
      <button class="btn btn-primary btn-sm" onclick="openRegisterModal('student')">Register</button>
    `;
    const adminLink = document.getElementById("nav-admin-link");
    const teacherLink = document.getElementById("nav-teacher-link");
    if (adminLink) adminLink.style.display = "none";
    if (teacherLink) teacherLink.style.display = "none";
  }
}

function quickDemoSignIn(role) {
  let user = {};
  if (role === "super_admin") {
    user = {
      uid: "super_admin_omar",
      email: SUPER_ADMIN_EMAIL,
      displayName: "Dr. Mohammed Salameh",
      role: "super_admin",
      status: "approved",
      title: "Lead Robotics Scientist",
      institution: "RoboSkillsClub Academy"
    };
  } else if (role === "admin") {
    user = {
      uid: "admin_david",
      email: "admin.david@roboskills.org",
      displayName: "Admin David",
      role: "admin",
      status: "approved",
      institution: "RoboSkillsClub Administration"
    };
  } else if (role === "teacher") {
    user = {
      uid: "teacher_sarah",
      email: "sarah.jenkins@academy.org",
      displayName: "Prof. Sarah Jenkins",
      role: "teacher",
      status: "approved",
      organization: "Institute of Technology",
      jobTitle: "Associate Professor of Robotics",
      maxStudents: 35,
      assignedCourseIds: ["course-amr-101"]
    };
  } else {
    user = {
      uid: "student_alex_20",
      email: "alex.student@university.edu",
      displayName: "Alex Rivera",
      role: "student",
      status: "approved",
      educationLevel: "university",
      universityName: "National Robotics University",
      degreeLevel: "BSc",
      major: "Mechatronics Engineering",
      enrolledCourseIds: ["course-amr-101"],
      assignedTeacherId: "teacher_sarah"
    };
  }

  currentUser = user;
  currentRole = user.role;
  localStorage.setItem("roboskills_user", JSON.stringify(user));
  updateNavAuthUI();
  loadUserProgress();
  closeAllModals();
  showToast(`Signed in as ${user.displayName} (${user.role.toUpperCase()})`, "success");
}

function signOutUser() {
  if (auth) auth.signOut().catch(e => console.log(e));
  currentUser = null;
  currentRole = "guest";
  localStorage.removeItem("roboskills_user");
  updateNavAuthUI();
  showToast("Signed out", "amber");
}

// =============================================================================
// 4. Registration & Approval Workflows
// =============================================================================
function openRegisterModal(type = 'student') {
  closeAllModals();
  const modal = document.getElementById("register-modal");
  if (!modal) return;
  modal.classList.add("active");
  switchRegisterTab(type);
}

function switchRegisterTab(type) {
  document.getElementById("reg-tab-student").classList.toggle("active", type === 'student');
  document.getElementById("reg-tab-teacher").classList.toggle("active", type === 'teacher');
  document.getElementById("student-reg-fields").style.display = type === 'student' ? 'block' : 'none';
  document.getElementById("teacher-reg-fields").style.display = type === 'teacher' ? 'block' : 'none';
}

function toggleEducationSubfields() {
  const level = document.getElementById("reg-edu-level").value;
  document.getElementById("school-subfields").style.display = level === 'school' ? 'block' : 'none';
  document.getElementById("uni-subfields").style.display = level === 'university' ? 'block' : 'none';
}

async function handleStudentRegistration(event) {
  event.preventDefault();
  const name = document.getElementById("reg-student-name").value.trim();
  const email = document.getElementById("reg-student-email").value.trim();
  const mobile = document.getElementById("reg-student-mobile").value.trim();
  const country = document.getElementById("reg-student-country").value.trim();
  const eduLevel = document.getElementById("reg-edu-level").value;
  const courseId = document.getElementById("reg-student-course").value;

  let schoolName = "";
  let gradeYear = "";
  let universityName = "";
  let degreeLevel = "";
  let major = "";

  if (eduLevel === "school") {
    schoolName = document.getElementById("reg-school-name").value.trim();
    gradeYear = document.getElementById("reg-school-grade").value.trim();
  } else {
    universityName = document.getElementById("reg-uni-name").value.trim();
    degreeLevel = document.getElementById("reg-uni-degree").value;
    major = document.getElementById("reg-uni-major").value.trim();
  }

  // Determine approval route
  // If student enrolls in a course with an assigned teacher -> teacher approves
  // Otherwise -> admin approves
  const selectedCourse = DEFAULT_COURSES.find(c => c.id === courseId);
  const assignedTeacherId = selectedCourse ? selectedCourse.assignedTeacherId : null;
  const approvalRoute = assignedTeacherId ? `Assigned Teacher (${selectedCourse.assignedTeacherName})` : "Academy Administrator";

  const newUser = {
    uid: "student_" + Date.now(),
    displayName: name,
    email: email,
    mobileNumber: mobile,
    country: country,
    role: "student",
    status: "pending", // Requires approval
    educationLevel: eduLevel,
    schoolName,
    gradeYear,
    universityName,
    degreeLevel,
    major,
    enrolledCourseIds: [courseId],
    assignedTeacherId: assignedTeacherId,
    createdAt: new Date().toISOString()
  };

  // Save to pending registrations
  savePendingUser(newUser);

  closeAllModals();
  showToast(`Registration submitted! Awaiting approval from ${approvalRoute}.`, "success");
}

async function handleTeacherRegistration(event) {
  event.preventDefault();
  const name = document.getElementById("reg-teacher-name").value.trim();
  const email = document.getElementById("reg-teacher-email").value.trim();
  const mobile = document.getElementById("reg-teacher-mobile").value.trim();
  const country = document.getElementById("reg-teacher-country").value.trim();
  const organization = document.getElementById("reg-teacher-org").value.trim();
  const jobTitle = document.getElementById("reg-teacher-job").value.trim();

  const newTeacher = {
    uid: "teacher_" + Date.now(),
    displayName: name,
    email: email,
    mobileNumber: mobile,
    country: country,
    role: "teacher",
    status: "pending", // Administrator must approve and set maxStudents
    organization: organization,
    jobTitle: jobTitle,
    maxStudents: 25, // default proposed quota
    assignedCourseIds: ["course-amr-101"],
    createdAt: new Date().toISOString()
  };

  savePendingUser(newTeacher);

  closeAllModals();
  showToast("Teacher application submitted! Administrator has been notified to review and set student quota.", "success");
}

function savePendingUser(userObj) {
  const pending = JSON.parse(localStorage.getItem("roboskills_pending_users") || "[]");
  pending.push(userObj);
  localStorage.setItem("roboskills_pending_users", JSON.stringify(pending));

  if (db && isFirebaseOnline) {
    db.collection("users").doc(userObj.uid).set(userObj).catch(e => console.warn(e));
  }
}

// =============================================================================
// 5. LMS Classroom & Lesson Engine
// =============================================================================
function initLMSPlayer() {
  renderSyllabusTree();
  loadLesson(0);
}

function renderSyllabusTree() {
  const treeContainer = document.getElementById("syllabus-module-tree");
  if (!treeContainer) return;

  const module1 = currentCourse.modules[0];
  let html = `<li class="module-badge-title">${module1.title}</li>`;
  
  module1.lessons.forEach((lesson, index) => {
    const isCompleted = userProgress[lesson.id] === true;
    const isActive = index === activeLessonIndex;
    
    html += `
      <li class="lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" onclick="loadLesson(${index})">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <span class="check-icon">${isCompleted ? '✓' : index + 1}</span>
          <span>${lesson.number} ${lesson.title}</span>
        </div>
        <span style="font-size:0.75rem; color:var(--text-dim);">${lesson.duration}</span>
      </li>
    `;
  });

  treeContainer.innerHTML = html;
  updateCourseProgress();
}

function updateCourseProgress() {
  const module1 = currentCourse.modules[0];
  const total = module1.lessons.length;
  let completedCount = 0;
  module1.lessons.forEach(l => {
    if (userProgress[l.id] === true) completedCount++;
  });

  const percentage = Math.round((completedCount / total) * 100);
  const progressBar = document.getElementById("course-progress-fill");
  const progressText = document.getElementById("course-progress-text");

  if (progressBar) progressBar.style.width = `${percentage}%`;
  if (progressText) progressText.textContent = `${percentage}% (${completedCount}/${total} Completed)`;

  // Certificate unlock notice
  const certBanner = document.getElementById("cert-unlock-banner");
  if (certBanner) {
    certBanner.style.display = percentage === 100 ? "block" : "none";
  }
}

function loadLesson(index) {
  const module1 = currentCourse.modules[0];
  if (index < 0 || index >= module1.lessons.length) return;
  activeLessonIndex = index;
  const lesson = module1.lessons[index];

  renderSyllabusTree();

  // Populate UI
  const titleEl = document.getElementById("lms-lesson-title");
  const numEl = document.getElementById("lms-lesson-number");
  const durationEl = document.getElementById("lms-lesson-duration");
  const authorEl = document.getElementById("lms-lesson-author");
  const videoIframe = document.getElementById("lms-video-iframe");
  const dueDatePill = document.getElementById("lms-due-date-pill");

  if (titleEl) titleEl.textContent = `${lesson.number}: ${lesson.title}`;
  if (numEl) numEl.textContent = `Lesson ${lesson.number}`;
  if (durationEl) durationEl.textContent = lesson.duration;
  if (authorEl) authorEl.textContent = LEAD_AUTHOR;
  if (videoIframe) {
    videoIframe.src = `https://www.youtube.com/embed/${lesson.youtubeId}?rel=0`;
  }

  // Calculate & Display Assignment Due Date (Default: 1 week from lesson completion or enrollment)
  const dueDateStr = getAssignmentDueDate(lesson.id);
  if (dueDatePill) {
    dueDatePill.textContent = `📅 Due: ${dueDateStr}`;
  }

  // Populate Tab Panes
  document.getElementById("tab-pane-concept").innerHTML = lesson.concept;
  document.getElementById("tab-pane-wiring").innerHTML = lesson.wiring;
  document.getElementById("tab-pane-test").innerHTML = lesson.test;
  document.getElementById("tab-pane-challenge").innerHTML = lesson.challenge;

  // Code snippet & GitHub Link
  const codeEl = document.getElementById("lms-code-snippet");
  if (codeEl) codeEl.textContent = lesson.codeSnippet;

  const ghLink = document.getElementById("lms-github-code-link");
  if (ghLink) ghLink.href = lesson.githubLink || "https://github.com/momar82/RoboSkillsClub";

  // Downloads
  const dlContainer = document.getElementById("lms-downloads-container");
  if (dlContainer) {
    let dlHtml = "";
    lesson.downloads.forEach(dl => {
      dlHtml += `<a href="${dl.url}" download="${dl.name}" class="btn btn-outline btn-sm">💾 ${dl.label}</a>`;
    });
    dlContainer.innerHTML = dlHtml;
  }

  // Submission Desk Status
  const statusBadge = document.getElementById("challenge-status-badge");
  const isDone = userProgress[lesson.id] === true;
  if (statusBadge) {
    statusBadge.className = `role-pill ${isDone ? 'role-student' : 'role-admin'}`;
    statusBadge.textContent = isDone ? "COMPLETED & VERIFIED" : "PENDING SUBMISSION";
  }

  // Teacher / Admin Due Date Edit Button
  const editDueBtn = document.getElementById("btn-edit-due-date");
  if (editDueBtn) {
    editDueBtn.style.display = (currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin' || currentUser.role === 'super_admin')) ? "inline-block" : "none";
  }

  // Prev / Next button
  const prevBtn = document.getElementById("btn-prev-lesson");
  const nextBtn = document.getElementById("btn-next-lesson");
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) {
    nextBtn.innerHTML = index === module1.lessons.length - 1 ? `Finish Course & View Certificate 🎓` : `Mark Complete & Next Lesson &rarr;`;
  }

  switchLessonTab('concept');
}

function getAssignmentDueDate(lessonId) {
  if (assignmentDueDates[lessonId]) {
    return new Date(assignmentDueDates[lessonId]).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // Default: 7 days from today (or completion date)
  const due = new Date();
  due.setDate(due.getDate() + 7);
  assignmentDueDates[lessonId] = due.toISOString();
  return due.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
}

function promptEditDueDate() {
  const module1 = currentCourse.modules[0];
  const lesson = module1.lessons[activeLessonIndex];
  const currentDue = assignmentDueDates[lesson.id] ? new Date(assignmentDueDates[lesson.id]).toISOString().split('T')[0] : "";
  const newDate = prompt(`Set new Assignment Due Date for Lesson ${lesson.number} (YYYY-MM-DD):`, currentDue);

  if (newDate) {
    const parsed = new Date(newDate);
    if (!isNaN(parsed.getTime())) {
      assignmentDueDates[lesson.id] = parsed.toISOString();
      const dueDatePill = document.getElementById("lms-due-date-pill");
      if (dueDatePill) {
        dueDatePill.textContent = `📅 Due: ${parsed.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
      showToast(`Assignment due date updated to ${newDate}`, "success");
    } else {
      showToast("Invalid date format", "error");
    }
  }
}

function switchLessonTab(tabName) {
  document.querySelectorAll(".lesson-tabs .tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(pane => pane.classList.remove("active"));

  const targetBtn = document.getElementById(`tab-btn-${tabName}`);
  const targetPane = document.getElementById(`tab-pane-${tabName}`);
  if (targetBtn) targetBtn.classList.add("active");
  if (targetPane) targetPane.classList.add("active");
}

function markActiveLessonCompleteAndNext() {
  const module1 = currentCourse.modules[0];
  const lesson = module1.lessons[activeLessonIndex];
  userProgress[lesson.id] = true;
  saveUserProgress();
  renderSyllabusTree();
  showToast(`Lesson ${lesson.number} marked as complete!`, "success");

  if (activeLessonIndex < module1.lessons.length - 1) {
    loadLesson(activeLessonIndex + 1);
  } else {
    showToast("🎉 Course Completed! Your Certificate of Achievement is ready!", "success");
    openCertificateModal();
  }
}

function navigatePrevLesson() {
  if (activeLessonIndex > 0) loadLesson(activeLessonIndex - 1);
}

function copyCodeSnippet() {
  const codeText = document.getElementById("lms-code-snippet")?.innerText;
  if (codeText) {
    navigator.clipboard.writeText(codeText).then(() => {
      showToast("Code copied to clipboard!", "success");
    });
  }
}

function submitChallenge() {
  const module1 = currentCourse.modules[0];
  const lesson = module1.lessons[activeLessonIndex];
  const text = document.getElementById("challenge-text-input")?.value.trim();
  const term = document.getElementById("challenge-terminal-input")?.value.trim();

  if (!text && !term) {
    showToast("Please provide your challenge observation or code/terminal output", "amber");
    return;
  }

  const submissionObj = {
    studentId: currentUser ? currentUser.uid : "guest_student",
    studentEmail: currentUser ? currentUser.email : "guest@roboskills.org",
    studentName: currentUser ? currentUser.displayName : "Guest Student",
    courseId: currentCourse.id,
    moduleId: module1.id,
    lessonId: lesson.id,
    lessonNumber: lesson.number,
    submissionText: text,
    terminalOutput: term,
    dueDate: assignmentDueDates[lesson.id],
    score: 95,
    feedback: "Solid implementation. Motor encoder counts and VMX pin allocations accurately validated against Studica hardware documentation.",
    status: "reviewed",
    submittedAt: new Date().toISOString()
  };

  userProgress[lesson.id] = true;
  saveUserProgress();
  renderSyllabusTree();

  const feedbackEl = document.getElementById("challenge-feedback-container");
  if (feedbackEl) {
    feedbackEl.style.display = "block";
    feedbackEl.innerHTML = `
      <div style="background:rgba(16, 185, 129, 0.1); border:1px solid rgba(16, 185, 129, 0.3); border-radius:var(--radius-md); padding:1rem; margin-top:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="color:var(--accent-green);">✓ Submission Evaluated by Instructor</strong>
          <span style="font-weight:800; color:var(--accent-gold); font-size:1.15rem;">Score: 95 / 100</span>
        </div>
        <p style="font-size:0.875rem; margin-top:0.4rem;">${submissionObj.feedback}</p>
      </div>
    `;
  }

  showToast(`Challenge ${lesson.number} submitted and verified!`, "success");
}

function saveUserProgress() {
  const key = currentUser ? `progress_${currentUser.uid}` : "progress_guest";
  localStorage.setItem(key, JSON.stringify(userProgress));
}

function loadUserProgress() {
  const key = currentUser ? `progress_${currentUser.uid}` : "progress_guest";
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      userProgress = JSON.parse(saved);
      renderSyllabusTree();
    } catch (e) {}
  }
}

// =============================================================================
// 6. Certificate of Achievement Engine
// =============================================================================
function openCertificateModal() {
  const modal = document.getElementById("certificate-modal");
  if (!modal) return;

  const recipientName = currentUser ? currentUser.displayName : "Alex Rivera";
  const dateStr = new Date().toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
  const certId = "RSC-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-2026";

  document.getElementById("cert-student-name").textContent = recipientName;
  document.getElementById("cert-course-title").textContent = currentCourse.title;
  document.getElementById("cert-date").textContent = dateStr;
  document.getElementById("cert-verification-id").textContent = `Verification ID: ${certId}`;

  modal.classList.add("active");
}

function printCertificate() {
  window.print();
}

// =============================================================================
// 7. Interactive 6-Tab Robot Dashboard Simulator
// =============================================================================
let simInterval = null;
let simData = {
  batteryVoltage: 12.4,
  titanTemp: 38.2,
  titanCurrent: 1.85,
  nodes: { titan: true, imu: true, servo: true, dio: true, sharp: true, sonar: true, lidar: true, camera: true },
  motors: { m0: 0, m1: 0, m0_ticks: 0, m1_ticks: 0, m0_rpm: 0, m1_rpm: 0 },
  servos: { gripper_angle: 45 },
  gpio: { button_pressed: false, estop_pressed: false, led_red: false, led_green: true },
  sensors: { sharp_dist_cm: 28.5, sonar_dist_cm: 29.8, light_val: 720 },
  lidarAngle: 0
};

function initRobotDashboard() {
  setupDashboardEventListeners();
  startDashboardSimulationLoop();
}

function switchDashTab(tabIndex) {
  document.querySelectorAll(".dash-tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".dash-tab-pane").forEach(pane => pane.classList.remove("active"));

  const targetBtn = document.getElementById(`dash-tab-btn-${tabIndex}`);
  const targetPane = document.getElementById(`dash-tab-pane-${tabIndex}`);
  if (targetBtn) targetBtn.classList.add("active");
  if (targetPane) targetPane.classList.add("active");
}

function setupDashboardEventListeners() {
  const m0 = document.getElementById("dash-m0-slider");
  const m1 = document.getElementById("dash-m1-slider");
  if (m0) m0.addEventListener("input", (e) => {
    simData.motors.m0 = parseInt(e.target.value);
    document.getElementById("dash-m0-val").textContent = `${simData.motors.m0}%`;
  });
  if (m1) m1.addEventListener("input", (e) => {
    simData.motors.m1 = parseInt(e.target.value);
    document.getElementById("dash-m1-val").textContent = `${simData.motors.m1}%`;
  });

  const grip = document.getElementById("dash-gripper-slider");
  if (grip) grip.addEventListener("input", (e) => {
    simData.servos.gripper_angle = parseInt(e.target.value);
    document.getElementById("dash-gripper-val").textContent = `${simData.servos.gripper_angle}°`;
  });

  const light = document.getElementById("dash-light-slider");
  if (light) light.addEventListener("input", (e) => {
    simData.sensors.light_val = parseInt(e.target.value);
    document.getElementById("dash-light-val").textContent = simData.sensors.light_val;
  });
}

function toggleDashNode(nodeName) {
  simData.nodes[nodeName] = !simData.nodes[nodeName];
  const el = document.getElementById(`node-toggle-${nodeName}`);
  if (el) {
    el.textContent = simData.nodes[nodeName] ? "RUNNING" : "STOPPED";
    el.className = `role-pill ${simData.nodes[nodeName] ? 'role-student' : 'role-admin'}`;
  }
  showToast(`ROS 2 Node ${nodeName} ${simData.nodes[nodeName] ? 'started' : 'stopped'}`);
}

function toggleDashLED(color) {
  if (color === 'red') {
    simData.gpio.led_red = !simData.gpio.led_red;
    const bulb = document.getElementById("led-bulb-red");
    if (bulb) bulb.style.boxShadow = simData.gpio.led_red ? "0 0 20px #EF4444" : "none";
  } else {
    simData.gpio.led_green = !simData.gpio.led_green;
    const bulb = document.getElementById("led-bulb-green");
    if (bulb) bulb.style.boxShadow = simData.gpio.led_green ? "0 0 20px #10B981" : "none";
  }
}

function pressDashButton(isDown) {
  simData.gpio.button_pressed = isDown;
  const ind = document.getElementById("ind-button-10");
  if (ind) {
    ind.style.background = isDown ? "var(--accent-amber)" : "var(--bg-primary)";
    ind.textContent = isDown ? "ACTIVE (LOW)" : "INACTIVE (HIGH)";
  }
}

function toggleDashEStop() {
  simData.gpio.estop_pressed = !simData.gpio.estop_pressed;
  const btn = document.getElementById("btn-dash-estop");
  const ind = document.getElementById("ind-estop-11");
  if (simData.gpio.estop_pressed) {
    simData.motors.m0 = 0;
    simData.motors.m1 = 0;
    document.getElementById("dash-m0-slider").value = 0;
    document.getElementById("dash-m1-slider").value = 0;
    document.getElementById("dash-m0-val").textContent = "0%";
    document.getElementById("dash-m1-val").textContent = "0%";
    if (btn) btn.style.background = "#EF4444";
    if (ind) {
      ind.style.background = "#EF4444";
      ind.textContent = "ESTOP TRIP (0V)";
    }
    showToast("EMERGENCY STOP ENGAGED! Motors halted.", "error");
  } else {
    if (btn) btn.style.background = "#B91C1C";
    if (ind) {
      ind.style.background = "var(--accent-green)";
      ind.textContent = "OK (5V)";
    }
    showToast("E-Stop reset to normal state.", "success");
  }
}

function resetDashEncoders() {
  simData.motors.m0_ticks = 0;
  simData.motors.m1_ticks = 0;
  document.getElementById("dash-m0-ticks").textContent = "0";
  document.getElementById("dash-m1-ticks").textContent = "0";
  showToast("Encoders zeroed", "success");
}

function setGripperPreset(angle) {
  simData.servos.gripper_angle = angle;
  const slider = document.getElementById("dash-gripper-slider");
  if (slider) slider.value = angle;
  const val = document.getElementById("dash-gripper-val");
  if (val) val.textContent = `${angle}°`;
  showToast(`Gripper set to ${angle}°`);
}

function startDashboardSimulationLoop() {
  if (simInterval) clearInterval(simInterval);
  const canvas = document.getElementById("dash-radar-canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;

  simInterval = setInterval(() => {
    if (!simData.gpio.estop_pressed) {
      simData.motors.m0_ticks += Math.round(simData.motors.m0 * 0.8);
      simData.motors.m1_ticks += Math.round(simData.motors.m1 * 0.8);
      simData.motors.m0_rpm = Math.abs(Math.round(simData.motors.m0 * 1.5));
      simData.motors.m1_rpm = Math.abs(Math.round(simData.motors.m1 * 1.5));
    } else {
      simData.motors.m0_rpm = 0;
      simData.motors.m1_rpm = 0;
    }

    const t0 = document.getElementById("dash-m0-ticks");
    const t1 = document.getElementById("dash-m1-ticks");
    const r0 = document.getElementById("dash-m0-rpm");
    const r1 = document.getElementById("dash-m1-rpm");

    if (t0) t0.textContent = simData.motors.m0_ticks;
    if (t1) t1.textContent = simData.motors.m1_ticks;
    if (r0) r0.textContent = `${simData.motors.m0_rpm} RPM`;
    if (r1) r1.textContent = `${simData.motors.m1_rpm} RPM`;

    simData.sensors.sharp_dist_cm = +(28.5 + Math.sin(Date.now() / 1000) * 2.2).toFixed(1);
    simData.sensors.sonar_dist_cm = +(29.8 + Math.cos(Date.now() / 1200) * 1.8).toFixed(1);

    const sSharp = document.getElementById("dash-sharp-val");
    const sSonar = document.getElementById("dash-sonar-val");
    if (sSharp) sSharp.textContent = `${simData.sensors.sharp_dist_cm} cm`;
    if (sSonar) sSonar.textContent = `${simData.sensors.sonar_dist_cm} cm`;

    if (ctx && canvas) {
      drawLiDARRadar(ctx, canvas.width, canvas.height);
    }
  }, 100);
}

function drawLiDARRadar(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) / 2 - 15;

  ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
  ctx.lineWidth = 1;
  [0.25, 0.5, 0.75, 1.0].forEach(r => {
    ctx.beginPath();
    ctx.arc(cx, cy, maxR * r, 0, Math.PI * 2);
    ctx.stroke();
  });

  ctx.beginPath();
  ctx.moveTo(cx, 10); ctx.lineTo(cx, h - 10);
  ctx.moveTo(10, cy); ctx.lineTo(w - 10, cy);
  ctx.stroke();

  simData.lidarAngle = (simData.lidarAngle + 0.08) % (Math.PI * 2);
  const bx = cx + Math.cos(simData.lidarAngle) * maxR;
  const by = cy + Math.sin(simData.lidarAngle) * maxR;

  ctx.strokeStyle = "#38BDF8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(bx, by);
  ctx.stroke();

  const obstacles = [
    { a: 0.5, r: 0.65 }, { a: 0.55, r: 0.63 }, { a: 0.6, r: 0.66 },
    { a: 2.1, r: 0.4 }, { a: 3.8, r: 0.75 }, { a: 5.2, r: 0.5 }
  ];

  obstacles.forEach(pt => {
    const px = cx + Math.cos(pt.a) * (maxR * pt.r);
    const py = cy + Math.sin(pt.a) * (maxR * pt.r);
    ctx.fillStyle = "#FBBF24";
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function generateDynamicParamsYaml() {
  const drive = document.getElementById("cfg-drive-type")?.value || "differential";
  const diam = document.getElementById("cfg-wheel-diam")?.value || "0.100";
  const track = document.getElementById("cfg-track-width")?.value || "0.355";
  const gear = document.getElementById("cfg-gear-ratio")?.value || "14.0";
  const cpr = document.getElementById("cfg-cpr")?.value || "1464";

  const yaml = `# RoboSkillsClub Autonomous Mobile Robotics
# Studica Robotics Kit Configuration
control_server:
  ros__parameters:
    kinematics:
      drive_type: "${drive}"
      wheel_diameter_meters: ${diam}
      track_width_meters: ${track}
      gear_ratio: ${gear}
      encoder_cpr: ${cpr}
    titan:
      can_id: 42
      motor_freq: 15600
    imu:
      enabled: true
      frame_id: "imu_link"
`;

  const preview = document.getElementById("cfg-yaml-preview");
  if (preview) preview.textContent = yaml;

  const blob = new Blob([yaml], { type: "text/yaml" });
  const dlLink = document.getElementById("cfg-download-yaml");
  if (dlLink) {
    dlLink.href = URL.createObjectURL(blob);
    dlLink.download = "studica_params.yaml";
  }
}

// =============================================================================
// 8. Super Admin & Instructor Portals
// =============================================================================
function openAdminConsole() {
  closeAllModals();
  const modal = document.getElementById("admin-modal");
  if (modal) {
    modal.classList.add("active");
    renderAdminOversight();
  }
}

function openTeacherPortal() {
  closeAllModals();
  const modal = document.getElementById("teacher-modal");
  if (modal) {
    modal.classList.add("active");
    renderTeacherDashboard();
  }
}

function renderAdminOversight() {
  const pending = JSON.parse(localStorage.getItem("roboskills_pending_users") || "[]");
  const container = document.getElementById("admin-approvals-list");
  if (!container) return;

  if (pending.length === 0) {
    container.innerHTML = `<p style="font-size:0.875rem; color:var(--text-dim);">No pending approvals. All registrations are up to date.</p>`;
    return;
  }

  let html = "";
  pending.forEach((user, idx) => {
    const isTeacher = user.role === "teacher";
    html += `
      <div style="background:var(--bg-primary); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-bottom:0.75rem;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>${user.displayName}</strong> (${user.email})
            <span class="role-pill ${isTeacher ? 'role-teacher' : 'role-student'}">${user.role.toUpperCase()}</span>
          </div>
          <div style="display:flex; gap:0.5rem;">
            ${isTeacher ? `
              <input type="number" id="quota-teacher-${idx}" style="width:70px; padding:0.25rem; font-size:0.75rem; background:var(--bg-card); color:var(--text-main); border:1px solid var(--border-color); border-radius:4px;" value="${user.maxStudents || 25}" title="Set student quota">
            ` : ''}
            <button class="btn btn-primary btn-sm" onclick="approvePendingUser(${idx})">Approve</button>
            <button class="btn btn-outline btn-sm" onclick="rejectPendingUser(${idx})">Decline</button>
          </div>
        </div>
        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.35rem;">
          ${isTeacher ? `Org: ${user.organization} | Role: ${user.jobTitle}` : `Edu: ${user.educationLevel.toUpperCase()} | Institution: ${user.universityName || user.schoolName || 'N/A'}`} · Country: ${user.country}
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function approvePendingUser(index) {
  const pending = JSON.parse(localStorage.getItem("roboskills_pending_users") || "[]");
  if (index >= 0 && index < pending.length) {
    const user = pending[index];
    user.status = "approved";
    
    // Check if quota adjusted
    const quotaInput = document.getElementById(`quota-teacher-${index}`);
    if (quotaInput && user.role === 'teacher') {
      user.maxStudents = parseInt(quotaInput.value) || 25;
    }

    pending.splice(index, 1);
    localStorage.setItem("roboskills_pending_users", JSON.stringify(pending));

    renderAdminOversight();
    showToast(`Approved ${user.displayName} as ${user.role}!`, "success");
  }
}

function rejectPendingUser(index) {
  const pending = JSON.parse(localStorage.getItem("roboskills_pending_users") || "[]");
  if (index >= 0 && index < pending.length) {
    pending.splice(index, 1);
    localStorage.setItem("roboskills_pending_users", JSON.stringify(pending));
    renderAdminOversight();
    showToast("Application declined", "amber");
  }
}

function renderTeacherDashboard() {
  const rosterContainer = document.getElementById("teacher-student-roster");
  if (!rosterContainer) return;

  const mockStudents = [
    { name: "Alex Rivera", email: "alex.student@university.edu", progress: 100, submissions: 8, status: "Completed" },
    { name: "Chen Wei", email: "chen.wei@polytech.edu", progress: 75, submissions: 6, status: "Active" },
    { name: "Elena Rostova", email: "elena.r@robotics.ac.at", progress: 50, submissions: 4, status: "Active" }
  ];

  let html = `
    <table class="pinout-table" style="margin:0;">
      <thead>
        <tr><th>Student Name</th><th>Email</th><th>Progress</th><th>Submissions</th><th>Action</th></tr>
      </thead>
      <tbody>
  `;
  mockStudents.forEach(s => {
    html += `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td>${s.email}</td>
        <td><span class="role-pill role-student">${s.progress}%</span></td>
        <td>${s.submissions}/8 Lessons</td>
        <td><button class="btn btn-outline btn-sm" onclick="showToast('Reviewing submissions for ${s.name}')">Grade</button></td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  rosterContainer.innerHTML = html;
}

// Add student directly by teacher (up to quota)
function teacherAddStudent() {
  const name = prompt("Student Full Name:");
  const email = prompt("Student Email Address:");
  if (name && email) {
    showToast(`Student ${name} successfully enrolled in ${currentCourse.title}`, "success");
    renderTeacherDashboard();
  }
}

// =============================================================================
// 9. Modals & Helpers
// =============================================================================
function openSignInModal() {
  closeAllModals();
  const modal = document.getElementById("signin-modal");
  if (modal) modal.classList.add("active");
}

function openPinoutModal() {
  closeAllModals();
  const modal = document.getElementById("pinout-modal");
  if (modal) modal.classList.add("active");
}

function openProfileModal() {
  if (!currentUser) return;
  alert(`User Profile:\nName: ${currentUser.displayName}\nEmail: ${currentUser.email}\nRole: ${currentUser.role.toUpperCase()}\nStatus: ${currentUser.status}`);
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✔' : type === 'error' ? '✖' : 'ℹ'}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  initAuthSession();
  initLMSPlayer();
  initRobotDashboard();
  generateDynamicParamsYaml();
});
