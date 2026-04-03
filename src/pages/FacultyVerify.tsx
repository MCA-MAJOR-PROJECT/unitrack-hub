import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Search, FileCheck, Clock, Info } from "lucide-react";
import { useState } from "react";

type RequestStatus = "pending" | "completed" | "verified";

interface VerificationRequest {
  id: number;
  student: string;
  rollNo: string;
  activity: string;
  type: "activity" | "volunteering";
  credits: number;
  submitted: string;
  proof: string;
  status: RequestStatus;
  completedDate?: string;
}

const verificationRequests: VerificationRequest[] = [
  { id: 1, student: "Priya Sharma", rollNo: "CS2021045", activity: "AI Workshop 2025", type: "activity", credits: 3, submitted: "2h ago", proof: "Attendance + Quiz Score", status: "pending" },
  { id: 2, student: "Rahul Verma", rollNo: "EC2022012", activity: "Research Methodology Seminar", type: "activity", credits: 2, submitted: "5h ago", proof: "Certificate Upload", status: "pending" },
  { id: 3, student: "Anita Das", rollNo: "IT2021098", activity: "Blockchain Dev Bootcamp", type: "activity", credits: 5, submitted: "1d ago", proof: "Project Submission", status: "pending" },
  { id: 4, student: "Vikram Singh", rollNo: "CS2022033", activity: "Community Outreach Program", type: "volunteering", credits: 2, submitted: "1d ago", proof: "Photo Evidence", status: "pending" },
  { id: 5, student: "Meera Patel", rollNo: "ME2021056", activity: "AI Workshop 2025", type: "activity", credits: 3, submitted: "2d ago", proof: "Attendance Log", status: "completed", completedDate: "Mar 28, 2025" },
  { id: 6, student: "Arjun Nair", rollNo: "CS2021078", activity: "Hackathon - BlockBuild", type: "activity", credits: 4, submitted: "3d ago", proof: "Winner Certificate", status: "verified", completedDate: "Mar 25, 2025" },
  { id: 7, student: "Kavitha Reddy", rollNo: "EC2021034", activity: "Campus Clean Drive", type: "volunteering", credits: 2, submitted: "3d ago", proof: "Coordinator Sign-off", status: "completed", completedDate: "Mar 26, 2025" },
  { id: 8, student: "Sanjay Gupta", rollNo: "IT2022067", activity: "Mentorship Program", type: "volunteering", credits: 3, submitted: "4d ago", proof: "Mentee Feedback", status: "verified", completedDate: "Mar 22, 2025" },
];

const filterTabs = ["all", "pending", "completed", "verified"] as const;

const FacultyVerify = () => {
  const [filter, setFilter] = useState<typeof filterTabs[number]>("all");
  const [search, setSearch] = useState("");

  const filtered = verificationRequests.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (search && !r.student.toLowerCase().includes(search.toLowerCase()) && !r.activity.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: verificationRequests.length,
    pending: verificationRequests.filter(r => r.status === "pending").length,
    completed: verificationRequests.filter(r => r.status === "completed").length,
    verified: verificationRequests.filter(r => r.status === "verified").length,
  };

  const tabIcons: Record<string, React.ReactNode> = {
    pending: <Clock className="w-3 h-3" />,
    completed: <Info className="w-3 h-3" />,
    verified: <CheckCircle className="w-3 h-3" />,
  };

  return (
    <DashboardLayout role="faculty" userName="Dr. Kumar">
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileCheck className="w-6 h-6 text-primary" /> Verification Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{counts.pending} pending verifications require your attention</p>
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
          <div className="flex gap-2 flex-wrap">
            {filterTabs.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "neon" : "neon-outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className="capitalize"
              >
                {tabIcons[f]}
                {f} ({counts[f]})
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
                    <div className="flex gap-1.5 mt-0.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium capitalize">{r.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">{r.proof}</td>
                  <td className="px-4 py-3 text-sm font-bold text-primary">+{r.credits}</td>
                  <td className="px-4 py-3"><BlockchainBadge status={r.status === "completed" ? "pending" : r.status === "verified" ? "verified" : "unverified"} /></td>
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
                    ) : r.status === "completed" ? (
                      <span className="text-xs text-amber-400 text-right block">Awaiting verification · {r.completedDate}</span>
                    ) : (
                      <span className="text-xs text-muted-foreground text-right block">Verified · {r.completedDate}</span>
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
