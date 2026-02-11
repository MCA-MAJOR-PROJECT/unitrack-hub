import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Star, TrendingUp, Clock, CheckCircle, ArrowRight, Zap, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

const activities = [
  { title: "AI Workshop 2025", credits: 3, date: "Feb 10, 2025", status: "verified" as const, type: "Workshop" },
  { title: "Research Paper Submission", credits: 5, date: "Feb 8, 2025", status: "pending" as const, type: "Research" },
  { title: "Hackathon - BlockBuild", credits: 4, date: "Feb 5, 2025", status: "verified" as const, type: "Competition" },
  { title: "Community Service Drive", credits: 2, date: "Feb 1, 2025", status: "verified" as const, type: "Service" },
];

const certificates = [
  { title: "Blockchain Fundamentals", issuer: "CS Department", date: "Jan 2025", txHash: "0x7a2...f3b" },
  { title: "AI & Machine Learning", issuer: "AI Lab", date: "Dec 2024", txHash: "0x9c1...e7d" },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const totalCredits = 42;
  const requiredCredits = 60;
  const progress = (totalCredits / requiredCredits) * 100;

  return (
    <DashboardLayout role="student" userName="Alex">
      <div className="space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, Alex 👋</h1>
            <p className="text-sm text-muted-foreground mt-1">Track your academic activities and blockchain-verified credits</p>
          </div>
          <Button variant="neon">
            <Zap className="w-4 h-4" /> Enroll in Activity
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Credits" value={totalCredits} icon={Star} trend="12% this month" trendUp />
          <StatCard label="Activities" value={12} icon={BookOpen} trend="3 this week" trendUp />
          <StatCard label="Certificates" value={5} icon={Award} trend="1 pending" />
          <StatCard label="Rank" value="#15" icon={TrendingUp} trend="Up 3 spots" trendUp />
        </div>

        {/* Credit Progress */}
        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Credit Progress</h3>
            <span className="text-xs text-muted-foreground">{totalCredits}/{requiredCredits} credits</span>
          </div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-purple to-neon-blue rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{requiredCredits - totalCredits} more credits needed for graduation requirement</p>
        </GlassCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Feed */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Recent Activities</h3>
            {activities.map((activity, i) => (
              <GlassCard key={i} className="!p-4 flex items-center justify-between hover:neon-glow cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    {activity.status === "verified" ? (
                      <CheckCircle className="w-5 h-5 text-neon-cyan" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.type} · {activity.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-primary">+{activity.credits}</span>
                  <BlockchainBadge status={activity.status} />
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Certificates */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Digital Certificates</h3>
            {certificates.map((cert, i) => (
              <GlassCard key={i} className="!p-4 gradient-border">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-neon-cyan" />
                  <p className="text-sm font-medium text-foreground">{cert.title}</p>
                </div>
                <p className="text-xs text-muted-foreground">{cert.issuer} · {cert.date}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs font-mono text-neon-cyan/70">{cert.txHash}</span>
                  <Button variant="ghost" size="sm" className="h-6 text-xs text-primary">
                    Verify <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </GlassCard>
            ))}
            <Button variant="neon-outline" className="w-full" size="sm">
              View All Certificates
            </Button>
          </div>
        </div>

        {/* Volunteering Credits Widget */}
        <GlassCard className="flex items-center justify-between cursor-pointer hover:neon-glow" onClick={() => navigate("/student/volunteering")}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Sprout className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">🌱 Volunteering Credits Earned</p>
              <p className="text-xs text-muted-foreground">6 credits from 3 volunteering activities</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-emerald-400">6</p>
            <p className="text-[10px] text-muted-foreground">credits</p>
          </div>
        </GlassCard>

        {/* DID Badge */}
        <GlassCard className="flex items-center justify-between" glow>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">DID</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Decentralized Identity</p>
              <p className="text-xs font-mono text-muted-foreground">did:ethr:0x7f84...3a2b</p>
            </div>
          </div>
          <BlockchainBadge status="verified" />
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
