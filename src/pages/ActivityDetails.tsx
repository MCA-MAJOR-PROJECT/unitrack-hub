import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Calendar, Clock, Award, Users, User,
  QrCode, CheckCircle, Shield, MapPin, BookOpen
} from "lucide-react";

const ActivityDetails = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="student" userName="Alex">
      <div className="max-w-6xl space-y-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Event Info */}
          <div className="lg:col-span-2 space-y-5">
            <GlassCard glow>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Workshop</span>
                <BlockchainBadge status="verified" className="!text-[9px]" />
              </div>
              <h1 className="text-xl font-bold text-foreground mt-2">AI & Machine Learning Workshop 2025</h1>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                An intensive hands-on workshop covering supervised learning, neural networks, and real-world ML deployment.
                Participants will build and train models on campus datasets and receive blockchain-verified credit upon completion.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                {[
                  { icon: Calendar, label: "Date", value: "Feb 20, 2025" },
                  { icon: Clock, label: "Duration", value: "3 Days" },
                  { icon: Award, label: "Credits", value: "5 Points" },
                  { icon: Users, label: "Enrolled", value: "42 / 50" },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/40 text-center">
                    <item.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                    <p className="text-xs font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Faculty Info */}
            <GlassCard>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Faculty Coordinator
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-sm font-bold text-primary-foreground">
                  DK
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Dr. Arun Kumar</p>
                  <p className="text-xs text-muted-foreground">Dept. of AI & Machine Learning</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">did:ethr:0x3c1...b7e</p>
                </div>
              </div>
            </GlassCard>

            {/* Location & Details */}
            <GlassCard>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Venue & Schedule
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📍 Seminar Hall B, Block 3 — Main Campus</p>
                <p>🕐 9:00 AM – 4:00 PM (3 sessions)</p>
                <p>📋 Prerequisites: Basic Python, Linear Algebra</p>
              </div>
            </GlassCard>
          </div>

          {/* Right — Action Panel */}
          <div className="space-y-5">
            {/* Enrollment Status */}
            <GlassCard glow>
              <h3 className="text-sm font-semibold text-foreground mb-3">Enrollment Status</h3>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-neon-cyan" />
                <span className="text-sm font-medium text-neon-cyan">Enrolled</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-neon-purple to-neon-blue rounded-full" style={{ width: "84%" }} />
              </div>
              <p className="text-[10px] text-muted-foreground">42 / 50 spots filled</p>
              <Button variant="neon" className="w-full mt-4" disabled>
                <CheckCircle className="w-4 h-4" /> Already Joined
              </Button>
            </GlassCard>

            {/* QR Check-in */}
            <GlassCard>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <QrCode className="w-4 h-4 text-primary" /> QR Check-in
              </h3>
              <div className="w-full aspect-square rounded-lg bg-secondary/60 border border-border flex flex-col items-center justify-center gap-3">
                <QrCode className="w-16 h-16 text-muted-foreground/30" />
                <p className="text-xs text-muted-foreground">Scan to check in</p>
                <p className="text-[10px] text-muted-foreground/60">Available on event day</p>
              </div>
            </GlassCard>

            {/* Blockchain Verification */}
            <GlassCard className="gradient-border">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-neon-cyan" /> Blockchain Verification
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Network</span>
                  <span className="text-neon-cyan font-medium">Ethereum ✔</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Contract</span>
                  <span className="text-foreground font-mono">0x7a2...f3b</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Status</span>
                  <BlockchainBadge status="verified" className="!text-[9px]" />
                </div>
              </div>
              <Button variant="neon-outline" className="w-full mt-4" size="sm">
                View on Explorer
              </Button>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActivityDetails;
