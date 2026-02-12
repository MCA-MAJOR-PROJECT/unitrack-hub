import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import {
  User, Wallet, Award, BookOpen, Sprout, Clock, CheckCircle,
  Download, ExternalLink, Shield, Star, Users, Leaf
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const creditData = [
  { name: "Academic", value: 28, color: "#8B5CF6" },
  { name: "Volunteering", value: 8, color: "#10B981" },
  { name: "Events", value: 6, color: "#3B82F6" },
];

const certificates = [
  { title: "Blockchain Fundamentals", category: "Academic", txHash: "0x7a2...f3b", date: "Jan 2025", issuer: "CS Dept" },
  { title: "Campus Green Initiative", category: "Volunteering", txHash: "0x4b8...2a9", date: "Dec 2024", issuer: "Admin" },
  { title: "AI & ML Certificate", category: "Academic", txHash: "0x9c1...e7d", date: "Nov 2024", issuer: "AI Lab" },
  { title: "Peer Tutoring Excellence", category: "Volunteering", txHash: "0x2d4...e8a", date: "Oct 2024", issuer: "Faculty" },
];

const volunteeringContributions = [
  { role: "Campus Green Lead", hours: 24, impact: ["Community", "Sustainability"] },
  { role: "Peer Tutor — DSA", hours: 16, impact: ["Peer Support"] },
  { role: "Tech Fest Volunteer", hours: 10, impact: ["Community", "Outreach"] },
];

const timeline = [
  { event: "Certificate Issued — Blockchain Fundamentals", date: "Jan 15, 2025", icon: Award, status: "done" },
  { event: "Verified — Campus Green Initiative", date: "Jan 10, 2025", icon: CheckCircle, status: "done" },
  { event: "Completed — Peer Tutoring", date: "Dec 20, 2024", icon: CheckCircle, status: "done" },
  { event: "Participated — AI Workshop", date: "Dec 15, 2024", icon: BookOpen, status: "done" },
  { event: "Applied — Waste Audit Drive", date: "Dec 10, 2024", icon: Clock, status: "pending" },
];

const categoryBadgeColors: Record<string, string> = {
  Academic: "bg-primary/10 text-primary border-primary/30",
  Volunteering: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Research: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Events: "bg-amber-500/10 text-amber-400 border-amber-500/30",
};

const StudentProfile = () => {
  const totalCredits = 42;

  return (
    <DashboardLayout role="student" userName="Alex">
      <div className="space-y-6 max-w-5xl">
        <h1 className="text-2xl font-bold text-foreground">Profile & Portfolio</h1>

        {/* 🪪 Identity Card */}
        <GlassCard glow className="gradient-border">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0">
              AJ
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold text-foreground">Alex Johnson</h2>
              <p className="text-sm text-muted-foreground">B.Tech Computer Science · Semester 6</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                <span className="text-[10px] font-mono px-2 py-1 rounded-lg bg-secondary text-muted-foreground flex items-center gap-1">
                  <Shield className="w-3 h-3 text-neon-cyan" /> did:ethr:0x7f84...3a2b
                </span>
                <span className="text-[10px] px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center gap-1">
                  <Wallet className="w-3 h-3" /> Wallet Connected
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">{totalCredits}</p>
              <p className="text-[10px] text-muted-foreground">Total Credits</p>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 📊 Credit Analytics */}
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">📊 Credit Analytics</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={creditData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                    {creditData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "hsl(222 40% 10%)", border: "1px solid hsl(222 30% 22%)", borderRadius: "8px", fontSize: "12px" }}
                    itemStyle={{ color: "hsl(210 40% 95%)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {creditData.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-muted-foreground">{d.name}</span>
                  </span>
                  <span className="text-foreground font-medium">{d.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* 🌱 Volunteering Contributions */}
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-400" /> Volunteering Contributions
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">{volunteeringContributions.length}</p>
                <p className="text-[10px] text-muted-foreground">Roles</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">50</p>
                <p className="text-[10px] text-muted-foreground">Hours</p>
              </div>
            </div>
            <div className="space-y-3">
              {volunteeringContributions.map((v, i) => (
                <div key={i} className="p-3 rounded-lg bg-secondary/40">
                  <p className="text-xs font-medium text-foreground">{v.role}</p>
                  <p className="text-[10px] text-muted-foreground">{v.hours}h contributed</p>
                  <div className="flex gap-1 mt-1.5">
                    {v.impact.map((tag, j) => (
                      <span key={j} className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* 🧾 Activity Timeline */}
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">🧾 Activity Timeline</h3>
            <div className="relative space-y-0">
              {timeline.map((t, i) => {
                const Icon = t.icon;
                return (
                  <div key={i} className="flex gap-3 pb-5 last:pb-0 relative">
                    {i < timeline.length - 1 && (
                      <div className="absolute left-[11px] top-6 w-0.5 h-[calc(100%-12px)] bg-border" />
                    )}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      t.status === "done" ? "bg-neon-cyan/10" : "bg-secondary"
                    }`}>
                      <Icon className={`w-3 h-3 ${t.status === "done" ? "text-neon-cyan" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{t.event}</p>
                      <p className="text-[10px] text-muted-foreground">{t.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* 🏆 Achievements & Certificates */}
        <section>
          <h3 className="text-sm font-semibold text-foreground mb-4">🏆 Achievements & Certificates</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificates.map((cert, i) => (
              <GlassCard key={i} className="!p-5 gradient-border hover:neon-glow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${categoryBadgeColors[cert.category]}`}>
                    {cert.category}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{cert.title}</h4>
                <p className="text-xs text-muted-foreground">{cert.issuer} · {cert.date}</p>
                <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neon-cyan/70">{cert.txHash}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] text-primary px-2">
                      <ExternalLink className="w-3 h-3" /> Verify
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] text-muted-foreground px-2">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2">
                  <BlockchainBadge status="verified" className="!text-[9px]" />
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
