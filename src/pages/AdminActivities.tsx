import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Eye, Trash2, Filter, Plus } from "lucide-react";
import { useState } from "react";

const activities = [
  { title: "AI Workshop Series", type: "Workshop", faculty: "Dr. Kumar", dept: "AI & ML", credits: 5, enrolled: 45, capacity: 60, status: "Active", blockchain: true, date: "Feb 15, 2026" },
  { title: "Campus Green Initiative", type: "Volunteering", faculty: "Prof. Singh", dept: "Environment", credits: 3, enrolled: 28, capacity: 30, status: "Active", blockchain: true, date: "Feb 10, 2026" },
  { title: "Hackathon 2026", type: "Competition", faculty: "Dr. Mehra", dept: "Computer Science", credits: 8, enrolled: 120, capacity: 150, status: "Active", blockchain: true, date: "Mar 1, 2026" },
  { title: "Research Methodology", type: "Seminar", faculty: "Prof. Desai", dept: "Research", credits: 2, enrolled: 35, capacity: 40, status: "Completed", blockchain: true, date: "Jan 20, 2026" },
  { title: "Blood Donation Drive", type: "Volunteering", faculty: "Dr. Patel", dept: "Health", credits: 2, enrolled: 50, capacity: 100, status: "Active", blockchain: false, date: "Feb 22, 2026" },
  { title: "Web3 Bootcamp", type: "Workshop", faculty: "Dr. Kumar", dept: "AI & ML", credits: 6, enrolled: 30, capacity: 30, status: "Full", blockchain: true, date: "Feb 18, 2026" },
];

const AdminActivities = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const types = ["All", ...new Set(activities.map((a) => a.type))];
  const filtered = activities.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || a.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Activity Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Oversee all academic activities & volunteering across departments</p>
          </div>
          <Button variant="neon" size="sm"><Plus className="w-4 h-4 mr-1" /> Create Activity</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Activities", value: activities.length },
            { label: "Active", value: activities.filter((a) => a.status === "Active").length },
            { label: "Total Enrolled", value: activities.reduce((s, a) => s + a.enrolled, 0) },
            { label: "Blockchain Enabled", value: activities.filter((a) => a.blockchain).length },
          ].map((s, i) => (
            <GlassCard key={i} className="!p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </GlassCard>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search activities..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {types.map((t) => (
              <Button key={t} variant={typeFilter === t ? "neon" : "outline"} size="sm" onClick={() => setTypeFilter(t)}>
                {t}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        <GlassCard className="!p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Activity", "Type", "Faculty", "Credits", "Enrollment", "Status", "Blockchain", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{a.title}</p>
                        <p className="text-xs text-muted-foreground">{a.date}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-xs">{a.type}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-muted-foreground">{a.faculty}</p>
                      <p className="text-xs text-muted-foreground">{a.dept}</p>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-primary">{a.credits} pts</td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">{a.enrolled}/{a.capacity}</p>
                        <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${(a.enrolled / a.capacity) * 100}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        a.status === "Active" ? "bg-neon-cyan/10 text-neon-cyan" : a.status === "Full" ? "bg-amber-500/10 text-amber-500" : "bg-muted text-muted-foreground"
                      }`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <BlockchainBadge status={a.blockchain ? "verified" : "pending"} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default AdminActivities;
