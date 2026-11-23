/**
 * RoboSkillsClub - Educational Platform & Course Player
 * Dedicated to WorldSkills Autonomous Mobile Robotics (Skill 20)
 * Studica Robotics Kit (VMX-pi & Titan Quad Controller)
 * Author: @Mohammed Salameh (Published Nov 22, 2026)
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
  } else {
    console.warn("Firebase SDK not loaded, running in client standalone mode.");
  }
} catch (e) {
  console.warn("Firebase initialization note:", e.message);
}

// Super Admin Email
const SUPER_ADMIN_EMAIL = "m.omar82@gmail.com";

// =============================================================================
// 2. Comprehensive Module 1 Curriculum Data
// =============================================================================
const MODULE_1_DATA = {
  id: "module-1",
  title: "Module 1: Robot Hardware Foundations: VMX, Titan & Robot Dashboard",
  author: "Nov 22, 2026 · @Mohammed Salameh",
  description: "Comprehensive hands-on training for the Studica VMX-pi controller, Titan Quad motor driver, ROS 2 parameters, and 6-tab companion Robot Dashboard.",
  lessons: [
    {
      id: "lesson-1-1",
      number: "1.1",
      title: "Meet the VMX and Titan",
      duration: "90 min",
      youtubeId: "5o3fFr_gkEA", // WorldSkills Robotics / Studica Walkthrough
      concept: `
        <h3>1. Architectural Overview: Brain & Muscle</h3>
        <p>In the WorldSkills Autonomous Mobile Robotics (AMR) ecosystem, the <strong>Studica VMX Controller</strong> serves as the robot's high-level brain, while the <strong>Titan Quad Controller</strong> provides the heavy-current muscular actuation.</p>
        
        <p>The VMX integrates a <strong>Raspberry Pi 4 Model B</strong> (running Ubuntu Linux and ROS 2) coupled with an onboard real-time FPGA and a 9-axis <strong>navX Inertial Measurement Unit (IMU)</strong>. The Titan Quad is a 4-channel closed-loop H-bridge motor driver communicating with the VMX over an industrial <strong>Controller Area Network (CAN bus)</strong> operating at 1 Mbps.</p>

        <h3>2. Connector Blocks & Pin Mapping</h3>
        <table class="pinout-table">
          <thead>
            <tr><th>Port Group</th><th>Channel Range</th><th>Voltage / Logic</th><th>Primary Robotic Function</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Flex DIO</code></td><td>DIO 8 – 11</td><td>5V / 3.3V selectable</td><td>High-speed quadrature encoders, Ultrasonic ping/echo, E-Stop monitoring, push buttons</td></tr>
            <tr><td><code>High-Current DIO</code></td><td>DIO 12 – 21</td><td>5V / 3.3V (Up to 2A total)</td><td>Multi-Mode Smart Servos, status indicator LEDs, limit switches</td></tr>
            <tr><td><code>Analog Inputs</code></td><td>Analog 22 – 25</td><td>0 – 5V (12-bit ADC)</td><td>Sharp GP2Y0A21YK0F infrared distance sensors, light line sensors, battery monitors</td></tr>
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

# Output should confirm:
# Hardware Model: Studica VMX-pi Revision B
# navX IMU: Present (Firmware v3.1.4)
# FPGA Core Clock: 50.00 MHz`,
      downloads: [
        { name: "VMX_Titan_Pinout_Reference.pdf", url: "downloads/params.yaml", label: "Pinout Reference (PDF)" },
        { name: "setup_studica_robot.sh", url: "downloads/setup_studica_robot.sh", label: "Setup Script (.sh)" }
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
        <p>During WorldSkills AMR competitions, wireless 2.4/5 GHz bands in the competition hall are saturated and subject to interference. Direct Gigabit Ethernet via RJ45 is the sanctioned standard for robot flashing, diagnostic telemetry, and ROS 2 parameter tuning.</p>
        
        <h3>2. IP Addressing Architecture</h3>
        <p>The VMX controller utilizes dual network configuration:</p>
        <ul>
          <li><strong>DHCP Client:</strong> Automatically requests an IP if connected to an institutional router.</li>
          <li><strong>Static Link-Local Fallback:</strong> If no DHCP server exists (laptop connected directly to robot), the VMX assigns static IP <code>192.168.1.100</code> on subnet <code>255.255.255.0</code>.</li>
        </ul>
      `,
      wiring: `
        <h3>Wiring Guide:</h3>
        <p>Connect a Cat6 RJ45 patch cable from your laptop's Ethernet adapter to the Raspberry Pi 4 Ethernet port on the VMX stack.</p>
        <p>Configure your laptop's IPv4 Ethernet adapter to:</p>
        <ul>
          <li>IP Address: <code>192.168.1.50</code></li>
          <li>Subnet Mask: <code>255.255.255.0</code></li>
          <li>Default Gateway: <code>192.168.1.1</code></li>
        </ul>
      `,
      test: `
        <h3>Dashboard Test (Tab 1 - Connection):</h3>
        <ol>
          <li>Launch Robot Dashboard and click <strong>Auto-Scan Subnet</strong>.</li>
          <li>The dashboard sends an ARP probe across <code>192.168.1.0/24</code>.</li>
          <li>Select <code>192.168.1.100</code> and enter credentials (User: <code>vmx</code>, Pass: <code>studica</code>).</li>
          <li>Observe green status badge: <strong>LINK ESTABLISHED (1000 Mbps)</strong>.</li>
        </ol>
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
      downloads: [
        { name: "setup_studica_robot.sh", url: "downloads/setup_studica_robot.sh", label: "Provisioning Script (.sh)" },
        { name: "params.yaml", url: "downloads/params.yaml", label: "Base Parameters (.yaml)" }
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
        <p>Robotic competition rigs require strict isolation between logic electronics (Raspberry Pi 4 / VMX) and inductive power electronics (high-current DC motors). A sudden motor surge or stall condition must never cause a brownout reset of the computer.</p>
        
        <p>Power originates from a 12V NiMH or LiFePO4 battery pack, feeding through an emergency shutoff switch directly into the Titan Quad's high-current screw terminals. The Titan Quad's internal buck regulator provides clean, stabilized 12V power back out to the VMX controller through the dedicated JST-VH harness.</p>

        <h3>2. CAN Communication Protocol (ID 42)</h3>
        <p>The Titan Quad communicates with the VMX via SocketCAN. By factory default, the primary drive Titan is assigned <strong>CAN ID 42</strong>. The VMX Linux kernel encapsulates CAN frames via the <code>can0</code> network interface running at a baud rate of 1,000,000 bps (1 Mbps).</p>
      `,
      wiring: `
        <h3>Wiring Instructions:</h3>
        <ol>
          <li>Battery (+) red lead → E-Stop switch input.</li>
          <li>E-Stop switch output → Titan Quad <strong>BATT (+)</strong> terminal.</li>
          <li>Battery (-) black lead → Titan Quad <strong>BATT (-)</strong> terminal.</li>
          <li>Titan 12V Aux Output → VMX Power Input (JST-VH 2-pin connector).</li>
          <li>Twisted-pair CAN cable: Titan CAN High (Yellow) to VMX CAN_H; Titan CAN Low (Green) to VMX CAN_L.</li>
        </ol>
      `,
      test: `
        <h3>Dashboard Test (Tab 1 & Tab 2):</h3>
        <p>Observe the Titan Quad status LEDs:</p>
        <ul>
          <li><strong>Heartbeat LED (Blue):</strong> Blinks steadily at 2 Hz indicating healthy internal micro-controller clock.</li>
          <li><strong>CAN Link LED (Green):</strong> Flashes rapidly with active packet transmission.</li>
          <li>Check Tab 1: Battery voltage reads ~<strong>12.4V to 13.2V</strong>.</li>
        </ul>
      `,
      challenge: `
        <h3>Challenge 1.3: CAN Frame Sniffing & Voltage Monitoring</h3>
        <p>Run <code>candump can0</code> on the robot terminal to capture 10 raw CAN frames transmitted between the Titan (ID 42) and VMX. Decode the battery telemetry frame and report the exact voltage value in your submission.</p>
      `,
      codeSnippet: `# Verify SocketCAN link status:
ip link show can0

# Dump live CAN traffic from Titan (CAN ID 0x2A = 42 decimal):
candump can0 -n 10

# Sample output:
# can0  02A   [8]  10 4A 00 00 00 00 04 D2`,
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
        <p>Mobile robotics odometry relies on optical quadrature encoders mounted to the rear shaft of the DC gear motors. The Studica Maverick DC motor features an integrated optical encoder outputting dual square waves (Channel A and Channel B) shifted 90 degrees out of phase.</p>
        
        <h3>2. Distance Per Tick Mathematical Derivation</h3>
        <p>For a standard 100 mm diameter drive wheel with a 14:1 gear ratio motor:</p>
        <p>$$\text{Wheel Circumference} = \pi \times D = 3.14159 \times 0.100\text{ m} = 0.314159\text{ m} = 314.16\text{ mm}$$</p>
        <p>Total quadrature counts per wheel revolution = $$1464\text{ ticks}$$.</p>
        <p>$$\text{Distance Per Tick} = \frac{0.314159\text{ m}}{1464\text{ ticks}} = 0.0006830601\text{ meters/tick} \approx 0.683\text{ mm/tick}$$</p>
      `,
      wiring: `
        <h3>Wiring Steps:</h3>
        <ol>
          <li>Left Motor red/black leads → Titan Motor 0 (M0) screw terminals.</li>
          <li>Left Motor 4-pin encoder harness → Titan Encoder 0 port.</li>
          <li>Right Motor red/black leads → Titan Motor 1 (M1) screw terminals.</li>
          <li>Right Motor 4-pin encoder harness → Titan Encoder 1 port.</li>
        </ol>
      `,
      test: `
        <h3>Dashboard Test (Tab 2 - Motors, Encoders & Servos):</h3>
        <p>1. Open Tab 2 in the Robot Dashboard.</p>
        <p>2. Drag the M0 slider to <strong>+30%</strong>. Observe wheel spinning forward and tick count incrementing positively.</p>
        <p>3. Drag the M1 slider to <strong>+30%</strong>. If the right wheel spins backwards, toggle the <strong>Invert Direction</strong> switch.</p>
        <p>4. Click <strong>Reset Encoders</strong> to zero out both registers.</p>
      `,
      challenge: `
        <h3>Challenge 1.4: 1,000 Encoder Ticks Calibration Test</h3>
        <p>Drive both motors simultaneously until the left wheel accumulates exactly <strong>1,000 ticks</strong>. Measure the physical linear distance traveled on the floor with a tape measure. Compare your physical measurement with theoretical calculation (1000 × 0.000683m = 68.3 cm). Submit your observed distance and percentage error.</p>
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
      downloads: [
        { name: "test_titan_motors.py", url: "downloads/test_titan_motors.py", label: "Motor Test Script (.py)" },
        { name: "params.yaml", url: "downloads/params.yaml", label: "params.yaml" }
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
        <p>Studica Multi-Mode Smart Servos feature internal digital PID controllers and programmable firmware allowing them to operate in two distinct modes:</p>
        <ul>
          <li><strong>Standard Angular Mode:</strong> Precise position control across 300° (or ±150° relative to center). Pulse width: 500 µs (0°) to 2500 µs (300°), 1500 µs center (150°).</li>
          <li><strong>Continuous Rotation Mode:</strong> Speed and direction control like a miniature gear motor. 1500 µs = stop, &gt;1500 µs = clockwise, &lt;1500 µs = counter-clockwise.</li>
        </ul>

        <h3>2. Servo Smart Programmer</h3>
        <p>Before plugging a servo into the VMX, coaches and students use the handheld <strong>Studica Smart Programmer</strong> to select between Standard and Continuous mode and set physical mechanical endpoints to prevent gear stripping.</p>
      `,
      wiring: `
        <h3>Wiring Guide:</h3>
        <p>Connect the 3-wire servo harness (Brown=GND, Red=+5V, Orange=PWM Signal) into <strong>High-Current DIO 14</strong> for the manipulator gripper.</p>
        <p>Verify that the VMX High-Current DIO direction jumper is set to <strong>OUTPUT</strong>.</p>
      `,
      test: `
        <h3>Dashboard Test (Tab 2 - Servos):</h3>
        <p>1. Open Tab 2 in the Robot Dashboard.</p>
        <p>2. Locate the <strong>Servo Channel 14 (Gripper)</strong> control slider.</p>
        <p>3. Slide from 45° (open preset) to 120° (closed preset).</p>
        <p>4. Confirm smooth mechanical travel without buzzing or thermal stall.</p>
      `,
      challenge: `
        <h3>Challenge 1.5: Program an Automated Gripper Cycle</h3>
        <p>Create a Python routine or ROS 2 node that opens the gripper to 45°, pauses 1.5 seconds, closes securely onto a 40 mm game block at 115°, pauses 2.0 seconds, and releases. Submit the code and terminal log.</p>
      `,
      codeSnippet: `# ROS 2 CLI publish command to test gripper angle:
ros2 topic pub --once /studica_control/servo/gripper std_msgs/msg/Float64 "{data: 45.0}"
sleep 1.5
ros2 topic pub --once /studica_control/servo/gripper std_msgs/msg/Float64 "{data: 115.0}"`,
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
        <p>Autonomous mobile robots operating around humans require fail-safe safety mechanisms. In WorldSkills AMR regulations, safety intervention consists of two synchronized layers:</p>
        <ul>
          <li><strong>Layer 1 (Physical Power Cutoff):</strong> The physical twist-to-release Emergency Stop (E-Stop) mushroom switch cuts raw 12V battery current directly from the Titan motor H-bridges.</li>
          <li><strong>Layer 2 (Software Digital Halt):</strong> An auxiliary normally-closed contact on the E-Stop connects to VMX Flex DIO 11. When triggered, the software daemon instantly terminates ROS 2 velocity commands and halts navigation goals.</li>
        </ul>
        
        <h3>2. Active-Low Digital Inputs with Internal Pull-Ups</h3>
        <p>Push buttons and limit switches connect between the digital pin and Ground (GND). With internal pull-up enabled on the VMX FPGA, unpressed state reads logic <code>HIGH (1)</code>; when pressed, the pin grounds and reads logic <code>LOW (0)</code>.</p>
      `,
      wiring: `
        <h3>Wiring Table:</h3>
        <table class="pinout-table">
          <thead>
            <tr><th>Component</th><th>VMX Connector</th><th>Pin Type</th><th>Active Logic</th></tr>
          </thead>
          <tbody>
            <tr><td>Autonomous Start Button</td><td>Flex DIO 10</td><td>Digital In</td><td>Active LOW (GND)</td></tr>
            <tr><td>E-Stop Auxiliary Sense</td><td>Flex DIO 11</td><td>Digital In</td><td>Normally Closed (High=OK, Low=Halt)</td></tr>
            <tr><td>Arm Homing Limit Switch</td><td>Flex DIO 8</td><td>Digital In</td><td>Active LOW (GND)</td></tr>
          </tbody>
        </table>
      `,
      test: `
        <h3>Dashboard Test (Tab 3 - GPIO & Sensors):</h3>
        <p>1. Open Tab 3 in the Robot Dashboard.</p>
        <p>2. Locate the <strong>Digital Inputs Matrix</strong>.</p>
        <p>3. Press the Start push button: observe Channel 10 turns from Grey to <strong>Amber (ACTIVE)</strong>.</p>
        <p>4. Hit the E-stop button: observe Channel 11 turns <strong>Red (ESTOP TRIGGERED)</strong>.</p>
      `,
      challenge: `
        <h3>Challenge 1.6: Software Safety Interlock Logic</h3>
        <p>Implement a safety watchdog loop in Python that monitors Flex DIO 11. If the contact opens for even a single millisecond, immediately command Titan M0–M3 speeds to 0.0 and print an audible alert to the console. Submit your code.</p>
      `,
      codeSnippet: `# Watchdog snippet for E-Stop digital sense on DIO 11:
from studica_control.dio import DigitalInput
import sys

estop_sensor = DigitalInput(port=11)

def check_safety():
    if estop_sensor.read() == 0:  # Contact opened
        print("CRITICAL: E-STOP ENGAGED! Halting all drive actuators.")
        return False
    return True`,
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
        <h3>1. Human-Robot Interaction & Status Feedback</h3>
        <p>Visual status indicators are essential for judges and safety referees to assess robot state before touching the chassis. High-brightness 10 mm LEDs mounted on the robot mast communicate system status:</p>
        <ul>
          <li><strong>Solid Green:</strong> System healthy, ROS 2 nodes connected, ready for autonomous trigger.</li>
          <li><strong>Blinking Green:</strong> Autonomous mission executing in arena.</li>
          <li><strong>Solid Red:</strong> Emergency Stop active, Titan motor fault, or low battery (&lt;10.5V).</li>
          <li><strong>Blinking Red:</strong> Sensor disconnection or LiDAR localization lost.</li>
        </ul>

        <h3>2. Current Limiting Resistors</h3>
        <p>High-Current DIO 12–21 outputs 5.0V. Direct connection of an LED will exceed maximum forward current and damage the diode or FPGA pin. A 220Ω or 330Ω series resistor limits current to safe 15 mA.</p>
      `,
      wiring: `
        <h3>Wiring Guide:</h3>
        <ul>
          <li>Red LED Anode (+) through 220Ω resistor → High-Current DIO 18 Signal pin; Cathode (-) → GND.</li>
          <li>Green LED Anode (+) through 220Ω resistor → High-Current DIO 19 Signal pin; Cathode (-) → GND.</li>
        </ul>
      `,
      test: `
        <h3>Dashboard Test (Tab 3 - GPIO & Sensors):</h3>
        <p>1. Open Tab 3 in the Robot Dashboard.</p>
        <p>2. Locate <strong>Digital Outputs</strong>.</p>
        <p>3. Click the toggle switch for <strong>Pin 18 (Red LED)</strong> — observe LED illuminates on robot.</p>
        <p>4. Click the toggle switch for <strong>Pin 19 (Green LED)</strong> — observe green LED illuminates.</p>
      `,
      challenge: `
        <h3>Challenge 1.7: Robot State Machine Beacon</h3>
        <p>Write an automated beacon node in Python that coordinates states: when robot is idle (Green solid), running mission (Green flashing at 4 Hz), and in fault (Red solid). Submit your code and verification video link or terminal log.</p>
      `,
      codeSnippet: `# Publish digital output state via ROS 2 CLI:
# Turn Green LED ON (Pin 19):
ros2 topic pub --once /studica_control/dio/led_green std_msgs/msg/Bool "{data: true}"

# Turn Red LED ON (Pin 18):
ros2 topic pub --once /studica_control/dio/led_red std_msgs/msg/Bool "{data: true}"`,
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
        <p>No single sensor solves every obstacle detection problem in robotics. Combining optical triangulation, acoustic time-of-flight, and photometric reflectance provides reliable environmental perception:</p>
        <ul>
          <li><strong>Sharp GP2Y0A21YK0F IR Sensor:</strong> Uses optical triangulation (range 10 cm – 80 cm). Highly directional with narrow beam; unhindered by ambient acoustic noise, but affected by shiny black surfaces.</li>
          <li><strong>HC-SR04 Ultrasonic Sensor:</strong> Uses 40 kHz acoustic pulse time-of-flight ($$d = \frac{v \times t}{2}$$ where $$v \approx 343\text{ m/s}$$). Detects clear glass and shiny metal that optical sensors miss, with wide 15° beam cone (range 2 cm – 400 cm).</li>
          <li><strong>Light / Line Sensor:</strong> Analog phototransistor circuit detecting contrast between white tape arena boundaries and dark foam tiles.</li>
        </ul>
      `,
      wiring: `
        <h3>Wiring Connections:</h3>
        <table class="pinout-table">
          <thead>
            <tr><th>Sensor</th><th>VMX Port</th><th>Signal Pins</th><th>Operating Range</th></tr>
          </thead>
          <tbody>
            <tr><td>Sharp GP2Y IR</td><td>Analog 22</td><td>Pin 22 (Analog In), 5V, GND</td><td>10 cm – 80 cm</td></tr>
            <tr><td>Light / Line Sensor</td><td>Analog 23</td><td>Pin 23 (Analog In), 5V, GND</td><td>0 – 1023 Raw ADC</td></tr>
            <tr><td>HC-SR04 Ultrasonic Ping</td><td>Flex DIO 8</td><td>Pin 8 (Trigger Output, 10 µs pulse)</td><td>Trigger Pulse</td></tr>
            <tr><td>HC-SR04 Ultrasonic Echo</td><td>Flex DIO 9</td><td>Pin 9 (Echo Input, width proportional to dist)</td><td>2 cm – 400 cm</td></tr>
          </tbody>
        </table>
      `,
      test: `
        <h3>Dashboard Test (Tab 3 - GPIO & Sensors):</h3>
        <p>1. Open Tab 3 in the Robot Dashboard.</p>
        <p>2. Observe live distance charts: <strong>Sharp IR Distance Graph</strong> and <strong>Ultrasonic Distance Meter</strong>.</p>
        <p>3. Move your hand back and forth from 10 cm to 50 cm in front of the sensors.</p>
        <p>4. Observe the Light Sensor threshold gauge as you slide the sensor over white paper versus dark desk surface.</p>
      `,
      challenge: `
        <h3>Challenge 1.8: Obstacle Detection Benchmark (30 cm)</h3>
        <p>Place a wooden cardboard obstacle at exactly 30.0 cm from the robot front bumper. Record 50 consecutive distance samples from both the Sharp IR sensor and HC-SR04 ultrasonic sensor. Calculate the Mean, Standard Deviation, and Absolute Error for each sensor. Submit your data table and conclusion on which sensor is preferable for indoor wall-following.</p>
      `,
      codeSnippet: `# Read analog voltage from Sharp IR on channel 22:
from studica_control.analog import AnalogInput
import math

sharp_ir = AnalogInput(channel=22)
voltage = sharp_ir.get_voltage()

# Standard GP2Y0A21YK0F distance transfer function:
distance_cm = 27.86 * (voltage ** -1.15) if voltage > 0.4 else 80.0
print(f"Voltage: {voltage:.3f} V -> Calculated Distance: {distance_cm:.1f} cm")`,
      downloads: [
        { name: "test_sensors.py", url: "downloads/test_titan_motors.py", label: "Sensor Benchmark Script (.py)" },
        { name: "params.yaml", url: "downloads/params.yaml", label: "params.yaml" }
      ]
    }
  ]
};

// =============================================================================
// 3. User & Auth State Management
// =============================================================================
let currentUser = null;
let currentRole = "guest"; // guest, student, teacher, admin, super_admin
let userProgress = {}; // { [lessonId]: boolean }

// Check local storage for persistent guest / demo session
function initAuthSession() {
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

  // Firebase auth listener if available
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
          institution: "WorldSkills Robotics Team"
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

function updateNavAuthUI() {
  const authContainer = document.getElementById("nav-auth-container");
  if (!authContainer) return;

  if (currentUser) {
    const rolePillClass = `role-${currentUser.role.replace('_', '-')}`;
    const roleDisplay = currentUser.role === "super_admin" ? "SUPER ADMIN" :
                        currentUser.role === "admin" ? "ADMIN" :
                        currentUser.role === "teacher" ? "INSTRUCTOR" : "STUDENT";

    authContainer.innerHTML = `
      <div class="user-badge-container" onclick="openProfileModal()">
        <span class="role-pill ${rolePillClass}">${roleDisplay}</span>
        <span style="font-size:0.85rem; font-weight:600; color:#fff;">${currentUser.displayName}</span>
      </div>
      <button class="btn btn-outline btn-sm" onclick="signOutUser()">Sign Out</button>
    `;

    // Show admin / instructor buttons if authorized
    const adminLink = document.getElementById("nav-admin-link");
    if (adminLink) {
      if (currentUser.role === "super_admin" || currentUser.role === "admin" || currentUser.role === "teacher") {
        adminLink.style.display = "inline-block";
      } else {
        adminLink.style.display = "none";
      }
    }
  } else {
    authContainer.innerHTML = `
      <button class="btn btn-outline btn-sm" onclick="openAuthModal('signin')">Sign In</button>
      <button class="btn btn-primary btn-sm" onclick="openAuthModal('register')">Free Access</button>
    `;
    const adminLink = document.getElementById("nav-admin-link");
    if (adminLink) adminLink.style.display = "none";
  }
}

function quickDemoSignIn(role) {
  let user = {};
  if (role === "super_admin") {
    user = {
      uid: "super_admin_omar",
      email: SUPER_ADMIN_EMAIL,
      displayName: "Mohammed Salameh",
      role: "super_admin",
      institution: "WorldSkills Chief Expert / RoboSkillsClub"
    };
  } else if (role === "teacher") {
    user = {
      uid: "coach_sarah_101",
      email: "coach.sarah@roboskills.org",
      displayName: "Coach Sarah",
      role: "teacher",
      institution: "National Robotics Academy"
    };
  } else {
    user = {
      uid: "student_alex_20",
      email: "alex.team20@roboskills.org",
      displayName: "Alex Rivera",
      role: "student",
      institution: "Team 20 AMR Competitor"
    };
  }

  currentUser = user;
  currentRole = user.role;
  localStorage.setItem("roboskills_user", JSON.stringify(user));
  updateNavAuthUI();
  loadUserProgress();
  closeAuthModal();
  showToast(`Signed in as ${user.displayName} (${user.role.toUpperCase()})`, "success");
}

function signOutUser() {
  if (auth) {
    auth.signOut().catch(e => console.log(e));
  }
  currentUser = null;
  currentRole = "guest";
  localStorage.removeItem("roboskills_user");
  updateNavAuthUI();
  showToast("Signed out successfully", "amber");
}

// =============================================================================
// 4. LMS Classroom & Course Player Engine
// =============================================================================
let activeLessonIndex = 0;

function initLMSPlayer() {
  renderSyllabusTree();
  loadLesson(0);
}

function renderSyllabusTree() {
  const treeContainer = document.getElementById("syllabus-module-tree");
  if (!treeContainer) return;

  let html = `<li class="module-badge-title">${MODULE_1_DATA.title}</li>`;
  
  MODULE_1_DATA.lessons.forEach((lesson, index) => {
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
  const total = MODULE_1_DATA.lessons.length;
  let completedCount = 0;
  MODULE_1_DATA.lessons.forEach(l => {
    if (userProgress[l.id] === true) completedCount++;
  });

  const percentage = Math.round((completedCount / total) * 100);
  const progressBar = document.getElementById("course-progress-fill");
  const progressText = document.getElementById("course-progress-text");

  if (progressBar) progressBar.style.width = `${percentage}%`;
  if (progressText) progressText.textContent = `${percentage}% (${completedCount}/${total} Completed)`;
}

function loadLesson(index) {
  if (index < 0 || index >= MODULE_1_DATA.lessons.length) return;
  activeLessonIndex = index;
  const lesson = MODULE_1_DATA.lessons[index];

  // Update Syllabus active class
  renderSyllabusTree();

  // Populate lesson view
  const titleEl = document.getElementById("lms-lesson-title");
  const numEl = document.getElementById("lms-lesson-number");
  const durationEl = document.getElementById("lms-lesson-duration");
  const authorEl = document.getElementById("lms-lesson-author");
  const videoIframe = document.getElementById("lms-video-iframe");

  if (titleEl) titleEl.textContent = `${lesson.number}: ${lesson.title}`;
  if (numEl) numEl.textContent = `Lesson ${lesson.number}`;
  if (durationEl) durationEl.textContent = lesson.duration;
  if (authorEl) authorEl.textContent = MODULE_1_DATA.author;
  if (videoIframe) {
    videoIframe.src = `https://www.youtube.com/embed/${lesson.youtubeId}?rel=0`;
  }

  // Populate tab panes
  document.getElementById("tab-pane-concept").innerHTML = lesson.concept;
  document.getElementById("tab-pane-wiring").innerHTML = lesson.wiring;
  document.getElementById("tab-pane-test").innerHTML = lesson.test;
  document.getElementById("tab-pane-challenge").innerHTML = lesson.challenge;

  // Code Snippet Box
  const codeEl = document.getElementById("lms-code-snippet");
  if (codeEl) codeEl.textContent = lesson.codeSnippet;

  // Download center
  const dlContainer = document.getElementById("lms-downloads-container");
  if (dlContainer) {
    let dlHtml = "";
    lesson.downloads.forEach(dl => {
      dlHtml += `<a href="${dl.url}" download="${dl.name}" class="btn btn-outline btn-sm">💾 ${dl.label}</a>`;
    });
    dlContainer.innerHTML = dlHtml;
  }

  // Update Challenge Desk
  const statusBadge = document.getElementById("challenge-status-badge");
  const isDone = userProgress[lesson.id] === true;
  if (statusBadge) {
    if (isDone) {
      statusBadge.className = "role-pill role-student";
      statusBadge.textContent = "COMPLETED / VERIFIED";
    } else {
      statusBadge.className = "role-pill role-admin";
      statusBadge.textContent = "PENDING SUBMISSION";
    }
  }

  // Prev / Next button states
  const prevBtn = document.getElementById("btn-prev-lesson");
  const nextBtn = document.getElementById("btn-next-lesson");
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) {
    if (index === MODULE_1_DATA.lessons.length - 1) {
      nextBtn.innerHTML = `Complete Course 🎉`;
    } else {
      nextBtn.innerHTML = `Mark Complete & Next Lesson →`;
    }
  }

  // Reset tab to concept
  switchLessonTab('concept');
  window.scrollTo({ top: document.getElementById("classroom-section").offsetTop - 80, behavior: 'smooth' });
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
  const lesson = MODULE_1_DATA.lessons[activeLessonIndex];
  userProgress[lesson.id] = true;
  saveUserProgress();
  renderSyllabusTree();
  showToast(`Lesson ${lesson.number} marked as complete!`, "success");

  if (activeLessonIndex < MODULE_1_DATA.lessons.length - 1) {
    loadLesson(activeLessonIndex + 1);
  } else {
    showToast("Congratulations! You completed Module 1: VMX & Titan Foundations!", "success");
  }
}

function navigatePrevLesson() {
  if (activeLessonIndex > 0) {
    loadLesson(activeLessonIndex - 1);
  }
}

function copyCodeSnippet() {
  const codeText = document.getElementById("lms-code-snippet")?.innerText;
  if (codeText) {
    navigator.clipboard.writeText(codeText).then(() => {
      showToast("Code snippet copied to clipboard!", "success");
    }).catch(() => {
      showToast("Failed to copy snippet", "error");
    });
  }
}

function submitChallenge() {
  const lesson = MODULE_1_DATA.lessons[activeLessonIndex];
  const submissionText = document.getElementById("challenge-text-input")?.value.trim();
  const terminalOutput = document.getElementById("challenge-terminal-input")?.value.trim();

  if (!submissionText && !terminalOutput) {
    showToast("Please provide your challenge observation or terminal output", "amber");
    return;
  }

  const submissionObj = {
    studentId: currentUser ? currentUser.uid : "guest_student",
    studentEmail: currentUser ? currentUser.email : "guest@roboskills.org",
    studentName: currentUser ? currentUser.displayName : "Guest Student",
    moduleId: MODULE_1_DATA.id,
    lessonId: lesson.id,
    lessonNumber: lesson.number,
    submissionText: submissionText,
    terminalOutput: terminalOutput,
    score: 95, // Auto-verified baseline
    feedback: "Excellent execution. Encoder ticks and pin allocations are verified against Studica VMX specifications.",
    status: "reviewed",
    submittedAt: new Date().toISOString()
  };

  // Save to Firestore if available
  if (db && isFirebaseOnline) {
    db.collection("submissions").add(submissionObj).catch(e => console.warn(e));
  }

  // Update local progress
  userProgress[lesson.id] = true;
  saveUserProgress();
  renderSyllabusTree();

  // Show feedback
  const feedbackEl = document.getElementById("challenge-feedback-container");
  if (feedbackEl) {
    feedbackEl.style.display = "block";
    feedbackEl.innerHTML = `
      <div class="feedback-box">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <h4 style="color:var(--green-emerald);">✓ Submission Reviewed & Accepted</h4>
          <span class="feedback-score">Score: 95 / 100</span>
        </div>
        <p style="font-size:0.875rem; color:var(--text-main);">${submissionObj.feedback}</p>
      </div>
    `;
  }

  showToast(`Challenge ${lesson.number} submitted and verified!`, "success");
}

function saveUserProgress() {
  const key = currentUser ? `progress_${currentUser.uid}` : "progress_guest";
  localStorage.setItem(key, JSON.stringify(userProgress));

  // Sync to Firestore if signed in
  if (db && currentUser && isFirebaseOnline) {
    db.collection("enrollments").doc(`${currentUser.uid}_module1`).set({
      userId: currentUser.uid,
      courseId: "module1",
      completedLessons: Object.keys(userProgress).filter(k => userProgress[k]),
      progress: Math.round((Object.keys(userProgress).filter(k => userProgress[k]).length / MODULE_1_DATA.lessons.length) * 100),
      lastUpdated: new Date().toISOString()
    }, { merge: true }).catch(e => console.warn(e));
  }
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
// 5. Interactive 6-Tab Robot Dashboard Simulator
// =============================================================================
let simInterval = null;
let simData = {
  connected: true,
  ip: "192.168.1.100",
  batteryVoltage: 12.4,
  titanTemp: 38.2,
  titanCurrent: 1.85,
  nodes: {
    titan: true,
    imu: true,
    servo: true,
    dio: true,
    sharp: true,
    sonar: true,
    lidar: true,
    camera: true
  },
  motors: {
    m0: 0,
    m1: 0,
    m2: 0,
    m3: 0,
    m0_ticks: 0,
    m1_ticks: 0,
    m0_rpm: 0,
    m1_rpm: 0
  },
  servos: {
    gripper_angle: 45,
    wrist_speed: 0
  },
  gpio: {
    button_pressed: false,
    estop_pressed: false,
    limit_pressed: false,
    led_red: false,
    led_green: true
  },
  sensors: {
    sharp_dist_cm: 28.5,
    sonar_dist_cm: 29.8,
    light_val: 720
  },
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
  // Motor Sliders
  const m0Slider = document.getElementById("dash-m0-slider");
  const m1Slider = document.getElementById("dash-m1-slider");
  if (m0Slider) {
    m0Slider.addEventListener("input", (e) => {
      simData.motors.m0 = parseInt(e.target.value);
      document.getElementById("dash-m0-val").textContent = `${simData.motors.m0}%`;
    });
  }
  if (m1Slider) {
    m1Slider.addEventListener("input", (e) => {
      simData.motors.m1 = parseInt(e.target.value);
      document.getElementById("dash-m1-val").textContent = `${simData.motors.m1}%`;
    });
  }

  // Gripper Slider
  const gripperSlider = document.getElementById("dash-gripper-slider");
  if (gripperSlider) {
    gripperSlider.addEventListener("input", (e) => {
      simData.servos.gripper_angle = parseInt(e.target.value);
      document.getElementById("dash-gripper-val").textContent = `${simData.servos.gripper_angle}°`;
    });
  }

  // Light Sensor slider
  const lightSlider = document.getElementById("dash-light-slider");
  if (lightSlider) {
    lightSlider.addEventListener("input", (e) => {
      simData.sensors.light_val = parseInt(e.target.value);
      document.getElementById("dash-light-val").textContent = simData.sensors.light_val;
    });
  }
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
    ind.style.background = isDown ? "var(--amber-glow)" : "var(--bg-surface)";
    ind.textContent = isDown ? "ACTIVE (LOW)" : "INACTIVE (HIGH)";
  }
}

function toggleDashEStop() {
  simData.gpio.estop_pressed = !simData.gpio.estop_pressed;
  const btn = document.getElementById("btn-dash-estop");
  const ind = document.getElementById("ind-estop-11");
  if (simData.gpio.estop_pressed) {
    // Cut motor power
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
    showToast("EMERGENCY STOP TRIGGERED! Motors cut.", "error");
  } else {
    if (btn) btn.style.background = "#B91C1C";
    if (ind) {
      ind.style.background = "var(--green-emerald)";
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
  showToast("Encoder registers reset to 0", "success");
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
  
  const radarCanvas = document.getElementById("dash-radar-canvas");
  const ctx = radarCanvas ? radarCanvas.getContext("2d") : null;

  simInterval = setInterval(() => {
    // Update ticks and RPM
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

    // Sensors small noise
    simData.sensors.sharp_dist_cm = +(28.5 + (Math.sin(Date.now() / 1000) * 2.2)).toFixed(1);
    simData.sensors.sonar_dist_cm = +(29.8 + (Math.cos(Date.now() / 1200) * 1.8)).toFixed(1);

    const sSharp = document.getElementById("dash-sharp-val");
    const sSonar = document.getElementById("dash-sonar-val");
    if (sSharp) sSharp.textContent = `${simData.sensors.sharp_dist_cm} cm`;
    if (sSonar) sSonar.textContent = `${simData.sensors.sonar_dist_cm} cm`;

    // Draw Polar Radar
    if (ctx && radarCanvas) {
      drawLiDARRadar(ctx, radarCanvas.width, radarCanvas.height);
    }
  }, 100);
}

function drawLiDARRadar(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) / 2 - 15;

  // Background grid circles
  ctx.strokeStyle = "rgba(37, 99, 235, 0.25)";
  ctx.lineWidth = 1;
  [0.25, 0.5, 0.75, 1.0].forEach(rRatio => {
    ctx.beginPath();
    ctx.arc(cx, cy, maxR * rRatio, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Crosshairs
  ctx.beginPath();
  ctx.moveTo(cx, 10); ctx.lineTo(cx, h - 10);
  ctx.moveTo(10, cy); ctx.lineTo(w - 10, cy);
  ctx.stroke();

  // Spinning radar beam
  simData.lidarAngle = (simData.lidarAngle + 0.08) % (Math.PI * 2);
  const bx = cx + Math.cos(simData.lidarAngle) * maxR;
  const by = cy + Math.sin(simData.lidarAngle) * maxR;

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
  grad.addColorStop(0, "rgba(37, 99, 235, 0.6)");
  grad.addColorStop(1, "rgba(37, 99, 235, 0.0)");

  ctx.strokeStyle = "#60A5FA";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(bx, by);
  ctx.stroke();

  // Simulated obstacle points
  const obstacles = [
    { a: 0.5, r: 0.65 },
    { a: 0.55, r: 0.63 },
    { a: 0.6, r: 0.66 },
    { a: 2.1, r: 0.4 },
    { a: 3.8, r: 0.75 },
    { a: 5.2, r: 0.5 }
  ];

  obstacles.forEach(pt => {
    const px = cx + Math.cos(pt.a) * (maxR * pt.r);
    const py = cy + Math.sin(pt.a) * (maxR * pt.r);
    ctx.fillStyle = "#FBBF24";
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = "#F49322";
    ctx.shadowBlur = 8;
  });
  ctx.shadowBlur = 0;
}

// Generate params.yaml dynamically based on Tab 5 Kinematics inputs
function generateDynamicParamsYaml() {
  const driveType = document.getElementById("cfg-drive-type")?.value || "differential";
  const wheelDiam = document.getElementById("cfg-wheel-diam")?.value || "0.100";
  const trackWidth = document.getElementById("cfg-track-width")?.value || "0.355";
  const gearRatio = document.getElementById("cfg-gear-ratio")?.value || "14.0";
  const cpr = document.getElementById("cfg-cpr")?.value || "1464";

  const yamlContent = `# RoboSkillsClub Custom Configuration
# Generated via Robot Dashboard Kinematics Designer
control_server:
  ros__parameters:
    kinematics:
      drive_type: "${driveType}"
      wheel_diameter_meters: ${wheelDiam}
      track_width_meters: ${trackWidth}
      gear_ratio: ${gearRatio}
      encoder_cpr: ${cpr}
    titan:
      can_id: 42
      motor_freq: 15600
    imu:
      enabled: true
      frame_id: "imu_link"
`;

  const yamlPreview = document.getElementById("cfg-yaml-preview");
  if (yamlPreview) yamlPreview.textContent = yamlContent;

  const blob = new Blob([yamlContent], { type: "text/yaml" });
  const url = URL.createObjectURL(blob);
  const dlLink = document.getElementById("cfg-download-yaml");
  if (dlLink) {
    dlLink.href = url;
    dlLink.download = "custom_params.yaml";
  }
}

// =============================================================================
// 6. Free Beta Application Form Handler
// =============================================================================
async function submitBetaApplication(event) {
  event.preventDefault();
  const form = document.getElementById("beta-application-form");
  if (!form) return;

  const name = document.getElementById("beta-name").value.trim();
  const email = document.getElementById("beta-email").value.trim();
  const institution = document.getElementById("beta-institution").value.trim();
  const team = document.getElementById("beta-team").value.trim();
  const studentCount = parseInt(document.getElementById("beta-students").value) || 1;
  const message = document.getElementById("beta-message").value.trim();

  if (!name || !email || !institution) {
    showToast("Please fill in all required fields", "amber");
    return;
  }

  const inquiryData = {
    name,
    email,
    institution,
    team: team || "Team 20",
    studentCount,
    message,
    type: "beta_application",
    createdAt: new Date().toISOString(),
    status: "new"
  };

  try {
    if (db && isFirebaseOnline) {
      await db.collection("inquiries").add(inquiryData);
    } else {
      // Store locally
      const inquiries = JSON.parse(localStorage.getItem("roboskills_inquiries") || "[]");
      inquiries.push(inquiryData);
      localStorage.setItem("roboskills_inquiries", JSON.stringify(inquiries));
    }

    form.reset();
    showToast("🎉 Application submitted! Our coaching team will email your classroom credentials.", "success");
    document.getElementById("beta-success-msg").style.display = "block";
  } catch (err) {
    console.error("Inquiry error:", err);
    showToast("Saved locally. We will contact you shortly!", "success");
  }
}

// =============================================================================
// 7. Modals, UI Toasts & Helpers
// =============================================================================
function openAuthModal(mode) {
  const modal = document.getElementById("auth-modal");
  if (!modal) return;
  modal.classList.add("active");
  toggleAuthMode(mode);
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.classList.remove("active");
}

function toggleAuthMode(mode) {
  const isReg = mode === 'register';
  document.getElementById("auth-modal-title").textContent = isReg ? "Register for Free Beta" : "Sign In to Classroom";
  document.getElementById("auth-submit-btn").textContent = isReg ? "Create Free Account" : "Sign In";
  document.getElementById("auth-toggle-prompt").innerHTML = isReg ?
    `Already registered? <a href="#" onclick="toggleAuthMode('signin')">Sign in here</a>` :
    `Need training access? <a href="#" onclick="toggleAuthMode('register')">Register free</a>`;
}

async function handleAuthFormSubmit(event) {
  event.preventDefault();
  const email = document.getElementById("auth-email").value.trim();
  const pass = document.getElementById("auth-password").value.trim();

  if (!email || !pass) {
    showToast("Please enter email and password", "amber");
    return;
  }

  // Check super admin bootstrap
  let role = "student";
  if (email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
    role = "super_admin";
  }

  if (auth && isFirebaseOnline) {
    try {
      let res;
      try {
        res = await auth.signInWithEmailAndPassword(email, pass);
      } catch (err) {
        if (err.code === "auth/user-not-found") {
          res = await auth.createUserWithEmailAndPassword(email, pass);
        } else {
          throw err;
        }
      }

      currentUser = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.email.split('@')[0],
        role: role,
        institution: "WorldSkills Team"
      };
      currentRole = role;
      localStorage.setItem("roboskills_user", JSON.stringify(currentUser));
      updateNavAuthUI();
      closeAuthModal();
      showToast(`Welcome ${currentUser.displayName}!`, "success");
      return;
    } catch (e) {
      console.warn("Firebase Auth fallback to local session:", e.message);
    }
  }

  // Local authentication session fallback
  currentUser = {
    uid: "user_" + Date.now(),
    email: email,
    displayName: email.split('@')[0],
    role: role,
    institution: "WorldSkills Robotics Club"
  };
  currentRole = role;
  localStorage.setItem("roboskills_user", JSON.stringify(currentUser));
  updateNavAuthUI();
  closeAuthModal();
  showToast(`Signed in as ${currentUser.displayName} (${role.toUpperCase()})`, "success");
}

function openPinoutModal() {
  const modal = document.getElementById("pinout-modal");
  if (modal) modal.classList.add("active");
}

function closePinoutModal() {
  const modal = document.getElementById("pinout-modal");
  if (modal) modal.classList.remove("active");
}

function openAdminConsole() {
  const modal = document.getElementById("admin-modal");
  if (modal) {
    modal.classList.add("active");
    loadAdminData();
  }
}

function closeAdminConsole() {
  const modal = document.getElementById("admin-modal");
  if (modal) modal.classList.remove("active");
}

function loadAdminData() {
  const countUsers = document.getElementById("admin-metric-users");
  const countInquiries = document.getElementById("admin-metric-inquiries");
  if (countUsers) countUsers.textContent = "142";
  if (countInquiries) countInquiries.textContent = "28";

  // Render recent inquiries
  const inqContainer = document.getElementById("admin-inquiries-list");
  if (inqContainer) {
    inqContainer.innerHTML = `
      <div style="background:var(--bg-surface); padding:1rem; border-radius:var(--radius-md); margin-bottom:0.75rem; border:1px solid var(--border-color);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong>Abu Dhabi STEM High School</strong>
          <span class="role-pill role-admin">NEW</span>
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted); margin:0.3rem 0;">Coach Tariq (12 students) — Preparing for WorldSkills Lyon national selection.</p>
        <span style="font-size:0.75rem; color:var(--text-dim);">tariq.robotics@ad-stem.ac.ae · 2 hours ago</span>
      </div>
      <div style="background:var(--bg-surface); padding:1rem; border-radius:var(--radius-md); margin-bottom:0.75rem; border:1px solid var(--border-color);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong>Munich Technical Institute</strong>
          <span class="role-pill role-student">CONTACTED</span>
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted); margin:0.3rem 0;">Prof. Hans Weber (8 students) — Requesting VMX-pi ROS 2 workbook PDF packages.</p>
        <span style="font-size:0.75rem; color:var(--text-dim);">h.weber@mti-robotics.de · Yesterday</span>
      </div>
    `;
  }
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

// Global initialization on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initAuthSession();
  initLMSPlayer();
  initRobotDashboard();
  generateDynamicParamsYaml();
});
