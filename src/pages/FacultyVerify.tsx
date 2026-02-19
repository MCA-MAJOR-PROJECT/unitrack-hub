import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Search, FileCheck, Clock, Filter } from "lucide-react";
import { useState } from "react";

const verificationRequests = [
  { id: 1, student: "Priya Sharma", rollNo: "CS2021045", activity: "AI Workshop 2025", type: "Workshop", credits: 3, submitted: "2h ago", proof: "Attendance + Quiz Score", status: "pending" as const },
  { id: 2, student: "Rahul Verma", rollNo: "EC2022012", activity: "Research Methodology Seminar", type: "Seminar", credits: 2, submitted: "5h ago", proof: "Certificate Upload", status: "pending" as const },
  { id: 3, student: "Anita Das", rollNo: "IT2021098", activity: "Blockchain Dev Bootcamp", type: "Bootcamp", credits: 5, submitted: "1d ago", proof: "Project Submission", status: "pending" as const },
  { id: 4, student: "Vikram Singh", rollNo: "CS2022033", activity: "Community Outreach Program", type: "Service", credits: 2, submitted: "1d ago", proof: "Photo Evidence", status: "pending" as const },
  { id: 5, student: "Meera Patel", rollNo: "ME2021056", activity: "AI Workshop 2025", type: "Workshop", credits: 3, submitted: "2d ago", proof: "Attendance Log", status: "verified" as const },
  { id: 6, student: "Arjun Nair", rollNo: "CS2021078", activity: "Hackathon - BlockBuild", type: "Competition", credits: 4, submitted: "3d ago", proof: "Winner Certificate", status: "verified" as const },
];

const FacultyVerify = () => {
  const [filter, setFilter] = useState<"all" | "pending" | "verified">("all");
  const [search, setSearch] = useState("");

  const filtered = verificationRequests.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (search && !r.student.toLowerCase().includes(search.toLowerCase()) && !r.activity.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const pendingCount = verificationRequests.filter((r) => r.status === "pending").length;

  return (
    <DashboardLayout role="faculty" userName="Dr. Kumar">
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileCheck className="w-6 h-6 text-primary" /> Verification Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{pendingCount} pending verifications require your attention</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search student or activity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-input border-border"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "pending", "verified"] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "neon" : "neon-outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className="capitalize"
              >
                {f === "pending" && <Clock className="w-3 h-3" />}
                {f === "verified" && <CheckCircle className="w-3 h-3" />}
                {f} {f === "pending" && `(${pendingCount})`}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        <GlassCard className="!p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Student</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Activity</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Proof</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Credits</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">{r.student}</p>
                    <p className="text-xs text-muted-foreground">{r.rollNo} · {r.submitted}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-sm text-foreground">{r.activity}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">{r.type}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">{r.proof}</td>
                  <td className="px-4 py-3 text-sm font-bold text-primary">+{r.credits}</td>
                  <td className="px-4 py-3"><BlockchainBadge status={r.status} /></td>
                  <td className="px-4 py-3">
                    {r.status === "pending" ? (
                      <div className="flex gap-1.5 justify-end">
                        <Button variant="neon" size="sm" className="h-7 text-xs">
                          <CheckCircle className="w-3 h-3" /> Verify
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive">
                          <XCircle className="w-3 h-3" /> Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground text-right block">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default FacultyVerify;
