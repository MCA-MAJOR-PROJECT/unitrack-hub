import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import { Sprout, Users, Clock, Star, Shield, Search } from "lucide-react";

const volunteeringOpportunities = [
  {
    title: "Campus Green Initiative Coordinator",
    category: "Sustainability & Environmental",
    description: "Lead weekly campus sustainability workshops and coordinate recycling drives across dormitories.",
    credits: 4,
    duration: "6 weeks",
    maxParticipants: 15,
    currentParticipants: 8,
    skills: ["Leadership", "Communication"],
    blockchainCert: true,
    status: "open" as const,
  },
  {
    title: "Peer Tutoring — Data Structures",
    category: "Academic Support",
    description: "Assist junior students with Data Structures coursework during weekly lab sessions.",
    credits: 3,
    duration: "4 weeks",
    maxParticipants: 10,
    currentParticipants: 10,
    skills: ["DSA", "Teaching"],
    blockchainCert: true,
    status: "full" as const,
  },
  {
    title: "Open Day Event Volunteer",
    category: "Event Management & Outreach",
    description: "Guide prospective students and families during the annual university open day event.",
    credits: 2,
    duration: "1 day",
    maxParticipants: 30,
    currentParticipants: 12,
    skills: ["Communication"],
    blockchainCert: false,
    status: "open" as const,
  },
  {
    title: "Library Digitization Assistant",
    category: "Campus Life & Services",
    description: "Help digitize rare manuscripts and organize the digital archive cataloging system.",
    credits: 3,
    duration: "3 weeks",
    maxParticipants: 8,
    currentParticipants: 3,
    skills: ["Attention to Detail", "Digital Tools"],
    blockchainCert: true,
    status: "open" as const,
  },
  {
    title: "AI Research Lab Assistant",
    category: "Specialized Roles",
    description: "Support ongoing research experiments in the AI lab including data collection and preprocessing.",
    credits: 5,
    duration: "8 weeks",
    maxParticipants: 5,
    currentParticipants: 2,
    skills: ["Python", "ML Basics"],
    blockchainCert: true,
    status: "open" as const,
  },
];

const categoryColors: Record<string, string> = {
  "Academic Support": "bg-neon-blue/10 text-neon-blue",
  "Campus Life & Services": "bg-primary/10 text-primary",
  "Event Management & Outreach": "bg-neon-cyan/10 text-neon-cyan",
  "Sustainability & Environmental": "bg-emerald-500/10 text-emerald-400",
  "Specialized Roles": "bg-amber-500/10 text-amber-400",
};

const VolunteeringFeed = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout role="student" userName="Alex">
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sprout className="w-6 h-6 text-emerald-400" /> Volunteering
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Browse opportunities, earn credits & blockchain-verified certificates</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search volunteering..."
              className="pl-9 pr-4 py-2 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {["All", "Academic Support", "Campus Life & Services", "Event Management & Outreach", "Sustainability & Environmental", "Specialized Roles"].map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                cat === "All"
                  ? "bg-primary/15 text-primary border-primary/30"
                  : "bg-secondary text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {volunteeringOpportunities.map((vol, i) => (
            <GlassCard
              key={i}
              className="!p-5 flex flex-col justify-between hover:neon-glow cursor-pointer group"
              onClick={() => navigate(`/student/activity/${i + 1}`)}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[vol.category] || "bg-secondary text-muted-foreground"}`}>
                      {vol.category}
                    </span>
                  </div>
                  {vol.blockchainCert && (
                    <div className="flex items-center gap-1 text-[10px] text-neon-cyan font-medium">
                      <Shield className="w-3 h-3" /> NFT Cert
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{vol.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{vol.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {vol.skills.map((skill) => (
                    <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-primary" /> {vol.credits} credits</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {vol.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {vol.currentParticipants}/{vol.maxParticipants}</span>
                </div>
                <Button
                  variant={vol.status === "full" ? "neon-outline" : "neon"}
                  size="sm"
                  className="w-full"
                  disabled={vol.status === "full"}
                  onClick={(e) => { e.stopPropagation(); navigate(`/student/activity/${i + 1}`); }}
                >
                  {vol.status === "full" ? "Fully Booked" : "View & Apply"}
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VolunteeringFeed;
