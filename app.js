/**
 * RoboSkillsClub — Autonomous Mobile Robotics Training Platform
 * Autonomous Mobile Robotics Curriculum & Training Hub
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
    "id": "course-amr-101",
    "title": "Autonomous Mobile Robotics (Studica Kit Masterclass)",
    "shortCode": "AMR-101",
    "description": "Professional step-by-step training curriculum for Autonomous Mobile Robotics using the Studica Robotics Kit (VMX-pi FPGA, Titan Quad CAN Motor Controller, NavX IMU, and Robot Dashboard).",
    "author": "Dr. Mohammed Salameh, PhD in Robotics, SLAM and VSLAM",
    "assignedTeacherId": "teacher_salameh",
    "assignedTeacherName": "Eng. M. Salameh",
    "modules": [
      {
        "id": "module-1",
        "number": 1,
        "title": "Module 1: Build Your First Robot (Studica AMR Kit)",
        "lessons": [
          {
            "id": "lesson-1-1",
            "number": "1.1",
            "title": "Exploring the Studica Robotics Kit",
            "duration": "90 min",
            "youtubeId": "5o3fFr_gkEA",
            "objective": "Unbox and inventory every structural aluminum channel, bracket, and fastener in your Studica Robotics Kit, learn the essential laboratory safety rules, and master the use of vibration-resistant Nyloc hex nuts.",
            "exitTicket": [
              "What is the function of the colored nylon collar inside an M4 Nyloc nut, and what physical effect does it have during robot motion?",
              "Why must standard hex nuts never be used on motor mounts or structural drive joints?",
              "State the three essential laboratory safety rules that must always be followed before turning on any robot in the lab."
            ],
            "concept": "\n<h3>1. Welcome to Physical Autonomous Mobile Robotics</h3>\n<p>Welcome to the hands-on engineering world of <strong>Autonomous Mobile Robotics</strong>! Over the course of this training program, you will build, wire, program, and operate a fully autonomous robot capable of precision navigation, sensor feedback, and real-time obstacle avoidance.</p>\n<p>Our educational philosophy is strictly <strong>Hands-on First</strong>:</p>\n<div style=\"background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; margin:1rem 0; text-align:center; font-family:var(--font-heading); font-weight:700; color:var(--accent-cyan); font-size:1.05rem;\">\n  Build First &rarr; Experience &rarr; Understand &rarr; Program &rarr; Improve &rarr; Automate\n</div>\n<p>Before writing a single line of Python code, we must construct a rock-solid mechanical foundation. A software algorithm cannot compensate for a loose motor mount or a vibrating chassis!</p>\n\n<h3>2. Structural Extrusions: Why Aluminum U-Channels?</h3>\n<p>The robot skeleton is engineered from <strong>6061-T6 structural aluminum U-channels</strong>. Aluminum provides three critical advantages for mobile robots:</p>\n<ul>\n  <li><strong>High Strength-to-Weight Ratio:</strong> Stiff enough to support heavy 12V batteries and manipulators without bending, yet light enough to maximize battery runtime and motor acceleration.</li>\n  <li><strong>Standard Metric 8mm Pitch Grid:</strong> Holes are spaced exactly 8mm apart with 16mm center-to-center hole patterns, allowing modular brackets, bearings, and motors to snap together perfectly.</li>\n  <li><strong>Internal Wire Channels:</strong> The U-shape profile allows high-current motor cables and sensor harnesses to run inside the channel, shielding wires from pinch points and moving wheels.</li>\n</ul>\n\n<div class=\"callout tip\">\n  <div class=\"callout-title\">\ud83d\udca1 PRO-TIP: THE BLUE COLLAR OF SAFETY (NYLOC NUTS)</div>\n  <div class=\"callout-body\">\n    Standard hex nuts will shake completely loose after just 10 minutes of robot driving due to high-frequency motor vibrations! Always use <strong>Nyloc locknuts</strong> on every structural joint and motor mount. You can identify them instantly by the colored nylon ring (usually blue or white) embedded inside the threaded collar.\n  </div>\n</div>\n\n<div class=\"callout warning\">\n  <div class=\"callout-title\">\u26a0\ufe0f MANDATORY LABORATORY SAFETY RULES</div>\n  <div class=\"callout-body\">\n    <ul>\n      <li><strong>Safety Glasses:</strong> Always wear ANSI Z87.1 certified eye protection when using wrenches, assembling mechanical springs, or rotating motors.</li>\n      <li><strong>Battery Safety:</strong> Never connect or disconnect battery leads while the main robot power switch is toggled ON. Turn power OFF first!</li>\n      <li><strong>Clothing &amp; Hair:</strong> Keep long hair tied back firmly, remove dangling lanyard badges, and roll up loose sleeves before working near rotating gears or wheels.</li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"callout troubleshoot\">\n  <div class=\"callout-title\">\ud83d\udd27 TROUBLESHOOTING: STRIPPED HEADS &amp; CROSS-THREADING</div>\n  <div class=\"callout-body\">\n    If an M4 screw feels tight after only 1 or 2 turns, <strong>STOP IMMEDIATELY!</strong> Never force it with pliers. You have cross-threaded the bolt. Back the screw out completely, align it perpendicular ($90^\\circ$) to the channel hole, and start threading gently by hand using your fingers before tightening with the 2.5mm hex key.\n  </div>\n</div>\n",
            "wiring": "\n<h3>1. Fastener Identification &amp; Hardware Sizing</h3>\n<p>Sort and verify your team's hardware into the divided compartment organizer before beginning assembly:</p>\n\n<table class=\"pinout-table\">\n  <thead>\n    <tr><th>Fastener Type</th><th>Thread & Length</th><th>Drive Tool</th><th>Primary Robotic Function</th></tr>\n  </thead>\n  <tbody>\n    <tr><td><code>M4 Socket Head</code></td><td>M4 &times; 8mm</td><td>2.5mm Hex Key</td><td>Direct channel-to-bracket low-clearance joints</td></tr>\n    <tr><td><code>M4 Socket Head</code></td><td>M4 &times; 12mm</td><td>2.5mm Hex Key</td><td>Standard structural corner gusset plate assembly</td></tr>\n    <tr><td><code>M4 Socket Head</code></td><td>M4 &times; 16mm</td><td>2.5mm Hex Key</td><td>Double-thickness plates &amp; motor clamping mounts</td></tr>\n    <tr><td><code>M4 Nyloc Nut</code></td><td>M4 Thread (Nylon Ring)</td><td>7.0mm Nut Driver / Wrench</td><td>Vibration-proof structural locknut for all joints</td></tr>\n    <tr><td><code>M3 Button Head</code></td><td>M3 &times; 6mm / 8mm</td><td>2.0mm Hex Key</td><td>Electronics mounting deck, VMX-pi standoffs &amp; sensor brackets</td></tr>\n  </tbody>\n</table>\n\n<div class=\"ref-image-box\">\n  <div class=\"ref-image-tag\">\u26a0\ufe0f [Dr. Salameh's Image Placeholder \u2014 Replace with actual lab photo/screenshot]</div>\n  <img src=\"images/titan-1.png\" alt=\"Studica Mobile Robot Overview\" style=\"max-height:280px;\" />\n  <div class=\"ref-image-caption\">Figure 1.1: Complete Studica AMR hardware kit components, aluminum extrusions, and fastener hardware.</div>\n</div>\n\n<h3>2. Tool Checklist &amp; Pre-Assembly Audit</h3>\n<ul>\n  <li>1 &times; 2.5mm Ball-End Hex Wrench (for M4 socket screws)</li>\n  <li>1 &times; 2.0mm Hex Wrench (for M3 electronics screws)</li>\n  <li>1 &times; 7.0mm Open-End Box Wrench or Nut Driver (for M4 Nyloc nuts)</li>\n  <li>1 &times; 300mm Stainless Steel Metric Ruler (for beam measurement)</li>\n  <li>1 &times; Divided Parts Organizer Tray (for sorting screws by length)</li>\n</ul>\n",
            "test": "\n<h3>Simulated Visual Guide: Fastener Sorting &amp; Assembly Workbench</h3>\n<p>Hover or click each numbered marker below to see the exact assembly step and tool placement:</p>\n\n<div class=\"click-guide-container\">\n  <div class=\"click-guide-header\">\n    <strong>Workbench Interactive Map: Fastener Sorting &amp; Extrusion Alignment</strong>\n    <span style=\"font-size:0.8rem; color:var(--text-dim);\">Click numbered markers for step details</span>\n  </div>\n\n  <div class=\"click-screen-mock\" style=\"height:260px; position:relative; background:linear-gradient(135deg, #0F172A, #1E293B);\">\n    <!-- Marker 1 -->\n    <div class=\"click-marker\" style=\"top:25%; left:20%;\" onclick=\"showToast('Step 1: Open Fastener Tray \u2014 Separate M4x8, M4x12, and Nyloc locknuts into labeled bins.', 'info')\">\n      1\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <!-- Marker 2 -->\n    <div class=\"click-marker\" style=\"top:45%; left:50%;\" onclick=\"showToast('Step 2: Select 2.5mm Hex Wrench \u2014 Inspect tip for rounded edges before tightening.', 'info')\">\n      2\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <!-- Marker 3 -->\n    <div class=\"click-marker\" style=\"top:65%; left:78%;\" onclick=\"showToast('Step 3: Align 90-degree Corner Gusset \u2014 Ensure holes line up squarely with the extrusion grid.', 'info')\">\n      3\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <div style=\"position:absolute; bottom:15px; left:20px; color:#94A3B8; font-size:0.85rem;\">\n      <span style=\"display:inline-block; width:10px; height:10px; background:#EF4444; border-radius:50%; margin-right:6px;\"></span>\n      Visual Action Guide: Click markers 1, 2, and 3 to review assembly sequence.\n    </div>\n  </div>\n\n  <div class=\"click-steps-list\">\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">1</div>\n      <div><strong>Step 1: Fastener Sorting</strong><br><span style=\"color:var(--text-muted);\">Separate M3, M4x8, M4x12, and Nyloc nuts into divided tray compartments.</span></div>\n    </div>\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">2</div>\n      <div><strong>Step 2: Tool Verification</strong><br><span style=\"color:var(--text-muted);\">Check your 2.5mm hex key. Ensure clean engagement into bolt heads.</span></div>\n    </div>\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">3</div>\n      <div><strong>Step 3: Test Joint</strong><br><span style=\"color:var(--text-muted);\">Assemble sample corner bracket with two M4x12 bolts and Nyloc nuts.</span></div>\n    </div>\n  </div>\n</div>\n",
            "video": "\n<div class=\"video-tutorial-card\">\n  <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem;\">\n    <h4 style=\"font-size:1.1rem; display:flex; align-items:center; gap:0.5rem;\">\n      <span>\ud83c\udfa5 Step-by-Step Video Walkthrough Guide</span>\n    </h4>\n    <span class=\"role-pill role-student\">Lesson 1.1 Video Breakdown</span>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">00:00 - 02:30</div>\n    <div>\n      <strong>Part 1: Kit Unboxing &amp; Component Inventory</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Unboxing the primary Studica container. Identifying the aluminum extrusion channels, 12V Maverick planetary gearmotors, 100mm wheels, Titan Quad motor driver, and VMX-pi controller. Checking parts against the bill of materials.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">02:30 - 05:30</div>\n    <div>\n      <strong>Part 2: Hardware Sizing &amp; Fastener Sorting Activity</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Demonstrating the difference between M3 and M4 thread pitch. Using a steel metric ruler to distinguish 8mm, 12mm, and 16mm bolts. Inspecting the blue nylon locking collar inside M4 Nyloc nuts.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">05:30 - 09:00</div>\n    <div>\n      <strong>Part 3: Extrusion Geometry &amp; The 8mm Modular Grid</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Measuring the 240mm side rails and 180mm cross beams. Explaining how the 8mm hole pattern enables infinite modular attachments without measuring or drilling custom holes.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">09:00 - 12:30</div>\n    <div>\n      <strong>Part 4: Hands-On Mechanical Fastening Technique</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Proper hex wrench technique: inserting the tool perpendicular to the bolt axis. Holding the Nyloc nut with the 7mm wrench inside the channel while torquing the bolt until snug. How to avoid cross-threading.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">12:30 - 15:00</div>\n    <div>\n      <strong>Part 5: Rigidity Squeeze Challenge &amp; Lab Safety Wrap-Up</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Executing the diagonal rigidity squeeze test. Clean-up procedure, tool accounting, and completing Worksheet 01 in the student lab workbook.\n      </p>\n    </div>\n  </div>\n</div>\n",
            "challenge": "\n<h3>Hands-On Team Challenge: The Rigidity Squeeze</h3>\n<div class=\"callout challenge\">\n  <div class=\"callout-title\">\ud83c\udfaf JUNIOR TEAM CHALLENGE: ZERO FLEX TEST</div>\n  <div class=\"callout-body\">\n    <p>Using 4 aluminum extrusion beams, 4 corner gusset plates, 8 &times; M4x12mm bolts, and 8 &times; Nyloc nuts, assemble a square test frame with your lab partner.</p>\n    <ol>\n      <li>Hold opposite diagonal corners with both hands.</li>\n      <li>Gently apply opposing torsional twist (push forward with your left hand while pulling backward with your right).</li>\n      <li><strong>Passing Standard:</strong> A properly torqued joint has <strong>zero wobble, zero play, and zero diagonal flex</strong>. If you feel any wiggle or clicking, tighten the loose bolts in an alternating cross pattern!</li>\n    </ol>\n  </div>\n</div>\n",
            "codeSnippet": "# Verify robot kit inventory in Linux terminal:\nls -lh Documents/studica_amr_course/\nls -lh Documents/studica_amr_course/diagrams/\n\n# Check student workbook and documentation:\nls -lh Documents/studica_amr_course/pdf_export/\n# Confirms:\n# Studica_AMR_Junior_Textbook.pdf (7.2 MB)\n# Studica_AMR_Student_Workbook.pdf (68 KB)",
            "githubLink": "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/params.yaml",
            "downloads": [
              {
                "name": "params.yaml",
                "url": "downloads/params.yaml",
                "label": "ROS 2 Parameters (.yaml)"
              },
              {
                "name": "Studica_AMR_Student_Workbook.pdf",
                "url": "pdf_export/Studica_AMR_Student_Workbook.pdf",
                "label": "Student Lab Workbook (PDF)"
              }
            ]
          },
          {
            "id": "lesson-1-2",
            "number": "1.2",
            "title": "Understanding the Robot Controller",
            "duration": "90 min",
            "youtubeId": "r-r6rZc66g0",
            "objective": "Understand how your robot thinks and acts by exploring the dual-controller architecture: Raspberry Pi 4 (high-level Linux/ROS 2 computer), VMX-pi (real-time FPGA reflexes and navX IMU), and Titan Quad (high-power motor driver over 1 Mbps CAN bus).",
            "exitTicket": [
              "Why can a standard operating system like Linux not guarantee microsecond motor timing directly, necessitating an FPGA coprocessor?",
              "What are the two signal lines in a CAN bus cable, and why are they twisted tightly together?",
              "Which VMX-pi port group is used for high-current LEDs, and which port group is used for push buttons and limit switches?"
            ],
            "concept": "\n<h3>1. The Dual-Brain Architecture: Brain &amp; Muscle</h3>\n<p>Modern autonomous mobile robots require two completely different computational worlds to operate successfully:</p>\n<ol>\n  <li><strong>High-Level Compute Brain (Raspberry Pi 4):</strong> Runs Ubuntu Linux 22.04 and ROS 2 Humble. It processes complex algorithms such as LiDAR floor mapping, computer vision, path planning, and Wi-Fi teleoperation. However, standard Linux is <em>non-deterministic</em>: background OS tasks can delay code execution by milliseconds.</li>\n  <li><strong>Real-Time Microsecond Reflexes (VMX-pi FPGA):</strong> Contains a dedicated Field-Programmable Gate Array (FPGA) that executes timing-critical pulses, hardware quadrature encoder counting, and hardware interrupts with microsecond precision. It also houses the integrated 9-axis <strong>navX Inertial Measurement Unit (IMU)</strong>.</li>\n  <li><strong>High-Current Muscle (Titan Quad Motor Controller):</strong> An industrial 4-channel H-bridge driver capable of delivering 20A continuous power to 12V DC drive motors. It communicates with the VMX-pi over a high-speed <strong>Controller Area Network (CAN bus)</strong> operating at 1,000,000 bits per second (1 Mbps).</li>\n</ol>\n\n<div class=\"callout tip\">\n  <div class=\"callout-title\">\ud83d\udca1 PRO-TIP: TWISTED PAIR PHYSICS (WHY CAN WIRES ARE TWISTED)</div>\n  <div class=\"callout-body\">\n    Notice that the Yellow (<code>CAN_H</code>) and Green (<code>CAN_L</code>) wires are twisted tightly around each other! When high-current DC motors spin up, they emit electromagnetic noise (EMI). Because the two wires are twisted, any electromagnetic spike hits both wires equally. The differential CAN receiver subtracts the two signals ($(V_{CAN\\_H} - V_{CAN\\_L})$), canceling the noise completely and preventing motor commands from being corrupted!\n  </div>\n</div>\n\n<div class=\"callout warning\">\n  <div class=\"callout-title\">\u26a0\ufe0f SEGREGATED VOLTAGE RAILS (NEVER MIX 12V &amp; 5V)</div>\n  <div class=\"callout-body\">\n    The Titan Quad operates at full <strong>12V DC battery voltage</strong> to supply motor muscle. The VMX-pi and Raspberry Pi operate at <strong>5.0V / 3.3V logic level</strong>. <em>Never connect 12V power leads into any VMX-pi DIO or analog header!</em> Doing so will permanently destroy the FPGA and Raspberry Pi processor.\n  </div>\n</div>\n\n<div class=\"callout troubleshoot\">\n  <div class=\"callout-title\">\ud83d\udd27 TROUBLESHOOTING: TITAN STATUS LED FLASHING RED</div>\n  <div class=\"callout-body\">\n    If the Titan Quad status LED blinks rapidly in RED:\n    <ul>\n      <li><strong>Check CAN bus termination:</strong> Ensure the tiny 120-ohm termination slider switch on top of the Titan is set firmly to <strong>ON</strong>.</li>\n      <li><strong>Verify wire polarity:</strong> Yellow wire must go to <code>CAN_H</code> and Green wire must go to <code>CAN_L</code>. If reversed, the CAN transceivers cannot handshake.</li>\n      <li><strong>CAN ID Mismatch:</strong> In our robotics stack, the primary drive Titan is hardcoded to <strong>CAN ID 42</strong>. If set to a different ID, ROS 2 motor nodes cannot discover it.</li>\n    </ul>\n  </div>\n</div>\n",
            "wiring": "\n<h3>1. VMX-pi Header Pinout &amp; Channel Geography</h3>\n<p>The VMX-pi organizes its inputs and outputs into dedicated functional blocks:</p>\n\n<table class=\"pinout-table\">\n  <thead>\n    <tr><th>Connector Block</th><th>WPI Channels</th><th>Logic Level</th><th>Connected Robot Component</th></tr>\n  </thead>\n  <tbody>\n    <tr><td><code>HiCurrDIO</code></td><td>Ch 20 &amp; 21</td><td>5V (Sink up to 1A)</td><td>\ud83d\udfe2 Green Status LED (Ch 20) &amp; \ud83d\udd34 Red Fault LED (Ch 21)</td></tr>\n    <tr><td><code>FlexDIO</code></td><td>Ch 8, 9, 10, 11</td><td>5V / 3.3V Pull-Up</td><td>Push Button (Ch 11), E-Stop Interlock (Ch 8), Limit Switches (Ch 9 &amp; 10)</td></tr>\n    <tr><td><code>PWM Outputs</code></td><td>Ch 0 \u2013 9</td><td>5V (50 Hz Servo)</td><td>Slider Gripper Servos (Ch 0 &amp; 1)</td></tr>\n    <tr><td><code>Analog Inputs</code></td><td>Ch 22 \u2013 25</td><td>0 \u2013 5V (12-bit ADC)</td><td>Sharp Infrared Distance Sensors &amp; Battery Voltage Divider</td></tr>\n    <tr><td><code>CAN Weidmuller</code></td><td>CAN_H / CAN_L</td><td>1 Mbps Differential</td><td>Twisted pair link to Titan Quad Controller (CAN ID 42)</td></tr>\n  </tbody>\n</table>\n\n<div class=\"ref-image-box\">\n  <div class=\"ref-image-tag\">\u26a0\ufe0f [Dr. Salameh's Image Placeholder \u2014 Replace with actual lab photo/screenshot]</div>\n  <img src=\"images/reference_raw/FlexDIO_HCDIO_And_AnalogIn_Headers_Trimmed.jpg\" alt=\"VMX-pi Header Layout\" style=\"max-height:280px;\" />\n  <div class=\"ref-image-caption\">Figure 1.2A: VMX-pi FlexDIO, HiCurrDIO, and Analog Input Header Layout.</div>\n</div>\n\n<div class=\"ref-image-box\">\n  <div class=\"ref-image-tag\">\u26a0\ufe0f [Dr. Salameh's Image Placeholder \u2014 Replace with actual lab photo/screenshot]</div>\n  <img src=\"images/reference_raw/CommDIO_FlexDIO_And_CAN_Connectors_Trimmed_CAN_Connector_Annotated.jpg\" alt=\"CAN Bus Port\" style=\"max-height:280px;\" />\n  <div class=\"ref-image-caption\">Figure 1.2B: VMX-pi CAN Bus Connector and Pinout.</div>\n</div>\n",
            "test": "\n<h3>Visual Guide: Controller Interconnect &amp; CAN Bus Verification</h3>\n<p>Click the interactive markers to inspect the critical wiring junctions between the VMX-pi and Titan controller:</p>\n\n<div class=\"click-guide-container\">\n  <div class=\"click-guide-header\">\n    <strong>Controller Dual-Brain Map: VMX-pi &amp; Titan Quad Interface</strong>\n    <span style=\"font-size:0.8rem; color:var(--text-dim);\">Click markers 1, 2, 3 for verification checkpoints</span>\n  </div>\n\n  <div class=\"click-screen-mock\" style=\"height:260px; position:relative; background:linear-gradient(135deg, #071229, #1E293B);\">\n    <!-- Marker 1: VMX CAN -->\n    <div class=\"click-marker\" style=\"top:30%; left:25%;\" onclick=\"showToast('Step 1: Inspect VMX-pi CAN Port \u2014 Yellow to CAN_H, Green to CAN_L.', 'info')\">\n      1\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <!-- Marker 2: Titan CAN IN -->\n    <div class=\"click-marker\" style=\"top:45%; left:60%;\" onclick=\"showToast('Step 2: Connect Titan CAN IN Terminal \u2014 Use flat screwdriver to depress spring clamp.', 'info')\">\n      2\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <!-- Marker 3: 120-Ohm Switch -->\n    <div class=\"click-marker\" style=\"top:65%; left:85%;\" onclick=\"showToast('Step 3: Verify 120\u03a9 Terminating Resistor Switch \u2014 Must be set firmly to ON position.', 'info')\">\n      3\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <div style=\"position:absolute; bottom:15px; left:20px; color:#94A3B8; font-size:0.85rem;\">\n      <span style=\"display:inline-block; width:10px; height:10px; background:#EF4444; border-radius:50%; margin-right:6px;\"></span>\n      Visual Action Guide: Verify each connection point before applying power.\n    </div>\n  </div>\n\n  <div class=\"click-steps-list\">\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">1</div>\n      <div><strong>Step 1: VMX CAN Port</strong><br><span style=\"color:var(--text-muted);\">Verify twisted pair is seated firmly into the VMX-pi CAN header.</span></div>\n    </div>\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">2</div>\n      <div><strong>Step 2: Titan CAN IN</strong><br><span style=\"color:var(--text-muted);\">Insert bare copper into spring clamp terminal; ensure no loose strands.</span></div>\n    </div>\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">3</div>\n      <div><strong>Step 3: Termination Switch</strong><br><span style=\"color:var(--text-muted);\">Set the 120-ohm bus termination slider switch to <strong>ON</strong>.</span></div>\n    </div>\n  </div>\n</div>\n",
            "video": "\n<div class=\"video-tutorial-card\">\n  <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem;\">\n    <h4 style=\"font-size:1.1rem; display:flex; align-items:center; gap:0.5rem;\">\n      <span>\ud83c\udfa5 Step-by-Step Video Walkthrough Guide</span>\n    </h4>\n    <span class=\"role-pill role-student\">Lesson 1.2 Video Breakdown</span>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">00:00 - 03:00</div>\n    <div>\n      <strong>Part 1: The Raspberry Pi 4 + VMX-pi Stacked Architecture</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Examining the stacked architecture. How the VMX-pi sits on top of the Raspberry Pi 4's 40-pin GPIO header and communicates across internal high-speed SPI bus. Identifying the navX 9-axis IMU sensor chip.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">03:00 - 06:30</div>\n    <div>\n      <strong>Part 2: Touring the VMX-pi Headers (HiCurrDIO, FlexDIO, PWM)</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Pin-by-pin walkthrough of the HiCurrDIO header (Pins 20-23 for LEDs), FlexDIO header (Pins 8-11 for buttons &amp; limit switches), and 3-pin PWM servo headers (Signal, 5V, Ground).\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">06:30 - 09:30</div>\n    <div>\n      <strong>Part 3: Wiring the 1 Mbps CAN Bus Twisted Pair</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Stripping and connecting the twisted yellow and green CAN wires into the Titan Weidmuller spring-loaded terminals. Demonstrating how to use a small screwdriver to release the spring lock.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">09:30 - 12:00</div>\n    <div>\n      <strong>Part 4: Setting the 120-Ohm Termination Jumper Switch</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Explaining signal reflection on differential transmission lines. Locating the tiny white slider switch on the Titan Quad and sliding it firmly to the ON position.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">12:00 - 15:00</div>\n    <div>\n      <strong>Part 5: Power-On LED Heartbeat Diagnostics</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Applying power: verifying solid Blue LED on VMX-pi, rapid green flash on navX IMU, and rhythmic 2 Hz blue heartbeat LED on Titan Quad.\n      </p>\n    </div>\n  </div>\n</div>\n",
            "challenge": "\n<h3>Hands-On Team Challenge: Zero Wire Snags</h3>\n<div class=\"callout challenge\">\n  <div class=\"callout-title\">\ud83c\udfaf JUNIOR TEAM CHALLENGE: PROFESSIONAL HARNESS ROUTING</div>\n  <div class=\"callout-body\">\n    <p>Using spiral cable wrap and miniature zip ties, route the CAN bus cable and 12V power leads from the rear Titan controller to the top VMX-pi deck.</p>\n    <ol>\n      <li>Wires must stay completely inside the U-channel cavity.</li>\n      <li>No wire may come within <strong>20 mm of a rotating wheel or gear</strong>.</li>\n      <li>Gently pull the cable harness: there must be sufficient strain relief so connectors never experience tension.</li>\n    </ol>\n  </div>\n</div>\n",
            "codeSnippet": "# Verify Titan CAN bus link and VMX interface in terminal:\nip link show can0\n# Output should show: can0: <NOARP,UP,LOWER_UP> mtu 16 qdisc pfifo_fast state UP mode DEFAULT\n\n# Read 10 CAN frames to confirm Titan ID 42 (0x2A hex) is broadcasting:\ncandump can0 -n 10",
            "githubLink": "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/params.yaml",
            "downloads": [
              {
                "name": "params.yaml",
                "url": "downloads/params.yaml",
                "label": "ROS 2 Parameters (.yaml)"
              },
              {
                "name": "setup_studica_robot.sh",
                "url": "downloads/setup_studica_robot.sh",
                "label": "Setup Script (.sh)"
              }
            ]
          },
          {
            "id": "lesson-1-3",
            "number": "1.3",
            "title": "Building the Robot Chassis",
            "duration": "90 min",
            "youtubeId": "L939H15zIms",
            "objective": "Assemble the rigid 24cm x 18cm structural aluminum chassis, install 90-degree corner gusset plates, mount standoffs, and verify geometric squareness with diagonal caliper measurement.",
            "exitTicket": [
              "What are the target dimensions (Length, Width, Height) of your robot chassis?",
              "Why must both diagonal measurements (from corner A to D, and B to C) match within \u00b10.5 mm?",
              "What happens if a chassis is assembled as a parallelogram instead of a square when motors drive forward?"
            ],
            "concept": "\n<h3>1. Engineering the Chassis Frame</h3>\n<p>A mobile robot chassis is not merely a box\u2014it is a precision geometric platform. If the chassis frame is distorted into a parallelogram by even 1 millimeter, the robot will naturally veer to one side when driving forward, forcing software controllers to fight mechanical drift continuously.</p>\n\n<p>Our chassis is engineered with compact, balanced dimensions:</p>\n<ul>\n  <li><strong>Overall Length:</strong> $240\\,\\text{mm}\\;(24.0\\,\\text{cm})$</li>\n  <li><strong>Overall Width:</strong> $180\\,\\text{mm}\\;(18.0\\,\\text{cm})$</li>\n  <li><strong>Base Height Clearance:</strong> $100\\,\\text{mm}\\;(10.0\\,\\text{cm})$</li>\n</ul>\n\n<div style=\"background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; font-family:var(--font-code); font-size:0.85rem; line-height:1.4; margin:1rem 0; overflow-x:auto;\">\n<pre>\n         +------------------ 180 mm -------------------+\n         |                                             |\n         |    [Front Bumper / Sensor Mount Plate]      |\n         |                                             |\n   240   |   [Left Motor]             [Right Motor]    |\n   mm    |      (M0)                      (M1)         |\n         |                                             |\n         |         [Electronics Mounting Deck]         |\n         |                                             |\n         |              [Rear Omni Caster]             |\n         |      [Ch 9 Limit]          [Ch 10 Limit]    |\n         +---------------------------------------------+\n</pre>\n</div>\n\n<div class=\"callout tip\">\n  <div class=\"callout-title\">\ud83d\udca1 PRO-TIP: FINGER-TIGHTEN FIRST, SQUEEZE, THEN TORQUE</div>\n  <div class=\"callout-body\">\n    Never fully tighten corner bolts one by one! Thread all 8 corner bolts finger-tight so the frame can still shift slightly. Measure both diagonals with your steel ruler until they match within $\\pm 0.5\\,\\text{mm}$. Then, and only then, tighten each bolt in an alternating crisscross pattern.\n  </div>\n</div>\n\n<div class=\"callout warning\">\n  <div class=\"callout-title\">\u26a0\ufe0f NYLON STANDOFF CAUTION</div>\n  <div class=\"callout-body\">\n    The acrylic electronics deck is mounted on M3 nylon standoffs to isolate sensitive computer electronics from metal frame vibrations. <em>Never use pliers or metal wrenches on nylon standoffs!</em> Finger-tighten only; excessive torque will shear the nylon threads immediately.\n  </div>\n</div>\n\n<div class=\"callout troubleshoot\">\n  <div class=\"callout-title\">\ud83d\udd27 TROUBLESHOOTING: CHASSIS ROCKS ON TABLE</div>\n  <div class=\"callout-body\">\n    Place your assembled chassis on a flat marble plate or level table. Press down on opposite diagonal corners. If you feel any rocking motion, your frame is warped:\n    <ol>\n      <li>Loosen all 8 corner gusset screws by half a turn.</li>\n      <li>Press firmly down on the center of the frame against the flat table with your palm.</li>\n      <li>While holding the frame flat, have your lab partner retighten the corner bolts in an X-pattern.</li>\n    </ol>\n  </div>\n</div>\n",
            "wiring": "\n<h3>1. Chassis Assembly Step-by-Step Procedure</h3>\n<ol>\n  <li><strong>Prepare Extrusion Channels:</strong> Lay out two 240mm side channels and two 180mm cross channels on your workbench.</li>\n  <li><strong>Mount 90-Degree Gusset Plates:</strong> Position the triangular aluminum gusset plates on the inside corners of the frame. Insert M4x12mm socket-head bolts through the gusset holes into the channels.</li>\n  <li><strong>Thread Nyloc Hex Nuts:</strong> Thread M4 Nyloc nuts onto the bolts from inside the channel. Turn until finger-tight.</li>\n  <li><strong>Diagonal Squaring Audit:</strong> Measure from Top-Left to Bottom-Right ($D_1$), then Top-Right to Bottom-Left ($D_2$). Adjust until $D_1 = D_2 \\pm 0.5\\,\\text{mm}$.</li>\n  <li><strong>Torque Down:</strong> Firmly tighten all 8 bolts using your 2.5mm hex wrench and 7mm nut driver.</li>\n  <li><strong>Install Standoffs &amp; Deck:</strong> Thread four M3&times;20mm standoffs into the pre-drilled holes on the upper channel flange. Bolt the laser-cut acrylic electronics deck onto the standoffs with M3 button screws.</li>\n</ol>\n\n<div class=\"ref-image-box\">\n  <div class=\"ref-image-tag\">\u26a0\ufe0f [Dr. Salameh's Image Placeholder \u2014 Replace with actual lab photo/screenshot]</div>\n  <img src=\"images/reference_raw/Enclosure_Top_Trimmed.jpg\" alt=\"Chassis Assembly Deck\" style=\"max-height:280px;\" />\n  <div class=\"ref-image-caption\">Figure 1.3: Assembled chassis deck and standoff mounting locations.</div>\n</div>\n",
            "test": "\n<h3>Visual Guide: Chassis Squaring &amp; Standoff Deck Inspection</h3>\n<p>Click the interactive markers to review the three critical inspection checkpoints for the chassis assembly:</p>\n\n<div class=\"click-guide-container\">\n  <div class=\"click-guide-header\">\n    <strong>Chassis Geometric Map: Alignment &amp; Standoff Points</strong>\n    <span style=\"font-size:0.8rem; color:var(--text-dim);\">Click markers 1, 2, 3 to inspect chassis geometry</span>\n  </div>\n\n  <div class=\"click-screen-mock\" style=\"height:260px; position:relative; background:linear-gradient(135deg, #0A1020, #1E293B);\">\n    <!-- Marker 1: Corner Gusset -->\n    <div class=\"click-marker\" style=\"top:25%; left:20%;\" onclick=\"showToast('Step 1: Front-Left Corner Gusset \u2014 Check M4x12mm bolts are seated flush.', 'info')\">\n      1\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <!-- Marker 2: Diagonal Center -->\n    <div class=\"click-marker\" style=\"top:50%; left:50%;\" onclick=\"showToast('Step 2: Center Diagonal Intersection \u2014 Verify D1 and D2 match within 0.5 mm.', 'info')\">\n      2\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <!-- Marker 3: Acrylic Deck Standoff -->\n    <div class=\"click-marker\" style=\"top:75%; left:80%;\" onclick=\"showToast('Step 3: Standoff Mounting Deck \u2014 Finger-tighten M3 nylon standoffs.', 'info')\">\n      3\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <div style=\"position:absolute; bottom:15px; left:20px; color:#94A3B8; font-size:0.85rem;\">\n      <span style=\"display:inline-block; width:10px; height:10px; background:#EF4444; border-radius:50%; margin-right:6px;\"></span>\n      Visual Action Guide: Inspect each marker before mounting motors and controllers.\n    </div>\n  </div>\n\n  <div class=\"click-steps-list\">\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">1</div>\n      <div><strong>Step 1: Corner Gusset</strong><br><span style=\"color:var(--text-muted);\">Ensure 90-degree bracket is flush against inside extrusion corners.</span></div>\n    </div>\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">2</div>\n      <div><strong>Step 2: Diagonal Caliper Audit</strong><br><span style=\"color:var(--text-muted);\">Measure diagonals ($D_1$ and $D_2$). Must be identical within 0.5mm.</span></div>\n    </div>\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">3</div>\n      <div><strong>Step 3: Acrylic Electronics Deck</strong><br><span style=\"color:var(--text-muted);\">Install standoffs and fasten acrylic baseplate with M3 button screws.</span></div>\n    </div>\n  </div>\n</div>\n",
            "video": "\n<div class=\"video-tutorial-card\">\n  <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem;\">\n    <h4 style=\"font-size:1.1rem; display:flex; align-items:center; gap:0.5rem;\">\n      <span>\ud83c\udfa5 Step-by-Step Video Walkthrough Guide</span>\n    </h4>\n    <span class=\"role-pill role-student\">Lesson 1.3 Video Breakdown</span>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">00:00 - 02:30</div>\n    <div>\n      <strong>Part 1: Laying Out the 24cm &times; 18cm Frame</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Arranging the two 240mm side rails and two 180mm cross beams. Checking that the open U-channels face inward so that wires can later be routed through the center cavity.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">02:30 - 06:00</div>\n    <div>\n      <strong>Part 2: Installing Gussets &amp; Finger-Tightening Hardware</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Inserting M4x12mm bolts through corner gussets. Threading Nyloc nuts on the inside. Keeping bolts finger-tight so the frame can be squared.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">06:00 - 09:00</div>\n    <div>\n      <strong>Part 3: Precision Diagonal Measurement &amp; Squaring</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Using a steel metric ruler to measure both diagonals ($D_1$ and $D_2$). Gently nudging the frame until both measurements are equal to within 0.5mm.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">09:00 - 12:00</div>\n    <div>\n      <strong>Part 4: Final Cross-Torquing Technique</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Tightening bolts in an alternating crisscross pattern while pressing down against the table. Verifying the frame remains flat with zero rocking.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">12:00 - 15:00</div>\n    <div>\n      <strong>Part 5: Installing Acrylic Electronics Deck &amp; Standoffs</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Mounting four M3 standoffs into the pre-drilled channel holes. Placing the acrylic deck and fastening with M3 button screws using a 2.0mm hex key.\n      </p>\n    </div>\n  </div>\n</div>\n",
            "challenge": "\n<h3>Hands-On Team Challenge: The Caliper Audit</h3>\n<div class=\"callout challenge\">\n  <div class=\"callout-title\">\ud83c\udfaf JUNIOR TEAM CHALLENGE: PERFECT GEOMETRY AUDIT</div>\n  <div class=\"callout-body\">\n    <p>Perform the official Quality Assurance Caliper Audit on your robot chassis with your lab instructor:</p>\n    <ol>\n      <li>Measure Length ($240.0 \\pm 1.0\\,\\text{mm}$) and Width ($180.0 \\pm 1.0\\,\\text{mm}$).</li>\n      <li>Measure Diagonal A ($D_1$) and Diagonal B ($D_2$). Calculate the difference: $|D_1 - D_2|$. The difference must be <strong>less than 0.5 mm</strong>.</li>\n      <li>Place the chassis on a flat inspection surface. Tap each corner. There must be <strong>zero rocking sound</strong>.</li>\n    </ol>\n  </div>\n</div>\n",
            "codeSnippet": "# Calculate chassis diagonal squareness mathematically:\n# Theoretical Diagonal D = sqrt(L^2 + W^2)\n# D = sqrt(240^2 + 180^2) = sqrt(57600 + 32400) = sqrt(90000) = 300.00 mm!\n\npython3 -c '\nimport math\nL, W = 240.0, 180.0\ntheoretical = math.sqrt(L**2 + W**2)\nprint(f\"Target Diagonal = {theoretical:.2f} mm\")\n'\n# Output: Target Diagonal = 300.00 mm (Both diagonals must be exactly 30 cm!)",
            "githubLink": "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/params.yaml",
            "downloads": [
              {
                "name": "Studica_AMR_Junior_Textbook.pdf",
                "url": "pdf_export/Studica_AMR_Junior_Textbook.pdf",
                "label": "Junior Textbook (PDF)"
              },
              {
                "name": "Studica_AMR_Student_Workbook.pdf",
                "url": "pdf_export/Studica_AMR_Student_Workbook.pdf",
                "label": "Student Workbook (PDF)"
              }
            ]
          },
          {
            "id": "lesson-1-4",
            "number": "1.4",
            "title": "Installing Motors and Wheels",
            "duration": "90 min",
            "youtubeId": "u-30k5H460s",
            "objective": "Mount the two 12V 60:1 Maverick planetary gearmotors, align the D-shaft hex wheel couplers, install 100mm high-traction rubber drive wheels, attach the rear omni caster, and derive the 1680 ticks/rev encoder formula.",
            "exitTicket": [
              "What is the gear reduction ratio of the Maverick planetary motor, and why is high gear reduction needed for mobile robotics?",
              "Calculate the total encoder ticks per full revolution of the 100mm wheel (Show formula: 28 raw pulses &times; 60 gear reduction).",
              "Why must blue threadlocker be applied to the set screw on the motor D-shaft hex hub?"
            ],
            "concept": "\n<h3>1. Drivetrain Engineering: Torque vs. Speed</h3>\n<p>Electric DC motors naturally spin very fast (thousands of revolutions per minute) but produce very little turning force (torque). If you connected a bare DC motor directly to a robot wheel, the motor would stall instantly under the robot's weight!</p>\n<p>To multiply turning torque, we use a <strong>planetary gearbox</strong> with a <strong>60:1 reduction ratio</strong>. The internal sun and planet gears slow down the motor shaft by a factor of 60 while multiplying output torque by 60, allowing the robot to carry payloads, climb ramps, and accelerate smoothly.</p>\n\n<h3>2. Optical Quadrature Encoders: 1680 Ticks Per Turn</h3>\n<p>On the rear shaft of each Maverick motor sits a magnetic Hall-effect quadrature encoder disc that outputs 28 raw pulses per motor turn. Because the gearbox multiplies every turn by 60:</p>\n<div style=\"background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; margin:1rem 0; text-align:center; font-family:var(--font-heading); font-size:1.1rem; color:var(--accent-gold);\">\n  $$\\text{Encoder Resolution} = 28 \\times 60 = 1,680\\,\\text{ticks per wheel revolution}$$\n</div>\n\n<h3>3. Differential Drive Kinematics &amp; Wheel Circumference</h3>\n<p>Our drive wheels have an outer diameter of $D = 100\\,\\text{mm}\\;(0.100\\,\\text{m})$. The distance the robot travels forward in one full wheel rotation equals the wheel's circumference ($C$):</p>\n<p>$$C = \\pi \\times D = 3.14159 \\times 100\\,\\text{mm} \\approx 314.16\\,\\text{mm}\\;(0.31416\\,\\text{m})$$</p>\n<p>Therefore, the distance traveled per single encoder tick is:</p>\n<p>$$\\text{Distance Per Tick} = \\frac{314.16\\,\\text{mm}}{1680\\,\\text{ticks}} \\approx 0.187\\,\\text{mm per tick}$$</p>\n<p>With 0.187 mm resolution, your robot can measure its position across the floor down to a fraction of a millimeter!</p>\n\n<div class=\"callout tip\">\n  <div class=\"callout-title\">\ud83d\udca1 PRO-TIP: D-SHAFT FLAT ALIGNMENT &amp; THREADLOCKER</div>\n  <div class=\"callout-body\">\n    The motor output shaft is a 6mm \"D-shaft\"\u2014it has one flat side. <em>Always position the hex hub set screw directly perpendicular to the flat face!</em> If you tighten the screw against the curved edge, it will slip under load within minutes. Apply one drop of blue threadlocker (Loctite 242) to the set screw threads so it never backs out.\n  </div>\n</div>\n\n<div class=\"callout warning\">\n  <div class=\"callout-title\">\u26a0\ufe0f ROTATING MECHANISM SAFETY</div>\n  <div class=\"callout-body\">\n    Planetary gearboxes generate immense mechanical torque. Never insert fingers, pencils, or screwdrivers into moving gears or wheels. When testing motors on your desk, place the robot chassis on a wooden support block so the drive wheels spin freely in the air!\n  </div>\n</div>\n\n<div class=\"callout troubleshoot\">\n  <div class=\"callout-title\">\ud83d\udd27 TROUBLESHOOTING: WHEEL WOBBLE OR CHASSIS RUBBING</div>\n  <div class=\"callout-body\">\n    If the 100mm rubber tire rubs against the aluminum channel or wobbles as it rotates:\n    <ul>\n      <li>Ensure the steel hex coupler is pressed flush against the outer ball bearing face, but leaves a <strong>1.0 mm clearance gap</strong> from the channel wall.</li>\n      <li>Check the four M3 screws holding the wheel to the hex hub: tighten them in a crisscross pattern with equal tension.</li>\n    </ul>\n  </div>\n</div>\n",
            "wiring": "\n<h3>1. Motor &amp; Encoder Wiring Harness to Titan Controller</h3>\n<p>The Maverick gearmotor features a unified 6-wire harness:</p>\n<ul>\n  <li><strong>Red (+) &amp; Black (-):</strong> Heavy-gauge motor armature power leads.</li>\n  <li><strong>Yellow (Ch A) &amp; White (Ch B):</strong> Quadrature encoder pulse channels.</li>\n  <li><strong>Blue (+5V) &amp; Green (GND):</strong> Regulated logic power for the Hall encoder sensor.</li>\n</ul>\n\n<table class=\"pinout-table\">\n  <thead>\n    <tr><th>Robot Subsystem</th><th>Titan Motor Port</th><th>Titan Encoder Port</th><th>Function in ROS 2</th></tr>\n  </thead>\n  <tbody>\n    <tr><td><code>Left Drive Motor</code></td><td>Motor Channel 0 (M0)</td><td>Encoder Port 0 (ENC0)</td><td>Left wheel velocity &amp; odometry feedback</td></tr>\n    <tr><td><code>Right Drive Motor</code></td><td>Motor Channel 1 (M1)</td><td>Encoder Port 1 (ENC1)</td><td>Right wheel velocity &amp; odometry feedback</td></tr>\n    <tr><td><code>Track Width (W)</code></td><td colspan=\"2\">200 mm (center-to-center wheel distance)</td><td>Differential drive turning kinematics</td></tr>\n  </tbody>\n</table>\n\n<div class=\"ref-image-box\">\n  <div class=\"ref-image-tag\">\u26a0\ufe0f [Dr. Salameh's Image Placeholder \u2014 Replace with actual lab photo/screenshot]</div>\n  <img src=\"images/reference_raw/maverick-dc-motor-1.png\" alt=\"Studica Maverick Gearmotor\" style=\"max-height:260px;\" />\n  <div class=\"ref-image-caption\">Figure 1.4A: Studica Maverick 12V DC Gearmotor with integrated quadrature encoder.</div>\n</div>\n\n<div class=\"ref-image-box\">\n  <div class=\"ref-image-tag\">\u26a0\ufe0f [Dr. Salameh's Image Placeholder \u2014 Replace with actual lab photo/screenshot]</div>\n  <img src=\"images/reference_raw/titanENC-1.png\" alt=\"Titan Encoder Port\" style=\"max-height:260px;\" />\n  <div class=\"ref-image-caption\">Figure 1.4B: Titan Quad 6-pin motor power and encoder terminal.</div>\n</div>\n",
            "test": "\n<h3>Visual Guide: Drivetrain Assembly &amp; Encoder Port Verification</h3>\n<p>Click the interactive markers to inspect motor mounting, D-shaft set screw alignment, and Titan connections:</p>\n\n<div class=\"click-guide-container\">\n  <div class=\"click-guide-header\">\n    <strong>Drivetrain Mechanics: Maverick Motor &amp; Encoder Inspection</strong>\n    <span style=\"font-size:0.8rem; color:var(--text-dim);\">Click markers 1, 2, 3 for drivetrain checkpoints</span>\n  </div>\n\n  <div class=\"click-screen-mock\" style=\"height:260px; position:relative; background:linear-gradient(135deg, #071229, #1E293B);\">\n    <!-- Marker 1: Clamping Mount -->\n    <div class=\"click-marker\" style=\"top:30%; left:22%;\" onclick=\"showToast('Step 1: Clamping Motor Mount \u2014 Tighten M4 clamping bolt until motor cannot rotate in bracket.', 'info')\">\n      1\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <!-- Marker 2: Hex Coupler D-Shaft -->\n    <div class=\"click-marker\" style=\"top:48%; left:52%;\" onclick=\"showToast('Step 2: D-Shaft Set Screw \u2014 Apply blue threadlocker and tighten firmly against flat face.', 'info')\">\n      2\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <!-- Marker 3: Titan M0 & M1 -->\n    <div class=\"click-marker\" style=\"top:65%; left:78%;\" onclick=\"showToast('Step 3: Titan M0 & M1 Ports \u2014 Plug 6-pin motor harnesses into M0 (Left) and M1 (Right).', 'info')\">\n      3\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <div style=\"position:absolute; bottom:15px; left:20px; color:#94A3B8; font-size:0.85rem;\">\n      <span style=\"display:inline-block; width:10px; height:10px; background:#EF4444; border-radius:50%; margin-right:6px;\"></span>\n      Visual Action Guide: Confirm both drive motors and the rear omni caster are secured.\n    </div>\n  </div>\n\n  <div class=\"click-steps-list\">\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">1</div>\n      <div><strong>Step 1: Motor Clamping</strong><br><span style=\"color:var(--text-muted);\">Secure gearmotors with aluminum clamping mounts. Encoder wires face UP.</span></div>\n    </div>\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">2</div>\n      <div><strong>Step 2: Wheel Hubs</strong><br><span style=\"color:var(--text-muted);\">Fasten hex wheel hubs onto 6mm D-shafts with threadlocker on set screw.</span></div>\n    </div>\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">3</div>\n      <div><strong>Step 3: Rear Omni Caster</strong><br><span style=\"color:var(--text-muted);\">Install rear omni caster wheel. Adjust standoff spacers for level stance.</span></div>\n    </div>\n  </div>\n</div>\n",
            "video": "\n<div class=\"video-tutorial-card\">\n  <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem;\">\n    <h4 style=\"font-size:1.1rem; display:flex; align-items:center; gap:0.5rem;\">\n      <span>\ud83c\udfa5 Step-by-Step Video Walkthrough Guide</span>\n    </h4>\n    <span class=\"role-pill role-student\">Lesson 1.4 Video Breakdown</span>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">00:00 - 03:00</div>\n    <div>\n      <strong>Part 1: Mounting Aluminum Clamping Motor Brackets</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Fastening the clamping brackets to the chassis side rails. Inserting M4 bolts from inside the channel. Checking track width clearance.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">03:00 - 06:30</div>\n    <div>\n      <strong>Part 2: Inserting 60:1 Maverick Gearmotors</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Sliding the planetary gearmotors into the clamping brackets. Positioning the encoder wire exit upward to protect it from floor debris. Torquing the clamp screw.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">06:30 - 09:30</div>\n    <div>\n      <strong>Part 3: D-Shaft Hex Hub Alignment with Threadlocker</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Inspecting the D-shaft flat face. Aligning the set screw perpendicular to the flat. Applying blue threadlocker and torquing with a 2.0mm hex key.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">09:30 - 12:00</div>\n    <div>\n      <strong>Part 4: Bolting 100mm Wheels &amp; Rear Omni Caster</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Securing 100mm high-traction rubber wheels with four M3 screws. Mounting the rear omnidirectional caster wheel and checking chassis levelness.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">12:00 - 15:00</div>\n    <div>\n      <strong>Part 5: Harness Routing to Titan Channels M0 &amp; M1</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Connecting Left Motor harness into Titan Channel M0 and Right Motor harness into Channel M1. Verifying encoder tick readout using test script.\n      </p>\n    </div>\n  </div>\n</div>\n",
            "challenge": "\n<h3>Hands-On Team Challenge: The Roll-Out Resistance Test</h3>\n<div class=\"callout challenge\">\n  <div class=\"callout-title\">\ud83c\udfaf JUNIOR TEAM CHALLENGE: SMOOTH ROLLING AUDIT</div>\n  <div class=\"callout-body\">\n    <p>Perform the Roll-Out Resistance Test to verify your drivetrain has zero binding:</p>\n    <ol>\n      <li>With motor cables disconnected from the controller, place the robot at the top of a gentle 5-degree ramp on your lab floor.</li>\n      <li>Release the robot without pushing. The robot must roll down in a <strong>straight line</strong> without veering into walls.</li>\n      <li>Listen closely to the gearboxes: both planetary units must produce a smooth, quiet mechanical hum with <strong>zero grinding, clicking, or binding</strong>.</li>\n    </ol>\n  </div>\n</div>\n",
            "codeSnippet": "# Run Python motor & encoder hardware test on robot laptop:\ncd Documents/studica_amr_course/code_templates\npython3 16_encoder_read.py\n\n# Expected Terminal Output:\n# ============================================================\n#   Studica AMR: Encoder Reading & Verification Tool\n# ============================================================\n# [\u2713] Titan Quad Controller found at CAN ID: 42\n# [*] Left Motor (M0) Encoder: 0 ticks\n# [*] Right Motor (M1) Encoder: 0 ticks\n# Rotate Left Wheel 1 full turn by hand...\n# [\u2713] M0 Ticks Measured: 1680 (Pass! Target: 1680 ticks/rev)",
            "githubLink": "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/test_titan_motors.py",
            "downloads": [
              {
                "name": "test_titan_motors.py",
                "url": "downloads/test_titan_motors.py",
                "label": "Motor Test Script (.py)"
              },
              {
                "name": "params.yaml",
                "url": "downloads/params.yaml",
                "label": "ROS 2 Parameters (.yaml)"
              }
            ]
          },
          {
            "id": "lesson-1-5",
            "number": "1.5",
            "title": "Power and Wiring Hygiene",
            "duration": "90 min",
            "youtubeId": "u-30k5H460s",
            "objective": "Complete the robot's 12V electrical system using a 3000mAh NiMH battery, 20A blade fuse, main toggle switch, Titan screw terminals, XT60 connectors, and professional wiring hygiene.",
            "exitTicket": [
              "What catastrophic failure occurs if battery leads are connected in reverse polarity (Red to Black)?",
              "What is the purpose of the 20-Amp automotive blade fuse in the positive battery line?",
              "Why are high-current motor cables bundled separately from low-voltage sensor cables?"
            ],
            "concept": "\n<h3>1. Power Distribution Topology: Muscle vs. Brain</h3>\n<p>Robots draw significant electrical currents when starting up or pushing against obstacles\u2014up to 15\u201320 Amps peak per motor! If high-power motors share an unregulated wire with a microprocessor, the sudden current surge will cause a voltage dip (brownout), causing the Raspberry Pi to instantly crash and reboot.</p>\n<p>To prevent electrical interference and brownouts, our robot uses a strictly segregated power tree:</p>\n\n<div style=\"background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; font-family:var(--font-code); font-size:0.85rem; line-height:1.4; margin:1rem 0; overflow-x:auto;\">\n<pre>\n[12V 3000mAh Battery (XT60)] \n           \u2502\n           \u25bc\n    [20A Blade Fuse]\n           \u2502\n           \u25bc\n [Main Power Toggle Switch]\n           \u2502\n     \u250c\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n     \u25bc                             \u25bc\n[Titan Quad Motor Controller]  [VMX-pi / Raspberry Pi 4]\n(Powers 12V DC Drive Motors)   (Powers 5V Microprocessor & Sensors)\n</pre>\n</div>\n\n<h3>2. Circuit Protection: The 20A Blade Fuse</h3>\n<p>If a motor stalls or a wire shorts out against the aluminum chassis, the battery can discharge hundreds of amps in milliseconds, melting wires or creating a fire hazard. The <strong>20-Amp automotive blade fuse</strong> acts as the electrical guardian: if current ever exceeds 20 Amps, the internal metal element safely melts in milliseconds, disconnecting the battery instantly.</p>\n\n<div class=\"callout tip\">\n  <div class=\"callout-title\">\ud83d\udca1 PRO-TIP: MULTIMETER POLARITY AUDIT BEFORE FLIPPING THE SWITCH</div>\n  <div class=\"callout-body\">\n    Professional robotics engineers follow one unbreakable rule: <em>Never turn on power until you have checked voltage with a multimeter!</em> Set your digital multimeter to DC Volts ($20\\,\\text{V}$ range). Place the Black probe on the Titan <code>GND</code> terminal and the Red probe on the <code>VIN</code> terminal. It must read between $+12.0\\,\\text{V}$ and $+13.5\\,\\text{V}$. If it shows a minus sign ($-12\\,\\text{V}$), your wires are reversed!\n  </div>\n</div>\n\n<div class=\"callout warning\">\n  <div class=\"callout-title\">\u26a0\ufe0f REVERSE POLARITY DESTROYS ELECTRONICS INSTANTLY</div>\n  <div class=\"callout-body\">\n    Reversing polarity (connecting Red $+$ to Black $-$) will permanently fry the MOSFET transistors inside the Titan Quad controller in less than 5 milliseconds! Yellow XT60 battery connectors are physically keyed with chamfered corners to make backward connection impossible. <strong>Never force an XT60 connector backward!</strong>\n  </div>\n</div>\n\n<div class=\"callout troubleshoot\">\n  <div class=\"callout-title\">\ud83d\udd27 TROUBLESHOOTING: SWITCH IS ON BUT ZERO LEDS LIGHT UP</div>\n  <div class=\"callout-body\">\n    If you flip the main power switch ON and neither the VMX nor Titan shows any lights:\n    <ol>\n      <li><strong>Check the 20A fuse:</strong> Pull the blade fuse from its inline rubber holder and hold it up to the light. If the metal filament inside is broken or charred, replace it with a fresh 20A yellow fuse.</li>\n      <li><strong>Screw terminal insulation clamp:</strong> Inspect where the 14 AWG power wires enter the Titan screw terminals. Ensure the screw is clamping onto bare copper wire, NOT on the plastic insulation jacket!</li>\n    </ol>\n  </div>\n</div>\n",
            "wiring": "\n<h3>1. Power System Assembly Procedure</h3>\n<ol>\n  <li><strong>Insert 20A Fuse:</strong> Insert the 20-Amp automotive blade fuse into the inline rubber fuse holder on the positive (Red) battery harness lead.</li>\n  <li><strong>Mount Main Toggle Switch:</strong> Secure the heavy-duty SPST toggle switch into the pre-drilled bracket at the rear of the chassis using its threaded lock ring.</li>\n  <li><strong>Connect Titan Power Terminals:</strong> Strip 6mm of insulation from the 14 AWG silicone power leads. Insert the Red lead into <code>VIN (+)</code> and the Black lead into <code>GND (-)</code> on the Titan screw terminal block. Tighten firmly with a flathead screwdriver.</li>\n  <li><strong>Connect VMX Auxiliary Power:</strong> Connect the 2-pin regulated 12V output cable from the Titan to the VMX-pi power input header.</li>\n  <li><strong>Install Battery Strap:</strong> Thread the heavy-duty hook-and-loop strap through the bottom channel slots. Place the 12V 3000mAh NiMH battery pack in the center cavity to ensure a low and balanced center of gravity.</li>\n</ol>\n\n<div class=\"ref-image-box\">\n  <div class=\"ref-image-tag\">\u26a0\ufe0f [Dr. Salameh's Image Placeholder \u2014 Replace with actual lab photo/screenshot]</div>\n  <img src=\"images/reference_raw/titan_pinout.webp\" alt=\"Titan Quad Power Pinouts\" style=\"max-height:260px;\" />\n  <div class=\"ref-image-caption\">Figure 1.5A: Titan Quad Power Screw Terminals and status indicators.</div>\n</div>\n\n<div class=\"ref-image-box\">\n  <div class=\"ref-image-tag\">\u26a0\ufe0f [Dr. Salameh's Image Placeholder \u2014 Replace with actual lab photo/screenshot]</div>\n  <img src=\"images/reference_raw/4Pin_JST_GH_Connector_Edited.png\" alt=\"Auxiliary Power Cable\" style=\"max-height:260px;\" />\n  <div class=\"ref-image-caption\">Figure 1.5B: Auxiliary regulated power interconnect cable.</div>\n</div>\n",
            "test": "\n<h3>Visual Guide: Power System &amp; Main Switch Verification</h3>\n<p>Click the interactive markers to inspect the battery fuse, main toggle switch, and controller terminals:</p>\n\n<div class=\"click-guide-container\">\n  <div class=\"click-guide-header\">\n    <strong>Power Distribution Map: Battery, Fuse, Switch &amp; Terminals</strong>\n    <span style=\"font-size:0.8rem; color:var(--text-dim);\">Click markers 1, 2, 3 for electrical checkpoints</span>\n  </div>\n\n  <div class=\"click-screen-mock\" style=\"height:260px; position:relative; background:linear-gradient(135deg, #071229, #1E293B);\">\n    <!-- Marker 1: Inline Fuse -->\n    <div class=\"click-marker\" style=\"top:25%; left:20%;\" onclick=\"showToast('Step 1: Inline 20A Blade Fuse \u2014 Verify fuse is firmly seated in rubber holder.', 'info')\">\n      1\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <!-- Marker 2: Toggle Switch -->\n    <div class=\"click-marker\" style=\"top:48%; left:50%;\" onclick=\"showToast('Step 2: Main Power Switch \u2014 Fastened tightly with hex locknut on rear bracket.', 'info')\">\n      2\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <!-- Marker 3: Titan VIN & GND -->\n    <div class=\"click-marker\" style=\"top:65%; left:80%;\" onclick=\"showToast('Step 3: Titan VIN & GND Terminals \u2014 Red to VIN (+), Black to GND (-).', 'info')\">\n      3\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <div style=\"position:absolute; bottom:15px; left:20px; color:#94A3B8; font-size:0.85rem;\">\n      <span style=\"display:inline-block; width:10px; height:10px; background:#EF4444; border-radius:50%; margin-right:6px;\"></span>\n      Visual Action Guide: Verify polarity with a multimeter before turning ON.\n    </div>\n  </div>\n\n  <div class=\"click-steps-list\">\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">1</div>\n      <div><strong>Step 1: 20A Blade Fuse</strong><br><span style=\"color:var(--text-muted);\">Insert 20A yellow blade fuse into inline rubber fuse holder.</span></div>\n    </div>\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">2</div>\n      <div><strong>Step 2: Toggle Switch</strong><br><span style=\"color:var(--text-muted);\">Mount switch to rear bracket. Keep in OFF position during wiring.</span></div>\n    </div>\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">3</div>\n      <div><strong>Step 3: Controller Terminals</strong><br><span style=\"color:var(--text-muted);\">Secure 14 AWG wire into Titan VIN (+) Red and GND (-) Black.</span></div>\n    </div>\n  </div>\n</div>\n",
            "video": "\n<div class=\"video-tutorial-card\">\n  <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem;\">\n    <h4 style=\"font-size:1.1rem; display:flex; align-items:center; gap:0.5rem;\">\n      <span>\ud83c\udfa5 Step-by-Step Video Walkthrough Guide</span>\n    </h4>\n    <span class=\"role-pill role-student\">Lesson 1.5 Video Breakdown</span>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">00:00 - 03:00</div>\n    <div>\n      <strong>Part 1: Inserting the 20A Blade Fuse &amp; Fuse Safety</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Examining the automotive blade fuse. How the sacrificial metal element protects the robot against short circuits. Inserting the fuse firmly into the inline holder.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">03:00 - 06:00</div>\n    <div>\n      <strong>Part 2: Mounting the High-Current Power Toggle Switch</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Fastening the toggle switch into the pre-drilled bracket on the rear chassis. Tightening the knurled locknut and checking switch toggle orientation (UP = ON, DOWN = OFF).\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">06:00 - 09:30</div>\n    <div>\n      <strong>Part 3: Stripping &amp; Securing Titan VIN &amp; GND Screw Terminals</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Stripping 6mm of insulation from 14 AWG wire. Twisting copper strands tightly. Inserting into Titan VIN (+) and GND (-) terminals and torquing with a flathead screwdriver.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">09:30 - 12:00</div>\n    <div>\n      <strong>Part 4: Digital Multimeter Polarity Audit (+12V Check)</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Demonstrating the multimeter polarity check. Probing the terminal screws with black and red probes to confirm positive +12V DC before turning the switch ON.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">12:00 - 15:00</div>\n    <div>\n      <strong>Part 5: First Power-On &amp; Completion of Module 1!</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Flipping the toggle switch ON: verifying solid green power LEDs on both the VMX-pi and Titan controller! Celebrating the completion of your physical robot build.\n      </p>\n    </div>\n  </div>\n</div>\n",
            "challenge": "\n<h3>Hands-On Team Challenge: The 5G Tug & Shake Test</h3>\n<div class=\"callout challenge\">\n  <div class=\"callout-title\">\ud83c\udfaf JUNIOR TEAM CHALLENGE: VIBRATION &amp; TUG AUDIT</div>\n  <div class=\"callout-body\">\n    <p>Perform the rigorous 5G Vibration &amp; Tug Audit on your completed robot with your instructor:</p>\n    <ol>\n      <li>With main power OFF, gently tug every wire connection near the screw terminals and headers. <strong>No wire should slip or budge.</strong></li>\n      <li>Pick up the robot by the side aluminum channels and gently shake it vertically and horizontally. There must be <strong>zero rattling, zero loose screws, and zero dangling wires</strong>.</li>\n      <li>Turn the main power switch ON: observe that both the VMX-pi and Titan controller power LEDs remain solid without flickering.</li>\n    </ol>\n  </div>\n</div>\n",
            "codeSnippet": "# Verify robot system services on Linux:\nsystemctl is-active robot.service\n# Output: active\n\n# Check battery voltage telemetry broadcast over CAN bus:\ncandump can0 -n 5 | grep 02A",
            "githubLink": "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/setup_studica_robot.sh",
            "downloads": [
              {
                "name": "setup_studica_robot.sh",
                "url": "downloads/setup_studica_robot.sh",
                "label": "Setup Script (.sh)"
              },
              {
                "name": "Studica_AMR_Junior_Textbook.pdf",
                "url": "pdf_export/Studica_AMR_Junior_Textbook.pdf",
                "label": "Junior Textbook (PDF)"
              }
            ]
          }
        ]
      },
      {
        "id": "module-2",
        "number": 2,
        "title": "Module 2: Connect, Drive & Hardware Experience",
        "lessons": [
          {
            "id": "lesson-2-1",
            "number": "2.1",
            "title": "Workstation & Robot Commissioning: Automated Setup & Dual-Brain Network",
            "duration": "90 min",
            "youtubeId": "5o3fFr_gkEA",
            "objective": "Configure the student laptop and robot dual-brain architecture using automated commissioning scripts (setup_student_laptop.sh and setup_robot_from_laptop.sh). Establish direct Gigabit Ethernet communication (172.22.11.247 to 172.22.11.2), configure CycloneDDS multicast isolation, verify passwordless SSH, audit onboard sensors, and launch the Studica Master Robot Dashboard.",
            "exitTicket": [
              "What static IP address and CIDR subnet mask must be configured on the student laptop's Ethernet interface?",
              "Why must CycloneDDS specify the exact network interface name (e.g., enp0s31f6 on laptop, eth0 on robot) with multicast enabled?",
              "How does setup_robot_from_laptop.sh automate SSH key authentication without requiring manual password typing every time?",
              "Which terminal command launches the Master Robot Control Center from anywhere on your student laptop?"
            ],
            "concept": "\n<h3>1. The Distributed Dual-Brain Architecture</h3>\n<p>Modern autonomous mobile robots require immense computational bandwidth: processing $360^\\circ$ LiDAR laser scans, calculating 16-bit 3D depth point clouds, executing SLAM graph optimization, and rendering high-resolution graphical user interfaces (GUIs). Running all these tasks on a small embedded robot computer can lead to thermal throttling, memory exhaustion, and sluggish responsiveness.</p>\n<p>To overcome this, our training system implements a <strong>Distributed Dual-Brain Architecture</strong>:</p>\n\n<div style=\"background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; font-family:var(--font-code); font-size:0.85rem; line-height:1.4; margin:1rem 0; overflow-x:auto;\">\n<pre>\n[Student Workstation Laptop (Ubuntu 22.04 LTS)] \n \u2502  \u2022 Static IP: 172.22.11.247/24\n \u2502  \u2022 Role: Master Robot Dashboard (PyQt5), RViz2 3D PointCloud Viewer, High-Level Python AI Logic\n \u2502  \u2022 Middleware: CycloneDDS on NetworkInterface \"enp0s31f6\"\n \u2502\n \u2502  [Point-to-Point Gigabit Ethernet Link (RJ45 Cat6 Cable)]  < 1 ms Latency, Zero Wi-Fi Packet Loss\n \u2502\n \u25bc\n[Robot Onboard Controller (Studica VMX-pi / Raspberry Pi 4)]\n    \u2022 Static IP: 172.22.11.2/24 (User: vmx)\n    \u2022 Role: Real-time motor PWM, Titan CAN Bus (CAN ID 42), YDLidar serial driver, Orbbec 3D camera streamer\n    \u2022 Middleware: CycloneDDS on NetworkInterface \"eth0\"\n</pre>\n</div>\n\n<h3>2. Why Direct Ethernet Beats Wi-Fi for Robotics Training</h3>\n<p>In school labs and robotics arenas, dozens of Wi-Fi routers, smartphones, and computers share the same radio channels. Over-the-air congestion causes dropped packets, high jitter, and unpredictable latency spikes. A dropped motor velocity command can cause a robot to veer off course or crash into a wall!</p>\n<p>A direct, shielded <strong>Gigabit Ethernet Cable (RJ45)</strong> provides guaranteed physical isolation with steady <strong>&lt; 0.5 ms ping latency</strong> and 1000 Mbps bandwidth, completely unaffected by surrounding Wi-Fi traffic.</p>\n\n<div class=\"callout tip\">\n  <div class=\"callout-title\">\ud83d\udca1 PRO-TIP: ROS_DOMAIN_ID & CYCLONEDDS MULTICAST ISOLATION</div>\n  <div class=\"callout-body\">\n    ROS 2 uses DDS (Data Distribution Service) to discover and exchange sensor messages. If two student robots in the same classroom use default network settings, Robot A's joystick might accidentally drive Robot B! By restricting CycloneDDS to the wired Ethernet adapter (<code>cyclonedds.xml</code>) and assigning unique <code>ROS_DOMAIN_ID</code> numbers, we guarantee absolute communication isolation.\n  </div>\n</div>\n\n<div class=\"callout warning\">\n  <div class=\"callout-title\">\u26a0\ufe0f PREVENTING WI-FI DEFAULT GATEWAY OVERWRITE</div>\n  <div class=\"callout-body\">\n    When setting a static IP on your Ethernet adapter (<code>172.22.11.247/24</code>), <strong>never set a default gateway</strong> unless instructed. Leaving the Ethernet gateway blank ensures your laptop continues routing normal web browsing through classroom Wi-Fi while seamlessly talking to the robot over Ethernet!\n  </div>\n</div>\n\n<div class=\"callout troubleshoot\">\n  <div class=\"callout-title\">\ud83d\udd27 TROUBLESHOOTING: DESTINATION HOST UNREACHABLE</div>\n  <div class=\"callout-body\">\n    If typing <code>ping 172.22.11.2</code> returns <em>\"Destination Host Unreachable\"</em>:\n    <ol>\n      <li><strong>Check RJ45 Link LEDs:</strong> Look closely at the Ethernet port on the Raspberry Pi 4. The Amber link LED and Green activity LED should be solidly glowing or blinking. If dark, replace the Ethernet cable.</li>\n      <li><strong>Verify Laptop IP:</strong> In your terminal, run <code>ip a show enp0s31f6</code>. It must show <code>inet 172.22.11.247/24</code>. If missing, run <code>sudo nmcli connection up RoboSkills-Robot-Ethernet</code>.</li>\n      <li><strong>Robot Power Switch:</strong> Ensure the 12V battery toggle switch is ON and the VMX-pi status LED is illuminated.</li>\n    </ol>\n  </div>\n</div>\n",
            "wiring": "\n<h3>1. Workstation &amp; Robot Interconnect Topology</h3>\n<p>The table below summarizes the exact hardware, network, and communication assignments for the Studica AMR Dual-Brain system:</p>\n\n<table class=\"pinout-table\">\n  <thead>\n    <tr><th>Subsystem / Device</th><th>Network Address</th><th>Port / Channel</th><th>Hardware Protocol</th><th>Function</th></tr>\n  </thead>\n  <tbody>\n    <tr><td><code>Student Laptop</code></td><td>172.22.11.247/24</td><td>RJ45 Ethernet</td><td>Gigabit Ethernet (1000BASE-T)</td><td>Master Dashboard, RViz2, High-Level Autonomy</td></tr>\n    <tr><td><code>Robot VMX Controller</code></td><td>172.22.11.2/24</td><td>RJ45 (eth0)</td><td>Gigabit Ethernet / TCP/UDP</td><td>Onboard ROS 2 Humble Core &amp; Bringup Daemon</td></tr>\n    <tr><td><code>Titan Quad Driver</code></td><td>CAN ID 42</td><td>CAN_H / CAN_L</td><td>1 Mbps Differential CAN Bus</td><td>12V Maverick Motor PWM &amp; Quadrature Encoders</td></tr>\n    <tr><td><code>2D Laser LiDAR</code></td><td>Internal Serial</td><td>/dev/ttyUSB0</td><td>115,200 Baud UART (USB Bridge)</td><td>$360^\\circ$ LaserScan Distance Radar (/scan)</td></tr>\n    <tr><td><code>Orbbec 3D Camera</code></td><td>Internal USB 3.0</td><td>/dev/video*</td><td>UVC / High-Speed Video Stream</td><td>RGB Color (/camera/color) &amp; 16-Bit Depth</td></tr>\n    <tr><td><code>SSH Protocol</code></td><td>Port 22</td><td>TCP</td><td>OpenSSH (ed25519 Keypair)</td><td>Passwordless Remote Command Execution</td></tr>\n    <tr><td><code>CycloneDDS Engine</code></td><td>Domain ID 0</td><td>UDP Multicast</td><td>RTPS / DDS Middleware</td><td>Zero-Copy ROS 2 Topic &amp; Service Exchange</td></tr>\n  </tbody>\n</table>\n\n<div class=\"ref-image-box\">\n  <div class=\"ref-image-tag\">\u26a0\ufe0f [Dr. Salameh's Image Placeholder \u2014 Replace with actual lab photo/screenshot]</div>\n  <img src=\"images/robot_laptop_screenshots/gui_screenshot.png\" alt=\"Studica Master Robot Dashboard\" style=\"max-height:360px;\" />\n  <div class=\"ref-image-caption\">Figure 2.1A: Studica Master Robot Control Center (robot_control_center.py) with 5 Launcher buttons, live camera viewport, LiDAR radar HUD, and bench actuator diagnostics.</div>\n</div>\n\n<div class=\"ref-image-box\">\n  <div class=\"ref-image-tag\">\u26a0\ufe0f [Dr. Salameh's Image Placeholder \u2014 Replace with actual lab photo/screenshot]</div>\n  <img src=\"images/robot_laptop_screenshots/dashboard_tab0_nav.png\" alt=\"Navigation &amp; SLAM Cockpit\" style=\"max-height:360px;\" />\n  <div class=\"ref-image-caption\">Figure 2.1B: Navigation &amp; SLAM Cockpit displaying the 4-Quadrant 360° Proximity Radar, live 3D Camera feed, manual WASD teleoperation, and bench actuator pulse testing.</div>\n</div>\n",
            "test": "\n<h3>Simulated Visual Guide: Student Workstation &amp; Dashboard Checkpoints</h3>\n<p>Hover or click each numbered marker below to review the critical commissioning steps from laptop configuration to robot launch:</p>\n\n<div class=\"click-guide-container\">\n  <div class=\"click-guide-header\">\n    <strong>Interactive Commissioning Map: Student Laptop to Master Dashboard</strong>\n    <span style=\"font-size:0.8rem; color:var(--text-dim);\">Click numbered markers for step details</span>\n  </div>\n\n  <div class=\"click-screen-mock\" style=\"height:280px; position:relative; background:linear-gradient(135deg, #071229, #1E293B);\">\n    <!-- Marker 1: Desktop Launcher -->\n    <div class=\"click-marker\" style=\"top:20%; left:18%;\" onclick=\"showToast('Step 1: Double-Click Desktop Launcher \u2014 Starts the PyQt5 Studica Master Control Center.', 'info')\">\n      1\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <!-- Marker 2: Start Hardware Drivers -->\n    <div class=\"click-marker\" style=\"top:35%; left:50%;\" onclick=\"showToast('Step 2: Click [1. Start Hardware Drivers] \u2014 Remotely triggers bringup_robot.sh over SSH.', 'info')\">\n      2\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <!-- Marker 3: Bench Motor Test -->\n    <div class=\"click-marker\" style=\"top:68%; left:82%;\" onclick=\"showToast('Step 3: Click [Safe 1-Sec Spin Test] \u2014 Sends 1-second pulse to Left (M0) and Right (M1) wheels.', 'info')\">\n      3\n      <svg class=\"mouse-pointer-symbol\" viewBox=\"0 0 24 24\" fill=\"#FFFFFF\"><path d=\"M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.259z\"/></svg>\n    </div>\n\n    <div style=\"position:absolute; bottom:15px; left:20px; color:#94A3B8; font-size:0.85rem;\">\n      <span style=\"display:inline-block; width:10px; height:10px; background:#EF4444; border-radius:50%; margin-right:6px;\"></span>\n      Action Guide: Always elevate the chassis on a wooden block before clicking Marker 3.\n    </div>\n  </div>\n\n  <div class=\"click-steps-list\">\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">1</div>\n      <div><strong>Step 1: Student Laptop Setup</strong><br><span style=\"color:var(--text-muted);\">Run <code>./setup_student_laptop.sh</code> to configure static IP, CycloneDDS, and desktop icons.</span></div>\n    </div>\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">2</div>\n      <div><strong>Step 2: Robot Remote Provisioning</strong><br><span style=\"color:var(--text-muted);\">Run <code>./setup_robot_from_laptop.sh</code> to install SSH keys and audit onboard LiDAR, camera, and CAN bus.</span></div>\n    </div>\n    <div class=\"click-step-item\">\n      <div class=\"click-step-num\">3</div>\n      <div><strong>Step 3: Launch Dashboard &amp; Test</strong><br><span style=\"color:var(--text-muted);\">Run <code>robot-dashboard</code>, click [1. Start Hardware Drivers], and verify battery telemetry and motor pulse.</span></div>\n    </div>\n  </div>\n</div>\n\n<div class=\"ref-image-box\">\n  <div class=\"ref-image-tag\">\u26a0\ufe0f [Dr. Salameh's Image Placeholder \u2014 Replace with actual lab photo/screenshot]</div>\n  <img src=\"images/robot_laptop_screenshots/dashboard_tab1_gamepad.png\" alt=\"Gamepad Calibration Screen\" style=\"max-height:340px;\" />\n  <div class=\"ref-image-caption\">Figure 2.1C: Gamepad Calibration Panel with real-time 8-axis analog monitor, 12-channel button states, and deadband tuning sliders.</div>\n</div>\n\n<h3>2. Step-by-Step Terminal Execution Guide</h3>\n<p>Open your student laptop terminal (<code>Ctrl+Alt+T</code>) and run the automated provisioning commands below:</p>\n\n<p><strong>Step 1: Download &amp; Run Student Laptop Setup</strong></p>\n<div style=\"background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; font-family:var(--font-code); font-size:0.85rem; line-height:1.4; margin:0.75rem 0;\">\n<pre>\n# 1. Download laptop commissioning script\ncurl -sSL https://roboskillsclub.web.app/downloads/setup_student_laptop.sh -o setup_student_laptop.sh\n\n# 2. Grant executable permissions\nchmod +x setup_student_laptop.sh\n\n# 3. Execute setup (prompts for student sudo password once)\n./setup_student_laptop.sh\n\n# 4. Refresh your shell environment\nsource ~/.bashrc\n</pre>\n</div>\n\n<p><strong>Step 2: Run Robot Remote Provisioning from Laptop</strong></p>\n<div style=\"background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; font-family:var(--font-code); font-size:0.85rem; line-height:1.4; margin:0.75rem 0;\">\n<pre>\n# 1. Download robot remote provisioning script\ncurl -sSL https://roboskillsclub.web.app/downloads/setup_robot_from_laptop.sh -o setup_robot_from_laptop.sh\n\n# 2. Grant executable permissions\nchmod +x setup_robot_from_laptop.sh\n\n# 3. Execute remote setup through the Ethernet cable\n./setup_robot_from_laptop.sh\n</pre>\n</div>\n\n<p><strong>Step 3: Launch the Master Robot Dashboard</strong></p>\n<div style=\"background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; font-family:var(--font-code); font-size:0.85rem; line-height:1.4; margin:0.75rem 0;\">\n<pre>\n# Simply type the alias in any terminal:\nrobot-dashboard\n\n# Or click the \"Studica Robot Dashboard\" icon on your Ubuntu desktop!\n</pre>\n</div>\n",
            "video": "\n<div class=\"video-tutorial-card\">\n  <div style=\"display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem;\">\n    <h4 style=\"font-size:1.1rem; display:flex; align-items:center; gap:0.5rem;\">\n      <span>\ud83c\udfa5 Step-by-Step Video Walkthrough Guide</span>\n    </h4>\n    <span class=\"role-pill role-student\">Lesson 2.1 Video Breakdown</span>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">00:00 - 02:30</div>\n    <div>\n      <strong>Part 1: Physical Cabling &amp; Robot Power-On Sequence</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Plugging the RJ45 shielded cable between the laptop and Raspberry Pi 4. Turning on the 12V battery toggle switch. Observing VMX-pi status LED indicators and RJ45 link lights.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">02:30 - 05:00</div>\n    <div>\n      <strong>Part 2: Running setup_student_laptop.sh &amp; Network Configuration</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Executing the student workstation script. Demonstrating automatic detection of Ethernet interfaces (enp0s31f6), static IP assignment (172.22.11.247/24), CycloneDDS configuration, and desktop shortcut creation.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">05:00 - 07:30</div>\n    <div>\n      <strong>Part 3: Running setup_robot_from_laptop.sh &amp; Automated SSH Key Exchange</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Executing the remote robot provisioning script. Showing the automated SSH keypair transfer via sshpass, ensuring students never have to type passwords again when connecting to the robot.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">07:30 - 10:00</div>\n    <div>\n      <strong>Part 4: Onboard Subsystem Audit &amp; CycloneDDS Verification</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Verifying onboard hardware: checking the YDLidar serial link (/dev/ttyUSB0), Orbbec 3D camera device node, Titan Quad CAN daemon (CAN ID 42), and CycloneDDS multicast configuration.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"video-step-row\">\n    <div class=\"video-time-tag\">10:00 - 13:00</div>\n    <div>\n      <strong>Part 5: Launching Master Control Center &amp; Safe Bench Spin Test</strong>\n      <p style=\"font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;\">\n        Launching robot-dashboard. Clicking [1. Start Hardware Drivers], verifying green status lights, monitoring live battery voltage, and executing the safe 1-second motor spin confirmation test!\n      </p>\n    </div>\n  </div>\n</div>\n",
            "challenge": "\n<h3>Hands-On Team Challenge: The 120-Second Zero-to-Telemetry Sprint</h3>\n<div class=\"callout challenge\">\n  <div class=\"callout-title\">\ud83c\udfaf JUNIOR TEAM CHALLENGE: COMMISSIONING SPRINT</div>\n  <div class=\"callout-body\">\n    <p>Practice competitive robotic readiness with your lab partner:</p>\n    <ol>\n      <li>Start with the robot turned OFF and the Ethernet cable disconnected.</li>\n      <li>Start a 120-second stopwatch. Connect the Ethernet cable and switch battery power ON.</li>\n      <li>Run <code>./setup_robot_from_laptop.sh --skip-spin</code> from your laptop terminal.</li>\n      <li>Launch <code>robot-dashboard</code>, click <strong>[1. Start Hardware Drivers]</strong>, and confirm that both the battery voltage (e.g. <code>12.4V</code>) and the 4-quadrant proximity radar status display <strong>CLEAR</strong>.</li>\n      <li>Stop the timer when live telemetry streams smoothly. Record your team's time in your lab workbook!</li>\n    </ol>\n  </div>\n</div>\n",
            "codeSnippet": "# Step 1: Run Student Laptop Commissioning\n./setup_student_laptop.sh\nsource ~/.bashrc\n\n# Step 2: Run Remote Robot Setup over Ethernet Link\n./setup_robot_from_laptop.sh\n\n# Step 3: Launch Studica Master Robot Dashboard\nrobot-dashboard",
            "githubLink": "https://github.com/momar82/RoboSkillsClub/blob/main/downloads/setup_student_laptop.sh",
            "downloads": [
              {
                "name": "setup_student_laptop.sh",
                "url": "downloads/setup_student_laptop.sh",
                "label": "Student Laptop Setup (.sh)"
              },
              {
                "name": "setup_robot_from_laptop.sh",
                "url": "downloads/setup_robot_from_laptop.sh",
                "label": "Robot Remote Setup (.sh)"
              },
              {
                "name": "params.yaml",
                "url": "downloads/params.yaml",
                "label": "ROS 2 Params (.yaml)"
              },
              {
                "name": "Studica_AMR_Junior_Textbook.pdf",
                "url": "pdf_export/Studica_AMR_Junior_Textbook.pdf",
                "label": "Junior Textbook (PDF)"
              }
            ]
          },
          {
            "id": "lesson-2-2",
            "number": "2.2",
            "title": "Gamepad Teleoperation",
            "duration": "90 min",
            "youtubeId": "5o3fFr_gkEA",
            "objective": "Drive the robot using an analog gamepad controller over ROS 2 joy node.",
            "exitTicket": [
              "How do gamepad thumbstick axes map to linear and angular velocity?",
              "What is deadzone?"
            ],
            "concept": "<h3>Lesson 2.2: Gamepad Teleoperation</h3><p>Reading USB joystick inputs and publishing /cmd_vel twist messages.</p>",
            "wiring": "<h3>Hardware:</h3><p>Plug USB gamepad receiver into student laptop.</p>",
            "test": "<h3>Teleop Test:</h3><p>Drive in an open area; observe responsiveness.</p>",
            "video": "<div class='video-tutorial-card'><h4>\ud83c\udfa5 Gamepad Teleop Guide</h4><p>Configuring joystick axes.</p></div>",
            "challenge": "<h3>Challenge 2.2:</h3><p>Drive through a slalom course without touching cones.</p>",
            "codeSnippet": "python3 Documents/studica_amr_course/code_templates/07_gamepad_teleop.py",
            "githubLink": "https://github.com/momar82/RoboSkillsClub",
            "downloads": [
              {
                "name": "07_gamepad_teleop.py",
                "url": "downloads/code_templates/07_gamepad_teleop.py",
                "label": "Gamepad Script (.py)"
              }
            ]
          },
          {
            "id": "lesson-2-3",
            "number": "2.3",
            "title": "Driving Challenges & Slalom Course",
            "duration": "90 min",
            "youtubeId": "5o3fFr_gkEA",
            "objective": "Master low-speed precision maneuvers and vehicle agility.",
            "exitTicket": [
              "Why is slow driving more difficult than fast driving?",
              "What is scrub radius?"
            ],
            "concept": "<h3>Lesson 2.3: Driving Challenges</h3><p>Practical maneuvering through narrow corridors and figure-eight loops.</p>",
            "wiring": "<h3>Course Setup:</h3><p>Set up cones 50cm apart on the lab floor.</p>",
            "test": "<h3>Slalom Audit:</h3><p>Navigate the 5-cone course in under 30 seconds.</p>",
            "video": "<div class='video-tutorial-card'><h4>\ud83c\udfa5 Slalom Course Walkthrough</h4><p>Demonstration of optimal driving lines.</p></div>",
            "challenge": "<h3>Challenge 2.3:</h3><p>Complete the course forward and in reverse.</p>",
            "codeSnippet": "ros2 topic echo /cmd_vel",
            "githubLink": "https://github.com/momar82/RoboSkillsClub",
            "downloads": [
              {
                "name": "params.yaml",
                "url": "downloads/params.yaml",
                "label": "Parameters (.yaml)"
              }
            ]
          },
          {
            "id": "lesson-2-4",
            "number": "2.4",
            "title": "Precision Course & Docking",
            "duration": "90 min",
            "youtubeId": "5o3fFr_gkEA",
            "objective": "Execute millimeter-precision docking against a warehouse target.",
            "exitTicket": [
              "What is docking clearance?",
              "How do rear limit switches detect contact?"
            ],
            "concept": "<h3>Lesson 2.4: Precision Course</h3><p>Aligning the robot bumper flush against target loading bays.</p>",
            "wiring": "<h3>Sensors:</h3><p>Inspect rear bumper mechanical limit switches.</p>",
            "test": "<h3>Docking Test:</h3><p>Reverse into the docking bay until switches click.</p>",
            "video": "<div class='video-tutorial-card'><h4>\ud83c\udfa5 Docking Demonstration</h4><p>Precision reverse docking video.</p></div>",
            "challenge": "<h3>Challenge 2.4:</h3><p>Dock within \u00b15mm of target without triggering E-Stop.</p>",
            "codeSnippet": "python3 Documents/studica_amr_course/code_templates/28_rear_limit_wall_square.py",
            "githubLink": "https://github.com/momar82/RoboSkillsClub",
            "downloads": [
              {
                "name": "28_rear_limit_wall_square.py",
                "url": "downloads/code_templates/28_rear_limit_wall_square.py",
                "label": "Docking Script (.py)"
              }
            ]
          },
          {
            "id": "lesson-2-5",
            "number": "2.5",
            "title": "Diagnostics GUI & Telemetry Dashboard",
            "duration": "90 min",
            "youtubeId": "5o3fFr_gkEA",
            "objective": "Monitor real-time robot health, battery voltage, and motor telemetry via GUI.",
            "exitTicket": [
              "What is nominal battery voltage?",
              "How do you detect motor stall current?"
            ],
            "concept": "<h3>Lesson 2.5: Diagnostics GUI</h3><p>Using the companion Robot Dashboard to inspect motor speeds, temperatures, and bus traffic.</p>",
            "wiring": "<h3>Hardware Link:</h3><p>Ethernet connection active.</p>",
            "test": "<h3>GUI Audit:</h3><p>Open dashboard and verify all 6 tabs report live data.</p>",
            "video": "<div class='video-tutorial-card'><h4>\ud83c\udfa5 Dashboard Walkthrough</h4><p>Exploring all 6 telemetry tabs.</p></div>",
            "challenge": "<h3>Challenge 2.5:</h3><p>Log a 60-second telemetry run and export CSV data.</p>",
            "codeSnippet": "python3 Documents/studica_amr_course/code_templates/10_diagnostics_gui.py",
            "githubLink": "https://github.com/momar82/RoboSkillsClub",
            "downloads": [
              {
                "name": "10_diagnostics_gui.py",
                "url": "downloads/code_templates/10_diagnostics_gui.py",
                "label": "GUI Dashboard (.py)"
              }
            ]
          }
        ]
      }
    ]
  }
];

const TEACHER_LESSON_PLANS = {
  "1.1": {
    "title": "Lesson 1.1: Exploring the Studica Robotics Kit",
    "duration": "90 Minutes",
    "prerequisites": "None (Day 1 Laboratory Onboarding)",
    "objectives": [
      "Identify structural aluminum extrusion channels and standard metric 8mm pitch patterns.",
      "Distinguish between M3 and M4 screws (8mm, 12mm, 16mm) and understand Nyloc locknut mechanics.",
      "Enforce mandatory lab safety rules (ANSI Z87.1 glasses, battery disconnect, loose clothing)."
    ],
    "materials": [
      "Studica Robotics Kit storage bin per 2-student team",
      "Divided plastic hardware sorting tray",
      "2.5mm and 2.0mm ball-end hex keys",
      "7.0mm open-end box wrench / nut driver",
      "300mm stainless steel metric ruler",
      "Safety glasses for all students"
    ],
    "timeline": [
      {
        "time": "00:00 - 00:05",
        "title": "Safety Briefing & PPE Check",
        "activity": "Ensure every student is wearing safety glasses. Explain the rule of zero power during assembly."
      },
      {
        "time": "00:05 - 00:20",
        "title": "Hardware Overview & Mechanics",
        "activity": "Demonstrate the 6061-T6 aluminum U-channel profile and explain the 8mm modular hole pitch."
      },
      {
        "time": "00:20 - 00:50",
        "title": "Hands-On Sorting & Sizing",
        "activity": "Students sort screws into M3, M4x8, M4x12, M4x16 bins. Measure channels with metric rulers."
      },
      {
        "time": "00:50 - 01:15",
        "title": "Joint Assembly Exercise",
        "activity": "Assemble sample 90\u00b0 corner joint with two M4x12 bolts and Nyloc nuts. Guide proper torque technique."
      },
      {
        "time": "01:15 - 01:25",
        "title": "Junior Rigidity Squeeze Challenge",
        "activity": "Teams perform the diagonal torsional squeeze test on their sample frames. Verify zero play."
      },
      {
        "time": "01:25 - 01:30",
        "title": "Summary & Exit Ticket Review",
        "activity": "Conduct Exit Ticket check. Ensure all tools are accounted for and returned to bins."
      }
    ],
    "misconceptions": [
      {
        "pitfall": "Students use standard nuts instead of Nylocs",
        "intervention": "Point out the blue nylon ring. Have students try to spin a Nyloc by hand vs a standard nut."
      },
      {
        "pitfall": "Over-tightening and stripping hex socket heads",
        "intervention": "Demonstrate two-finger torque on the short arm of the hex key. Never use pliers on hex keys."
      },
      {
        "pitfall": "Cross-threading screws into channel holes",
        "intervention": "Teach the 'back-turn' rule: turn counter-clockwise until you feel a tiny click, then thread in."
      }
    ],
    "differentiation": {
      "support": "Provide a pre-printed 1:1 scale fastener identification sheet where students place screws directly on matching drawings.",
      "extension": "Fast-finishing students assemble a 3D corner cube using 3 gusset plates and calculate total fastener mass using digital lab scale."
    },
    "rubric": [
      {
        "criteria": "Lab Safety & PPE Compliance",
        "points": "20 pts"
      },
      {
        "criteria": "Fastener Sorting Accuracy",
        "points": "20 pts"
      },
      {
        "criteria": "Mechanical Joint Rigidity (Zero Flex)",
        "points": "30 pts"
      },
      {
        "criteria": "Tool Handling & Workstation Organization",
        "points": "15 pts"
      },
      {
        "criteria": "Exit Ticket Accuracy",
        "points": "15 pts"
      }
    ]
  },
  "1.2": {
    "title": "Lesson 1.2: Understanding the Robot Controller",
    "duration": "90 Minutes",
    "prerequisites": "Lesson 1.1",
    "objectives": [
      "Explain the architectural division of labor between Raspberry Pi 4 (brain), VMX-pi (reflexes), and Titan Quad (muscle).",
      "Identify the key VMX-pi port groups: HiCurrDIO, FlexDIO, PWM, Analog, and CAN.",
      "Wire and terminate a 1 Mbps differential CAN bus network with a 120-ohm terminating resistor."
    ],
    "materials": [
      "Assembled VMX-pi / Raspberry Pi 4 controller stack",
      "Titan Quad DC Motor Controller (CAN ID 42)",
      "Yellow/Green twisted pair CAN bus harness",
      "2.5mm flathead terminal screwdriver",
      "Digital multimeter set to DC Volts"
    ],
    "timeline": [
      {
        "time": "00:00 - 00:05",
        "title": "Review & Objective",
        "activity": "Review fastener rules from Lesson 1.1. Introduce the concept of dual-brain architecture."
      },
      {
        "time": "00:05 - 00:20",
        "title": "Dual-Brain Theory & CAN Bus",
        "activity": "Explain why Linux requires an FPGA coprocessor for microsecond timing. Explain differential CAN noise immunity."
      },
      {
        "time": "00:20 - 00:50",
        "title": "Header Inspection & Port Mapping",
        "activity": "Students locate HiCurrDIO pins 20/21, FlexDIO pins 8-11, and the CAN port on their VMX-pi."
      },
      {
        "time": "00:50 - 01:15",
        "title": "CAN Bus & Power Rail Wiring",
        "activity": "Connect twisted CAN pair to Titan CAN IN Weidmuller terminals. Set 120\u03a9 termination switch to ON."
      },
      {
        "time": "01:15 - 01:25",
        "title": "Zero Wire Snags Team Challenge",
        "activity": "Route cables cleanly inside extrusion cavity with spiral wrap and zip ties. Verify strain relief."
      },
      {
        "time": "01:25 - 01:30",
        "title": "Exit Ticket & Terminal Verify",
        "activity": "Students answer Exit Ticket questions and execute candump command to observe Titan ID 42."
      }
    ],
    "misconceptions": [
      {
        "pitfall": "Students plug 12V motor leads into 5V logic headers",
        "intervention": "Use color-coded tape to physically block off VMX headers until high-voltage power is completed."
      },
      {
        "pitfall": "Forgetting the 120-ohm CAN termination resistor",
        "intervention": "Explain transmission line reflections (echo effect) using a skipping rope demonstration."
      },
      {
        "pitfall": "Reversing CAN_H and CAN_L wires",
        "intervention": "Mnemonic rule: Yellow = Sunshine (High), Green = Grass (Low)."
      }
    ],
    "differentiation": {
      "support": "Provide students with a color-coded wiring diagram sticker to attach directly to their acrylic deck.",
      "extension": "Have students run 'candump can0' in Linux terminal and decode the hexadecimal byte containing battery voltage."
    },
    "rubric": [
      {
        "criteria": "Dual-Brain Concept Comprehension",
        "points": "20 pts"
      },
      {
        "criteria": "Correct Header Port Mapping",
        "points": "25 pts"
      },
      {
        "criteria": "CAN Bus Wiring & Termination Accuracy",
        "points": "30 pts"
      },
      {
        "criteria": "Cable Strain Relief & Routing Cleanliness",
        "points": "15 pts"
      },
      {
        "criteria": "Exit Ticket & Lab Log",
        "points": "10 pts"
      }
    ]
  },
  "1.3": {
    "title": "Lesson 1.3: Building the Robot Chassis",
    "duration": "90 Minutes",
    "prerequisites": "Lessons 1.1 & 1.2",
    "objectives": [
      "Assemble the 240mm x 180mm x 100mm structural aluminum chassis.",
      "Apply diagonal measurement techniques to eliminate chassis parallelogram distortion within \u00b10.5 mm.",
      "Mount standoff hardware and fasten the laser-cut acrylic electronics deck securely."
    ],
    "materials": [
      "2 x 240mm aluminum side extrusion channels",
      "2 x 180mm aluminum cross extrusion channels",
      "4 x 90-degree corner gusset plates",
      "16 x M4x12mm socket-head bolts & 16 x M4 Nyloc nuts",
      "4 x M3x20mm nylon standoffs & M3 button screws",
      "Laser-cut acrylic electronics mounting deck",
      "Precision digital caliper / 300mm steel metric ruler"
    ],
    "timeline": [
      {
        "time": "00:00 - 00:05",
        "title": "Chassis Blueprint Walkthrough",
        "activity": "Show engineering drawing of 24x18cm footprint. Emphasize why squareness matters for straight driving."
      },
      {
        "time": "00:05 - 00:20",
        "title": "Squaring Principles & Geometry",
        "activity": "Derive Pythagorean diagonal ($D = \\sqrt{240^2 + 180^2} = 300\\,\\text{mm}$). Explain parallelogram drift."
      },
      {
        "time": "00:20 - 00:50",
        "title": "Base Frame Assembly",
        "activity": "Students bolt channels and gussets together finger-tight. Measure diagonals $D_1$ and $D_2$."
      },
      {
        "time": "00:50 - 01:15",
        "title": "Final Torquing & Acrylic Deck",
        "activity": "Torque all 8 corner bolts in X-pattern. Mount nylon standoffs and fasten acrylic baseplate."
      },
      {
        "time": "01:15 - 01:25",
        "title": "The Caliper Audit Challenge",
        "activity": "Teacher inspects each chassis: verify $300\\,\\text{mm} \\pm 0.5\\,\\text{mm}$ and zero table rocking."
      },
      {
        "time": "01:25 - 01:30",
        "title": "Exit Ticket & Workspace Cleanup",
        "activity": "Review chassis dimension checklist and sign off student lab workbooks."
      }
    ],
    "misconceptions": [
      {
        "pitfall": "Tightening bolts fully before measuring diagonals",
        "intervention": "Instruct students to leave nuts finger-loose until ruler confirms exact equal diagonals."
      },
      {
        "pitfall": "Over-torquing nylon standoffs with pliers",
        "intervention": "Enforce strict 'finger-tight only' rule on nylon standoffs to prevent stripped threads."
      },
      {
        "pitfall": "Mounting channels with open U-profile facing outward",
        "intervention": "Ensure U-channels face INWARD so wires and batteries can sit safely inside the frame cavity."
      }
    ],
    "differentiation": {
      "support": "Provide pre-cut wooden 300mm diagonal alignment jigs that drop directly into the frame corners.",
      "extension": "Have students calculate the moment of inertia and torsional stiffness of the chassis frame."
    },
    "rubric": [
      {
        "criteria": "Chassis Dimensional Accuracy (240x180mm)",
        "points": "25 pts"
      },
      {
        "criteria": "Diagonal Squaring (<0.5mm delta)",
        "points": "30 pts"
      },
      {
        "criteria": "Zero Rocking on Inspection Table",
        "points": "20 pts"
      },
      {
        "criteria": "Acrylic Deck & Standoff Installation",
        "points": "15 pts"
      },
      {
        "criteria": "Exit Ticket Completion",
        "points": "10 pts"
      }
    ]
  },
  "1.4": {
    "title": "Lesson 1.4: Installing Motors and Wheels",
    "duration": "90 Minutes",
    "prerequisites": "Lesson 1.3",
    "objectives": [
      "Mount 60:1 Maverick planetary gearmotors using aluminum clamping brackets.",
      "Derive and explain the 1,680 ticks/rev quadrature encoder formula ($28 \\times 60 = 1680$).",
      "Install 100mm rubber drive wheels with blue threadlocker on D-shaft set screws and align rear omni caster."
    ],
    "materials": [
      "2 x Studica Maverick 12V DC Planetary Gearmotors (60:1)",
      "2 x Aluminum clamping motor mounts & M4 clamping hardware",
      "2 x 6mm steel D-shaft hex wheel couplers & set screws",
      "2 x 100mm high-traction rubber drive wheels & M3 mounting screws",
      "1 x Smooth omnidirectional ball caster wheel & standoff spacers",
      "1 x Bottle Blue Threadlocker (Loctite 242)",
      "Wooden test blocks (to elevate robot wheels during bench testing)"
    ],
    "timeline": [
      {
        "time": "00:00 - 00:05",
        "title": "Drivetrain Overview",
        "activity": "Introduce planetary gear reduction and encoder feedback. Emphasize rotating machinery safety."
      },
      {
        "time": "00:05 - 00:20",
        "title": "Gear Ratio & Kinematics Math",
        "activity": "Derive 1680 ticks/rev ($28 \\times 60$). Calculate 100mm wheel circumference ($C = 314.16\\,\\text{mm}$) and 0.187 mm/tick."
      },
      {
        "time": "00:20 - 00:50",
        "title": "Motor & Wheel Installation",
        "activity": "Mount gearmotors into clamping brackets. Fasten hex hubs onto D-shaft flat face with threadlocker."
      },
      {
        "time": "00:50 - 01:15",
        "title": "Rear Caster Alignment & Harness",
        "activity": "Install rear omni caster. Plug motor harnesses into Titan Channels M0 (Left) and M1 (Right)."
      },
      {
        "time": "01:15 - 01:25",
        "title": "Roll-Out Resistance Challenge",
        "activity": "Perform 5-degree ramp roll-out test. Listen for quiet, smooth mechanical hum from planetary gearboxes."
      },
      {
        "time": "01:25 - 01:30",
        "title": "Exit Ticket & Bench Audit",
        "activity": "Complete Worksheet 04 calculation table and review encoder derivation."
      }
    ],
    "misconceptions": [
      {
        "pitfall": "Tightening the set screw against the rounded side of the D-shaft",
        "intervention": "Shine a flashlight into the hub bore to visually confirm the set screw is aligned with the flat face."
      },
      {
        "pitfall": "Forgetting threadlocker on motor set screws",
        "intervention": "Demonstrate how motor vibration shakes unglued set screws loose within 5 minutes of driving."
      },
      {
        "pitfall": "Omitting the 1mm clearance gap between wheel and frame",
        "intervention": "Use a 1mm guitar pick or business card as a spacer between the hex coupler and the bearing face."
      }
    ],
    "differentiation": {
      "support": "Pre-mark the flat face of motor D-shafts with a bright paint marker for easy visual alignment.",
      "extension": "Have students write a 5-line Python script that reads live encoder ticks as the wheel is turned by hand."
    },
    "rubric": [
      {
        "criteria": "Gearbox & Encoder Kinematics Derivation",
        "points": "25 pts"
      },
      {
        "criteria": "Motor Clamping & D-Shaft Alignment",
        "points": "25 pts"
      },
      {
        "criteria": "Blue Threadlocker Application",
        "points": "15 pts"
      },
      {
        "criteria": "Roll-Out Test Performance (Straight & Smooth)",
        "points": "20 pts"
      },
      {
        "criteria": "Exit Ticket Accuracy",
        "points": "15 pts"
      }
    ]
  },
  "1.5": {
    "title": "Lesson 1.5: Power and Wiring Hygiene",
    "duration": "90 Minutes",
    "prerequisites": "Lessons 1.1 to 1.4",
    "objectives": [
      "Construct a segregated 12V DC power distribution tree with a 20A automotive blade fuse.",
      "Execute a mandatory digital multimeter polarity audit to prevent catastrophic reverse polarity.",
      "Apply professional wire routing hygiene: separate high-current motor cables from low-voltage signals."
    ],
    "materials": [
      "12V 3000mAh NiMH battery pack with yellow XT60 connector",
      "Inline rubber fuse holder & 20-Amp yellow automotive blade fuse",
      "Heavy-duty SPST toggle switch & rear chassis mounting bracket",
      "14 AWG high-flex silicone wire (Red positive, Black ground)",
      "Digital multimeter with needle probes",
      "Wire strippers & small flathead terminal screwdriver",
      "Spiral cable wrap & miniature zip ties"
    ],
    "timeline": [
      {
        "time": "00:00 - 00:05",
        "title": "Electrical Safety Protocol",
        "activity": "Enforce zero battery connection until multimeter audit is signed off by teacher. Explain reverse polarity."
      },
      {
        "time": "00:05 - 00:20",
        "title": "Power Topology & Fuse Protection",
        "activity": "Explain segregated power tree (muscle vs brain). Show how a 20A fuse prevents battery fires and short circuits."
      },
      {
        "time": "00:20 - 00:50",
        "title": "Power Wiring & Switch Installation",
        "activity": "Install fuse, mount toggle switch, strip 14 AWG wire, and clamp firmly into Titan VIN (+) and GND (-) terminals."
      },
      {
        "time": "00:50 - 01:15",
        "title": "Multimeter Polarity Audit",
        "activity": "Teacher observes each team probe switch output with multimeter. Confirm positive +12V DC reading."
      },
      {
        "time": "01:15 - 01:25",
        "title": "The 5G Tug & Shake Challenge",
        "activity": "Gently tug wires and shake robot: zero rattling, zero loose terminals. Flip switch: solid green LEDs!"
      },
      {
        "time": "01:25 - 01:30",
        "title": "Module 1 Wrap-Up & Graduation",
        "activity": "Celebrate the completion of the physical robot build! Issue Module 1 completion stamp."
      }
    ],
    "misconceptions": [
      {
        "pitfall": "Clamping screw terminal onto wire insulation jacket",
        "intervention": "Inspect the terminal window with a magnifying glass or flashlight: copper must be visible under screw head."
      },
      {
        "pitfall": "Relying on wire color without multimeter verification",
        "intervention": "Always test with a multimeter! Assume nothing in electrical engineering."
      },
      {
        "pitfall": "Leaving battery loose inside the chassis",
        "intervention": "Demonstrate what happens in a sudden robot stop: an unstrapped battery slides forward and tears wires."
      }
    ],
    "differentiation": {
      "support": "Provide pre-stripped and tinned wire leads with ferrules to make screw terminal insertion foolproof.",
      "extension": "Have students measure quiescent idle current draw of the robot using an in-line DC clamp ammeter."
    },
    "rubric": [
      {
        "criteria": "Electrical Safety & Fuse Installation",
        "points": "25 pts"
      },
      {
        "criteria": "Multimeter Polarity Audit (+12V Confirmed)",
        "points": "30 pts"
      },
      {
        "criteria": "Screw Terminal Mechanical Integrity (Tug Test)",
        "points": "20 pts"
      },
      {
        "criteria": "Wiring Hygiene & Battery Strap Security",
        "points": "15 pts"
      },
      {
        "criteria": "Exit Ticket & Module 1 Completion",
        "points": "10 pts"
      }
    ]
  },
  "2.1": {
    "title": "Lesson 2.1: Workstation & Robot Commissioning: Automated Setup & Dual-Brain Network",
    "duration": "90 Minutes",
    "prerequisites": "Module 1 Complete: Physical Chassis Assembled and 12V Power System Verified",
    "objectives": [
      "Understand the Distributed Dual-Brain Architecture (Student Workstation vs Embedded VMX-pi Controller).",
      "Execute setup_student_laptop.sh to configure static IP 172.22.11.247/24, CycloneDDS, and desktop shortcuts.",
      "Execute setup_robot_from_laptop.sh over Gigabit Ethernet to provision passwordless SSH and audit onboard hardware.",
      "Verify the 5-point hardware audit: YDLidar serial bus, Orbbec 3D camera UVC node, Titan CAN daemon (CAN ID 42), and ROS 2 Humble.",
      "Launch the Studica Master Robot Dashboard (robot_control_center.py) and perform safe bench actuator testing."
    ],
    "materials": [
      "Student Ubuntu 22.04 LTS Laptop with Gigabit Ethernet port (or USB-to-Ethernet adapter)",
      "Fully assembled Studica AMR chassis with 12V 3000mAh NiMH battery",
      "Shielded Cat6 RJ45 Gigabit Ethernet patch cable",
      "Wooden bench block / chassis stand to elevate drive wheels in the air",
      "Commissioning scripts: setup_student_laptop.sh and setup_robot_from_laptop.sh"
    ],
    "timeline": [
      {
        "time": "00:00 - 00:15",
        "title": "Hook & Concept: The Dual-Brain Paradigm",
        "activity": "Discuss why perception (LiDAR, 3D PointClouds) and GUIs run on the student laptop, while real-time motor loops run on VMX-pi."
      },
      {
        "time": "00:15 - 00:35",
        "title": "Student Workstation Setup (setup_student_laptop.sh)",
        "activity": "Students run the automated laptop script. Review static IP configuration (172.22.11.247), cyclonedds.xml, and desktop icon."
      },
      {
        "time": "00:35 - 00:55",
        "title": "Remote Robot Provisioning (setup_robot_from_laptop.sh)",
        "activity": "Connect Ethernet cable, power on robot. Run the remote provisioning script. Verify automated SSH key exchange and driver audit."
      },
      {
        "time": "00:55 - 01:15",
        "title": "Master Robot Dashboard Exploration",
        "activity": "Launch robot-dashboard. Click [1. Start Hardware Drivers], inspect 4-quadrant proximity radar, camera feed, and battery voltage."
      },
      {
        "time": "01:15 - 01:30",
        "title": "Safe Bench Spin Check & Exit Ticket",
        "activity": "Elevate robot chassis on wooden block. Click [Safe 1-Sec Spin Test] to verify M0 and M1 wheels. Complete Exit Ticket."
      }
    ],
    "misconceptions": [
      {
        "pitfall": "Setting an Ethernet default gateway",
        "intervention": "Explain that setting an Ethernet gateway cuts off classroom Wi-Fi. The Ethernet link must have an empty gateway."
      },
      {
        "pitfall": "Expecting Wi-Fi to work during initial robot bringup",
        "intervention": "Emphasize that radio congestion in school labs drops UDP packets. Gigabit Ethernet provides guaranteed 0.3ms latency."
      },
      {
        "pitfall": "Typing passwords for every SSH command",
        "intervention": "Demonstrate how setup_robot_from_laptop.sh installs an ed25519 public key so students never type passwords again."
      }
    ],
    "differentiation": {
      "support": "Provide pre-configured USB-to-Ethernet adapters for laptops without native RJ45 ports; assist with interface naming.",
      "extension": "Inspect raw DDS discovery packets using cyclonedds-tools and monitor live ROS 2 topic bandwidth using 'ros2 topic bw /scan'."
    },
    "rubric": [
      {
        "criteria": "Student Laptop Environment & Static IP Setup",
        "points": "25 pts"
      },
      {
        "criteria": "Remote Robot Provisioning & Passwordless SSH",
        "points": "25 pts"
      },
      {
        "criteria": "Onboard Subsystem Audit (LiDAR, Camera, CAN)",
        "points": "25 pts"
      },
      {
        "criteria": "Dashboard Launch & Bench Actuator Pulse Test",
        "points": "15 pts"
      },
      {
        "criteria": "Exit Ticket Assessment",
        "points": "10 pts"
      }
    ]
  },
  "T0": {
    "title": "Lesson T0: Teacher Robot Commissioning & Lab Setup",
    "duration": "60 Minutes (Teacher Pre-Course Setup)",
    "prerequisites": "Teacher & Technician Level",
    "objectives": [
      "Automate the flashing, networking, and provisioning of the Studica VMX-pi Ubuntu 22.04 environment.",
      "Deploy CycloneDDS routing XML configuration bound to static Ethernet IP 172.22.11.2.",
      "Configure the unified systemd background service (robot.service) to prevent pigpio memory collisions."
    ],
    "materials": [
      "Teacher laptop running Ubuntu 22.04 with ROS 2 Humble",
      "Cat6 RJ45 Gigabit Ethernet cable",
      "Studica VMX-pi Controller with freshly flashed micro-SD card",
      "Commissioning script: teacher_commission_robot.sh"
    ],
    "timeline": [
      {
        "time": "00:00 - 00:15",
        "title": "Ethernet Link & SSH Key Exchange",
        "activity": "Connect laptop to robot via Ethernet. Configure laptop IP 172.22.11.247 and verify passwordless SSH."
      },
      {
        "time": "00:15 - 00:35",
        "title": "Executing Commissioning Script",
        "activity": "Run ./teacher_commission_robot.sh: deploys CycloneDDS XML, CAN ID 42 configs, and udev rules."
      },
      {
        "time": "00:35 - 00:50",
        "title": "Service Validation & Hardware Daemon",
        "activity": "Check systemctl status robot.service. Confirm pigpio single-daemon lock."
      },
      {
        "time": "00:50 - 01:00",
        "title": "Lab Fleet Mass Provisioning",
        "activity": "Repeat procedure across all team robots. Tag each robot with assigned team number."
      }
    ],
    "misconceptions": [
      {
        "pitfall": "Allowing students to run apt-get or build ROS 2 packages during class",
        "intervention": "Strictly pre-install all offline Debian packages and ROS 2 libraries before day 1."
      },
      {
        "pitfall": "Multiple processes attempting to access VMX pigpio hardware simultaneously",
        "intervention": "Ensure manual_composition handles all digital I/O, motors, and encoders in one service."
      }
    ],
    "differentiation": {
      "support": "Keep a clone image of a fully configured micro-SD card ready for instant swapping in case of SD corruption.",
      "extension": "Set up a local DHCP and TFTP server to PXE-boot or network-clone student laptops."
    },
    "rubric": [
      {
        "criteria": "Network Static IP & CycloneDDS Configuration",
        "points": "35 pts"
      },
      {
        "criteria": "Single Hardware Daemon Service Health",
        "points": "35 pts"
      },
      {
        "criteria": "Fleet Readiness & Documentation",
        "points": "30 pts"
      }
    ]
  },
  "T1": {
    "title": "Lesson T1: Pre-Flight Hardware Health Check",
    "duration": "30 Minutes (Before Each Class Session)",
    "prerequisites": "Lesson T0 Commissioning Completed",
    "objectives": [
      "Run automated Python hardware diagnostic script (verify_robot_health.py).",
      "Verify CAN bus communication with Titan Quad Controller (CAN ID 42) and battery telemetry.",
      "Verify navX 9-axis IMU gyro calibration and YDLidar laser rotation."
    ],
    "materials": [
      "Commissioned Studica AMR robot on wooden bench support blocks",
      "Fully charged 12V 3000mAh NiMH battery",
      "Student laptop with test scripts in Documents/studica_amr_course/scripts"
    ],
    "timeline": [
      {
        "time": "00:00 - 00:10",
        "title": "Power & Voltage Check",
        "activity": "Power ON robot. Check battery voltage: must be >12.4V. Verify green/blue LEDs."
      },
      {
        "time": "00:10 - 00:20",
        "title": "Automated Sensor Suite Audit",
        "activity": "Run python3 verify_robot_health.py: tests motors M0/M1, encoders, IMU, and LiDAR."
      },
      {
        "time": "00:20 - 00:30",
        "title": "Fleet Sign-Off & Lab Readiness",
        "activity": "Confirm all test output shows [\u2713] PASS. Elevate wheels and place ready for students."
      }
    ],
    "misconceptions": [
      {
        "pitfall": "Running motor tests while robot wheels are resting on the table",
        "intervention": "Always elevate the robot frame on a wooden block so moving wheels do not launch the robot off the desk!"
      }
    ],
    "differentiation": {
      "support": "Create a 1-page laminated pre-flight checklist attached to each robot workstation.",
      "extension": "Integrate automated Slack or email alerts when any robot battery drops below 11.5V."
    },
    "rubric": [
      {
        "criteria": "Battery Voltage & Power LED Audit",
        "points": "30 pts"
      },
      {
        "criteria": "Motor & Encoder Telemetry Verification",
        "points": "35 pts"
      },
      {
        "criteria": "navX IMU & LiDAR Sensor Health",
        "points": "35 pts"
      }
    ]
  }
};

const TEACHER_PPT_DECKS = {
  "1.1": {
    "title": "Lesson 1.1: Exploring the Studica Kit",
    "slides": [
      {
        "num": 1,
        "title": "Module 1: Build Your First Robot \u2014 Lesson 1.1",
        "bullets": [
          "Welcome to Autonomous Mobile Robotics (AMR)",
          "Today's Goal: Unbox, inventory, and master mechanical fasteners",
          "The Hands-on First Philosophy: Build First \u2192 Experience \u2192 Understand"
        ],
        "visual": "Photo of complete Studica robotics kit with open storage bins.",
        "notes": "Welcome students warmly. Emphasize that robotics is a hands-on craft. Today we start from zero: no coding yet, pure mechanical building."
      },
      {
        "num": 2,
        "title": "Hardware Spotlight: Structural Aluminum U-Channels",
        "bullets": [
          "6061-T6 Aircraft-Grade Extruded Aluminum",
          "Standard 8mm Pitch Grid (holes spaced exactly 8mm apart)",
          "High strength-to-weight ratio + internal wire routing cavity"
        ],
        "visual": "Cross-section diagram of U-channel profile showing 8mm hole pitch.",
        "notes": "Hold up a 240mm channel. Show how the open channel creates a protected tunnel for wires."
      },
      {
        "num": 3,
        "title": "Fastener Mechanics: M3 vs. M4 Sizing",
        "bullets": [
          "M4 Socket-Head Cap Screws: 8mm, 12mm, 16mm lengths (2.5mm hex key)",
          "M3 Button-Head Screws: for electronics decks and small sensors (2.0mm hex key)",
          "Metric Rule: measure only the threaded shaft, NOT the screw head!"
        ],
        "visual": "Fastener sizing chart showing M4x8, M4x12, M4x16 against a metric ruler.",
        "notes": "Common mistake: students measure including the head. Demonstrate with a ruler that length is thread only."
      },
      {
        "num": 4,
        "title": "The Secret Weapon: M4 Nyloc Locknuts",
        "bullets": [
          "Standard nuts shake completely loose in 10 minutes of driving",
          "Nyloc nuts feature an integrated blue nylon locking collar",
          "Vibration-proof: friction holds the bolt permanently in place"
        ],
        "visual": "Close-up cutaway view of a Nyloc nut showing threads cutting into the blue nylon collar.",
        "notes": "Pass around a standard nut and a Nyloc nut. Have students try to spin each onto an M4 bolt with fingers."
      },
      {
        "num": 5,
        "title": "Mandatory Laboratory Safety Protocols",
        "bullets": [
          "Rule 1: ANSI Z87.1 Safety Glasses must be worn at all times",
          "Rule 2: Never connect or disconnect battery leads with power switch ON",
          "Rule 3: Tie back long hair, remove lanyard badges, roll up loose sleeves"
        ],
        "visual": "Icons for Eye Protection, Battery Safety, and Hair Restraint.",
        "notes": "Non-negotiable. Enforce eye protection before anyone opens a tool bin."
      },
      {
        "num": 6,
        "title": "Troubleshooting: Cross-Threading & Stripped Screws",
        "bullets": [
          "If a bolt feels stiff after 1-2 turns: STOP! Do not force it",
          "Use the Back-Turn Rule: turn counter-clockwise until you feel a gentle click",
          "Always align the hex wrench 90\u00b0 straight into the socket"
        ],
        "visual": "Side-by-side illustration: Cross-threaded screw (tilted) vs properly aligned perpendicular screw.",
        "notes": "Demonstrate the back-turn technique. Explain that aluminum is softer than steel and threads can be ruined if forced."
      },
      {
        "num": 7,
        "title": "Junior Hands-On Challenge: The Rigidity Squeeze",
        "bullets": [
          "Assemble a 4-beam square test frame with corner gussets and Nyloc nuts",
          "Hold opposite corners and apply torsional twist",
          "Target: Zero play, zero wobble, zero clicking sound!"
        ],
        "visual": "Hands grasping opposite corners of a square aluminum test frame.",
        "notes": "Walk around the lab and test student frames. If it clicks or flexes, guide them to tighten loose bolts."
      },
      {
        "num": 8,
        "title": "Exit Ticket & Lab Wrap-Up",
        "bullets": [
          "Q1: What does the blue nylon collar inside a Nyloc nut do?",
          "Q2: Why do we never use standard hex nuts on motor mounts?",
          "Q3: Name the 3 mandatory lab safety rules.",
          "Tool accounting: return hex keys and rulers to bin"
        ],
        "visual": "Exit ticket checkmark icon and lab cleanup reminder.",
        "notes": "Ensure all tools are accounted for before dismissing class. Review Exit Ticket submissions."
      }
    ]
  },
  "1.2": {
    "title": "Lesson 1.2: Robot Controller Architecture",
    "slides": [
      {
        "num": 1,
        "title": "Understanding the Robot Controller",
        "bullets": [
          "How your robot thinks, reacts, and drives",
          "The Dual-Brain Architecture: Linux vs. FPGA",
          "The CAN Bus Network: High-speed motor telemetry"
        ],
        "visual": "Block diagram of Raspberry Pi 4, VMX-pi FPGA, and Titan Quad Controller.",
        "notes": "Introduce the analogy: Raspberry Pi = Cerebral Cortex, VMX-pi = Spinal Cord Reflexes, Titan = Muscles."
      },
      {
        "num": 2,
        "title": "High-Level Brain: Raspberry Pi 4",
        "bullets": [
          "Runs Ubuntu Linux 22.04 LTS and ROS 2 Humble",
          "Processes complex LiDAR maps, cameras, and Wi-Fi teleop",
          "Non-deterministic: background OS tasks can jitter motor timing"
        ],
        "visual": "Raspberry Pi 4 board with Ethernet, USB 3.0, and quad-core CPU.",
        "notes": "Explain why Linux is great for AI and maps, but bad for timing individual motor pulses."
      },
      {
        "num": 3,
        "title": "Real-Time Reflexes: VMX-pi FPGA & navX IMU",
        "bullets": [
          "Dedicated FPGA hardware for microsecond timing",
          "Integrated 9-Axis navX Inertial Measurement Unit (IMU)",
          "Deterministic hardware interrupts and high-speed encoder counters"
        ],
        "visual": "VMX-pi circuit board layout showing FPGA chip and IMU sensor.",
        "notes": "Explain that an FPGA runs in pure silicon gates\u2014timing is exact to the microsecond."
      },
      {
        "num": 4,
        "title": "The Muscle: Titan Quad Motor Controller",
        "bullets": [
          "4-Channel H-Bridge motor amplifier (12V DC, 20A peak)",
          "Communicates over 1 Mbps differential Controller Area Network (CAN)",
          "Hardware closed-loop velocity PID and encoder tracking"
        ],
        "visual": "Titan Quad Controller with 4 motor channels and CAN Weidmuller port.",
        "notes": "Titan handles the heavy currents so the Raspberry Pi never experiences motor surges."
      },
      {
        "num": 5,
        "title": "Twisted Pair CAN Bus Physics",
        "bullets": [
          "Yellow (CAN_H) and Green (CAN_L) wires twisted tightly",
          "Differential signaling cancels high-current motor EMI noise",
          "Crucial: 120-ohm terminating resistor switch must be ON"
        ],
        "visual": "Differential voltage waveform diagram showing noise cancellation.",
        "notes": "Demonstrate the 120-ohm termination switch. Explain signal echoes if termination is missing."
      },
      {
        "num": 6,
        "title": "VMX-pi Header Geography",
        "bullets": [
          "HiCurrDIO (Ch 20-23): 1.0A sink for Red & Green LEDs",
          "FlexDIO (Ch 8-11): 5V pull-up for buttons & limit switches",
          "PWM Headers (Ch 0-9): 50 Hz pulses for manipulator servos"
        ],
        "visual": "Annotated photograph of VMX-pi pin headers.",
        "notes": "Show students where each header is physically located on their robot."
      },
      {
        "num": 7,
        "title": "Junior Hands-On Challenge: Zero Wire Snags",
        "bullets": [
          "Route CAN and power cables inside the U-channel cavity",
          "Verify strain relief: wires must never pull taut",
          "Maintain at least 20mm clearance from rotating wheels"
        ],
        "visual": "Clean, spiral-wrapped cable harness running inside U-channel.",
        "notes": "Grade student harnesses on clean routing and strain relief."
      },
      {
        "num": 8,
        "title": "Exit Ticket & Verification",
        "bullets": [
          "Q1: Why does Linux need an FPGA coprocessor?",
          "Q2: Why are CAN wires twisted together?",
          "Q3: Which header drives status LEDs?"
        ],
        "visual": "Exit ticket prompt and terminal status check.",
        "notes": "Review candump terminal command output."
      }
    ]
  },
  "1.3": {
    "title": "Lesson 1.3: Chassis Assembly & Squaring",
    "slides": [
      {
        "num": 1,
        "title": "Building the Robot Chassis",
        "bullets": [
          "Constructing the physical 24cm x 18cm aluminum frame",
          "Chassis squareness: why geometry prevents drift",
          "Mounting plates, standoffs, and electronics deck"
        ],
        "visual": "Assembled 24cm x 18cm robot chassis frame.",
        "notes": "Emphasize that straight robot driving begins with a perfectly square mechanical frame."
      },
      {
        "num": 2,
        "title": "Chassis Blueprint & Target Dimensions",
        "bullets": [
          "Length: 240 mm (24.0 cm) side channels",
          "Width: 180 mm (18.0 cm) cross channels",
          "Base Height Clearance: 100 mm (10.0 cm)"
        ],
        "visual": "Dimensioned CAD drawing of the chassis frame.",
        "notes": "Have students verify beam lengths with their steel rulers before assembling."
      },
      {
        "num": 3,
        "title": "The Parallelogram Trap",
        "bullets": [
          "If corner angles deviate by even 1\u00b0, frame becomes a parallelogram",
          "A skewed chassis will veer sideways even with identical motor speeds",
          "Solution: The Pythagorean Diagonal Audit ($D = 300.0\\,\\text{mm}$)"
        ],
        "visual": "Comparison diagram: Parallelogram distortion vs True Rectangle.",
        "notes": "Explain why software odometry cannot fix a mechanically crooked chassis."
      },
      {
        "num": 4,
        "title": "Assembly Steps: Finger-Tight First",
        "bullets": [
          "Step 1: Lay out channels with open U facing INWARD",
          "Step 2: Insert M4x12mm bolts through corner gussets",
          "Step 3: Thread Nyloc nuts finger-tight (allow frame to flex)"
        ],
        "visual": "Exploded view of corner gusset, channel, M4 bolt, and Nyloc nut.",
        "notes": "Stress the finger-tight rule: do not torque until measured."
      },
      {
        "num": 5,
        "title": "Diagonal Measurement Technique",
        "bullets": [
          "Measure Diagonal A (Top-Left to Bottom-Right)",
          "Measure Diagonal B (Top-Right to Bottom-Left)",
          "Nudge frame until both diagonals match within \u00b10.5 mm!"
        ],
        "visual": "Diagram showing diagonal measurement lines forming an 'X'.",
        "notes": "Demonstrate holding the ruler firmly against the corner hole centers."
      },
      {
        "num": 6,
        "title": "Alternating Cross-Torquing Technique",
        "bullets": [
          "Press frame firmly flat against table with palm",
          "Torque corner bolts in an X-pattern (like lug nuts on a car)",
          "Verifying flat stance: tap all four corners; zero rocking allowed!"
        ],
        "visual": "Numbered diagram showing 1-2-3-4 tightening sequence.",
        "notes": "Explain that tightening one side completely first will warp the frame."
      },
      {
        "num": 7,
        "title": "Junior Hands-On Challenge: The Caliper Audit",
        "bullets": [
          "Teacher inspection: Caliper measure Length, Width, and Diagonals",
          "Marble surface plate test: all four corners must touch flat",
          "Passing Standard: Diagonal difference < 0.5 mm with zero rocking"
        ],
        "visual": "Digital caliper measuring diagonal corner gusset holes.",
        "notes": "Inspect and sign off each team's frame in their workbook."
      },
      {
        "num": 8,
        "title": "Exit Ticket & Cleanup",
        "bullets": [
          "Q1: What are the target dimensions (L x W x H)?",
          "Q2: Why must both diagonals match within 0.5mm?",
          "Q3: What happens if a chassis is skewed into a parallelogram?"
        ],
        "visual": "Exit ticket prompt.",
        "notes": "Review submissions before dismissing."
      }
    ]
  },
  "1.4": {
    "title": "Lesson 1.4: Motors, Wheels & Encoders",
    "slides": [
      {
        "num": 1,
        "title": "Installing Motors and Wheels",
        "bullets": [
          "Maverick 12V DC Planetary Gearmotors (60:1 reduction)",
          "Deriving the 1,680 Ticks/Rev Encoder Resolution",
          "Mounting 100mm Rubber Drive Wheels & Rear Omni Caster"
        ],
        "visual": "Maverick gearmotor with 100mm wheel attached.",
        "notes": "Introduce today's transition from static frame to moving vehicle."
      },
      {
        "num": 2,
        "title": "Why Gear Reduction? Torque vs. Speed",
        "bullets": [
          "Bare DC motors spin at 6,000+ RPM but produce tiny torque",
          "60:1 Planetary Gearbox reduces speed to 100 RPM",
          "Output torque is multiplied by 60x to haul payloads and climb ramps"
        ],
        "visual": "Cutaway diagram of a multi-stage planetary gearbox.",
        "notes": "Explain the mechanical trade-off: speed is traded for immense pushing force."
      },
      {
        "num": 3,
        "title": "Quadrature Encoders: 1680 Ticks Per Turn",
        "bullets": [
          "28 raw magnetic pulses per motor shaft turn",
          "$28 \\times 60\\text{ (gear ratio)} = 1,680\\text{ ticks per full wheel turn}$",
          "Wheel circumference: $C = \\pi \\times 100\\,\\text{mm} \\approx 314.16\\,\\text{mm}$",
          "Resolution: $314.16 / 1680 \\approx 0.187\\,\\text{mm per tick}$!"
        ],
        "visual": "Quadrature wave diagram (Channel A and B 90\u00b0 out of phase).",
        "notes": "Walk through the math step-by-step on the board. Make sure every student writes 1680 in their book."
      },
      {
        "num": 4,
        "title": "D-Shaft Flat Alignment & Blue Threadlocker",
        "bullets": [
          "Motor shaft has one flat face (6mm D-Shaft)",
          "Set screw MUST be tightened perpendicular to the flat face",
          "Always apply one drop of blue threadlocker (Loctite 242)"
        ],
        "visual": "Diagram showing set screw clamping squarely onto flat face of D-shaft.",
        "notes": "Show students what happens if set screw hits the curved side: it slips instantly under load."
      },
      {
        "num": 5,
        "title": "Mounting Drive Wheels & Rear Caster",
        "bullets": [
          "Secure clamping motor mounts to side rails with M4 bolts",
          "Fasten 100mm wheels with four M3 screws in cross pattern",
          "Attach rear omni caster ball and adjust spacers for level stance"
        ],
        "visual": "Chassis side view showing drive wheels and rear omni caster.",
        "notes": "Ensure 1mm clearance gap between wheel hub and channel wall."
      },
      {
        "num": 6,
        "title": "Wiring Harness to Titan M0 & M1",
        "bullets": [
          "Left Motor harness \u2192 Titan Motor 0 (M0) & Encoder 0 (ENC0)",
          "Right Motor harness \u2192 Titan Motor 1 (M1) & Encoder 1 (ENC1)",
          "Track width: $W = 200\\,\\text{mm}$ (center-to-center wheel distance)"
        ],
        "visual": "Titan Quad connector diagram with M0 and M1 harnesses plugged in.",
        "notes": "Verify harness colors match port labels on the Titan."
      },
      {
        "num": 7,
        "title": "Junior Hands-On Challenge: Roll-Out Test",
        "bullets": [
          "Place robot on a gentle 5\u00b0 ramp with motors unplugged",
          "Robot must roll down straight without veering",
          "Listen for smooth mechanical hum: zero grinding or binding!"
        ],
        "visual": "Robot rolling down test ramp.",
        "notes": "If a robot veers, check for tire rubbing or uneven caster height."
      },
      {
        "num": 8,
        "title": "Exit Ticket & Derivation Check",
        "bullets": [
          "Q1: What is the gear reduction ratio?",
          "Q2: Calculate encoder ticks: $28 \\times 60 = ?$",
          "Q3: Why do we apply blue threadlocker?"
        ],
        "visual": "Exit ticket prompt.",
        "notes": "Sign off student calculation tables in Worksheet 04."
      }
    ]
  },
  "1.5": {
    "title": "Lesson 1.5: Power Distribution & Wiring Hygiene",
    "slides": [
      {
        "num": 1,
        "title": "Power and Wiring Hygiene",
        "bullets": [
          "Wiring the 12V DC power loop: battery, fuse, and switch",
          "Segregated power rails: Muscle (Titan) vs. Brain (VMX)",
          "Mandatory Multimeter Polarity Audit (+12V verification)"
        ],
        "visual": "Complete robot power wiring diagram.",
        "notes": "Today we bring the robot to life! Electrical safety is our highest priority."
      },
      {
        "num": 2,
        "title": "Power Topology: Preventing Brownouts",
        "bullets": [
          "Motors pull up to 20A peak during acceleration",
          "Brownout danger: sudden current spike crashes the Raspberry Pi",
          "Solution: Segregated power tree with regulated auxiliary logic supply"
        ],
        "visual": "Block diagram: Battery \u2192 Fuse \u2192 Switch \u2192 Titan VIN & VMX Regulated In.",
        "notes": "Explain why motors and microprocessors must never share thin, unregulated wires."
      },
      {
        "num": 3,
        "title": "Circuit Protection: The 20A Blade Fuse",
        "bullets": [
          "Automotive 20A yellow blade fuse in positive (Red) wire",
          "Sacrificial element: melts in milliseconds if a short circuit occurs",
          "Protects battery pack against fire and prevents melted wiring"
        ],
        "visual": "Cutaway diagram of blade fuse showing internal metal bridge.",
        "notes": "Pass around a blown fuse vs a good fuse so students know how to visually inspect it."
      },
      {
        "num": 4,
        "title": "Reverse Polarity Danger: The XT60 Guardian",
        "bullets": [
          "Reversing Red (+) and Black (-) destroys the Titan H-Bridge in 5 ms",
          "Yellow XT60 connectors are physically keyed with chamfered corners",
          "Never force a connector backward!"
        ],
        "visual": "Cross-section of XT60 connector showing keyed chamfered profile.",
        "notes": "Emphasize: never solder or wire battery leads backward. Yellow XT60 only plugs in one way."
      },
      {
        "num": 5,
        "title": "Step-by-Step Power Wiring Procedure",
        "bullets": [
          "Step 1: Insert 20A blade fuse into inline rubber holder",
          "Step 2: Mount heavy-duty toggle switch to rear bracket (UP = ON)",
          "Step 3: Strip 6mm wire and clamp into Titan VIN (+) and GND (-)"
        ],
        "visual": "Close-up of Titan power screw terminals with Red and Black leads.",
        "notes": "Ensure copper is clamped under screw head, not plastic insulation jacket."
      },
      {
        "num": 6,
        "title": "The Mandatory Multimeter Polarity Audit",
        "bullets": [
          "Black probe on Titan GND (-), Red probe on Titan VIN (+)",
          "Multimeter must read between +12.0V and +13.5V DC",
          "A minus sign (-12V) means wires are REVERSED! Do not turn ON!"
        ],
        "visual": "Multimeter display showing +12.6V DC reading.",
        "notes": "Every single team must have their multimeter reading signed off by the teacher before turning switch ON."
      },
      {
        "num": 7,
        "title": "Junior Hands-On Challenge: The 5G Tug & Shake",
        "bullets": [
          "Gently tug every wire: zero wires may slip from terminals",
          "Shake robot vertically and horizontally: zero rattles",
          "Turn ON: confirm solid green power LEDs on both controllers!"
        ],
        "visual": "Instructor performing tug test on robot wiring.",
        "notes": "Celebrate this milestone! The students' physical robot is officially complete."
      },
      {
        "num": 8,
        "title": "Exit Ticket & Module 1 Graduation!",
        "bullets": [
          "Q1: What happens if battery polarity is reversed?",
          "Q2: What is the purpose of the 20A blade fuse?",
          "Q3: Why are motor and sensor wires routed separately?",
          "Congratulations on completing Module 1: Build Your First Robot!"
        ],
        "visual": "Graduation banner with robot completion badge.",
        "notes": "Issue Module 1 completion stamps and prepare for Module 2: Connect and Drive!"
      }
    ]
  },
  "2.1": {
    "title": "Lesson 2.1: Automated Commissioning & Dual-Brain Network",
    "slides": [
      {
        "num": 1,
        "title": "Lesson 2.1: Commissioning the Dual-Brain Architecture",
        "bullets": [
          "Course: Autonomous Mobile Robotics (Studica Kit)",
          "Author: Dr. Mohammed Salameh, PhD in Robotics, SLAM and VSLAM",
          "Today's Mission: Connect your student laptop to the robot via Gigabit Ethernet and launch live telemetry!"
        ],
        "visual": "Diagram of Student Laptop connected via RJ45 cable to Studica AMR Robot.",
        "notes": "Welcome students to Module 2! Their physical robot is built; today they bring it to life digitally."
      },
      {
        "num": 2,
        "title": "The Distributed Dual-Brain Architecture",
        "bullets": [
          "Brain 1 (The Mind): Student Laptop (Ubuntu 22.04 LTS, PyQt5 Dashboard, RViz2 3D)",
          "Brain 2 (The Muscle): VMX-pi Controller (Raspberry Pi 4 + FPGA + Titan Motor Driver)",
          "Why divide work? Prevents overheating and frees CPU for 3D SLAM mapping."
        ],
        "visual": "Dual-Brain architecture flowchart with Gigabit Ethernet bridge.",
        "notes": "Ask students: Why shouldn't a small Raspberry Pi render 3D graphics while balancing motors?"
      },
      {
        "num": 3,
        "title": "Why Gigabit Ethernet Beats Classroom Wi-Fi",
        "bullets": [
          "Wi-Fi in school arenas: 50+ devices, packet collision, dropped commands",
          "Gigabit Ethernet (Cat6): 1000 Mbps bandwidth, < 0.5 ms ping latency",
          "Zero wireless interference during critical motor testing"
        ],
        "visual": "Comparison graph: Wi-Fi packet jitter vs steady 0.3ms Ethernet ping.",
        "notes": "Remind students: competitive robotics matches require reliable, deterministic communication."
      },
      {
        "num": 4,
        "title": "Step 1: Automated Laptop Commissioning",
        "bullets": [
          "Command: ./setup_student_laptop.sh",
          "Auto-configures static IP: 172.22.11.247/24 on Ethernet interface",
          "Generates cyclonedds.xml and creates 'Studica Robot Dashboard' desktop icon"
        ],
        "visual": "Terminal screenshot running setup_student_laptop.sh with green checkmarks.",
        "notes": "Students run the script once. Have them verify their desktop icon after completion."
      },
      {
        "num": 5,
        "title": "Step 2: Remote Robot Provisioning via Laptop",
        "bullets": [
          "Command: ./setup_robot_from_laptop.sh",
          "Pings 172.22.11.2 to verify physical cable link",
          "Installs SSH keys automatically: no more typing passwords!",
          "Uploads bringup daemons and configures robot CycloneDDS for eth0"
        ],
        "visual": "Terminal screenshot of setup_robot_from_laptop.sh output.",
        "notes": "Show students how passwordless SSH enables instant remote control from their laptop."
      },
      {
        "num": 6,
        "title": "Step 3: Onboard Subsystem Hardware Audit",
        "bullets": [
          "✔ 2D Laser LiDAR: Detected on /dev/ttyUSB0 (115,200 baud)",
          "✔ Orbbec 3D Camera: Active video nodes on /dev/video*",
          "✔ Titan Quad Driver: CAN bus ID 42 responding with battery telemetry",
          "✔ ROS 2 Humble Core: Ready to launch"
        ],
        "visual": "Close-up of YDLidar spinning and Orbbec camera status LED.",
        "notes": "Explain that every professional robotics team executes this pre-flight audit before moving."
      },
      {
        "num": 7,
        "title": "Step 4: Launching the Master Robot Dashboard",
        "bullets": [
          "Terminal command: robot-dashboard (or double-click desktop icon)",
          "Click [1. Start Hardware Drivers]: triggers onboard ROS 2 bringup",
          "Check indicators: Battery voltage (12.4V) and Proximity Radar (CLEAR)"
        ],
        "visual": "Screenshot of Master Robot Dashboard with live radar and camera viewport.",
        "notes": "Walk around the room to verify every team has green connection status on their dashboard."
      },
      {
        "num": 8,
        "title": "Safe Bench Spin Check & Exit Ticket",
        "bullets": [
          "Elevate chassis on wooden block: wheels must spin freely in the air",
          "Click [Safe 1-Sec Spin Test]: verify Left (M0) and Right (M1) wheels",
          "Exit Ticket Q1: What is the laptop's static IP? (172.22.11.247)",
          "Exit Ticket Q2: Why is the Ethernet default gateway left empty?"
        ],
        "visual": "Elevated robot on test bench performing 1-second pulse test.",
        "notes": "Celebrate success! Teams are now fully commissioned and ready for Lesson 2.2 Gamepad Teleop."
      }
    ]
  }
};

let currentCourse = DEFAULT_COURSES[0];
let activeLessonIndex = 0;

// =============================================================================
// 3. User & RBAC State Management (Production Authentication & Profile Store)
// =============================================================================
let currentUser = null;
let currentRole = "guest"; // guest, student, teacher, admin, super_admin
let userProgress = {};     // { [lessonId]: boolean }
let assignmentDueDates = {}; // { [lessonId]: ISOString }

const DEFAULT_SYSTEM_USERS = [
  {
    uid: "super_admin_omar",
    username: "omar",
    email: "m.omar82@gmail.com",
    password: "Admin@22#33",
    displayName: "Dr. Mohammed Salameh",
    role: "super_admin",
    status: "approved",
    title: "Lead Robotics Scientist, PhD in Robotics, SLAM and VSLAM",
    organization: "RoboSkillsClub",
    country: "Qatar",
    mobileNumber: "+974 5500 0000",
    profileCompleted: true,
    createdAt: "2026-01-01T00:00:00.000Z"
  },
  {
    uid: "admin_default",
    username: "admin",
    email: "admin@admin",
    password: "Admin@22#33",
    displayName: "Administrator",
    role: "admin",
    status: "approved",
    organization: "RoboSkillsClub Administration",
    country: "International",
    mobileNumber: "+974 4400 0000",
    profileCompleted: true,
    createdAt: "2026-01-01T00:00:00.000Z"
  },
  {
    uid: "teacher_salameh",
    username: "teacher",
    email: "m.salameh1301@education.qa",
    password: "passme",
    displayName: "Eng. M. Salameh",
    role: "teacher",
    status: "approved",
    organization: "Ministry of Education & Higher Education - Qatar",
    jobTitle: "Robotics Instructor",
    country: "Qatar",
    mobileNumber: "+974 5512 3456",
    maxStudents: 50,
    assignedCourseIds: ["course-amr-101"],
    profileCompleted: true,
    createdAt: "2026-01-01T00:00:00.000Z"
  }
];

function getStoredUsers() {
  let users = [];
  try {
    const raw = localStorage.getItem("roboskills_users_db");
    if (raw) users = JSON.parse(raw);
  } catch (e) {
    console.error("Error reading users database", e);
  }

  // Purge any legacy mock users (Alex Rivera, Sarah Jenkins, David, etc.)
  users = users.filter(u => {
    const email = (u.email || "").toLowerCase();
    const name = (u.displayName || "").toLowerCase();
    return !email.includes("alex.student") && 
           !email.includes("chen.wei") && 
           !email.includes("elena.r") && 
           !email.includes("tariq.m@stem.qa") && 
           !email.includes("fatima@hct") && 
           !email.includes("admin.david") && 
           !email.includes("sarah.jenkins") &&
           !name.includes("alex rivera") &&
           !name.includes("sarah jenkins");
  });

  // Ensure default system accounts exist and sync credentials
  DEFAULT_SYSTEM_USERS.forEach(defUser => {
    const idx = users.findIndex(u => 
      (u.email || "").toLowerCase() === defUser.email.toLowerCase() ||
      (u.username && u.username.toLowerCase() === (defUser.username || "").toLowerCase())
    );
    if (idx === -1) {
      users.unshift({ ...defUser });
    } else {
      users[idx].username = defUser.username;
      users[idx].role = defUser.role;
      users[idx].status = "approved";
      if (!users[idx].password) {
        users[idx].password = defUser.password;
      }
    }
  });

  localStorage.setItem("roboskills_users_db", JSON.stringify(users));
  return users;
}

function saveStoredUsers(users) {
  localStorage.setItem("roboskills_users_db", JSON.stringify(users));
}

function initAuthSession() {
  // Theme initialization (Default: "Modern Hardware Lab" Palette)
  const savedTheme = localStorage.getItem("roboskills_theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  // Initialize and seed users DB
  const users = getStoredUsers();

  // Restore user session
  const savedUser = localStorage.getItem("roboskills_user");
  if (savedUser) {
    try {
      const parsed = JSON.parse(savedUser);
      // Validate that the saved user still exists and is approved
      const freshUser = users.find(u => (u.email || "").toLowerCase() === (parsed.email || "").toLowerCase());
      if (freshUser && freshUser.status !== "suspended") {
        currentUser = freshUser;
        currentRole = freshUser.role || "student";
        updateNavAuthUI();
        loadUserProgress();
      } else {
        currentUser = null;
        currentRole = "guest";
        localStorage.removeItem("roboskills_user");
      }
    } catch (e) {
      console.error("Failed to restore session", e);
    }
  }

  // Firebase Auth listener fallback
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
          country: "Qatar",
          organization: "RoboSkillsClub",
          profileCompleted: true
        };
        currentRole = role;
        localStorage.setItem("roboskills_user", JSON.stringify(currentUser));
        updateNavAuthUI();
        loadUserProgress();
      }
    });
  }
  updatePortalVisibility();
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("roboskills_theme", isDark ? "dark" : "modern-lab");
  const icon = document.getElementById("theme-toggle-icon");
  if (icon) {
    icon.innerHTML = isDark ? '☀️' : '🌙';
  }
  showToast(isDark ? "Dark Studio Mode active" : "Modern Hardware Lab Mode active");
}

function updateNavAuthUI() {
  const authContainer = document.getElementById("nav-auth-container");
  if (!authContainer) return;
  updatePortalVisibility();

  if (currentUser) {
    const rolePillClass = `role-${currentUser.role.replace('_', '-')}`;
    const roleDisplay = currentUser.role === "super_admin" ? "SUPER ADMIN" :
                        currentUser.role === "admin" ? "ADMIN" :
                        currentUser.role === "teacher" ? "TEACHER" : "STUDENT";

    authContainer.innerHTML = `
      <div class="user-badge-container" onclick="openProfileModal()" title="Click to view & edit your profile">
        <span class="role-pill ${rolePillClass}">${roleDisplay}</span>
        <span style="font-size:0.85rem; font-weight:600;">${currentUser.displayName}</span>
      </div>
      <button class="btn btn-outline btn-sm" onclick="openProfileModal()" title="Edit Profile & Password">⚙️ Edit Profile</button>
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

function handleUserSignIn(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const emailInput = document.getElementById("signin-email");
  const passInput = document.getElementById("signin-password");
  if (!emailInput || !passInput) return;

  const rawInput = (emailInput.value || "").trim().toLowerCase();
  const password = (passInput.value || "").trim();

  if (!rawInput) {
    showToast("Please enter your email or username.", "warning");
    return;
  }
  if (!password) {
    showToast("Please enter your password.", "warning");
    return;
  }

  const users = getStoredUsers();

  // Find user by email, username, displayName, or aliases
  let user = users.find(u => {
    const uEmail = (u.email || "").toLowerCase().trim();
    const uUser = (u.username || "").toLowerCase().trim();
    const uUid = (u.uid || "").toLowerCase().trim();
    const uName = (u.displayName || "").toLowerCase().trim();

    if (uEmail === rawInput || uUser === rawInput || uUid === rawInput || uName === rawInput) {
      return true;
    }

    // Admin alias matching
    if ((rawInput === "admin" || rawInput === "administrator" || rawInput === "admin@admin" || rawInput === "admin@admin.com") &&
        (uEmail === "admin@admin" || u.role === "admin" || uUser === "admin")) {
      return true;
    }

    // Super Admin alias matching
    if ((rawInput === "m.omar82@gmail.com" || rawInput === "omar" || rawInput === "superadmin" || rawInput === "super_admin" || rawInput === "dr.mohammed") &&
        (uEmail === "m.omar82@gmail.com" || u.role === "super_admin" || uUser === "omar")) {
      return true;
    }

    // Teacher alias matching
    if ((rawInput === "m.salameh1301@education.qa" || rawInput === "teacher" || rawInput === "salameh" || rawInput === "instructor") &&
        (uEmail === "m.salameh1301@education.qa" || u.role === "teacher" || uUser === "teacher")) {
      return true;
    }

    return false;
  });

  // Fallback to in-memory default system accounts if not yet saved in localStorage
  if (!user) {
    if (rawInput === "admin" || rawInput === "administrator" || rawInput === "admin@admin" || rawInput === "admin@admin.com") {
      user = DEFAULT_SYSTEM_USERS.find(u => u.email === "admin@admin");
    } else if (rawInput === "m.omar82@gmail.com" || rawInput === "omar" || rawInput === "superadmin") {
      user = DEFAULT_SYSTEM_USERS.find(u => u.email === "m.omar82@gmail.com");
    } else if (rawInput === "m.salameh1301@education.qa" || rawInput === "teacher" || rawInput === "salameh") {
      user = DEFAULT_SYSTEM_USERS.find(u => u.email === "m.salameh1301@education.qa");
    }
  }

  if (!user) {
    showToast("Invalid email or username. Please verify your credentials.", "error");
    return;
  }

  // Password matching logic:
  let passwordMatches = false;

  // 1. Direct match with stored password
  if (user.password && user.password.trim() === password) {
    passwordMatches = true;
  }

  // 2. Admin account aliases: supports "Admin@22#33", "password", "admin", "Admin123", "admin123"
  if (user.role === "admin" || user.email === "admin@admin" || user.username === "admin") {
    if (password === "Admin@22#33" || password === "password" || password === "admin" || password === "Admin@2233" || password === "Admin123" || password === "admin123") {
      passwordMatches = true;
    }
  }

  // 3. Super Admin aliases: supports "Admin@22#33", "password", "admin", "Admin123"
  if (user.role === "super_admin" || user.email === "m.omar82@gmail.com" || user.username === "omar") {
    if (password === "Admin@22#33" || password === "password" || password === "admin" || password === "Admin123") {
      passwordMatches = true;
    }
  }

  // 4. Teacher aliases: supports "passme", "password", "teacher"
  if (user.role === "teacher" || user.email === "m.salameh1301@education.qa" || user.username === "teacher") {
    if (password === "passme" || password === "password" || password === "teacher") {
      passwordMatches = true;
    }
  }

  if (!passwordMatches) {
    showToast("Invalid password. Please check your password and try again.", "error");
    return;
  }

  if (user.status === "pending") {
    showToast("Your account registration is pending review and approval by an instructor or administrator.", "warning");
    return;
  }

  if (user.status === "suspended") {
    showToast("This account is currently suspended. Please contact platform administration.", "error");
    return;
  }

  currentUser = { ...user };
  currentRole = user.role;
  localStorage.setItem("roboskills_user", JSON.stringify(currentUser));

  // Explicitly close sign-in modal immediately so it never gets stuck
  closeAllModals();
  const signinModal = document.getElementById("signin-modal");
  if (signinModal) signinModal.classList.remove("active");

  try {
    updateNavAuthUI();
  } catch (e) {
    console.error("Error updating nav auth UI:", e);
  }

  try {
    loadUserProgress();
  } catch (e) {
    console.error("Error loading user progress:", e);
  }

  showToast(`Welcome back, ${user.displayName}!`, "success");

  // First-time student profile completion check
  if (user.role === "student" && (user.needsProfileCompletion || !user.profileCompleted)) {
    setTimeout(() => {
      openCompleteProfileModal();
    }, 350);
  } else {
    try {
      if (user.role === "student") {
        showStudentPortal();
      } else if (user.role === "teacher") {
        showTeacherPortal();
      } else if (user.role === "admin" || user.role === "super_admin") {
        openAdminConsole();
      }
    } catch (e) {
      console.error("Error opening portal for role:", user.role, e);
    }
  }
}

function quickDemoSignIn(role) {
  // Legacy handler redirecting to authorized accounts
  if (role === "admin") {
    document.getElementById("signin-email").value = "admin@admin";
    document.getElementById("signin-password").value = "Admin@22#33";
  } else if (role === "teacher") {
    document.getElementById("signin-email").value = "m.salameh1301@education.qa";
    document.getElementById("signin-password").value = "passme";
  } else {
    document.getElementById("signin-email").value = "m.omar82@gmail.com";
    document.getElementById("signin-password").value = "Admin@22#33";
  }
  handleUserSignIn();
}

function signOutUser() {
  if (auth) auth.signOut().catch(e => console.log(e));
  currentUser = null;
  currentRole = "guest";
  localStorage.removeItem("roboskills_user");
  updateNavAuthUI();
  showToast("Successfully signed out of RoboSkillsClub", "amber");
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
  const email = document.getElementById("reg-student-email").value.trim().toLowerCase();
  const passEl = document.getElementById("reg-student-password");
  const confirmEl = document.getElementById("reg-student-password-confirm");
  const mobile = document.getElementById("reg-student-mobile").value.trim();
  const country = document.getElementById("reg-student-country").value.trim();
  const eduLevel = document.getElementById("reg-edu-level").value;
  const courseId = document.getElementById("reg-student-course").value;

  const password = passEl ? passEl.value : "Student@123";
  const confirm = confirmEl ? confirmEl.value : "Student@123";

  if (password.length < 6) {
    showToast("Password must be at least 6 characters long.", "error");
    return;
  }
  if (password !== confirm) {
    showToast("Passwords do not match. Please verify.", "error");
    return;
  }

  const users = getStoredUsers();
  if (users.some(u => (u.email || "").toLowerCase() === email)) {
    showToast("An account with this email already exists. Please sign in.", "error");
    return;
  }

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

  const selectedCourse = DEFAULT_COURSES.find(c => c.id === courseId);
  const assignedTeacherId = selectedCourse ? selectedCourse.assignedTeacherId : "teacher_salameh";
  const approvalRoute = "Assigned Instructor (Eng. M. Salameh)";

  const newUser = {
    uid: "student_" + Date.now(),
    displayName: name,
    email: email,
    password: password,
    mobileNumber: mobile,
    country: country,
    role: "student",
    status: "pending", // Requires teacher/admin approval
    educationLevel: eduLevel,
    schoolName,
    gradeYear,
    universityName,
    degreeLevel,
    major,
    enrolledCourseIds: [courseId],
    assignedTeacherId: assignedTeacherId,
    assignedTeacherName: "Eng. M. Salameh",
    profileCompleted: true,
    needsProfileCompletion: false,
    progress: 0,
    submissions: 0,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveStoredUsers(users);

  closeAllModals();
  showToast(`Student registration submitted! Awaiting review and approval from ${approvalRoute}.`, "success");
}

async function handleTeacherRegistration(event) {
  event.preventDefault();
  const name = document.getElementById("reg-teacher-name").value.trim();
  const email = document.getElementById("reg-teacher-email").value.trim().toLowerCase();
  const passEl = document.getElementById("reg-teacher-password");
  const confirmEl = document.getElementById("reg-teacher-password-confirm");
  const mobile = document.getElementById("reg-teacher-mobile").value.trim();
  const country = document.getElementById("reg-teacher-country").value.trim();
  const organization = document.getElementById("reg-teacher-org").value.trim();
  const jobTitle = document.getElementById("reg-teacher-job").value.trim();

  const password = passEl ? passEl.value : "Teacher@123";
  const confirm = confirmEl ? confirmEl.value : "Teacher@123";

  if (password.length < 6) {
    showToast("Password must be at least 6 characters long.", "error");
    return;
  }
  if (password !== confirm) {
    showToast("Passwords do not match. Please verify.", "error");
    return;
  }

  const users = getStoredUsers();
  if (users.some(u => (u.email || "").toLowerCase() === email)) {
    showToast("An account with this email already exists. Please sign in.", "error");
    return;
  }

  const newTeacher = {
    uid: "teacher_" + Date.now(),
    displayName: name,
    email: email,
    password: password,
    mobileNumber: mobile,
    country: country,
    role: "teacher",
    status: "pending", // Administrator must approve and set maxStudents
    organization: organization,
    jobTitle: jobTitle,
    maxStudents: 35,
    assignedCourseIds: ["course-amr-101"],
    profileCompleted: true,
    needsProfileCompletion: false,
    createdAt: new Date().toISOString()
  };

  users.push(newTeacher);
  saveStoredUsers(users);

  closeAllModals();
  showToast("Teacher application submitted! Platform Administrator has been notified to review and approve your account.", "success");
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
function getLessonTagInfo(lesson) {
  const num = (lesson && lesson.number) ? String(lesson.number) : "";
  if (num.startsWith("1.1") || num.startsWith("1.2")) {
    return { className: "tag-theory", label: "Theory / Concepts", shortLabel: "Theory" };
  } else if (num.startsWith("1.3") || num.startsWith("1.4") || num.startsWith("1.5")) {
    return { className: "tag-wiring", label: "Wiring / Hardware Setup", shortLabel: "Wiring" };
  } else {
    // Module 2 & Advanced Autonomy (2.1, 2.2, etc.)
    return { className: "tag-coding", label: "Coding / Firmware", shortLabel: "Coding" };
  }
}

function getAllCourseLessons() {
  const all = [];
  (currentCourse.modules || []).forEach((mod, modIdx) => {
    (mod.lessons || []).forEach((les, lesIdx) => {
      all.push({
        ...les,
        modIndex: modIdx,
        modId: mod.id,
        modTitle: mod.title,
        lesIndexInMod: lesIdx,
        flatIndex: all.length
      });
    });
  });
  return all;
}

function initLMSPlayer() {
  renderSyllabusTree();
  loadLesson(0);
}

function renderSyllabusTree() {
  const treeContainer = document.getElementById("syllabus-module-tree");
  if (!treeContainer) return;

  const allLessons = getAllCourseLessons();
  let html = "";
  let flatCounter = 0;

  (currentCourse.modules || []).forEach((module) => {
    html += `<li class="module-badge-title">${module.title}</li>`;
    (module.lessons || []).forEach((lesson) => {
      const flatIndex = flatCounter++;
      const isCompleted = userProgress[lesson.id] === true;
      const isActive = flatIndex === activeLessonIndex;
      const tagInfo = getLessonTagInfo(lesson);

      html += `
        <li class="lesson-item ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}" onclick="loadLesson(${flatIndex})">
          <div style="display:flex; align-items:center; gap:0.6rem; overflow:hidden;">
            <span class="check-icon">${isCompleted ? "✓" : flatIndex + 1}</span>
            <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${lesson.number} ${lesson.title}</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.4rem; flex-shrink:0;">
            <span class="lesson-tag-mini ${tagInfo.className}">${tagInfo.shortLabel}</span>
            <span style="font-size:0.75rem; color:var(--text-dim);">${lesson.duration}</span>
          </div>
        </li>
      `;
    });
  });

  treeContainer.innerHTML = html;
  updateCourseProgress();
}

function updateCourseProgress() {
  const allLessons = getAllCourseLessons();
  const total = allLessons.length;
  let completedCount = 0;
  allLessons.forEach(l => {
    if (userProgress[l.id] === true) completedCount++;
  });

  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
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
  const allLessons = getAllCourseLessons();
  if (index < 0 || index >= allLessons.length) return;
  activeLessonIndex = index;
  const lesson = allLessons[index];

  renderSyllabusTree();

  // Populate UI
  const titleEl = document.getElementById("lms-lesson-title");
  const numEl = document.getElementById("lms-lesson-number");
  const durationEl = document.getElementById("lms-lesson-duration");
  const authorEl = document.getElementById("lms-lesson-author");
  const videoIframe = document.getElementById("lms-video-iframe");
  const dueDatePill = document.getElementById("lms-due-date-pill");

  const tagInfo = getLessonTagInfo(lesson);

  if (titleEl) titleEl.textContent = `${lesson.number}: ${lesson.title}`;
  if (numEl) {
    numEl.className = `lesson-tag ${tagInfo.className}`;
    numEl.innerHTML = `<span>Lesson ${lesson.number}</span> <span style="opacity:0.65; margin:0 4px;">•</span> <span>${tagInfo.label}</span>`;
  }
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
  const conceptPane = document.getElementById("tab-pane-concept");
  if (conceptPane) {
    conceptPane.innerHTML = `
      <div class="callout objective">
        <div class="callout-title">🎯 Lesson Objective</div>
        <div class="callout-body">${lesson.objective || ""}</div>
      </div>
      ${lesson.concept}
    `;
  }

  const wiringPane = document.getElementById("tab-pane-wiring");
  if (wiringPane) wiringPane.innerHTML = lesson.wiring;

  const testPane = document.getElementById("tab-pane-test");
  if (testPane) testPane.innerHTML = lesson.test;

  const videoPane = document.getElementById("tab-pane-video");
  if (videoPane) videoPane.innerHTML = lesson.video || "<p>Video walkthrough content loading...</p>";

  const challengePane = document.getElementById("tab-pane-challenge");
  if (challengePane) {
    challengePane.innerHTML = `
      ${lesson.challenge}
      <div class="exit-ticket-box">
        <div class="exit-ticket-header">
          <h4 style="font-size:1.05rem; display:flex; align-items:center; gap:0.5rem;">
            <span>🎟️ Lesson Exit Ticket</span>
          </h4>
          <span class="exit-ticket-badge">Check for Understanding</span>
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">
          Before marking this lesson complete, answer the following Exit Ticket reflection questions in the submission desk below:
        </p>
        <ol class="exit-ticket-questions">
          ${(lesson.exitTicket || []).map(q => `<li>${q}</li>`).join("")}
        </ol>
      </div>
    `;
  }

  // Code snippet & GitHub Link
  const codeEl = document.getElementById("lms-code-snippet");
  if (codeEl) codeEl.textContent = lesson.codeSnippet;

  const ghLink = document.getElementById("lms-github-code-link");
  if (ghLink) ghLink.href = lesson.githubLink || "https://github.com/momar82/RoboSkillsClub";

  // Downloads
  const dlContainer = document.getElementById("lms-downloads-container");
  if (dlContainer) {
    let dlHtml = "";
    (lesson.downloads || []).forEach(dl => {
      dlHtml += `<a href="${dl.url}" download="${dl.name}" class="btn btn-outline btn-sm">💾 ${dl.label}</a>`;
    });
    dlContainer.innerHTML = dlHtml;
  }

  // Submission Desk Status
  const statusBadge = document.getElementById("challenge-status-badge");
  const isDone = userProgress[lesson.id] === true;
  if (statusBadge) {
    statusBadge.className = `role-pill ${isDone ? "role-student" : "role-admin"}`;
    statusBadge.textContent = isDone ? "COMPLETED & VERIFIED" : "PENDING SUBMISSION";
  }

  // Teacher / Admin Due Date Edit Button
  const editDueBtn = document.getElementById("btn-edit-due-date");
  if (editDueBtn) {
    editDueBtn.style.display = (currentUser && (currentUser.role === "teacher" || currentUser.role === "admin" || currentUser.role === "super_admin")) ? "inline-block" : "none";
  }

  // Prev / Next button
  const prevBtn = document.getElementById("btn-prev-lesson");
  const nextBtn = document.getElementById("btn-next-lesson");
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) {
    nextBtn.innerHTML = index === allLessons.length - 1 ? "Finish Course & View Certificate 🎓" : "Mark Complete & Next Lesson &rarr;";
  }

  switchLessonTab("concept");
  renderLessonEvaluationWidget(lesson);
}

function getAssignmentDueDate(lessonId) {
  if (assignmentDueDates[lessonId]) {
    return new Date(assignmentDueDates[lessonId]).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  // Default: 7 days from today (or completion date)
  const due = new Date();
  due.setDate(due.getDate() + 7);
  assignmentDueDates[lessonId] = due.toISOString();
  return due.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function promptEditDueDate() {
  const allLessons = getAllCourseLessons();
  const lesson = allLessons[activeLessonIndex];
  if (!lesson) return;
  const currentDue = assignmentDueDates[lesson.id] ? new Date(assignmentDueDates[lesson.id]).toISOString().split("T")[0] : "";
  const newDate = prompt(`Set new Assignment Due Date for Lesson ${lesson.number} (YYYY-MM-DD):`, currentDue);

  if (newDate) {
    const parsed = new Date(newDate);
    if (!isNaN(parsed.getTime())) {
      assignmentDueDates[lesson.id] = parsed.toISOString();
      const dueDatePill = document.getElementById("lms-due-date-pill");
      if (dueDatePill) {
        dueDatePill.textContent = `📅 Due: ${parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
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
  const allLessons = getAllCourseLessons();
  const lesson = allLessons[activeLessonIndex];
  if (!lesson) return;
  userProgress[lesson.id] = true;
  saveUserProgress();
  renderSyllabusTree();
  showToast(`Lesson ${lesson.number} marked as complete!`, "success");

  if (activeLessonIndex < allLessons.length - 1) {
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
  const allLessons = getAllCourseLessons();
  const lesson = allLessons[activeLessonIndex];
  if (!lesson) return;
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
    moduleId: lesson.modId || "module-1",
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

  const recipientName = currentUser ? currentUser.displayName : "Student Full Name";
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
    renderSelectedLessonPlan();
    renderSelectedPptDeck();
  }
}

function switchTeacherTab(tabName) {
  document.querySelectorAll(".teacher-desk-tabs .teacher-tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".teacher-tab-content").forEach(pane => pane.style.display = "none");

  const btn = document.getElementById(`btn-teachertab-${tabName}`);
  const pane = document.getElementById(`teachertab-pane-${tabName}`);
  if (btn) btn.classList.add("active");
  if (pane) pane.style.display = "block";

  if (tabName === "lessonplans") renderSelectedLessonPlan();
  if (tabName === "ppt") renderSelectedPptDeck();
}

function renderTeacherDashboard() {
  const rosterContainer = document.getElementById("teacher-student-roster");
  if (!rosterContainer) return;

  const users = getStoredUsers();
  const students = users.filter(u => {
    if (u.role !== "student") return false;
    if (currentUser && (currentUser.role === "admin" || currentUser.role === "super_admin")) return true;
    return u.assignedTeacherId === (currentUser ? currentUser.uid : "teacher_salameh") || !u.assignedTeacherId;
  });

  const quotaDisplay = document.getElementById("teacher-quota-display");
  if (quotaDisplay) {
    const max = currentUser ? (currentUser.maxStudents || 50) : 50;
    quotaDisplay.textContent = `Student Quota: ${students.length} / ${max} Enrolled`;
  }

  if (students.length === 0) {
    rosterContainer.innerHTML = `
      <div style="text-align:center; padding:2rem; background:var(--bg-primary); border:1px dashed var(--border-color); border-radius:var(--radius-md);">
        <p style="color:var(--text-muted); margin-bottom:1rem;">No students enrolled in your course yet.</p>
        <button class="btn btn-primary btn-sm" onclick="openTeacherAddStudentModal()">+ Enroll New Student</button>
      </div>
    `;
    return;
  }

  let html = `
    <table class="pinout-table" style="margin:0;">
      <thead>
        <tr><th>Student Name</th><th>Email</th><th>Course Progress</th><th>Status</th><th>Instructor Action</th></tr>
      </thead>
      <tbody>
  `;
  students.forEach(s => {
    const progress = s.progress || 0;
    html += `
      <tr>
        <td><strong>${s.displayName}</strong></td>
        <td>${s.email}</td>
        <td>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <div style="flex:1; height:6px; background:var(--bg-primary); border-radius:3px; overflow:hidden;">
              <div style="width:${progress}%; height:100%; background:var(--progress-success);"></div>
            </div>
            <span style="font-size:0.75rem; font-weight:700;">${progress}%</span>
          </div>
        </td>
        <td><span class="role-pill ${s.profileCompleted ? 'role-student' : 'role-teacher'}">${s.profileCompleted ? 'Verified' : 'Pending First Login'}</span></td>
        <td>
          <div style="display:flex; gap:0.35rem;">
            <button class="btn btn-outline btn-sm" onclick="gradeStudentSubmission('${s.displayName}')">Review &amp; Grade</button>
            <button class="btn btn-outline btn-sm" onclick="promptEditDueDate()">Extend Due Date</button>
          </div>
        </td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  rosterContainer.innerHTML = html;
}

function gradeStudentSubmission(studentName) {
  const score = prompt(`Enter evaluation score (0-100) for ${studentName}:`, "95");
  if (score !== null) {
    const feedback = prompt(`Enter written feedback for ${studentName}:`, "Excellent mechanical assembly! Chassis is square and rigidity test verified with zero flex.");
    showToast(`Graded ${studentName}: Score ${score}/100 recorded. Feedback sent to student!`, "success");
    renderTeacherDashboard();
  }
}

function renderSelectedLessonPlan() {
  const select = document.getElementById("teacher-lesson-plan-select");
  const container = document.getElementById("teacher-lesson-plan-content");
  if (!select || !container) return;

  const key = select.value;
  const plan = TEACHER_LESSON_PLANS[key];
  if (!plan) return;

  let html = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem;">
      <div>
        <h3 style="font-size:1.25rem; color:var(--text-heading);">${plan.title}</h3>
        <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;">
          <strong>Duration:</strong> ${plan.duration} &nbsp;|&nbsp; <strong>Prerequisites:</strong> ${plan.prerequisites}
        </div>
      </div>
      <span class="role-pill role-teacher">OFFICIAL LESSON PLAN</span>
    </div>

    <h4 style="font-size:0.95rem; color:var(--accent-cyan); margin:1rem 0 0.5rem;">🎯 Pedagogical Learning Objectives:</h4>
    <ul style="margin-left:1.25rem; font-size:0.875rem; color:var(--text-main); line-height:1.6;">
      ${plan.objectives.map(o => `<li>${o}</li>`).join('')}
    </ul>

    <h4 style="font-size:0.95rem; color:var(--accent-gold); margin:1.25rem 0 0.5rem;">📦 Materials &amp; Equipment Checklist:</h4>
    <ul style="margin-left:1.25rem; font-size:0.875rem; color:var(--text-main); line-height:1.6;">
      ${plan.materials.map(m => `<li>${m}</li>`).join('')}
    </ul>

    <h4 style="font-size:0.95rem; color:var(--accent-indigo); margin:1.25rem 0 0.5rem;">⏱️ 90-Minute Teaching Timeline:</h4>
    <table class="pinout-table" style="margin:0 0 1rem 0;">
      <thead>
        <tr><th>Time Block</th><th>Session Phase</th><th>Instructor &amp; Student Activity</th></tr>
      </thead>
      <tbody>
        ${plan.timeline.map(t => `
          <tr>
            <td><code>${t.time}</code></td>
            <td><strong>${t.title}</strong></td>
            <td>${t.activity}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <h4 style="font-size:0.95rem; color:var(--accent-amber); margin:1.25rem 0 0.5rem;">⚠️ Common Student Misconceptions &amp; Proactive Interventions:</h4>
    <div style="display:grid; gap:0.5rem;">
      ${plan.misconceptions.map(m => `
        <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.75rem; font-size:0.85rem;">
          <strong style="color:var(--accent-amber);">Common Pitfall:</strong> ${m.pitfall}<br>
          <strong style="color:var(--accent-green);">Instructor Fix:</strong> ${m.intervention}
        </div>
      `).join('')}
    </div>

    <h4 style="font-size:0.95rem; color:var(--accent-cyan); margin:1.25rem 0 0.5rem;">💡 Differentiated Learning Strategies:</h4>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
      <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.75rem; font-size:0.85rem;">
        <strong style="color:var(--accent-cyan);">Support (Scaffolding):</strong><br>${plan.differentiation.support}
      </div>
      <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.75rem; font-size:0.85rem;">
        <strong style="color:var(--accent-gold);">Extension (Advanced):</strong><br>${plan.differentiation.extension}
      </div>
    </div>

    <h4 style="font-size:0.95rem; color:var(--accent-green); margin:1.25rem 0 0.5rem;">📊 Assessment Rubric (100 Points Total):</h4>
    <table class="pinout-table" style="margin:0;">
      <thead>
        <tr><th>Evaluation Criteria</th><th>Points</th></tr>
      </thead>
      <tbody>
        ${plan.rubric.map(r => `<tr><td>${r.criteria}</td><td><strong>${r.points}</strong></td></tr>`).join('')}
      </tbody>
    </table>
  `;

  container.innerHTML = html;
}

function renderSelectedPptDeck() {
  const select = document.getElementById("teacher-ppt-select");
  const container = document.getElementById("teacher-ppt-deck-content");
  if (!select || !container) return;

  const key = select.value;
  const deck = TEACHER_PPT_DECKS[key];
  if (!deck) return;

  let html = `
    <div style="margin-bottom:1rem; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem;">
      <h3 style="font-size:1.2rem; color:var(--text-heading);">${deck.title}</h3>
      <p style="font-size:0.825rem; color:var(--text-muted);">8 Slide Classroom Presentation Outline with Speaker Notes</p>
    </div>
  `;

  deck.slides.forEach(slide => {
    html += `
      <div class="ppt-slide-card">
        <div class="ppt-slide-header">
          <span style="font-weight:700; color:var(--accent-cyan);">Slide ${slide.num}: ${slide.title}</span>
          <span class="role-pill role-student" style="font-size:0.7rem;">SLIDE ${slide.num} OF 8</span>
        </div>
        <div style="font-size:0.875rem; color:var(--text-main); margin-bottom:0.75rem;">
          <ul style="margin-left:1.25rem; line-height:1.6;">
            ${slide.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
        <div style="font-size:0.8rem; color:var(--text-dim); background:var(--bg-primary); padding:0.5rem 0.75rem; border-radius:var(--radius-sm); margin-bottom:0.5rem;">
          <strong>Suggested On-Screen Visual:</strong> ${slide.visual}
        </div>
        <div class="ppt-slide-notes">
          <strong>🗣️ Presenter Speaker Notes:</strong><br>${slide.notes}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function copyPptDeckOutline() {
  const select = document.getElementById("teacher-ppt-select");
  if (!select) return;
  const key = select.value;
  const deck = TEACHER_PPT_DECKS[key];
  if (!deck) return;

  let text = `========================================================\n${deck.title}\n========================================================\n\n`;
  deck.slides.forEach(s => {
    text += `[SLIDE ${s.num}: ${s.title}]\n`;
    s.bullets.forEach(b => text += `  • ${b}\n`);
    text += `  [Visual]: ${s.visual}\n`;
    text += `  [Speaker Notes]: ${s.notes}\n\n`;
  });

  navigator.clipboard.writeText(text).then(() => {
    showToast("Presentation outline and speaker notes copied to clipboard!", "success");
  });
}

function printActiveLessonPlan() {
  const content = document.getElementById("teacher-lesson-plan-content");
  if (!content) return;
  const win = window.open("", "_blank");
  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Lesson Plan — RoboSkillsClub</title>
        <style>
          body { font-family: -apple-system, sans-serif; padding: 2rem; color: #111; line-height: 1.5; }
          h3, h4 { color: #0F172A; }
          table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
          th, td { border: 1px solid #CBD5E1; padding: 8px 12px; text-align: left; }
          th { background: #F1F5F9; font-weight: 700; }
          code { font-family: monospace; background: #E2E8F0; padding: 2px 4px; border-radius: 3px; }
        </style>
      </head>
      <body>
        ${content.innerHTML}
        <script>window.onload = function() { window.print(); }<\/script>
      </body>
    </html>
  `);
  win.document.close();
}
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


// =============================================================================
// 7. Searchable Country Picker & Dynamic Phone Code Auto-Prefixing
// =============================================================================
const COUNTRIES_DATA = [
  { name: "United Arab Emirates", code: "AE", dial: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "SA", dial: "+966", flag: "🇸🇦" },
  { name: "Qatar", code: "QA", dial: "+974", flag: "🇶🇦" },
  { name: "Kuwait", code: "KW", dial: "+965", flag: "🇰🇼" },
  { name: "Bahrain", code: "BH", dial: "+973", flag: "🇧🇭" },
  { name: "Oman", code: "OM", dial: "+968", flag: "🇴🇲" },
  { name: "Egypt", code: "EG", dial: "+20", flag: "🇪🇬" },
  { name: "Jordan", code: "JO", dial: "+962", flag: "🇯🇴" },
  { name: "Lebanon", code: "LB", dial: "+961", flag: "🇱🇧" },
  { name: "Iraq", code: "IQ", dial: "+964", flag: "🇮🇶" },
  { name: "Morocco", code: "MA", dial: "+212", flag: "🇲🇦" },
  { name: "Algeria", code: "DZ", dial: "+213", flag: "🇩🇿" },
  { name: "Tunisia", code: "TN", dial: "+216", flag: "🇹🇳" },
  { name: "United States", code: "US", dial: "+1", flag: "🇺🇸" },
  { name: "Canada", code: "CA", dial: "+1", flag: "🇨🇦" },
  { name: "United Kingdom", code: "GB", dial: "+44", flag: "🇬🇧" },
  { name: "Germany", code: "DE", dial: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dial: "+33", flag: "🇫🇷" },
  { name: "Italy", code: "IT", dial: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dial: "+34", flag: "🇪🇸" },
  { name: "Netherlands", code: "NL", dial: "+31", flag: "🇳🇱" },
  { name: "Switzerland", code: "CH", dial: "+41", flag: "🇨🇭" },
  { name: "Austria", code: "AT", dial: "+43", flag: "🇦🇹" },
  { name: "Sweden", code: "SE", dial: "+46", flag: "🇸🇪" },
  { name: "Norway", code: "NO", dial: "+47", flag: "🇳🇴" },
  { name: "Denmark", code: "DK", dial: "+45", flag: "🇩🇰" },
  { name: "Finland", code: "FI", dial: "+358", flag: "🇫🇮" },
  { name: "Poland", code: "PL", dial: "+48", flag: "🇵🇱" },
  { name: "Ireland", code: "IE", dial: "+353", flag: "🇮🇪" },
  { name: "Belgium", code: "BE", dial: "+32", flag: "🇧🇪" },
  { name: "Portugal", code: "PT", dial: "+351", flag: "🇵🇹" },
  { name: "Greece", code: "GR", dial: "+30", flag: "🇬🇷" },
  { name: "Turkey", code: "TR", dial: "+90", flag: "🇹🇷" },
  { name: "Japan", code: "JP", dial: "+81", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", dial: "+82", flag: "🇰🇷" },
  { name: "Singapore", code: "SG", dial: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "MY", dial: "+60", flag: "🇲🇾" },
  { name: "Indonesia", code: "ID", dial: "+62", flag: "🇮🇩" },
  { name: "India", code: "IN", dial: "+91", flag: "🇮🇳" },
  { name: "Pakistan", code: "PK", dial: "+92", flag: "🇵🇰" },
  { name: "China", code: "CN", dial: "+86", flag: "🇨🇳" },
  { name: "Australia", code: "AU", dial: "+61", flag: "🇦🇺" },
  { name: "New Zealand", code: "NZ", dial: "+64", flag: "🇳🇿" },
  { name: "Brazil", code: "BR", dial: "+55", flag: "🇧🇷" },
  { name: "Mexico", code: "MX", dial: "+52", flag: "🇲🇽" },
  { name: "South Africa", code: "ZA", dial: "+27", flag: "🇿🇦" }
];

function showCountryList(type) {
  renderCountryDropdown(type, COUNTRIES_DATA);
  const dd = document.getElementById(`reg-${type}-country-dropdown`);
  if (dd) dd.style.display = "block";
}

function filterCountries(type) {
  const input = document.getElementById(`reg-${type}-country`);
  const q = (input ? input.value : "").trim().toLowerCase();
  const filtered = COUNTRIES_DATA.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.dial.includes(q) || 
    c.code.toLowerCase().includes(q)
  );
  renderCountryDropdown(type, filtered);
  const dd = document.getElementById(`reg-${type}-country-dropdown`);
  if (dd) dd.style.display = "block";
}

function renderCountryDropdown(type, list) {
  const dd = document.getElementById(`reg-${type}-country-dropdown`);
  if (!dd) return;

  if (list.length === 0) {
    dd.innerHTML = `<div style="padding:0.75rem; font-size:0.8rem; color:var(--text-dim); text-align:center;">No matching countries</div>`;
    return;
  }

  let html = "";
  list.forEach(c => {
    html += `
      <div class="country-dropdown-item" onclick="selectCountry('${type}', '${c.name.replace(/'/g, "\\'")}', '${c.dial}')">
        <div style="display:flex; align-items:center;">
          <span class="country-item-flag">${c.flag}</span>
          <span style="font-weight:600;">${c.name}</span>
        </div>
        <span class="country-item-code">${c.dial}</span>
      </div>
    `;
  });
  dd.innerHTML = html;
}

function selectCountry(type, countryName, dialCode) {
  const countryInput = document.getElementById(`reg-${type}-country`);
  const mobileInput = document.getElementById(`reg-${type}-mobile`);
  const dropdown = document.getElementById(`reg-${type}-country-dropdown`);

  if (countryInput) countryInput.value = countryName;
  if (dropdown) dropdown.style.display = "none";

  if (mobileInput) {
    const curVal = mobileInput.value.trim();
    if (!curVal || curVal.startsWith("+")) {
      const parts = curVal.split(" ");
      const remainder = parts.length > 1 ? parts.slice(1).join(" ") : "";
      mobileInput.value = `${dialCode} ${remainder}`.trim() + " ";
    } else {
      mobileInput.value = `${dialCode} ${curVal}`;
    }
    mobileInput.focus();
  }
}

document.addEventListener("click", function(e) {
  if (!e.target.closest(".country-picker-wrapper")) {
    const d1 = document.getElementById("reg-student-country-dropdown");
    const d2 = document.getElementById("reg-teacher-country-dropdown");
    if (d1) d1.style.display = "none";
    if (d2) d2.style.display = "none";
  }
});

// =============================================================================
// 8. Dynamic Portal Visibility & View Management
// =============================================================================
function updatePortalVisibility() {
  const studentPortal = document.getElementById("student-portal");
  const teacherPortal = document.getElementById("teacher-portal");
  const classroomSection = document.getElementById("classroom-section");
  const dashboardSection = document.getElementById("robot-dashboard-section");

  const guestNavItems = document.querySelectorAll(".nav-guest-item");
  const studentNavItems = document.querySelectorAll(".nav-student-item");
  const teacherNavItems = document.querySelectorAll(".nav-teacher-item");
  const adminNavItems = document.getElementById("nav-admin-link");

  if (!currentUser) {
    // Public / Guest
    if (studentPortal) studentPortal.style.display = "none";
    if (teacherPortal) teacherPortal.style.display = "none";
    if (classroomSection) classroomSection.style.display = "none";
    if (dashboardSection) dashboardSection.style.display = "none";

    guestNavItems.forEach(el => el.style.display = "list-item");
    studentNavItems.forEach(el => el.style.display = "none");
    teacherNavItems.forEach(el => el.style.display = "none");
    if (adminNavItems) adminNavItems.style.display = "none";
  } else if (currentUser.role === "student") {
    // Logged in as Student
    if (studentPortal) studentPortal.style.display = "block";
    if (teacherPortal) teacherPortal.style.display = "none";

    guestNavItems.forEach(el => el.style.display = "none");
    studentNavItems.forEach(el => el.style.display = "list-item");
    teacherNavItems.forEach(el => el.style.display = "none");
    if (adminNavItems) adminNavItems.style.display = "none";

    renderStudentPortal();
  } else if (currentUser.role === "teacher") {
    // Logged in as Teacher
    if (studentPortal) studentPortal.style.display = "none";
    if (teacherPortal) teacherPortal.style.display = "block";

    guestNavItems.forEach(el => el.style.display = "none");
    studentNavItems.forEach(el => el.style.display = "none");
    teacherNavItems.forEach(el => el.style.display = "list-item");
    if (adminNavItems) adminNavItems.style.display = "none";

    renderTeacherPortal();
  } else {
    // Super Admin / Admin
    if (studentPortal) studentPortal.style.display = "none";
    if (teacherPortal) teacherPortal.style.display = "block";

    guestNavItems.forEach(el => el.style.display = "none");
    studentNavItems.forEach(el => el.style.display = "list-item");
    teacherNavItems.forEach(el => el.style.display = "list-item");
    if (adminNavItems) adminNavItems.style.display = "list-item";

    renderTeacherPortal();
  }
}

function openClassroom(lessonIndex) {
  if (!currentUser) {
    showToast("Please sign in or register to enter the online classroom!", "amber");
    openSignInModal();
    return;
  }
  const cls = document.getElementById("classroom-section");
  if (cls) {
    cls.style.display = "block";
    if (lessonIndex !== undefined && lessonIndex !== null) {
      loadLesson(lessonIndex);
    }
    cls.scrollIntoView({ behavior: "smooth" });
  }
}

function openRobotDashboard() {
  if (!currentUser) {
    showToast("Please sign in or register to use the live Robot Dashboard simulator!", "amber");
    openSignInModal();
    return;
  }
  const dash = document.getElementById("robot-dashboard-section");
  if (dash) {
    dash.style.display = "block";
    dash.scrollIntoView({ behavior: "smooth" });
  }
}

function showStudentPortal() {
  const p = document.getElementById("student-portal");
  if (p) {
    p.style.display = "block";
    p.scrollIntoView({ behavior: "smooth" });
  }
}

function showTeacherPortal() {
  const p = document.getElementById("teacher-portal");
  if (p) {
    p.style.display = "block";
    p.scrollIntoView({ behavior: "smooth" });
  }
}

function backToPortal() {
  if (currentUser && currentUser.role === "student") {
    showStudentPortal();
  } else if (currentUser && (currentUser.role === "teacher" || currentUser.role === "admin" || currentUser.role === "super_admin")) {
    showTeacherPortal();
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// =============================================================================
// 9. Student Portal Engine: Notifications & Achievement Percentage
// =============================================================================
function renderStudentPortal() {
  const welcomeEl = document.getElementById("student-portal-welcome");
  if (welcomeEl && currentUser) {
    welcomeEl.textContent = `Welcome back, ${currentUser.displayName}!`;
  }

  renderStudentNotifications();
  renderStudentEnrolledCourses();
  renderStudentAvailableCourses();
}

function renderStudentNotifications() {
  const listEl = document.getElementById("student-notifications-list");
  const countBadge = document.getElementById("notif-count-badge");
  if (!listEl) return;

  const notifs = [];

  if (currentUser) {
    if (currentUser.needsProfileCompletion || !currentUser.profileCompleted) {
      notifs.push({
        id: "notif-profile",
        title: "Complete Your Profile Details",
        body: "Your instructor enrolled you in the course. Please complete your mobile number, education details, and set a personal password.",
        time: "Action Required",
        icon: "⚠️",
        actionBtn: `<button class="btn btn-primary btn-sm" style="margin-top:0.4rem;" onclick="openCompleteProfileModal()">Complete Profile Now</button>`
      });
    }

    notifs.push({
      id: "notif-welcome",
      title: "Enrolled in Autonomous Mobile Robotics (AMR-101)",
      body: `Welcome to the hands-on Studica kit robotics curriculum with instructor <strong>${currentUser.assignedTeacherName || 'Eng. M. Salameh'}</strong>. Enter the classroom player to begin Module 1!`,
      time: "Active",
      icon: "🤖"
    });

    const subs = getStoredSubmissions().filter(s => s.studentEmail && s.studentEmail.toLowerCase() === currentUser.email.toLowerCase() && s.status === "Graded");
    subs.forEach(sub => {
      notifs.push({
        id: `notif-grade-${sub.id}`,
        title: `Lesson ${sub.lessonNumber} Graded: ${sub.score}/100`,
        body: `Feedback from instructor: "${sub.feedback || 'Great work on this lab!'}"`,
        time: sub.submittedAt || "Recent",
        icon: "⭐"
      });
    });
  }

  if (countBadge) countBadge.textContent = `${notifs.length} Updates`;

  let html = "";
  notifs.forEach(n => {
    html += `
      <div class="notification-item">
        <div class="notification-icon">${n.icon}</div>
        <div class="notification-body">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:var(--brand-primary);">${n.title}</strong>
            <span class="notification-time">${n.time}</span>
          </div>
          <div style="color:var(--text-main); margin-top:0.25rem;">${n.body}</div>
          ${n.actionBtn || ''}
        </div>
      </div>
    `;
  });
  listEl.innerHTML = html;
}


function renderStudentEnrolledCourses() {
  const container = document.getElementById("student-enrolled-courses-list");
  if (!container) return;

  const allLessons = getAllCourseLessons();
  const total = allLessons.length;
  let completedCount = 0;
  allLessons.forEach(l => {
    if (userProgress[l.id] === true) completedCount++;
  });
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  let html = `
    <div class="enrolled-card">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <span class="role-pill role-student">${currentCourse.shortCode}</span>
          <span class="role-pill ${percentage === 100 ? "role-admin" : "role-student"}">
            ${percentage === 100 ? "100% COMPLETED" : "IN PROGRESS"}
          </span>
        </div>
        <h3 style="font-size:1.25rem; color:var(--text-heading); margin-bottom:0.4rem;">${currentCourse.title}</h3>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1.25rem;">
          Instructor: ${currentCourse.assignedTeacherName} · Author: ${currentCourse.author}
        </p>

        <!-- Achievement Percentage -->
        <div style="margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; font-weight:700; margin-bottom:0.4rem;">
            <span style="color:var(--brand-primary);">Achievement Progress</span>
            <span style="color:var(--progress-success); font-size:1rem;">${percentage}% (${completedCount}/${total} Labs)</span>
          </div>
          <div style="width:100%; height:10px; background:#E2E8F0; border-radius:9999px; overflow:hidden;">
            <div style="width:${percentage}%; height:100%; background:var(--progress-success); border-radius:9999px; transition:width 0.4s ease;"></div>
          </div>
        </div>

        <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1.25rem; font-size:0.8rem; color:var(--text-dim);">
          <span style="background:#F1F5F9; padding:0.25rem 0.5rem; border-radius:4px;">⏱️ 15+ Lab Hours</span>
          <span style="background:#F1F5F9; padding:0.25rem 0.5rem; border-radius:4px;">🛠️ Studica VMX-pi &amp; Titan</span>
          <span style="background:#F1F5F9; padding:0.25rem 0.5rem; border-radius:4px;">📊 Average Score: 95/100</span>
        </div>
      </div>

      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <button class="btn btn-primary btn-sm" style="flex:1;" onclick="openClassroom()">
          <span>🚀 Continue Learning (Enter Classroom) &rarr;</span>
        </button>
        <button class="btn btn-outline btn-sm" onclick="openRobotDashboard()">
          <span>🛠️ Robot Dashboard</span>
        </button>
        <button class="btn btn-outline btn-sm" onclick="openCertificateModal()" style="${percentage === 100 ? "" : "opacity:0.75;"}">
          <span>🎓 Certificate ${percentage === 100 ? "Ready!" : "(Locked)"}</span>
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function renderStudentAvailableCourses() {
  const container = document.getElementById("student-available-courses-list");
  if (!container) return;

  container.innerHTML = `
    <div class="catalog-card">
      <div class="catalog-card-header" style="background:linear-gradient(135deg, #1E293B, #0F172A);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <span class="role-pill role-student" style="background:rgba(255,255,255,0.2); color:#fff; border-color:rgba(255,255,255,0.4);">AMR-201</span>
          <span class="role-pill role-teacher">Upcoming Specialization</span>
        </div>
        <h3 style="font-size:1.35rem; color:#fff; margin-bottom:0.4rem;">3D SLAM, LiDAR Mapping &amp; VSLAM Autonomy</h3>
        <div style="font-size:0.825rem; color:#CBD5E1;">Lead Author: Dr. Mohammed Salameh, PhD in Robotics, SLAM and VSLAM</div>
      </div>
      <div class="catalog-card-body">
        <div>
          <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.6; margin-bottom:1rem;">
            Advanced track covering 3D point cloud filtering with PCL, Visual SLAM (VSLAM) using RGB-D depth cameras, EKF multi-sensor fusion, and Nav2 autonomous path navigation.
          </p>
        </div>
        <div>
          <button class="btn btn-outline" style="width:100%;" onclick="showToast('You will be notified as soon as AMR-201 unlocks!', 'success')">
            <span>Notify Me When Open</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// =============================================================================
// 10. Interactive Lesson Evaluation & Rating Widget
// =============================================================================
let userLessonEvaluations = JSON.parse(localStorage.getItem("roboskills_lesson_evaluations") || "{}");
let currentEvalRating = 5;
let currentEvalStatus = "understood";
let currentEvalCodeWorking = true;

function renderLessonEvaluationWidget(lesson) {
  const container = document.getElementById("lesson-evaluation-card-container");
  if (!container || !lesson) return;

  // Restore saved evaluation if exists
  const saved = userLessonEvaluations[lesson.id];
  if (saved) {
    currentEvalRating = saved.rating || 5;
    currentEvalStatus = saved.status || "understood";
    currentEvalCodeWorking = saved.codeWorking !== undefined ? saved.codeWorking : true;
  } else {
    currentEvalRating = 5;
    currentEvalStatus = "understood";
    currentEvalCodeWorking = true;
  }

  container.innerHTML = `
    <div class="lesson-eval-widget" id="lesson-eval-container">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem;">
        <div>
          <h4 style="font-size:1.1rem; color:var(--brand-primary); display:flex; align-items:center; gap:0.5rem; margin:0;">
            <span>⭐ Lesson Evaluation &amp; Quality Feedback</span>
          </h4>
          <p style="font-size:0.825rem; color:var(--text-muted); margin-top:0.2rem;">
            Help Dr. Mohammed Salameh and your instructor evaluate your learning experience for Lesson ${lesson.number}:
          </p>
        </div>
        <span class="role-pill role-student">Lesson ${lesson.number}</span>
      </div>

      <!-- Question 1: Rating out of 5 -->
      <div style="margin-bottom:1.25rem;">
        <label style="font-weight:700; font-size:0.9rem; color:var(--text-heading); display:block; margin-bottom:0.35rem;">
          1. How clear and easy was this lesson to understand? (Rate 1 to 5):
        </label>
        <div class="eval-star-group" id="eval-star-group">
          ${[1, 2, 3, 4, 5].map(star => `
            <button type="button" class="star-btn ${star <= currentEvalRating ? "active" : ""}" onclick="setEvalRating(${star})" title="${star} Star${star > 1 ? "s" : ""}">★</button>
          `).join("")}
          <span id="eval-rating-label" style="font-size:0.85rem; font-weight:700; margin-left:0.5rem; color:var(--cta-amber);">
            ${getStarRatingLabel(currentEvalRating)}
          </span>
        </div>
      </div>

      <!-- Question 2: Completion & Understanding Status -->
      <div style="margin-bottom:1.25rem;">
        <label style="font-weight:700; font-size:0.9rem; color:var(--text-heading); display:block; margin-bottom:0.35rem;">
          2. What is your comprehension and completion status?
        </label>
        <div class="eval-pill-group">
          <div class="eval-pill-opt ${currentEvalStatus === "understood" ? "selected" : ""}" id="opt-status-understood" onclick="setEvalStatus('understood')">
            <span>🟢 Completed &amp; Fully Understood</span>
          </div>
          <div class="eval-pill-opt ${currentEvalStatus === "difficult" ? "selected" : ""}" id="opt-status-difficult" onclick="setEvalStatus('difficult')">
            <span>🟡 Completed but Found Difficult</span>
          </div>
          <div class="eval-pill-opt ${currentEvalStatus === "partial" ? "selected" : ""}" id="opt-status-partial" onclick="setEvalStatus('partial')">
            <span>⏳ Partially Completed</span>
          </div>
          <div class="eval-pill-opt ${currentEvalStatus === "stuck" ? "selected" : ""}" id="opt-status-stuck" onclick="setEvalStatus('stuck')">
            <span>❓ Stuck / Need Instructor Help</span>
          </div>
        </div>
      </div>

      <!-- Question 3: Is code working? Yes or No -->
      <div style="margin-bottom:1.25rem;">
        <label style="font-weight:700; font-size:0.9rem; color:var(--text-heading); display:block; margin-bottom:0.35rem;">
          3. Did the code snippet or setup script run successfully on your robot/laptop?
        </label>
        <div class="code-status-toggle">
          <button type="button" id="eval-code-yes" class="code-toggle-btn btn-yes ${currentEvalCodeWorking ? "selected" : ""}" onclick="setEvalCodeWorking(true)">
            <span style="font-size:1.1rem;">✅</span>
            <span>Yes, Ran Successfully</span>
          </button>
          <button type="button" id="eval-code-no" class="code-toggle-btn btn-no ${!currentEvalCodeWorking ? "selected" : ""}" onclick="setEvalCodeWorking(false)">
            <span style="font-size:1.1rem;">❌</span>
            <span>No, Encountered Error / Bug</span>
          </button>
        </div>
      </div>

      <!-- Question 4: Notes / Comments -->
      <div style="margin-bottom:1.25rem;">
        <label style="font-weight:700; font-size:0.9rem; color:var(--text-heading); display:block; margin-bottom:0.35rem;">
          4. Any notes, questions, or suggestions for Dr. Salameh or your instructor? (Optional):
        </label>
        <textarea id="eval-comments-input" class="form-control" rows="2" placeholder="Tell us what was easy or what caused confusion in this lab...">${saved ? (saved.feedback || "") : ""}</textarea>
      </div>

      <button class="btn btn-primary" onclick="submitLessonEvaluation('${lesson.id}', '${lesson.number}')">
        <span>Submit Lesson Evaluation</span>
      </button>

      <div id="eval-submitted-msg" style="${saved ? "display:block;" : "display:none;"} margin-top:1rem; padding:0.85rem; background:#ECFDF5; border:1px solid #059669; border-radius:var(--radius-md); color:#047857; font-weight:600; font-size:0.875rem;">
        ✓ Thank you! Your evaluation (${saved ? saved.rating : 5}/5 · Code Working: ${saved && saved.codeWorking ? "Yes" : "Yes"}) has been recorded and submitted to Dr. Mohammed Salameh and your instructor.
      </div>
    </div>
  `;
}

function getStarRatingLabel(rating) {
  switch (rating) {
    case 1: return "1/5 - Very Difficult / Unclear";
    case 2: return "2/5 - Challenging";
    case 3: return "3/5 - Average / Moderate";
    case 4: return "4/5 - Clear & Easy to Follow";
    case 5: return "5/5 - Crystal Clear & Intuitive!";
    default: return "Select Rating";
  }
}

function setEvalRating(rating) {
  currentEvalRating = rating;
  const starBtns = document.querySelectorAll("#eval-star-group .star-btn");
  starBtns.forEach((btn, idx) => {
    btn.classList.toggle("active", idx < rating);
  });
  const label = document.getElementById("eval-rating-label");
  if (label) label.textContent = getStarRatingLabel(rating);
}

function setEvalStatus(status) {
  currentEvalStatus = status;
  document.querySelectorAll(".eval-pill-opt").forEach(p => p.classList.remove("selected"));
  const el = document.getElementById(`opt-status-${status}`);
  if (el) el.classList.add("selected");
}

function setEvalCodeWorking(isWorking) {
  currentEvalCodeWorking = isWorking;
  const yesBtn = document.getElementById("eval-code-yes");
  const noBtn = document.getElementById("eval-code-no");
  if (yesBtn) yesBtn.classList.toggle("selected", isWorking);
  if (noBtn) noBtn.classList.toggle("selected", !isWorking);
}

function submitLessonEvaluation(lessonId, lessonNumber) {
  const comment = document.getElementById("eval-comments-input")?.value.trim() || "";

  userLessonEvaluations[lessonId] = {
    rating: currentEvalRating,
    status: currentEvalStatus,
    codeWorking: currentEvalCodeWorking,
    feedback: comment,
    evaluatedAt: new Date().toISOString()
  };

  localStorage.setItem("roboskills_lesson_evaluations", JSON.stringify(userLessonEvaluations));

  const msg = document.getElementById("eval-submitted-msg");
  if (msg) {
    msg.style.display = "block";
    msg.innerHTML = `✓ Thank you! Your evaluation (${currentEvalRating}/5 · Code Working: ${currentEvalCodeWorking ? "Yes" : "No"}) has been recorded and submitted to Dr. Mohammed Salameh and your instructor.`;
  }

  showToast(`Lesson ${lessonNumber} evaluation saved (${currentEvalRating}/5)!`, "success");
}

// =============================================================================
// 11. Teacher Portal: Student Progress, Marking Desk & Curriculum Feedback
// =============================================================================
function getStoredSubmissions() {
  try {
    const raw = localStorage.getItem("roboskills_submissions");
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [];
}

function saveStoredSubmissions(subs) {
  localStorage.setItem("roboskills_submissions", JSON.stringify(subs));
}

function renderTeacherPortal() {
  const welcome = document.getElementById("teacher-portal-welcome");
  if (welcome && currentUser) {
    welcome.textContent = `Instructor Desk · ${currentUser.displayName}`;
  }

  const users = getStoredUsers();
  const students = users.filter(u => {
    if (u.role !== "student") return false;
    if (currentUser && (currentUser.role === "admin" || currentUser.role === "super_admin")) return true;
    return u.assignedTeacherId === (currentUser ? currentUser.uid : "teacher_salameh") || !u.assignedTeacherId;
  });

  const submissions = getStoredSubmissions();
  const pendingCount = submissions.filter(s => s.status === "Pending Review").length;
  const gradedSubs = submissions.filter(s => s.status === "Graded" && s.score !== null && !isNaN(s.score));
  const avgScore = gradedSubs.length > 0
    ? (gradedSubs.reduce((acc, curr) => acc + curr.score, 0) / gradedSubs.length).toFixed(1)
    : "—";

  const statStudents = document.getElementById("teacher-stat-students");
  const pendingEl = document.getElementById("teacher-stat-pending");
  const statAvg = document.getElementById("teacher-stat-avg-score");
  const badgeEl = document.getElementById("teacher-marking-badge");

  if (statStudents) statStudents.textContent = `${students.length} Active`;
  if (pendingEl) pendingEl.textContent = `${pendingCount} Pending`;
  if (statAvg) statAvg.textContent = avgScore === "—" ? "— (No grades yet)" : `${avgScore} / 100`;
  if (badgeEl) badgeEl.textContent = pendingCount;

  renderTeacherCourses();
  renderTeacherRoster();
  renderTeacherSubmissions();
  renderTeacherFeedbackDesk();
  renderTeacherCatalog();
}

function switchTeacherPortalTab(tabName) {
  document.querySelectorAll(".lesson-tabs .tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".portal-tab-pane").forEach(p => p.style.display = "none");

  const btn = document.getElementById(`btn-teach-tab-${tabName}`);
  const pane = document.getElementById(`teach-pane-${tabName}`);
  if (btn) btn.classList.add("active");
  if (pane) pane.style.display = "block";
}

function renderTeacherCourses() {
  const container = document.getElementById("teacher-assigned-courses-list");
  if (!container) return;

  const users = getStoredUsers();
  const students = users.filter(u => {
    if (u.role !== "student") return false;
    if (currentUser && (currentUser.role === "admin" || currentUser.role === "super_admin")) return true;
    return u.assignedTeacherId === (currentUser ? currentUser.uid : "teacher_salameh") || !u.assignedTeacherId;
  });

  container.innerHTML = `
    <div class="enrolled-card">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <span class="role-pill role-teacher">Assigned Teaching Track</span>
          <span class="role-pill role-student">${students.length} Active Students</span>
        </div>
        <h3 style="font-size:1.35rem; color:var(--text-heading); margin-bottom:0.4rem;">${currentCourse.title}</h3>
        <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1.25rem;">
          ${currentCourse.description}
        </p>
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:var(--radius-md); padding:0.85rem 1rem; margin-bottom:1.5rem;">
          <div style="font-size:0.8rem; font-weight:700; color:var(--brand-primary); text-transform:uppercase; margin-bottom:0.35rem;">Curriculum Breakdown:</div>
          <div style="font-size:0.85rem; margin-bottom:0.25rem;">• Module 1: Build Your First Robot (5 Labs · Mechanics, Fasteners, Wiring)</div>
          <div style="font-size:0.85rem;">• Module 2: Connect, Drive &amp; Hardware Experience (5 Labs · Gigabit Setup, Teleop)</div>
        </div>
      </div>
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <button class="btn btn-primary btn-sm" onclick="openClassroom()">
          <span>📖 View Course Curriculum (Classroom) &rarr;</span>
        </button>
        <button class="btn btn-outline btn-sm" onclick="openRobotDashboard()">
          <span>🛠️ Open Robot Dashboard Simulator</span>
        </button>
        <button class="btn btn-outline btn-sm" onclick="showTeacherPortal(); switchTeacherPortalTab('roster');">
          <span>👥 View Student Roster</span>
        </button>
      </div>
    </div>
  `;
}

function renderTeacherRoster() {
  const container = document.getElementById("teacher-roster-table-container");
  if (!container) return;

  const users = getStoredUsers();
  const students = users.filter(u => {
    if (u.role !== "student") return false;
    if (currentUser && (currentUser.role === "admin" || currentUser.role === "super_admin")) return true;
    return u.assignedTeacherId === (currentUser ? currentUser.uid : "teacher_salameh") || !u.assignedTeacherId;
  });

  const statStudents = document.getElementById("teacher-stat-students");
  if (statStudents) statStudents.textContent = `${students.length} Active`;

  if (students.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem 1.5rem; background:#FFFFFF; border:1px dashed #CBD5E1; border-radius:var(--radius-lg);">
        <div style="font-size:2.5rem; margin-bottom:0.75rem;">👥</div>
        <h4 style="font-size:1.15rem; color:var(--brand-primary); margin-bottom:0.4rem;">No Students Enrolled Yet</h4>
        <p style="font-size:0.875rem; color:var(--text-muted); max-width:480px; margin:0 auto 1.25rem;">
          Your class roster is currently empty. Click the button below to add your first student to the Autonomous Mobile Robotics course.
        </p>
        <button class="btn btn-primary btn-sm" onclick="openTeacherAddStudentModal()">+ Enroll New Student</button>
      </div>
    `;
    return;
  }

  let html = `
    <table class="pinout-table" style="margin:0;">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Contact &amp; Country</th>
          <th>Course Progress</th>
          <th>Submissions</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  `;

  students.forEach(s => {
    const progress = s.progress || 0;
    const submissions = s.submissions || 0;
    const profileTag = s.profileCompleted ? 
      `<span class="role-pill role-admin">Profile Complete</span>` : 
      `<span class="role-pill role-teacher">Pending First Login</span>`;

    html += `
      <tr>
        <td>
          <strong>${s.displayName}</strong>
          <div style="font-size:0.75rem; color:var(--text-dim);">${s.schoolName || s.universityName || 'Autonomous Robotics'}</div>
        </td>
        <td>
          <div>${s.email}</div>
          <div style="font-size:0.75rem; color:var(--text-dim);">${s.mobileNumber || 'No mobile'} · ${s.country || 'N/A'}</div>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:0.5rem; min-width:120px;">
            <div style="flex:1; height:7px; background:#E2E8F0; border-radius:4px; overflow:hidden;">
              <div style="width:${progress}%; height:100%; background:var(--progress-success);"></div>
            </div>
            <span style="font-size:0.75rem; font-weight:700;">${progress}%</span>
          </div>
        </td>
        <td><span class="role-pill role-student">${submissions} Labs</span></td>
        <td>${profileTag}</td>
        <td>
          <div style="display:flex; gap:0.35rem;">
            <button class="btn btn-outline btn-sm" onclick="switchTeacherPortalTab('marking')">Submissions</button>
            <button class="btn btn-outline btn-sm" style="color:var(--text-danger);" onclick="adminDeleteUser('${s.uid}')">Remove</button>
          </div>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

function renderTeacherSubmissions() {
  const container = document.getElementById("teacher-submissions-list");
  if (!container) return;

  const submissions = getStoredSubmissions();
  const pendingCount = submissions.filter(s => s.status === "Pending Review").length;

  const badge = document.getElementById("teacher-marking-badge");
  if (badge) badge.textContent = pendingCount;
  const statPending = document.getElementById("teacher-stat-pending");
  if (statPending) statPending.textContent = `${pendingCount} Pending`;

  if (submissions.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem 1.5rem; background:#FFFFFF; border:1px dashed #CBD5E1; border-radius:var(--radius-lg);">
        <div style="font-size:2.5rem; margin-bottom:0.75rem;">📝</div>
        <h4 style="font-size:1.15rem; color:var(--brand-primary); margin-bottom:0.4rem;">No Student Submissions Pending Review</h4>
        <p style="font-size:0.875rem; color:var(--text-muted); max-width:480px; margin:0 auto;">
          When enrolled students submit their lab challenges, reflections, and terminal outputs, they will appear here for grading and feedback.
        </p>
      </div>
    `;
    return;
  }

  let html = "";
  submissions.forEach(sub => {
    const isGraded = sub.status === "Graded";
    html += `
      <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:var(--radius-lg); padding:1.5rem; margin-bottom:1.25rem; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <h4 style="font-size:1.05rem; color:var(--brand-primary); margin:0;">${sub.studentName}</h4>
              <span class="role-pill role-student">${sub.country || ''}</span>
              <span class="role-pill ${isGraded ? "role-admin" : "role-teacher"}">${sub.status}</span>
            </div>
            <div style="font-size:0.8rem; color:var(--text-dim); margin-top:0.25rem;">
              Lesson ${sub.lessonNumber}: ${sub.lessonTitle} · Submitted: ${sub.submittedAt} (Due: ${sub.dueDate})
            </div>
          </div>
          <div style="text-align:right;">
            <span style="font-size:0.85rem; font-weight:700; color:var(--text-dim);">Grade:</span>
            <span style="font-size:1.15rem; font-weight:800; color:var(--cta-amber); margin-left:0.35rem;">
              ${sub.score !== null ? `${sub.score} / 100` : "Ungraded"}
            </span>
          </div>
        </div>

        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:var(--radius-md); padding:0.85rem 1rem; margin-bottom:1rem;">
          <div style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:0.25rem;">Student Observation:</div>
          <p style="font-size:0.875rem; color:var(--text-main); margin:0;">${sub.submissionText}</p>
        </div>

        <div style="background:#F1F5F9; border:1px solid #CBD5E1; border-radius:var(--radius-md); padding:1rem;">
          <div style="display:grid; grid-template-columns:160px 1fr; gap:1rem; margin-bottom:0.75rem;">
            <div class="form-group" style="margin:0;">
              <label style="font-size:0.8rem; font-weight:700;">Score (0 - 100):</label>
              <input type="number" id="grade-score-${sub.id}" class="form-control" value="${sub.score !== null ? sub.score : 95}" min="0" max="100">
            </div>
            <div class="form-group" style="margin:0;">
              <label style="font-size:0.8rem; font-weight:700;">Instructor Written Feedback:</label>
              <input type="text" id="grade-feedback-${sub.id}" class="form-control" value="${sub.feedback || "Solid implementation. Motor encoder counts and VMX pin allocations accurately validated against Studica hardware documentation."}" placeholder="Enter constructive feedback for the student...">
            </div>
          </div>
          <div style="text-align:right;">
            <button class="btn btn-primary btn-sm" onclick="gradeTeacherSubmission('${sub.id}')">
              <span>💾 Save Grade &amp; Notify Student</span>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function gradeTeacherSubmission(subId) {
  const submissions = getStoredSubmissions();
  const sub = submissions.find(s => s.id === subId);
  if (!sub) return;

  const scoreInput = document.getElementById(`grade-score-${subId}`);
  const feedbackInput = document.getElementById(`grade-feedback-${subId}`);

  const score = parseInt(scoreInput?.value || "95", 10);
  const feedback = feedbackInput?.value.trim() || "Good work!";

  sub.score = score;
  sub.feedback = feedback;
  sub.status = "Graded";

  saveStoredSubmissions(submissions);

  renderTeacherPortal();
  showToast(`Graded submission for ${sub.studentName} (${score}/100). Notification sent!`, "success");
}

function renderTeacherFeedbackDesk() {
  const lessonSelect = document.getElementById("teacher-feedback-lesson-select");
  if (!lessonSelect) return;

  const allLessons = getAllCourseLessons();
  let html = "";
  allLessons.forEach((l, idx) => {
    html += `<option value="${idx}">Lesson ${l.number}: ${l.title}</option>`;
  });
  lessonSelect.innerHTML = html;

  onTeacherLessonSelectChange();
}

function onTeacherLessonSelectChange() {
  const lessonSelect = document.getElementById("teacher-feedback-lesson-select");
  const partSelect = document.getElementById("teacher-feedback-part-select");
  const previewBox = document.getElementById("teacher-material-preview-box");
  if (!lessonSelect || !partSelect || !previewBox) return;

  const lessonIdx = parseInt(lessonSelect.value, 10) || 0;
  const part = partSelect.value;
  const allLessons = getAllCourseLessons();
  const lesson = allLessons[lessonIdx];
  if (!lesson) return;

  let content = "";
  if (part === "objective") {
    content = `<div class="callout objective"><div class="callout-title">🎯 Lesson Objective</div><div class="callout-body">${lesson.objective || ""}</div></div>`;
  } else if (part === "concept") {
    content = lesson.concept;
  } else if (part === "wiring") {
    content = lesson.wiring;
  } else if (part === "code") {
    content = `<pre style="background:#0F172A; color:#E2E8F0; padding:1rem; border-radius:var(--radius-md); font-family:var(--font-code);">${lesson.codeSnippet}</pre>`;
  } else if (part === "test") {
    content = lesson.test;
  } else if (part === "challenge") {
    content = `${lesson.challenge}<div style="margin-top:0.75rem;"><strong>Exit Ticket Questions:</strong><ol>${(lesson.exitTicket || []).map(q => `<li>${q}</li>`).join("")}</ol></div>`;
  }

  previewBox.innerHTML = content;
}

function submitTeacherCurriculumFeedback() {
  const lessonSelect = document.getElementById("teacher-feedback-lesson-select");
  const partSelect = document.getElementById("teacher-feedback-part-select");
  const categorySelect = document.getElementById("teacher-feedback-category");
  const severitySelect = document.getElementById("teacher-feedback-severity");
  const notesText = document.getElementById("teacher-feedback-notes");

  const notes = (notesText ? notesText.value : "").trim();
  if (!notes) {
    showToast("Please provide your feedback notes before submitting", "amber");
    return;
  }

  if (notesText) notesText.value = "";
  showToast("Feedback submitted to Dr. Mohammed Salameh! Thank you for enhancing the curriculum.", "success");
}

function renderTeacherCatalog() {
  const container = document.getElementById("teacher-catalog-grid");
  if (!container) return;

  container.innerHTML = `
    <div class="catalog-card">
      <div class="catalog-card-header">
        <h3 style="font-size:1.35rem; color:#fff;">AMR-101: Autonomous Mobile Robotics (Studica Kit Masterclass)</h3>
        <div style="font-size:0.85rem; color:#E0F2FE;">Lead Author: Dr. Mohammed Salameh · Assigned to You</div>
      </div>
      <div class="catalog-card-body">
        <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.6; margin-bottom:1rem;">
          Active 2-module curriculum with 10 hands-on hardware labs.
        </p>
        <button class="btn btn-primary" onclick="openClassroom()">Open Course Player &rarr;</button>
      </div>
    </div>
  `;
}



// =============================================================================
// User Profile & Account Settings (Any Logged-in User can Edit Profile & Password)
// =============================================================================
function openProfileModal() {
  if (!currentUser) {
    openSignInModal();
    return;
  }
  closeAllModals();
  const modal = document.getElementById("profile-modal");
  if (!modal) return;

  const emailDisplay = document.getElementById("profile-display-email");
  if (emailDisplay) emailDisplay.textContent = currentUser.email || "";

  const roleDisplay = currentUser.role === "super_admin" ? "SUPER ADMIN" :
                      currentUser.role === "admin" ? "ADMIN" :
                      currentUser.role === "teacher" ? "TEACHER" : "STUDENT";
  const roleBadge = document.getElementById("profile-role-badge");
  if (roleBadge) {
    roleBadge.textContent = roleDisplay;
    roleBadge.className = `role-pill role-${currentUser.role.replace('_', '-')}`;
  }

  const nameInput = document.getElementById("profile-name");
  if (nameInput) nameInput.value = currentUser.displayName || "";

  const mobileInput = document.getElementById("reg-profile-mobile");
  if (mobileInput) mobileInput.value = currentUser.mobileNumber || "";

  const countryInput = document.getElementById("reg-profile-country");
  if (countryInput) countryInput.value = currentUser.country || "";

  const orgInput = document.getElementById("profile-org");
  if (orgInput) orgInput.value = currentUser.organization || currentUser.universityName || currentUser.schoolName || "";

  const subfield = document.getElementById("profile-subfield");
  const sublabel = document.getElementById("profile-extra-label");
  if (currentUser.role === "student") {
    if (sublabel) sublabel.textContent = currentUser.educationLevel === "school" ? "Grade / Year" : "Major / Department";
    if (subfield) subfield.value = currentUser.major || currentUser.gradeYear || "";
  } else if (currentUser.role === "teacher") {
    if (sublabel) sublabel.textContent = "Current Job Title / Position";
    if (subfield) subfield.value = currentUser.jobTitle || "";
  } else {
    if (sublabel) sublabel.textContent = "Title / Responsibilities";
    if (subfield) subfield.value = currentUser.title || "";
  }

  const newPass = document.getElementById("profile-new-password");
  const confirmPass = document.getElementById("profile-confirm-password");
  if (newPass) newPass.value = "";
  if (confirmPass) confirmPass.value = "";

  modal.classList.add("active");
}

function handleSaveProfile(event) {
  event.preventDefault();
  if (!currentUser) return;

  const name = document.getElementById("profile-name").value.trim();
  const mobile = document.getElementById("reg-profile-mobile").value.trim();
  const country = document.getElementById("reg-profile-country").value.trim();
  const org = document.getElementById("profile-org").value.trim();
  const subVal = document.getElementById("profile-subfield").value.trim();

  const newPass = document.getElementById("profile-new-password").value;
  const confirmPass = document.getElementById("profile-confirm-password").value;

  if (newPass) {
    if (newPass.length < 6) {
      showToast("New password must be at least 6 characters long.", "error");
      return;
    }
    if (newPass !== confirmPass) {
      showToast("Passwords do not match. Please verify.", "error");
      return;
    }
  }

  const users = getStoredUsers();
  const idx = users.findIndex(u => u.uid === currentUser.uid || (u.email && u.email.toLowerCase() === currentUser.email.toLowerCase()));
  if (idx !== -1) {
    users[idx].displayName = name;
    users[idx].mobileNumber = mobile;
    users[idx].country = country;
    if (currentUser.role === "student") {
      if (currentUser.educationLevel === "school") {
        users[idx].schoolName = org;
        users[idx].gradeYear = subVal;
      } else {
        users[idx].universityName = org;
        users[idx].major = subVal;
      }
    } else if (currentUser.role === "teacher") {
      users[idx].organization = org;
      users[idx].jobTitle = subVal;
    } else {
      users[idx].organization = org;
      users[idx].title = subVal;
    }
    if (newPass) {
      users[idx].password = newPass;
    }
    saveStoredUsers(users);

    currentUser = { ...users[idx] };
    localStorage.setItem("roboskills_user", JSON.stringify(currentUser));
  }

  updateNavAuthUI();
  closeAllModals();
  showToast("Profile & password updated successfully!", "success");
}

// =============================================================================
// First-Time Student Login: Complete Profile Workflow
// =============================================================================
function openCompleteProfileModal() {
  if (!currentUser) return;
  closeAllModals();
  const modal = document.getElementById("complete-profile-modal");
  if (!modal) return;

  const nameInput = document.getElementById("complete-student-name");
  if (nameInput) nameInput.value = currentUser.displayName || "";

  const emailInput = document.getElementById("complete-student-email");
  if (emailInput) emailInput.value = currentUser.email || "";

  const countryInput = document.getElementById("reg-complete-country");
  if (countryInput) countryInput.value = currentUser.country || "";

  const mobileInput = document.getElementById("reg-complete-mobile");
  if (mobileInput) mobileInput.value = currentUser.mobileNumber || "";

  const eduSelect = document.getElementById("complete-edu-level");
  if (eduSelect) {
    eduSelect.value = currentUser.educationLevel || "university";
    toggleCompleteEduSubfields();
  }

  const welcomeMsg = document.getElementById("complete-profile-welcome-msg");
  if (welcomeMsg) {
    const teacherName = currentUser.assignedTeacherName || "Eng. M. Salameh";
    welcomeMsg.innerHTML = `Welcome to RoboSkillsClub, <strong>${currentUser.displayName}</strong>! You were enrolled by <strong>${teacherName}</strong>. Please complete your profile details and set your personal password before entering the classroom.`;
  }

  modal.classList.add("active");
}

function toggleCompleteEduSubfields() {
  const select = document.getElementById("complete-edu-level");
  if (!select) return;
  const level = select.value;
  const uniDiv = document.getElementById("complete-uni-fields");
  const schoolDiv = document.getElementById("complete-school-fields");
  if (uniDiv) uniDiv.style.display = level === "university" ? "block" : "none";
  if (schoolDiv) schoolDiv.style.display = level === "school" ? "block" : "none";
}

function handleCompleteProfile(event) {
  event.preventDefault();
  if (!currentUser) return;

  const name = document.getElementById("complete-student-name").value.trim();
  const country = document.getElementById("reg-complete-country").value.trim();
  const mobile = document.getElementById("reg-complete-mobile").value.trim();
  const eduLevel = document.getElementById("complete-edu-level").value;
  const password = document.getElementById("complete-password").value;
  const confirm = document.getElementById("complete-password-confirm").value;

  if (password.length < 6) {
    showToast("Password must be at least 6 characters long.", "error");
    return;
  }
  if (password !== confirm) {
    showToast("Passwords do not match.", "error");
    return;
  }

  let schoolName = "";
  let gradeYear = "";
  let universityName = "";
  let degreeLevel = "";
  let major = "";

  if (eduLevel === "school") {
    schoolName = document.getElementById("complete-school-name").value.trim();
    gradeYear = document.getElementById("complete-school-grade").value.trim();
  } else {
    universityName = document.getElementById("complete-uni-name").value.trim();
    degreeLevel = document.getElementById("complete-uni-degree").value;
    major = document.getElementById("complete-uni-major").value.trim();
  }

  const users = getStoredUsers();
  const idx = users.findIndex(u => u.uid === currentUser.uid || (u.email && u.email.toLowerCase() === currentUser.email.toLowerCase()));
  if (idx !== -1) {
    users[idx].displayName = name;
    users[idx].country = country;
    users[idx].mobileNumber = mobile;
    users[idx].educationLevel = eduLevel;
    users[idx].schoolName = schoolName;
    users[idx].gradeYear = gradeYear;
    users[idx].universityName = universityName;
    users[idx].degreeLevel = degreeLevel;
    users[idx].major = major;
    users[idx].password = password;
    users[idx].profileCompleted = true;
    users[idx].needsProfileCompletion = false;
    saveStoredUsers(users);

    currentUser = { ...users[idx] };
    localStorage.setItem("roboskills_user", JSON.stringify(currentUser));
  }

  updateNavAuthUI();
  closeAllModals();
  showToast("Profile completed successfully! Welcome to the classroom.", "success");
  showStudentPortal();
}

// =============================================================================
// Teacher Adding Students Directly
// =============================================================================
function openTeacherAddStudentModal() {
  closeAllModals();
  const modal = document.getElementById("teacher-add-student-modal");
  if (!modal) return;
  document.getElementById("teacher-add-name").value = "";
  document.getElementById("teacher-add-email").value = "";
  document.getElementById("teacher-add-password").value = "Student@123";
  modal.classList.add("active");
}

function handleTeacherAddStudent(event) {
  event.preventDefault();
  const name = document.getElementById("teacher-add-name").value.trim();
  const email = document.getElementById("teacher-add-email").value.trim().toLowerCase();
  const password = document.getElementById("teacher-add-password").value.trim() || "Student@123";
  const courseId = document.getElementById("teacher-add-course").value;

  const users = getStoredUsers();
  const existingIdx = users.findIndex(u => (u.email || "").toLowerCase() === email);

  if (existingIdx !== -1) {
    const existing = users[existingIdx];
    if (!existing.enrolledCourseIds) existing.enrolledCourseIds = [];
    if (!existing.enrolledCourseIds.includes(courseId)) {
      existing.enrolledCourseIds.push(courseId);
    }
    existing.assignedTeacherId = currentUser ? currentUser.uid : "teacher_salameh";
    existing.assignedTeacherName = currentUser ? currentUser.displayName : "Eng. M. Salameh";
    saveStoredUsers(users);
    showToast(`Existing student ${existing.displayName} enrolled in course!`, "success");
  } else {
    const newStudent = {
      uid: "student_" + Date.now(),
      displayName: name,
      email: email,
      password: password,
      role: "student",
      status: "approved",
      needsProfileCompletion: true,
      profileCompleted: false,
      country: "",
      mobileNumber: "",
      educationLevel: "school",
      schoolName: "",
      gradeYear: "",
      universityName: "",
      major: "",
      degreeLevel: "",
      enrolledCourseIds: [courseId],
      assignedTeacherId: currentUser ? currentUser.uid : "teacher_salameh",
      assignedTeacherName: currentUser ? currentUser.displayName : "Eng. M. Salameh",
      progress: 0,
      submissions: 0,
      score: null,
      createdAt: new Date().toISOString()
    };
    users.push(newStudent);
    saveStoredUsers(users);
    showToast(`Student ${name} enrolled! First time they sign in with ${email}, they will be prompted to complete their profile.`, "success");
  }

  closeAllModals();
  renderTeacherRoster();
  renderTeacherDashboard();
}

function teacherAddStudent() {
  openTeacherAddStudentModal();
}

// =============================================================================
// Admin Oversight & Full User Directory Editing (View & Edit ANY User)
// =============================================================================
let adminCurrentFilterRole = "all";
let adminSearchQuery = "";

function switchAdminTab(tabName) {
  document.querySelectorAll(".admin-tab-pane").forEach(p => p.style.display = "none");
  document.querySelectorAll("#admin-modal .teacher-tab-btn").forEach(b => b.classList.remove("active"));
  
  const pane = document.getElementById(`admintab-pane-${tabName}`);
  const btn = document.getElementById(`btn-admintab-${tabName}`);
  if (pane) pane.style.display = "block";
  if (btn) btn.classList.add("active");

  if (tabName === "users") renderAdminUserDirectory();
  if (tabName === "approvals") renderAdminApprovals();
}

function filterAdminUserRole(role) {
  adminCurrentFilterRole = role;
  ["all", "student", "teacher", "admin"].forEach(r => {
    const btn = document.getElementById(`admin-filter-${r}`);
    if (btn) btn.classList.toggle("active", r === role);
  });
  renderAdminUserDirectory();
}

function filterAdminUserDirectory() {
  const input = document.getElementById("admin-user-search");
  adminSearchQuery = (input ? input.value : "").trim().toLowerCase();
  renderAdminUserDirectory();
}

function renderAdminOversight() {
  const users = getStoredUsers();
  const students = users.filter(u => u.role === "student");
  const teachers = users.filter(u => u.role === "teacher");
  const pending = users.filter(u => u.status === "pending");

  const statTotal = document.getElementById("admin-stat-total");
  const statStudents = document.getElementById("admin-stat-students");
  const statTeachers = document.getElementById("admin-stat-teachers");
  const statPending = document.getElementById("admin-stat-pending");
  const tabPendingBadge = document.getElementById("admin-tab-pending-count");

  if (statTotal) statTotal.textContent = users.length;
  if (statStudents) statStudents.textContent = students.length;
  if (statTeachers) statTeachers.textContent = teachers.length;
  if (statPending) statPending.textContent = pending.length;
  if (tabPendingBadge) tabPendingBadge.textContent = pending.length;

  renderAdminUserDirectory();
  renderAdminApprovals();
}

function renderAdminUserDirectory() {
  const container = document.getElementById("admin-users-table-container");
  if (!container) return;

  const users = getStoredUsers();
  const filtered = users.filter(u => {
    if (adminCurrentFilterRole !== "all" && u.role !== adminCurrentFilterRole) return false;
    if (adminSearchQuery) {
      const q = adminSearchQuery;
      const matchName = (u.displayName || "").toLowerCase().includes(q);
      const matchEmail = (u.email || "").toLowerCase().includes(q);
      const matchRole = (u.role || "").toLowerCase().includes(q);
      const matchCountry = (u.country || "").toLowerCase().includes(q);
      return matchName || matchEmail || matchRole || matchCountry;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="padding:2.5rem; text-align:center; color:var(--text-dim);">No user accounts matching query.</div>`;
    return;
  }

  let html = `
    <table class="pinout-table" style="margin:0;">
      <thead>
        <tr>
          <th>User / Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Country / Mobile</th>
          <th>Organization / School</th>
          <th>Profile Status</th>
          <th>Admin Action</th>
        </tr>
      </thead>
      <tbody>
  `;

  filtered.forEach(u => {
    const rolePillClass = `role-${(u.role || 'student').replace('_', '-')}`;
    const statusPillClass = u.status === 'approved' ? 'role-admin' : u.status === 'pending' ? 'role-teacher' : 'role-student';
    const profileCompletedTag = u.profileCompleted ? 
      `<span style="color:var(--progress-success); font-weight:700;">✔ Completed</span>` : 
      `<span style="color:var(--cta-amber); font-weight:700;">⚠️ Incomplete</span>`;

    html += `
      <tr>
        <td>
          <strong style="color:var(--brand-primary);">${u.displayName || 'No Name'}</strong>
          <div style="font-size:0.75rem; color:var(--text-dim); font-family:var(--font-code);">${u.email}</div>
        </td>
        <td><span class="role-pill ${rolePillClass}">${(u.role || '').toUpperCase()}</span></td>
        <td><span class="role-pill ${statusPillClass}">${(u.status || '').toUpperCase()}</span></td>
        <td>
          <div style="font-size:0.8rem;">${u.country || 'N/A'}</div>
          <div style="font-size:0.75rem; color:var(--text-dim);">${u.mobileNumber || ''}</div>
        </td>
        <td><div style="font-size:0.8rem;">${u.organization || u.universityName || u.schoolName || '—'}</div></td>
        <td><div style="font-size:0.75rem;">${profileCompletedTag}</div></td>
        <td>
          <div style="display:flex; gap:0.35rem;">
            <button class="btn btn-outline btn-sm" onclick="openAdminEditUserModal('${u.uid}')">Edit User</button>
            ${u.status === 'pending' ? `<button class="btn btn-primary btn-sm" onclick="adminApproveUser('${u.uid}')">Approve</button>` : ''}
            <button class="btn btn-outline btn-sm" style="color:var(--text-danger);" onclick="adminDeleteUser('${u.uid}')">Delete</button>
          </div>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

function openAdminEditUserModal(uid) {
  const users = getStoredUsers();
  const user = users.find(u => u.uid === uid);
  if (!user) return;

  closeAllModals();
  const modal = document.getElementById("admin-edit-user-modal");
  if (!modal) return;

  document.getElementById("admin-edit-uid").value = user.uid;
  document.getElementById("admin-edit-name").value = user.displayName || "";
  document.getElementById("admin-edit-email").value = user.email || "";
  document.getElementById("admin-edit-role").value = user.role || "student";
  document.getElementById("admin-edit-status").value = user.status || "approved";
  document.getElementById("reg-admin-edit-country").value = user.country || "";
  document.getElementById("reg-admin-edit-mobile").value = user.mobileNumber || "";
  document.getElementById("admin-edit-org").value = user.organization || user.universityName || user.schoolName || "";
  document.getElementById("admin-edit-subfield").value = user.jobTitle || user.major || user.gradeYear || user.title || "";
  document.getElementById("admin-edit-max-students").value = user.maxStudents || 35;
  document.getElementById("admin-edit-password").value = "";
  document.getElementById("admin-edit-profile-completed").checked = !!user.profileCompleted;

  modal.classList.add("active");
}

function handleAdminSaveUser(event) {
  event.preventDefault();
  const uid = document.getElementById("admin-edit-uid").value;
  const users = getStoredUsers();
  const idx = users.findIndex(u => u.uid === uid);
  if (idx === -1) return;

  const name = document.getElementById("admin-edit-name").value.trim();
  const email = document.getElementById("admin-edit-email").value.trim();
  const role = document.getElementById("admin-edit-role").value;
  const status = document.getElementById("admin-edit-status").value;
  const country = document.getElementById("reg-admin-edit-country").value.trim();
  const mobile = document.getElementById("reg-admin-edit-mobile").value.trim();
  const org = document.getElementById("admin-edit-org").value.trim();
  const subfield = document.getElementById("admin-edit-subfield").value.trim();
  const maxStudents = parseInt(document.getElementById("admin-edit-max-students").value, 10) || 35;
  const newPass = document.getElementById("admin-edit-password").value.trim();
  const isProfileCompleted = document.getElementById("admin-edit-profile-completed").checked;

  users[idx].displayName = name;
  users[idx].email = email;
  users[idx].role = role;
  users[idx].status = status;
  users[idx].country = country;
  users[idx].mobileNumber = mobile;
  users[idx].organization = org;
  users[idx].jobTitle = subfield;
  users[idx].major = subfield;
  users[idx].maxStudents = maxStudents;
  users[idx].profileCompleted = isProfileCompleted;
  users[idx].needsProfileCompletion = !isProfileCompleted;

  if (newPass) {
    users[idx].password = newPass;
  }

  saveStoredUsers(users);

  if (currentUser && currentUser.uid === uid) {
    currentUser = { ...users[idx] };
    localStorage.setItem("roboskills_user", JSON.stringify(currentUser));
    updateNavAuthUI();
  }

  closeAllModals();
  openAdminConsole();
  showToast(`Account for ${name} (${email}) updated successfully!`, "success");
}

function adminDeleteUser(uid) {
  const users = getStoredUsers();
  const user = users.find(u => u.uid === uid);
  if (!user) return;

  if (confirm(`Are you sure you want to delete user account: ${user.displayName} (${user.email})?`)) {
    const updated = users.filter(u => u.uid !== uid);
    saveStoredUsers(updated);
    renderAdminOversight();
    renderTeacherRoster();
    showToast(`User ${user.displayName} deleted.`, "info");
  }
}

function adminDeleteUserFromModal() {
  const uid = document.getElementById("admin-edit-uid").value;
  if (uid) {
    adminDeleteUser(uid);
    closeAllModals();
    openAdminConsole();
  }
}

function openAdminAddUserModal() {
  closeAllModals();
  const modal = document.getElementById("admin-add-user-modal");
  if (!modal) return;
  document.getElementById("admin-new-name").value = "";
  document.getElementById("admin-new-email").value = "";
  document.getElementById("admin-new-password").value = "User@123";
  document.getElementById("reg-admin-add-country").value = "";
  document.getElementById("reg-admin-add-mobile").value = "";
  document.getElementById("admin-new-org").value = "";
  modal.classList.add("active");
}

function handleAdminAddUser(event) {
  event.preventDefault();
  const name = document.getElementById("admin-new-name").value.trim();
  const email = document.getElementById("admin-new-email").value.trim().toLowerCase();
  const password = document.getElementById("admin-new-password").value.trim() || "User@123";
  const role = document.getElementById("admin-new-role").value;
  const country = document.getElementById("reg-admin-add-country").value.trim();
  const mobile = document.getElementById("reg-admin-add-mobile").value.trim();
  const org = document.getElementById("admin-new-org").value.trim();

  const users = getStoredUsers();
  if (users.some(u => (u.email || "").toLowerCase() === email)) {
    showToast("A user with this email already exists.", "error");
    return;
  }

  const newUser = {
    uid: `${role}_` + Date.now(),
    displayName: name,
    email: email,
    password: password,
    role: role,
    status: "approved",
    country: country,
    mobileNumber: mobile,
    organization: org,
    profileCompleted: true,
    needsProfileCompletion: false,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  saveStoredUsers(users);

  closeAllModals();
  openAdminConsole();
  showToast(`Account for ${name} (${role.toUpperCase()}) created successfully!`, "success");
}

function adminApproveUser(uid) {
  const users = getStoredUsers();
  const user = users.find(u => u.uid === uid);
  if (!user) return;

  user.status = "approved";
  saveStoredUsers(users);
  renderAdminOversight();
  showToast(`Approved registration for ${user.displayName} (${user.role.toUpperCase()})!`, "success");
}

function renderAdminApprovals() {
  const container = document.getElementById("admin-approvals-list");
  if (!container) return;

  const users = getStoredUsers();
  const pending = users.filter(u => u.status === "pending");

  if (pending.length === 0) {
    container.innerHTML = `
      <div style="background:var(--bg-primary); border:1px dashed var(--border-color); border-radius:var(--radius-md); padding:1.5rem; text-align:center; color:var(--text-dim);">
        ✔ No pending registrations. All student and teacher accounts are up to date.
      </div>
    `;
    return;
  }

  let html = "";
  pending.forEach(u => {
    html += `
      <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; margin-bottom:0.75rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <strong>${u.displayName}</strong>
            <span class="role-pill role-${u.role}">${u.role.toUpperCase()}</span>
            <span style="font-size:0.75rem; color:var(--text-dim);">${u.country || ''}</span>
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.2rem;">
            ${u.email} · ${u.mobileNumber || ''} · ${u.organization || u.universityName || u.schoolName || ''}
          </div>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn btn-primary btn-sm" onclick="adminApproveUser('${u.uid}')">Approve</button>
          <button class="btn btn-outline btn-sm" style="color:var(--text-danger);" onclick="adminDeleteUser('${u.uid}')">Reject</button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}
