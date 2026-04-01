import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search, BookOpen, Sprout, Users, Star, Clock, Calendar,
  ChevronRight, Filter, Plus
} from "lucide-react";

const facultyActivities = [
  { id: "fa1", title: "AI & Machine Learning Workshop 2025", type: "Workshop", credits: 5, participants: 42, capacity: 50, status: "active" as const, date: "Feb 20, 2025", department: "AI & ML Dept.", blockchainVerified: true },
  { id: "fa2", title: "Blockchain Dev Bootcamp", type: "Bootcamp", credits: 5, participants: 28, capacity: 35, status: "active" as const, date: "Feb 25, 2025", department: "Computer Science", blockchainVerified: true },
  { id: "fa3", title: "Research Paper Submission Drive", type: "Research", credits: 4, participants: 15, capacity: 25, status: "active" as const, date: "Mar 1, 2025", department: "Research Cell", blockchainVerified: false },
  { id: "fa4", title: "Ethics in Technology Seminar", type: "Seminar", credits: 2, participants: 60, capacity: 80, status: "completed" as const, date: "Feb 28, 2025", department: "Humanities", blockchainVerified: false },
  { id: "fa5", title: "Data Science Certification Program", type: "Certification", credits: 8, participants: 35, capacity: 35, status: "verified" as const, date: "Mar 15, 2025", department: "Analytics Lab", blockchainVerified: true },
];

const facultyVolunteering = [
  { id: "fv1", title: "Campus Green Initiative Coordinator", type: "Sustainability", credits: 4, participants: 8, capacity: 15, status: "active" as const, date: "Feb 10, 2025", department: "Environmental Dept.", blockchainVerified: true },
  { id: "fv2", title: "Peer Tutoring — Data Structures", type: "Academic Support", credits: 3, participants: 10, capacity: 10, status: "full" as const, date: "Feb 12, 2025", department: "Computer Science", blockchainVerified: true },
  { id: "fv3", title: "Library Digitization Assistant", type: "Campus Services", credits: 3, participants: 3, capacity: 8, status: "active" as const, date: "Feb 18, 2025", department: "Library", blockchainVerified: true },
  { id: "fv4", title: "Open Day Event Volunteer", type: "Event", credits: 2, participants: 12, capacity: 30, status: "open" as const, date: "Mar 5, 2025", department: "Student Affairs", blockchainVerified: false },
  { id: "fv5", title: "AI Research Lab Assistant", type: "Research", credits: 5, participants: 2, capacity: 5, status: "open" as const, date: "Mar 10, 2025", department: "AI Lab", blockchainVerified: true },
];

const statusFilters = ["All", "Active", "Completed", "Verified", "Open", "Full"];

const FacultyManage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"activities" | "volunteering">("activities");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const items = tab === "activities" ? facultyActivities : facultyVolunteering;

  const filtered = items.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.department.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All" || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout role="faculty" userName="Dr. Kumar">
      <div className="space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manage</h1>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage all your created activities & volunteering
            </p>
          </div>
          <Button variant="neon" onClick={() => navigate(tab === "activities" ? "/faculty/create" : "/faculty/volunteering/create")}>
            <Plus className="w-4 h-4" /> Create {tab === "activities" ? "Activity" : "Volunteering"}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={(v) => { setTab(v as "activities" | "volunteering"); setStatusFilter("All"); }}>
          <TabsList className="bg-secondary/60">
            <TabsTrigger value="activities" className="text-xs flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Activities
            </TabsTrigger>
            <TabsTrigger value="volunteering" className="text-xs flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5" /> Volunteering
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${tab}...`}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {statusFilters.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                  statusFilter === s
                    ? "bg-primary/15 text-primary border-primary/40"
                    : "bg-secondary text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total", value: items.length, icon: tab === "activities" ? BookOpen : Sprout, color: "text-primary" },
            { label: "Active", value: items.filter(i => i.status === "active").length, icon: Clock, color: "text-neon-cyan" },
            { label: "Participants", value: items.reduce((s, i) => s + i.participants, 0), icon: Users, color: "text-neon-blue" },
            { label: "Credits", value: items.reduce((s, i) => s + i.credits, 0), icon: Star, color: "text-amber-400" },
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

        {/* Items List */}
        <div className="space-y-3">
          {filtered.map((item) => {
            const fillPercent = (item.participants / item.capacity) * 100;
            return (
              <GlassCard
                key={item.id}
                className="!p-4 cursor-pointer hover:neon-glow group"
                onClick={() => navigate(`/faculty/manage/${tab === "activities" ? "activity" : "volunteering"}/${item.id}`)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {item.title}
                      </h3>
                      {item.blockchainVerified && <BlockchainBadge status="verified" className="!text-[9px]" />}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-primary" /> {item.credits} credits</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {item.participants}/{item.capacity}</span>
                      <span className="text-muted-foreground/60">{item.department}</span>
                    </div>
                    {/* Capacity bar */}
                    <div className="mt-2 max-w-xs">
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${fillPercent >= 100 ? "bg-muted-foreground" : "bg-gradient-to-r from-neon-purple to-neon-blue"}`}
                          style={{ width: `${Math.min(fillPercent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge status={item.status} />
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <GlassCard className="text-center py-12">
            {tab === "activities" ? (
              <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            ) : (
              <Sprout className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            )}
            <p className="text-sm font-medium text-foreground">No {tab} found</p>
            <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filter</p>
          </GlassCard>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FacultyManage;
