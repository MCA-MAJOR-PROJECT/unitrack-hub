import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Shield, Cpu, Bell, Globe, Lock, Database } from "lucide-react";

const AdminSettings = () => {
  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure governance, smart contracts & system parameters</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-secondary/50 border border-border">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="credits">Credit Rules</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* General */}
          <TabsContent value="general" className="space-y-4">
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Platform Configuration</p>
                  <p className="text-xs text-muted-foreground">General platform settings and preferences</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Platform Name</label>
                    <Input defaultValue="UniTrack" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">University Name</label>
                    <Input defaultValue="National Institute of Technology" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Support Email</label>
                  <Input defaultValue="admin@unitrack.edu" />
                </div>
                {[
                  { label: "Maintenance Mode", desc: "Temporarily disable platform access for users", default: false },
                  { label: "Email Notifications", desc: "Send email alerts for platform events", default: true },
                  { label: "Public Leaderboard", desc: "Show student rankings publicly", default: true },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <Switch defaultChecked={s.default} />
                  </div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          {/* Blockchain */}
          <TabsContent value="blockchain" className="space-y-4">
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Smart Contract Configuration</p>
                  <p className="text-xs text-muted-foreground">Manage deployed contracts and network settings</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Network</label>
                    <Input defaultValue="Polygon Mumbai Testnet" readOnly className="bg-secondary/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Chain ID</label>
                    <Input defaultValue="80001" readOnly className="bg-secondary/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">CreditManager Contract</label>
                  <Input defaultValue="0x742d35Cc6634C0532925a3b844Bc9e7595F8b3" readOnly className="font-mono text-xs bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">CertificateNFT Contract</label>
                  <Input defaultValue="0x8a1c25Dd7745E0643836b955Ac0e8696D4e7" readOnly className="font-mono text-xs bg-secondary/50" />
                </div>
                {[
                  { label: "Auto-mint Certificates", desc: "Automatically mint NFT certificates on activity completion", default: true },
                  { label: "Gas Fee Sponsorship", desc: "Platform covers gas fees for student transactions", default: true },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <Switch defaultChecked={s.default} />
                  </div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          {/* Credit Rules */}
          <TabsContent value="credits" className="space-y-4">
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Credit Allocation Rules</p>
                  <p className="text-xs text-muted-foreground">Define how credits are earned and distributed</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Workshop Attendance", value: "3" },
                  { label: "Volunteering (per hour)", value: "1" },
                  { label: "Hackathon Participation", value: "5" },
                  { label: "Research Paper", value: "8" },
                  { label: "Seminar Attendance", value: "2" },
                  { label: "Competition Winner Bonus", value: "10" },
                ].map((rule, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <p className="text-sm font-medium text-foreground">{rule.label}</p>
                    <div className="flex items-center gap-2">
                      <Input defaultValue={rule.value} className="w-20 text-center" />
                      <span className="text-xs text-muted-foreground">credits</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-4">
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Security & Access Control</p>
                  <p className="text-xs text-muted-foreground">Manage authentication and authorization settings</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Two-Factor Authentication", desc: "Require 2FA for admin and faculty accounts", default: true },
                  { label: "Wallet Verification Required", desc: "Users must verify wallet ownership before transactions", default: true },
                  { label: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity", default: false },
                  { label: "IP Whitelisting", desc: "Restrict admin access to approved IP addresses", default: false },
                  { label: "Audit Logging", desc: "Log all administrative actions for compliance", default: true },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <Switch defaultChecked={s.default} />
                  </div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button variant="neon">Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
