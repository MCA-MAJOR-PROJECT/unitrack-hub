import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Search, Calendar, Clock, Award, Users, Filter, 
  ChevronRight, CheckCircle, Star, Sprout
} from "lucide-react";

const activities = [
  {
    id: "1",
    title: "AI & Machine Learning Workshop 2025",
    type: "Workshop",
    department: "AI & ML Dept.",
    description: "Intensive hands-on workshop covering supervised learning, neural networks, and real-world ML deployment on campus datasets.",
    credits: 5,
    date: "Feb 20, 2025",
    duration: "3 Days",
    enrolled: 42,
    capacity: 50,
    status: "open" as const,
    blockchainVerified: true,
    faculty: "Dr. Arun Kumar",
  },
  {
    id: "2",
    title: "Blockchain Dev Bootcamp",
    type: "Bootcamp",
    department: "Computer Science",
    description: "Learn smart contract development with Solidity, deploy on testnet, and build decentralized applications.",
    credits: 5,
    date: "Feb 25, 2025",
    duration: "5 Days",
    enrolled: 28,
    capacity: 35,
    status: "open" as const,
    blockchainVerified: true,
    faculty: "Prof. Meena Raj",
  },
  {
    id: "3",
    title: "Research Paper Submission Drive",
    type: "Research",
    department: "Research Cell",
    description: "Submit your original research paper to the inter-university journal. Mentoring sessions included for first-time authors.",
    credits: 4,
    date: "Mar 1, 2025",
    duration: "2 Weeks",
    enrolled: 15,
    capacity: 25,
    status: "open" as const,
    blockchainVerified: false,
    faculty: "Dr. Priya Nair",
  },
  {
    id: "4",
    title: "Cultural Fest — TechNova 2025",
    type: "Event",
    department: "Student Affairs",
    description: "Annual inter-college technical and cultural festival. Compete in hackathons, paper presentations and cultural events.",
    credits: 3,
    date: "Mar 10, 2025",
    duration: "3 Days",
    enrolled: 120,
    capacity: 150,
    status: "open" as const,
    blockchainVerified: true,
    faculty: "Dean, Student Affairs",
  },
  {
    id: "5",
    title: "Data Science Certification Program",
    type: "Certification",
    department: "Analytics Lab",
    description: "Comprehensive 6-week program covering Python, Pandas, ML pipelines, and final capstone project with industry mentors.",
    credits: 8,
    date: "Mar 15, 2025",
    duration: "6 Weeks",
    enrolled: 35,
    capacity: 35,
    status: "full" as const,
    blockchainVerified: true,
    faculty: "Dr. Suresh Iyer",
  },
  {
    id: "6",
    title: "Ethics in Technology Seminar",
    type: "Seminar",
    department: "Humanities",
    description: "Explore AI ethics, data privacy, digital rights and responsible tech development in modern society.",
    credits: 2,
    date: "Feb 28, 2025",
    duration: "1 Day",
    enrolled: 60,
    capacity: 80,
    status: "open" as const,
    blockchainVerified: false,
    faculty: "Dr. Ananya Bose",
  },
];

const typeColors: Record<string, string> = {
  Workshop: "bg-primary/10 text-primary border-primary/20",
  Bootcamp: "bg-neon-blue/10 text-neon-blue border-neon-blue/20",
  Research: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Event: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
  Certification: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Seminar: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const allTypes = ["All", "Workshop", "Bootcamp", "Research", "Event", "Certification", "Seminar"];

const ActivitiesFeed = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = activities.filter((a) => {
    const matchType = activeFilter === "All" || a.type === activeFilter;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.department.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <DashboardLayout role="student" userName="Alex">
      <div className="space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" /> Academic Activities
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Browse workshops, bootcamps, seminars & earn blockchain-verified credits
            </p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search activities..."
              className="pl-9 pr-4 py-2 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
            />
          </div>
        </div>

        {/* Volunteering Priority CTA */}
        <GlassCard className="!p-3 flex items-center justify-between border-emerald-500/20">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-muted-foreground">🌱 Volunteering opportunities are prioritized for community engagement.</span>
          </div>
          <Button variant="neon-outline" size="sm" className="h-7 text-xs shrink-0" onClick={() => navigate("/student/volunteering")}>
            Browse Volunteering
          </Button>
        </GlassCard>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Open Activities", value: activities.filter(a => a.status === "open").length, icon: BookOpen, color: "text-primary" },
            { label: "Credits Available", value: activities.reduce((s, a) => s + a.credits, 0), icon: Star, color: "text-neon-cyan" },
            { label: "Blockchain Verified", value: activities.filter(a => a.blockchainVerified).length, icon: CheckCircle, color: "text-emerald-400" },
          ].map((s, i) => (
            <GlassCard key={i} className="!p-3 flex items-center gap-3">
              <s.icon className={`w-5 h-5 shrink-0 ${s.color}`} />
              <div>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                activeFilter === type
                  ? "bg-primary/15 text-primary border-primary/40 neon-glow"
                  : "bg-secondary text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((activity) => {
            const fillPercent = (activity.enrolled / activity.capacity) * 100;
            return (
              <GlassCard
                key={activity.id}
                className="!p-5 flex flex-col justify-between hover:neon-glow cursor-pointer group"
                onClick={() => navigate(`/student/activity/${activity.id}`)}
              >
                <div>
                  {/* Type & Blockchain badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${typeColors[activity.type] || "bg-secondary text-muted-foreground border-border"}`}>
                      {activity.type}
                    </span>
                    {activity.blockchainVerified && (
                      <BlockchainBadge status="verified" className="!text-[9px]" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-1">{activity.department} · {activity.faculty}</p>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                    {activity.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {activity.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {activity.duration}</span>
                    <span className="flex items-center gap-1"><Award className="w-3 h-3 text-primary" /> {activity.credits} credits</span>
                  </div>

                  {/* Capacity bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {activity.enrolled} / {activity.capacity} enrolled</span>
                      <span>{Math.round(fillPercent)}% filled</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${fillPercent >= 100 ? "bg-muted-foreground" : "bg-gradient-to-r from-neon-purple to-neon-blue"}`}
                        style={{ width: `${Math.min(fillPercent, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={activity.status === "full" ? "neon-outline" : "neon"}
                    size="sm"
                    className="flex-1"
                    disabled={activity.status === "full"}
                    onClick={(e) => { e.stopPropagation(); navigate(`/student/activity/${activity.id}`); }}
                  >
                    {activity.status === "full" ? "Fully Booked" : "View & Enroll"}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <GlassCard className="text-center py-12">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-muted-foreground">No activities found</p>
            <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filter</p>
          </GlassCard>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ActivitiesFeed;
