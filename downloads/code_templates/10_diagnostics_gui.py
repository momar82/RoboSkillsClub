#!/usr/bin/env python3
"""
Lesson 10: Robot Diagnostics GUI
A Tkinter-based live telemetry monitor showing battery voltage,
wheel encoder counts, and safety switch status.
"""
import tkinter as tk
from tkinter import ttk
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import BatteryState
from std_msgs.msg import Float32, Bool
import threading

class DiagnosticsSubscriber(Node):
    def __init__(self):
        super().__init__('diagnostics_gui_sub')
        self.battery_voltage = 0.0
        self.enc_left = 0.0
        self.enc_right = 0.0
        self.estop_active = False
        self.btn_pressed = False

        self.create_subscription(BatteryState, '/battery_state', self.batt_cb, 10)
        self.create_subscription(Float32, '/titan0/m_0/encoder', self.enc0_cb, 10)
        self.create_subscription(Float32, '/titan0/m_1/encoder', self.enc1_cb, 10)
        self.create_subscription(Bool, '/estop/state', self.estop_cb, 10)
        self.create_subscription(Bool, '/push_button/state', self.btn_cb, 10)

    def batt_cb(self, msg): self.battery_voltage = msg.voltage
    def enc0_cb(self, msg): self.enc_left = msg.data
    def enc1_cb(self, msg): self.enc_right = msg.data
    def estop_cb(self, msg): self.estop_active = not msg.data # active-low
    def btn_cb(self, msg): self.btn_pressed = not msg.data     # active-low

class DiagnosticsApp:
    def __init__(self, root, ros_node):
        self.root = root
        self.ros_node = ros_node
        self.root.title("Studica AMR - Junior Diagnostics Panel")
        self.root.geometry("450x320")
        self.root.configure(bg="#f8fafc")

        title = tk.Label(root, text="Robot Telemetry Dashboard", font=("Helvetica", 16, "bold"), bg="#f8fafc", fg="#1e293b")
        title.pack(pady=12)

        self.lbl_battery = tk.Label(root, text="🔋 Battery: 0.00 V", font=("Helvetica", 14), bg="#f8fafc")
        self.lbl_battery.pack(pady=6)

        self.lbl_encoders = tk.Label(root, text="⚙️ Encoders - L: 0.00m | R: 0.00m", font=("Helvetica", 12), bg="#f8fafc")
        self.lbl_encoders.pack(pady=6)

        self.lbl_estop = tk.Label(root, text="🛑 E-Stop: OK (Released)", font=("Helvetica", 12, "bold"), fg="#16a34a", bg="#f8fafc")
        self.lbl_estop.pack(pady=6)

        self.lbl_btn = tk.Label(root, text="🔘 Push Button: Released", font=("Helvetica", 12), bg="#f8fafc")
        self.lbl_btn.pack(pady=6)

        self.update_gui()

    def update_gui(self):
        v = self.ros_node.battery_voltage
        batt_color = "#16a34a" if v > 11.5 else ("#d97706" if v > 10.5 else "#dc2626")
        self.lbl_battery.config(text=f"🔋 Battery: {v:.2f} V", fg=batt_color)

        l_enc = self.ros_node.enc_left
        r_enc = self.ros_node.enc_right
        self.lbl_encoders.config(text=f"⚙️ Encoders - L: {l_enc:.2f}m | R: {r_enc:.2f}m")

        if self.ros_node.estop_active:
            self.lbl_estop.config(text="🛑 E-Stop: PRESSED (HALT)", fg="#dc2626")
        else:
            self.lbl_estop.config(text="🛑 E-Stop: OK (Released)", fg="#16a34a")

        if self.ros_node.btn_pressed:
            self.lbl_btn.config(text="🔘 Push Button: PRESSED", fg="#2563eb")
        else:
            self.lbl_btn.config(text="🔘 Push Button: Released", fg="#64748b")

        self.root.after(100, self.update_gui)

def main():
    rclpy.init()
    ros_node = DiagnosticsSubscriber()
    spin_thread = threading.Thread(target=rclpy.spin, args=(ros_node,), daemon=True)
    spin_thread.start()

    root = tk.Tk()
    app = DiagnosticsApp(root, ros_node)
    root.mainloop()

    ros_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
