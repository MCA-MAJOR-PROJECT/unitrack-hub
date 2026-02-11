import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sprout, Shield, Plus } from "lucide-react";
import { useState } from "react";

const categories = [
  "Academic Support",
  "Campus Life & Services",
  "Event Management & Outreach",
  "Sustainability & Environmental",
  "Specialized Roles",
];

const verificationTypes = ["Faculty Approval", "QR Check-in"];

const CreateVolunteering = () => {
  const [blockchainCert, setBlockchainCert] = useState(true);

  return (
    <DashboardLayout role="faculty" userName="Dr. Kumar">
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sprout className="w-6 h-6 text-emerald-400" /> Create Volunteering Request
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Define a new volunteering opportunity for students</p>
        </div>

        <GlassCard>
          <div className="space-y-5">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Title</label>
              <Input placeholder="e.g. Campus Green Initiative Coordinator" className="bg-input border-border focus:border-primary/50" />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Category</label>
              <select className="w-full h-10 rounded-md border border-border bg-input px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="" className="bg-card">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-card">{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Description</label>
              <textarea
                rows={3}
                placeholder="Describe the volunteering role and responsibilities..."
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            {/* Grid fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Required Skills</label>
                <Input placeholder="e.g. Leadership, Python" className="bg-input border-border focus:border-primary/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Credit Points</label>
                <Input type="number" placeholder="e.g. 3" className="bg-input border-border focus:border-primary/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Duration</label>
                <Input placeholder="e.g. 4 weeks" className="bg-input border-border focus:border-primary/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Max Participants</label>
                <Input type="number" placeholder="e.g. 15" className="bg-input border-border focus:border-primary/50" />
              </div>
            </div>

            {/* Verification Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Verification Type</label>
              <div className="flex gap-3">
                {verificationTypes.map((type) => (
                  <button
                    key={type}
                    className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-secondary/50 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors focus:ring-2 focus:ring-primary/50"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Blockchain Certificate Toggle */}
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
              <Plus className="w-4 h-4" /> Publish Volunteering Request
            </Button>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default CreateVolunteering;
