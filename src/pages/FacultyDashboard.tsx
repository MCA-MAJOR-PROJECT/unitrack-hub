import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, CheckCircle, Clock, Plus, Zap, BarChart3, FileCheck, Sprout } from "lucide-react";

const activities = [
  { title: "AI Workshop 2025", participants: 45, status: "verified" as const, credits: 3, date: "Feb 10" },
  { title: "Research Methodology Seminar", participants: 30, status: "pending" as const, credits: 2, date: "Feb 12" },
  { title: "Blockchain Dev Bootcamp", participants: 60, status: "verified" as const, credits: 5, date: "Feb 15" },
  { title: "Community Outreach Program", participants: 20, status: "pending" as const, credits: 2, date: "Feb 18" },
];

const pendingVerifications = [
  { student: "Priya Sharma", activity: "AI Workshop 2025", submitted: "2h ago" },
  { student: "Rahul Verma", activity: "Research Methodology", submitted: "5h ago" },
  { student: "Anita Das", activity: "Blockchain Bootcamp", submitted: "1d ago" },
];

const FacultyDashboard = () => {
  return (
    <DashboardLayout role="faculty" userName="Dr. Kumar">
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Faculty Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage activities, verify participation & trigger smart contracts</p>
          </div>
          <Button variant="neon">
            <Plus className="w-4 h-4" /> Create Activity
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Activities" value={18} icon={BookOpen} trend="4 this month" trendUp />
          <StatCard label="Participants" value={342} icon={Users} trend="12% increase" trendUp />
          <StatCard label="Pending Verifications" value={8} icon={Clock} />
          <StatCard label="Credits Issued" value={156} icon={CheckCircle} trend="28 this week" trendUp />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Table */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Your Activities</h3>
            <GlassCard className="!p-0 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Activity</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Participants</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Credits</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((act, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-foreground">{act.title}</p>
                        <p className="text-xs text-muted-foreground">{act.date}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{act.participants}</td>
                      <td className="px-4 py-3 text-sm font-medium text-primary">{act.credits}</td>
                      <td className="px-4 py-3"><BlockchainBadge status={act.status} /></td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="text-xs">Manage</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>

            {/* Smart Contract */}
            <GlassCard glow className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Smart Contract</p>
                  <p className="text-xs text-muted-foreground">Trigger credit distribution for verified activities</p>
                </div>
              </div>
              <Button variant="neon" size="sm">Execute</Button>
            </GlassCard>

            {/* Volunteering Requests Panel */}
            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-semibold text-foreground">Volunteering Requests</h4>
              </div>
              <div className="space-y-2">
                {[
                  { title: "Campus Green Initiative", applicants: 8, status: "Active" },
                  { title: "Peer Tutoring — DSA", applicants: 10, status: "Full" },
                  { title: "Library Digitization", applicants: 3, status: "Active" },
                ].map((req, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/40">
                    <div>
                      <p className="text-xs font-medium text-foreground">{req.title}</p>
                      <p className="text-[10px] text-muted-foreground">{req.applicants} applicants</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      req.status === "Full" ? "bg-muted text-muted-foreground" : "bg-emerald-500/10 text-emerald-400"
                    }`}>{req.status}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Pending Verifications */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Pending Verifications</h3>
            {pendingVerifications.map((v, i) => (
              <GlassCard key={i} className="!p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {v.student.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{v.student}</p>
                    <p className="text-xs text-muted-foreground">{v.activity} · {v.submitted}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="neon" size="sm" className="flex-1 h-8 text-xs">
                    <CheckCircle className="w-3 h-3" /> Verify
                  </Button>
                  <Button variant="neon-outline" size="sm" className="flex-1 h-8 text-xs">Reject</Button>
                </div>
              </GlassCard>
            ))}

            {/* Mini Analytics */}
            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">Quick Stats</h4>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Workshops", value: 65 },
                  { label: "Research", value: 40 },
                  { label: "Service", value: 85 },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="text-foreground font-medium">{stat.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-neon-purple to-neon-blue rounded-full" style={{ width: `${stat.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
