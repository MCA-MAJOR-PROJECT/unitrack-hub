import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Shield, Plus, CalendarIcon } from "lucide-react";
import { useState } from "react";

const activityTypes = ["Workshop", "Seminar", "Bootcamp", "Competition", "Research", "Conference", "Hackathon"];

const FacultyCreateActivity = () => {
  const [blockchainCert, setBlockchainCert] = useState(true);

  return (
    <DashboardLayout role="faculty" userName="Dr. Kumar">
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" /> Create Academic Activity
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Define a new academic activity for students to enroll in</p>
        </div>

        <GlassCard>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Activity Title</label>
              <Input placeholder="e.g. AI Workshop 2025" className="bg-input border-border focus:border-primary/50" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Activity Type</label>
              <select className="w-full h-10 rounded-md border border-border bg-input px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="" className="bg-card">Select type</option>
                {activityTypes.map((type) => (
                  <option key={type} value={type} className="bg-card">{type}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Description</label>
              <textarea
                rows={4}
                placeholder="Describe the activity, learning outcomes, and requirements..."
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Credit Points</label>
                <Input type="number" placeholder="e.g. 3" className="bg-input border-border focus:border-primary/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Max Capacity</label>
                <Input type="number" placeholder="e.g. 50" className="bg-input border-border focus:border-primary/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Start Date</label>
                <Input type="date" className="bg-input border-border focus:border-primary/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">End Date</label>
                <Input type="date" className="bg-input border-border focus:border-primary/50" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Venue / Location</label>
              <Input placeholder="e.g. Auditorium Block A, Room 301" className="bg-input border-border focus:border-primary/50" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-neon-cyan" />
                <div>
                  <p className="text-sm font-medium text-foreground">Blockchain Certificate</p>
                  <p className="text-xs text-muted-foreground">Issue verifiable NFT credential on completion</p>
                </div>
              </div>
              <button
                onClick={() => setBlockchainCert(!blockchainCert)}
                className={`w-11 h-6 rounded-full transition-colors relative ${blockchainCert ? "bg-primary" : "bg-muted"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary-foreground transition-transform ${blockchainCert ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>

            <Button variant="neon" className="w-full">
              <Plus className="w-4 h-4" /> Publish Activity
            </Button>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default FacultyCreateActivity;
