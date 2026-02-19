import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { User, Mail, BookOpen, Award, Shield, Building, GraduationCap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const FacultyProfile = () => {
  return (
    <DashboardLayout role="faculty" userName="Dr. Kumar">
      <div className="space-y-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-foreground">Faculty Profile</h1>

        {/* Identity Card */}
        <GlassCard glow className="gradient-border">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0">
              DK
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold text-foreground">Dr. Rajesh Kumar</h2>
              <p className="text-sm text-muted-foreground">Associate Professor — Computer Science & Engineering</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 justify-center sm:justify-start">
                <span className="text-xs flex items-center gap-1 text-muted-foreground"><Mail className="w-3 h-3" /> r.kumar@university.edu</span>
                <span className="text-xs flex items-center gap-1 text-muted-foreground"><Building className="w-3 h-3" /> Block A, Room 405</span>
              </div>
              <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                <BlockchainBadge status="verified" />
                <span className="text-[10px] font-mono text-muted-foreground">did:ethr:0x3c91...8f2a</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <GlassCard className="text-center">
            <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">18</p>
            <p className="text-xs text-muted-foreground">Activities Created</p>
          </GlassCard>
          <GlassCard className="text-center">
            <Award className="w-6 h-6 text-neon-cyan mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">156</p>
            <p className="text-xs text-muted-foreground">Credits Issued</p>
          </GlassCard>
          <GlassCard className="text-center">
            <GraduationCap className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">342</p>
            <p className="text-xs text-muted-foreground">Students Impacted</p>
          </GlassCard>
        </div>

        {/* Recent Activities */}
        <GlassCard>
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activities Created</h3>
          <div className="space-y-3">
            {[
              { title: "AI Workshop 2025", type: "Workshop", date: "Feb 10, 2025", participants: 45, status: "verified" as const },
              { title: "Blockchain Dev Bootcamp", type: "Bootcamp", date: "Feb 15, 2025", participants: 60, status: "verified" as const },
              { title: "Research Methodology Seminar", type: "Seminar", date: "Feb 12, 2025", participants: 30, status: "pending" as const },
              { title: "Community Outreach Program", type: "Service", date: "Feb 18, 2025", participants: 20, status: "pending" as const },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.type} · {a.date} · {a.participants} participants</p>
                  </div>
                </div>
                <BlockchainBadge status={a.status} />
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Blockchain Identity */}
        <GlassCard glow>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Faculty Decentralized Identity</p>
              <p className="text-xs font-mono text-muted-foreground">did:ethr:0x3c91...8f2a · Wallet: 0x3c...8f2a</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default FacultyProfile;
