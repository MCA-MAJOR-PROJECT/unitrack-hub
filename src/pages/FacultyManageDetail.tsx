import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, BookOpen, Sprout, Users, Star, Clock, Calendar,
  CheckCircle, Mail, Shield, Award
} from "lucide-react";

// Mock data matching FacultyManage
const allActivities: Record<string, any> = {
  fa1: { title: "AI & Machine Learning Workshop 2025", type: "Workshop", credits: 5, participants: 42, capacity: 50, status: "active", date: "Feb 20, 2025", department: "AI & ML Dept.", description: "Intensive hands-on workshop covering supervised learning, neural networks, and real-world ML deployment on campus datasets.", blockchainVerified: true },
  fa2: { title: "Blockchain Dev Bootcamp", type: "Bootcamp", credits: 5, participants: 28, capacity: 35, status: "active", date: "Feb 25, 2025", department: "Computer Science", description: "Learn smart contract development with Solidity, deploy on testnet, and build decentralized applications.", blockchainVerified: true },
  fa3: { title: "Research Paper Submission Drive", type: "Research", credits: 4, participants: 15, capacity: 25, status: "active", date: "Mar 1, 2025", department: "Research Cell", description: "Submit your original research paper to the inter-university journal. Mentoring sessions included.", blockchainVerified: false },
  fa4: { title: "Ethics in Technology Seminar", type: "Seminar", credits: 2, participants: 60, capacity: 80, status: "completed", date: "Feb 28, 2025", department: "Humanities", description: "Explore AI ethics, data privacy, digital rights and responsible tech development.", blockchainVerified: false },
  fa5: { title: "Data Science Certification Program", type: "Certification", credits: 8, participants: 35, capacity: 35, status: "verified", date: "Mar 15, 2025", department: "Analytics Lab", description: "Comprehensive 6-week program covering Python, Pandas, ML pipelines, and capstone project.", blockchainVerified: true },
};

const allVolunteering: Record<string, any> = {
  fv1: { title: "Campus Green Initiative Coordinator", type: "Sustainability", credits: 4, participants: 8, capacity: 15, status: "active", date: "Feb 10, 2025", department: "Environmental Dept.", description: "Lead weekly campus sustainability workshops and coordinate recycling drives across dormitories.", blockchainVerified: true },
  fv2: { title: "Peer Tutoring — Data Structures", type: "Academic Support", credits: 3, participants: 10, capacity: 10, status: "full", date: "Feb 12, 2025", department: "Computer Science", description: "Assist junior students with Data Structures coursework during weekly lab sessions.", blockchainVerified: true },
  fv3: { title: "Library Digitization Assistant", type: "Campus Services", credits: 3, participants: 3, capacity: 8, status: "active", date: "Feb 18, 2025", department: "Library", description: "Help digitize rare manuscripts and organize the digital archive cataloging system.", blockchainVerified: true },
  fv4: { title: "Open Day Event Volunteer", type: "Event", credits: 2, participants: 12, capacity: 30, status: "open", date: "Mar 5, 2025", department: "Student Affairs", description: "Guide prospective students and families during the annual university open day event.", blockchainVerified: false },
  fv5: { title: "AI Research Lab Assistant", type: "Research", credits: 5, participants: 2, capacity: 5, status: "open", date: "Mar 10, 2025", department: "AI Lab", description: "Support ongoing research experiments in the AI lab including data collection and preprocessing.", blockchainVerified: true },
};

// Mock participants for activities (enrollments)
const activityParticipants: Record<string, any[]> = {
  fa1: [
    { name: "Priya Sharma", email: "priya@uni.edu", status: "verified", enrolledDate: "Feb 10" },
    { name: "Rahul Verma", email: "rahul@uni.edu", status: "completed", enrolledDate: "Feb 11" },
    { name: "Anita Das", email: "anita@uni.edu", status: "active", enrolledDate: "Feb 12" },
    { name: "Karthik Nair", email: "karthik@uni.edu", status: "active", enrolledDate: "Feb 13" },
    { name: "Sneha Reddy", email: "sneha@uni.edu", status: "completed", enrolledDate: "Feb 14" },
  ],
  fa2: [
    { name: "Arjun Patel", email: "arjun@uni.edu", status: "active", enrolledDate: "Feb 20" },
    { name: "Meera Joshi", email: "meera@uni.edu", status: "active", enrolledDate: "Feb 21" },
    { name: "Vikram Singh", email: "vikram@uni.edu", status: "completed", enrolledDate: "Feb 22" },
  ],
  fa3: [
    { name: "Deepa Rao", email: "deepa@uni.edu", status: "active", enrolledDate: "Feb 25" },
    { name: "Sunil Kumar", email: "sunil@uni.edu", status: "active", enrolledDate: "Feb 26" },
  ],
  fa4: [
    { name: "Lakshmi Iyer", email: "lakshmi@uni.edu", status: "completed", enrolledDate: "Feb 20" },
    { name: "Nikhil Gupta", email: "nikhil@uni.edu", status: "verified", enrolledDate: "Feb 21" },
    { name: "Pooja Menon", email: "pooja@uni.edu", status: "completed", enrolledDate: "Feb 22" },
    { name: "Ravi Shankar", email: "ravi@uni.edu", status: "verified", enrolledDate: "Feb 23" },
  ],
  fa5: [
    { name: "Aisha Khan", email: "aisha@uni.edu", status: "verified", enrolledDate: "Mar 1" },
    { name: "Rohit Bhat", email: "rohit@uni.edu", status: "verified", enrolledDate: "Mar 2" },
    { name: "Kavya Nair", email: "kavya@uni.edu", status: "completed", enrolledDate: "Mar 3" },
  ],
};

// Mock participants for volunteering (applications)
const volunteeringParticipants: Record<string, any[]> = {
  fv1: [
    { name: "Priya Sharma", email: "priya@uni.edu", status: "applied", appliedDate: "Feb 5" },
    { name: "Rahul Verma", email: "rahul@uni.edu", status: "active", appliedDate: "Feb 6" },
    { name: "Anita Das", email: "anita@uni.edu", status: "active", appliedDate: "Feb 7" },
    { name: "Karthik Nair", email: "karthik@uni.edu", status: "completed", appliedDate: "Feb 8" },
  ],
  fv2: [
    { name: "Sneha Reddy", email: "sneha@uni.edu", status: "active", appliedDate: "Feb 8" },
    { name: "Arjun Patel", email: "arjun@uni.edu", status: "active", appliedDate: "Feb 9" },
    { name: "Meera Joshi", email: "meera@uni.edu", status: "completed", appliedDate: "Feb 10" },
  ],
  fv3: [
    { name: "Vikram Singh", email: "vikram@uni.edu", status: "applied", appliedDate: "Feb 14" },
    { name: "Deepa Rao", email: "deepa@uni.edu", status: "active", appliedDate: "Feb 15" },
  ],
  fv4: [
    { name: "Sunil Kumar", email: "sunil@uni.edu", status: "applied", appliedDate: "Mar 1" },
    { name: "Lakshmi Iyer", email: "lakshmi@uni.edu", status: "applied", appliedDate: "Mar 2" },
    { name: "Nikhil Gupta", email: "nikhil@uni.edu", status: "active", appliedDate: "Mar 3" },
  ],
  fv5: [
    { name: "Pooja Menon", email: "pooja@uni.edu", status: "applied", appliedDate: "Mar 5" },
    { name: "Ravi Shankar", email: "ravi@uni.edu", status: "active", appliedDate: "Mar 6" },
  ],
};

const participantStatusColors: Record<string, string> = {
  active: "bg-primary/10 text-primary border-primary/30",
  enrolled: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  completed: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  verified: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30",
  applied: "bg-blue-500/10 text-blue-400 border-blue-500/30",
};

const FacultyManageDetail = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();

  const isActivity = type === "activity";
  const item = isActivity ? allActivities[id || ""] : allVolunteering[id || ""];
  const participants = isActivity
    ? activityParticipants[id || ""] || []
    : volunteeringParticipants[id || ""] || [];

  if (!item) {
    return (
      <DashboardLayout role="faculty" userName="Dr. Kumar">
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-foreground font-medium">Item not found</p>
          <Button variant="neon-outline" className="mt-4" onClick={() => navigate("/faculty/manage")}>
            <ArrowLeft className="w-4 h-4" /> Back to Manage
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const fillPercent = (item.participants / item.capacity) * 100;

  return (
    <DashboardLayout role="faculty" userName="Dr. Kumar">
      <div className="space-y-6 max-w-5xl">
        {/* Back */}
        <Button variant="ghost" size="sm" onClick={() => navigate("/faculty/manage")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Manage
        </Button>

        {/* Header Card */}
        <GlassCard glow className="!p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {isActivity ? <BookOpen className="w-5 h-5 text-primary" /> : <Sprout className="w-5 h-5 text-emerald-400" />}
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-secondary text-muted-foreground border border-border">
                  {item.type}
                </span>
                {item.blockchainVerified && <BlockchainBadge status="verified" />}
              </div>
              <h1 className="text-xl font-bold text-foreground mb-1">{item.title}</h1>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-primary" /> {item.credits} credits</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {item.participants}/{item.capacity} participants</span>
                <span className="text-muted-foreground/60">{item.department}</span>
              </div>
            </div>
            <StatusBadge status={item.status} />
          </div>

          {/* Capacity bar */}
          <div className="mt-4">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>Capacity</span>
              <span>{Math.round(fillPercent)}% filled</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${fillPercent >= 100 ? "bg-muted-foreground" : "bg-gradient-to-r from-neon-purple to-neon-blue"}`}
                style={{ width: `${Math.min(fillPercent, 100)}%` }}
              />
            </div>
          </div>
        </GlassCard>

        {/* Participants Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              {isActivity ? "Enrolled Students" : "Applicants"} ({participants.length})
            </h2>
          </div>

          {participants.length > 0 ? (
            <GlassCard className="!p-0 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p: any, i: number) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0">
                            {p.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-foreground">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {p.email}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">
                        {p.enrolledDate || p.appliedDate}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border inline-flex items-center capitalize ${participantStatusColors[p.status] || "bg-secondary text-muted-foreground border-border"}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {(p.status === "completed" || p.status === "applied") && (
                          <Button variant="neon" size="sm" className="h-7 text-[10px]">
                            {p.status === "completed" ? (
                              <><CheckCircle className="w-3 h-3" /> Verify</>
                            ) : (
                              <><CheckCircle className="w-3 h-3" /> Approve</>
                            )}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          ) : (
            <GlassCard className="text-center py-8">
              <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No participants yet</p>
            </GlassCard>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassCard className="!p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-neon-cyan" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Smart Contract</p>
                <p className="text-[10px] text-muted-foreground">Issue blockchain certificates</p>
              </div>
            </div>
            <Button variant="neon" size="sm" className="text-xs">Execute</Button>
          </GlassCard>
          <GlassCard className="!p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Bulk Verify</p>
                <p className="text-[10px] text-muted-foreground">Verify all completed students</p>
              </div>
            </div>
            <Button variant="neon-outline" size="sm" className="text-xs">Verify All</Button>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyManageDetail;
