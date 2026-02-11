import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Shield, Activity, Settings, Search, MoreHorizontal, ArrowUpDown } from "lucide-react";

const users = [
  { name: "Alex Johnson", role: "Student", dept: "Computer Science", status: "Active", wallet: "0x7f8...3a2" },
  { name: "Dr. Kumar", role: "Faculty", dept: "AI & ML", status: "Active", wallet: "0x3c1...b7e" },
  { name: "Priya Sharma", role: "Student", dept: "Electronics", status: "Active", wallet: "0x9a5...f2c" },
  { name: "Prof. Singh", role: "Faculty", dept: "Mathematics", status: "Inactive", wallet: "—" },
  { name: "Rahul Verma", role: "Student", dept: "Computer Science", status: "Active", wallet: "0x2d4...e8a" },
];

const transactions = [
  { hash: "0x7a2f...3b1c", type: "Credit Issue", from: "Contract", to: "Alex J.", time: "2 min ago", status: "verified" as const },
  { hash: "0x9c1e...7d4f", type: "Certificate Mint", from: "Admin", to: "Priya S.", time: "15 min ago", status: "verified" as const },
  { hash: "0x4b8d...2a9e", type: "Activity Create", from: "Dr. Kumar", to: "Contract", time: "1h ago", status: "pending" as const },
  { hash: "0x6f3a...1c8b", type: "Credit Issue", from: "Contract", to: "Rahul V.", time: "3h ago", status: "verified" as const },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-6 max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Console</h1>
          <p className="text-sm text-muted-foreground mt-1">System overview, user management & blockchain governance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={1247} icon={Users} trend="5.2% growth" trendUp />
          <StatCard label="Active Activities" value={86} icon={BookOpen} trend="12 new" trendUp />
          <StatCard label="Blockchain Txns" value="3.2K" icon={Shield} trend="150 today" trendUp />
          <StatCard label="System Health" value="99.8%" icon={Activity} trend="Operational" trendUp />
        </div>

        {/* User Management */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">User Management</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search users..."
                  className="pl-9 pr-4 py-2 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-48"
                />
              </div>
              <Button variant="neon" size="sm">Add User</Button>
            </div>
          </div>
          <GlassCard className="!p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["Name", "Role", "Department", "Wallet", "Status", ""].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {h && <span className="flex items-center gap-1">{h} {h !== "" && <ArrowUpDown className="w-3 h-3" />}</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0">
                            {user.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          user.role === "Faculty" ? "bg-neon-blue/10 text-neon-blue" : "bg-primary/10 text-primary"
                        }`}>{user.role}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{user.dept}</td>
                      <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{user.wallet}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${user.status === "Active" ? "text-neon-cyan" : "text-muted-foreground"}`}>
                          {user.status}
                        </span>
                      </td>
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

        {/* Blockchain Transactions */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Blockchain Transaction Log</h3>
          <div className="grid gap-3">
            {transactions.map((tx, i) => (
              <GlassCard key={i} className="!p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.type}</p>
                    <p className="text-xs text-muted-foreground">{tx.from} → {tx.to}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground">{tx.hash}</span>
                  <span className="text-xs text-muted-foreground">{tx.time}</span>
                  <BlockchainBadge status={tx.status} />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Governance */}
        <GlassCard glow>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Governance Settings</p>
                <p className="text-xs text-muted-foreground">Configure credit rules, smart contract parameters & access control</p>
              </div>
            </div>
            <Button variant="neon-outline" size="sm">Configure</Button>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
