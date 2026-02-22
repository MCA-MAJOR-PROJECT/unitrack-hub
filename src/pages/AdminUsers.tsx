import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, MoreHorizontal, ArrowUpDown, UserPlus, Filter, Download } from "lucide-react";
import { useState } from "react";

const allUsers = [
  { name: "Alex Johnson", email: "alex.j@university.edu", role: "Student", dept: "Computer Science", status: "Active", wallet: "0x7f8...3a2", joined: "Jan 2025", credits: 42 },
  { name: "Dr. Kumar", email: "kumar@university.edu", role: "Faculty", dept: "AI & ML", status: "Active", wallet: "0x3c1...b7e", joined: "Aug 2023", credits: 0 },
  { name: "Priya Sharma", email: "priya.s@university.edu", role: "Student", dept: "Electronics", status: "Active", wallet: "0x9a5...f2c", joined: "Sep 2024", credits: 38 },
  { name: "Prof. Singh", email: "singh@university.edu", role: "Faculty", dept: "Mathematics", status: "Inactive", wallet: "—", joined: "Mar 2022", credits: 0 },
  { name: "Rahul Verma", email: "rahul.v@university.edu", role: "Student", dept: "Computer Science", status: "Active", wallet: "0x2d4...e8a", joined: "Sep 2024", credits: 29 },
  { name: "Dr. Mehra", email: "mehra@university.edu", role: "Faculty", dept: "Physics", status: "Active", wallet: "0x8b2...c4d", joined: "Jan 2024", credits: 0 },
  { name: "Anita Desai", email: "anita.d@university.edu", role: "Student", dept: "Biotechnology", status: "Suspended", wallet: "0x1e7...a9f", joined: "Sep 2023", credits: 15 },
  { name: "Vikram Patel", email: "vikram.p@university.edu", role: "Student", dept: "Mechanical", status: "Active", wallet: "0x5f3...d1b", joined: "Sep 2024", credits: 33 },
];

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = allUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage all platform users, roles & wallet connections</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Export</Button>
            <Button variant="neon" size="sm"><UserPlus className="w-4 h-4 mr-1" /> Add User</Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: allUsers.length, color: "text-primary" },
            { label: "Students", value: allUsers.filter((u) => u.role === "Student").length, color: "text-neon-cyan" },
            { label: "Faculty", value: allUsers.filter((u) => u.role === "Faculty").length, color: "text-neon-blue" },
            { label: "Inactive", value: allUsers.filter((u) => u.status !== "Active").length, color: "text-destructive" },
          ].map((s, i) => (
            <GlassCard key={i} className="!p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </GlassCard>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {["All", "Student", "Faculty"].map((r) => (
              <Button key={r} variant={roleFilter === r ? "neon" : "outline"} size="sm" onClick={() => setRoleFilter(r)}>
                {r}
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
                  {["Name", "Role", "Department", "Wallet", "Credits", "Status", "Joined", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {h && <span className="flex items-center gap-1">{h} <ArrowUpDown className="w-3 h-3" /></span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={user.role === "Faculty" ? "secondary" : "default"} className={user.role === "Faculty" ? "bg-neon-blue/10 text-neon-blue border-neon-blue/20" : "bg-primary/10 text-primary border-primary/20"}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{user.dept}</td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{user.wallet}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{user.credits || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        user.status === "Active" ? "bg-neon-cyan/10 text-neon-cyan" : user.status === "Suspended" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                      }`}>{user.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{user.joined}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="w-4 h-4" /></Button>
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

export default AdminUsers;
