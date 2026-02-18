import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import {
  User, Bell, Shield, Wallet, Moon, Globe, Lock, Eye, EyeOff,
  CheckCircle, ChevronRight, Smartphone, Mail, Key, Trash2, LogOut
} from "lucide-react";

const sections = ["Profile", "Notifications", "Blockchain & Wallet", "Security", "Appearance"];

const StudentSettings = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  const [notifications, setNotifications] = useState({
    creditEarned: true,
    certificateIssued: true,
    activityUpdates: true,
    volunteeringReminders: true,
    blockchainAlerts: false,
    emailDigest: true,
  });
  const [showKey, setShowKey] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleNotif = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <DashboardLayout role="student" userName="Alex">
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account, notifications, and blockchain preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Nav */}
          <div className="md:col-span-1">
            <GlassCard className="!p-2 space-y-1">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSection(s)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === s
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {s}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ))}
            </GlassCard>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-4">

            {/* Profile */}
            {activeSection === "Profile" && (
              <>
                <GlassCard>
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> Profile Information
                  </h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-xl font-bold text-primary-foreground">
                      A
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Alex Johnson</p>
                      <p className="text-xs text-muted-foreground">Computer Science, 3rd Year</p>
                      <Button variant="ghost" size="sm" className="h-7 text-xs mt-1 text-primary">
                        Change Photo
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Full Name", value: "Alex Johnson" },
                      { label: "Student ID", value: "CS2022041" },
                      { label: "Email", value: "alex.johnson@university.edu" },
                      { label: "Department", value: "Computer Science" },
                      { label: "Year", value: "3rd Year" },
                      { label: "Phone", value: "+91 98765 43210" },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">{field.label}</label>
                        <input
                          defaultValue={field.value}
                          className="w-full px-3 py-2 rounded-lg bg-input border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    ))}
                  </div>
                  <Button variant="neon" className="mt-4">Save Changes</Button>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" /> Decentralized Identity (DID)
                  </h3>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="text-xs font-medium text-foreground">DID Address</p>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">did:ethr:0x7f84a3e2...3a2b</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-neon-cyan" />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">Your DID is immutably linked to your academic record on-chain.</p>
                </GlassCard>
              </>
            )}

            {/* Notifications */}
            {activeSection === "Notifications" && (
              <GlassCard>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-primary" /> Notification Preferences
                </h3>
                <div className="space-y-1">
                  {(Object.entries(notifications) as [keyof typeof notifications, boolean][]).map(([key, val]) => {
                    const labels: Record<keyof typeof notifications, { label: string; desc: string }> = {
                      creditEarned: { label: "Credits Earned", desc: "Notify when credits are added to your wallet" },
                      certificateIssued: { label: "Certificate Issued", desc: "Blockchain certificate minting alerts" },
                      activityUpdates: { label: "Activity Updates", desc: "Changes to enrolled activities" },
                      volunteeringReminders: { label: "Volunteering Reminders", desc: "Upcoming schedule reminders" },
                      blockchainAlerts: { label: "Blockchain Alerts", desc: "Smart contract and transaction events" },
                      emailDigest: { label: "Email Digest", desc: "Weekly summary sent to your university email" },
                    };
                    return (
                      <div key={key} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">{labels[key].label}</p>
                          <p className="text-xs text-muted-foreground">{labels[key].desc}</p>
                        </div>
                        <button
                          onClick={() => toggleNotif(key)}
                          className={`relative w-10 h-5 rounded-full transition-colors ${val ? "bg-primary" : "bg-secondary"}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-primary-foreground shadow transition-transform ${val ? "translate-x-5" : "translate-x-0.5"}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-secondary/50 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-xs text-muted-foreground">Notifications are also sent to <span className="text-foreground">alex.johnson@university.edu</span></p>
                </div>
              </GlassCard>
            )}

            {/* Blockchain & Wallet */}
            {activeSection === "Blockchain & Wallet" && (
              <>
                <GlassCard className="gradient-border">
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-neon-cyan" /> Connected Wallet
                  </h3>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                        <p className="text-sm font-mono text-foreground">0x7f84a3e2d1c9b8f0...3a2b</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-neon-cyan" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Network", value: "Ethereum Testnet" },
                      { label: "Chain ID", value: "11155111 (Sepolia)" },
                      { label: "Credits Balance", value: "42 UNT" },
                      { label: "NFT Certificates", value: "5 owned" },
                    ].map((item) => (
                      <div key={item.label} className="p-3 rounded-lg bg-secondary/40">
                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                        <p className="text-xs font-medium text-foreground mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="neon-outline" size="sm" className="flex-1">Disconnect Wallet</Button>
                    <Button variant="neon" size="sm" className="flex-1">View on Explorer</Button>
                  </div>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" /> Smart Contract Permissions
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: "Credit Issuance Contract", address: "0x7a2f...3b1c", allowed: true },
                      { label: "Certificate NFT Contract", address: "0x9c1e...7d4f", allowed: true },
                      { label: "Governance Contract", address: "0x4b8d...2a9e", allowed: false },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40">
                        <div>
                          <p className="text-xs font-medium text-foreground">{c.label}</p>
                          <p className="text-[10px] font-mono text-muted-foreground">{c.address}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.allowed ? "bg-neon-cyan/10 text-neon-cyan" : "bg-secondary text-muted-foreground"}`}>
                          {c.allowed ? "Allowed" : "Revoked"}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </>
            )}

            {/* Security */}
            {activeSection === "Security" && (
              <>
                <GlassCard>
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" /> Change Password
                  </h3>
                  <div className="space-y-3">
                    {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                      <div key={label}>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">{label}</label>
                        <div className="relative">
                          <input
                            type={showKey ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full px-3 py-2 pr-10 rounded-lg bg-input border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                          <button
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    ))}
                    <Button variant="neon" className="mt-2">Update Password</Button>
                  </div>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary" /> Two-Factor Authentication
                  </h3>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 mb-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">Authenticator App</p>
                      <p className="text-xs text-muted-foreground">Use Google Authenticator or Authy</p>
                    </div>
                    <span className="text-xs text-neon-cyan font-medium">Enabled</span>
                  </div>
                  <Button variant="neon-outline" size="sm">Manage 2FA</Button>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Key className="w-4 h-4 text-primary" /> Active Sessions
                  </h3>
                  {[
                    { device: "MacBook Pro — Chrome", location: "Mumbai, IN", time: "Now", current: true },
                    { device: "iPhone 14 — Safari", location: "Mumbai, IN", time: "2h ago", current: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 mb-2">
                      <div>
                        <p className="text-xs font-medium text-foreground">{s.device}</p>
                        <p className="text-[10px] text-muted-foreground">{s.location} · {s.time}</p>
                      </div>
                      {s.current
                        ? <span className="text-[10px] text-neon-cyan font-medium">Current</span>
                        : <Button variant="ghost" size="sm" className="h-6 text-[10px] text-destructive hover:text-destructive"><LogOut className="w-3 h-3" /> Revoke</Button>
                      }
                    </div>
                  ))}
                </GlassCard>

                <GlassCard className="border-destructive/20">
                  <h3 className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Danger Zone
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">Deactivating your account will remove access to all activities and certificates. This action requires admin approval.</p>
                  <Button variant="neon-outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10">
                    Request Account Deactivation
                  </Button>
                </GlassCard>
              </>
            )}

            {/* Appearance */}
            {activeSection === "Appearance" && (
              <GlassCard>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Moon className="w-4 h-4 text-primary" /> Appearance
                </h3>
                <p className="text-xs text-muted-foreground mb-4">UniTrack is designed for dark mode to match the blockchain aesthetic. Light mode support coming soon.</p>
                <div className="grid grid-cols-2 gap-3">
                  {(["dark", "light"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`p-4 rounded-xl border-2 transition-all ${theme === t ? "border-primary bg-primary/10" : "border-border bg-secondary/40"}`}
                    >
                      <div className={`w-full h-12 rounded-lg mb-2 ${t === "dark" ? "bg-background" : "bg-white"}`} />
                      <p className="text-xs font-medium text-foreground capitalize">{t} Mode</p>
                      {t === "light" && <p className="text-[10px] text-muted-foreground">Coming soon</p>}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="text-xs font-medium text-muted-foreground block mb-2">Language</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-input border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>English (Default)</option>
                    <option>Hindi</option>
                    <option>Tamil</option>
                  </select>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentSettings;
