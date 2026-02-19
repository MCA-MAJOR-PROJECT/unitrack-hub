import { useNavigate } from "react-router-dom";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import {
  Sprout, BookOpen, Award, TrendingUp, ArrowRight, Shield,
  Star, Clock, Wallet, CheckCircle
} from "lucide-react";

const ACTIVITY_ID_MAP: Record<string, string> = {
  "Campus Green Initiative": "1",
  "Peer Tutoring — Data Structures": "2",
  "Tech Fest Coordination": "3",
  "Library Digitization Drive": "4",
  "AI Research Assistant": "5",
  "Waste Audit & Recycling": "6",
};

const volunteeringOpportunities = [
  { title: "Campus Green Initiative", category: "Sustainability & Environmental", credits: 4, duration: "3 weeks", spots: 12, icon: "🌿" },
  { title: "Peer Tutoring — Data Structures", category: "Academic Support", credits: 3, duration: "1 month", spots: 8, icon: "📚" },
  { title: "Tech Fest Coordination", category: "Event Management & Outreach", credits: 5, duration: "2 weeks", spots: 15, icon: "🎪" },
  { title: "Library Digitization Drive", category: "Campus Life & Services", credits: 2, duration: "2 weeks", spots: 20, icon: "📖" },
  { title: "AI Research Assistant", category: "Specialized Roles", credits: 6, duration: "6 weeks", spots: 3, icon: "🧠" },
  { title: "Waste Audit & Recycling", category: "Sustainability & Environmental", credits: 3, duration: "1 week", spots: 10, icon: "♻️" },
];

const academicActivities = [
  { title: "AI Workshop 2025", type: "Workshop", credits: 3, date: "Feb 20", status: "verified" as const },
  { title: "Blockchain Dev Bootcamp", type: "Bootcamp", credits: 5, date: "Feb 25", status: "pending" as const },
  { title: "Research Paper Submission", type: "Research", credits: 4, date: "Mar 1", status: "pending" as const },
];

const announcements = [
  { title: "Spring Volunteering Drive — Apply Now!", date: "Feb 12", tag: "Volunteering" },
  { title: "New Smart Contract deployed for credit verification", date: "Feb 10", tag: "Blockchain" },
  { title: "Mid-semester credit audit scheduled", date: "Feb 8", tag: "Academic" },
];

const categoryColors: Record<string, string> = {
  "Sustainability & Environmental": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "Academic Support": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Event Management & Outreach": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "Campus Life & Services": "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  "Specialized Roles": "bg-amber-500/10 text-amber-400 border-amber-500/30",
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Top Nav */}
      <header className="border-b border-border bg-card/40 backdrop-blur-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">UniTrack</span>
            <span className="text-[10px] text-muted-foreground font-medium px-2 py-0.5 rounded-full bg-secondary">CampusChain</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="text-xs">
              <Wallet className="w-4 h-4" /> Connect Wallet
            </Button>
            <Button variant="neon" size="sm" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* Hero */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Your Campus. <span className="gradient-text">On-Chain.</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Earn blockchain-verified credits through volunteering, academic activities, and campus engagement.
          </p>
        </div>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Total Credits", value: "42", trend: "↑ 12% this month", up: true, icon: "⭐" },
            { label: "Volunteering", value: "6", trend: "↑ 3 roles", up: true, icon: "🌱" },
            { label: "Certificates", value: "5", trend: "↓ 1 pending", up: false, icon: "📜" },
            { label: "Activities", value: "12", trend: "↑ 3 this week", up: true, icon: "📚" },
            { label: "Rank", value: "#15", trend: "↑ Up 3 spots", up: true, icon: "🏆" },
          ].map((s, i) => (
            <GlassCard key={i} className="!p-4 text-center hover:neon-glow transition-all">
              <span className="text-xl mb-1 block">{s.icon}</span>
              <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
              <p className={`text-[10px] mt-1 font-medium ${s.up ? "text-neon-cyan" : "text-destructive"}`}>{s.trend}</p>
            </GlassCard>
          ))}
        </section>
        {/* 🌱 Volunteering Opportunities — Top Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-foreground">🌱 Volunteering Opportunities</h2>
            </div>
            <Button variant="neon-outline" size="sm" onClick={() => navigate("/login")}>
              View All <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {volunteeringOpportunities.map((v, i) => (
              <GlassCard
                key={i}
                className="!p-5 hover:neon-glow group relative overflow-hidden cursor-pointer"
                onClick={() => navigate(`/student/activity/${ACTIVITY_ID_MAP[v.title] || "1"}`)}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -translate-y-8 translate-x-8 group-hover:bg-emerald-500/10 transition-colors" />
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{v.icon}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${categoryColors[v.category]}`}>
                    {v.category.split(" ")[0]}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{v.category}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-primary" /> {v.credits} credits</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {v.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{v.spots} spots left</span>
                  <Button
                    variant="neon"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={(e) => { e.stopPropagation(); navigate(`/student/activity/${ACTIVITY_ID_MAP[v.title] || "1"}`); }}
                  >
                    View Details
                  </Button>
                </div>
                <div className="mt-3 pt-3 border-t border-border/50">
                  <BlockchainBadge status="verified" className="!text-[9px]" />
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Academic Activities */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Academic Activities</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {academicActivities.map((a, i) => (
              <GlassCard key={i} className="!p-4 hover:neon-glow cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{a.type}</span>
                  <BlockchainBadge status={a.status} className="!text-[9px]" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{a.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{a.date}</span>
                  <span className="font-bold text-primary">+{a.credits} credits</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Credit Progress + Recent Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Credit Progress Summary</h2>
            </div>
            <GlassCard glow>
              <div className="space-y-4">
                {[
                  { label: "Academic Credits", value: 28, max: 40, color: "from-neon-purple to-neon-blue" },
                  { label: "Volunteering Credits", value: 8, max: 15, color: "from-emerald-500 to-cyan-500" },
                  { label: "Event Credits", value: 6, max: 10, color: "from-neon-blue to-neon-cyan" },
                ].map((c, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{c.label}</span>
                      <span className="text-foreground font-medium">{c.value}/{c.max}</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${c.color} rounded-full`} style={{ width: `${(c.value / c.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Total: 42 / 65 credits</span>
                  <CheckCircle className="w-4 h-4 text-neon-cyan" />
                </div>
              </div>
            </GlassCard>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-neon-cyan" />
              <h2 className="text-lg font-bold text-foreground">Recent Achievements</h2>
            </div>
            <div className="space-y-3">
              {[
                { title: "Blockchain Fundamentals", tag: "Academic", date: "Jan 2025", icon: "🏆" },
                { title: "Campus Green Initiative", tag: "Volunteering", date: "Jan 2025", icon: "🌱" },
                { title: "AI Research Assistant", tag: "Research", date: "Feb 2025", icon: "🧠" },
              ].map((a, i) => (
                <GlassCard key={i} className="!p-4 flex items-center justify-between hover:neon-glow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{a.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.date}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium">{a.tag}</span>
                </GlassCard>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
