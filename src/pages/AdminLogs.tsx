import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import StatCard from "@/components/StatCard";
import { Shield, Award, BookOpen, Sprout, Search, FileX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface LogEntry {
  id: string;
  studentName: string;
  studentEmail: string;
  itemTitle: string;
  type: "activity" | "volunteering";
  credits: number;
  status: "issued" | "verified";
  date: string;
  blockchainHash: string | null;
}

const logs: LogEntry[] = [
  { id: "c1", studentName: "Alex Johnson", studentEmail: "alex@uni.edu", itemTitle: "AI & Machine Learning Workshop", type: "activity", credits: 5, status: "verified", date: "2024-03-15", blockchainHash: "0x7a2f8c...3b1c" },
  { id: "c2", studentName: "Priya Sharma", studentEmail: "priya@uni.edu", itemTitle: "Community Health Drive", type: "volunteering", credits: 4, status: "verified", date: "2024-03-14", blockchainHash: "0x9c1e4b...7d4f" },
  { id: "c3", studentName: "Rahul Verma", studentEmail: "rahul@uni.edu", itemTitle: "Hackathon 2024", type: "activity", credits: 6, status: "issued", date: "2024-03-13", blockchainHash: null },
  { id: "c4", studentName: "Anita Desai", studentEmail: "anita@uni.edu", itemTitle: "Tree Plantation Drive", type: "volunteering", credits: 3, status: "verified", date: "2024-03-12", blockchainHash: "0x4b8d6f...2a9e" },
  { id: "c5", studentName: "Vikram Patel", studentEmail: "vikram@uni.edu", itemTitle: "Web Development Bootcamp", type: "activity", credits: 5, status: "issued", date: "2024-03-11", blockchainHash: null },
  { id: "c6", studentName: "Sneha Gupta", studentEmail: "sneha@uni.edu", itemTitle: "Blood Donation Camp", type: "volunteering", credits: 2, status: "verified", date: "2024-03-10", blockchainHash: "0x6f3a1c...1c8b" },
  { id: "c7", studentName: "Arjun Nair", studentEmail: "arjun@uni.edu", itemTitle: "Data Science Seminar", type: "activity", credits: 3, status: "verified", date: "2024-03-09", blockchainHash: "0x2e5b9a...5b9a" },
  { id: "c8", studentName: "Meera Iyer", studentEmail: "meera@uni.edu", itemTitle: "Rural Education Program", type: "volunteering", credits: 5, status: "issued", date: "2024-03-08", blockchainHash: null },
];

const AdminLogs = () => {
  const [search, setSearch] = useState("");

  const filtered = logs.filter(
    (l) =>
      l.studentName.toLowerCase().includes(search.toLowerCase()) ||
      l.itemTitle.toLowerCase().includes(search.toLowerCase())
  );

  const totalCerts = logs.length;
  const activitiesVerified = logs.filter((l) => l.type === "activity").length;
  const volunteeringVerified = logs.filter((l) => l.type === "volunteering").length;
  const blockchainVerified = logs.filter((l) => l.blockchainHash !== null).length;

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-6 max-w-7xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Verification Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Audit trail of all verified activities and volunteering
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Certificates" value={totalCerts} icon={Award} trend="All time" trendUp />
          <StatCard label="Activities Verified" value={activitiesVerified} icon={BookOpen} />
          <StatCard label="Volunteering Verified" value={volunteeringVerified} icon={Sprout} />
          <StatCard label="Blockchain Verified" value={blockchainVerified} icon={Shield} trend={`${Math.round((blockchainVerified / totalCerts) * 100)}%`} trendUp />
        </div>

        {/* Search */}
        <GlassCard>
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none focus-visible:ring-0 px-0"
            />
          </div>
        </GlassCard>

        {/* Table */}
        <GlassCard className="p-0 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <FileX className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm font-medium">No logs found</p>
              <p className="text-xs mt-1">Try adjusting your search</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Student</TableHead>
                  <TableHead>Item Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Blockchain</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((log) => (
                  <TableRow key={log.id} className="border-border/30 hover:bg-white/5 transition-colors">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground text-sm">{log.studentName}</p>
                        <p className="text-xs text-muted-foreground">{log.studentEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-foreground">{log.itemTitle}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          log.type === "activity"
                            ? "border-primary/40 text-primary bg-primary/10"
                            : "border-green-400/40 text-green-400 bg-green-400/10"
                        }
                      >
                        {log.type === "activity" ? (
                          <BookOpen className="w-3 h-3 mr-1" />
                        ) : (
                          <Sprout className="w-3 h-3 mr-1" />
                        )}
                        {log.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-foreground">{log.credits}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          log.status === "verified"
                            ? "border-neon-cyan/40 text-neon-cyan bg-neon-cyan/10"
                            : "border-yellow-400/40 text-yellow-400 bg-yellow-400/10"
                        }
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <BlockchainBadge
                        status={log.blockchainHash ? "verified" : "unverified"}
                        txHash={log.blockchainHash || undefined}
                      />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(log.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default AdminLogs;
