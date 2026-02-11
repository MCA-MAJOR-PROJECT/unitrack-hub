import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import { Sprout, CheckCircle, Clock, Zap, Award, ArrowRight } from "lucide-react";

type StepStatus = "completed" | "active" | "upcoming";

interface VolunteeringItem {
  title: string;
  category: string;
  credits: number;
  steps: { label: string; status: StepStatus }[];
  txHash?: string;
}

const acceptedVolunteering: VolunteeringItem[] = [
  {
    title: "Campus Green Initiative Coordinator",
    category: "Sustainability & Environmental",
    credits: 4,
    steps: [
      { label: "Applied", status: "completed" },
      { label: "Active", status: "completed" },
      { label: "Completed", status: "active" },
      { label: "Verified", status: "upcoming" },
      { label: "Certified", status: "upcoming" },
    ],
  },
  {
    title: "Library Digitization Assistant",
    category: "Campus Life & Services",
    credits: 3,
    steps: [
      { label: "Applied", status: "completed" },
      { label: "Active", status: "active" },
      { label: "Completed", status: "upcoming" },
      { label: "Verified", status: "upcoming" },
      { label: "Certified", status: "upcoming" },
    ],
  },
  {
    title: "Open Day Event Volunteer",
    category: "Event Management & Outreach",
    credits: 2,
    steps: [
      { label: "Applied", status: "completed" },
      { label: "Active", status: "completed" },
      { label: "Completed", status: "completed" },
      { label: "Verified", status: "completed" },
      { label: "Certified", status: "completed" },
    ],
    txHash: "0x8b3f...a2c1",
  },
];

const stepIcon = (status: StepStatus) => {
  if (status === "completed") return <CheckCircle className="w-4 h-4 text-neon-cyan" />;
  if (status === "active") return <Zap className="w-4 h-4 text-primary animate-pulse" />;
  return <Clock className="w-4 h-4 text-muted-foreground/40" />;
};

const AcceptedVolunteering = () => {
  return (
    <DashboardLayout role="student" userName="Alex">
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sprout className="w-6 h-6 text-emerald-400" /> My Volunteering
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Track your volunteering progress and blockchain verification</p>
        </div>

        <div className="space-y-4">
          {acceptedVolunteering.map((vol, i) => {
            const allDone = vol.steps.every((s) => s.status === "completed");
            return (
              <GlassCard key={i} className={`!p-5 ${allDone ? "gradient-border" : ""}`}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sprout className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-sm font-semibold text-foreground">{vol.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{vol.category} · {vol.credits} credits</p>
                  </div>
                  {allDone ? (
                    <BlockchainBadge status="verified" />
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">In Progress</span>
                  )}
                </div>

                {/* Progress Stepper */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  {vol.steps.map((step, si) => (
                    <div key={si} className="flex items-center gap-1 shrink-0">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                          step.status === "completed"
                            ? "border-neon-cyan/40 bg-neon-cyan/10"
                            : step.status === "active"
                            ? "border-primary/50 bg-primary/10 neon-glow"
                            : "border-border bg-secondary/50"
                        }`}>
                          {stepIcon(step.status)}
                        </div>
                        <span className={`text-[10px] font-medium ${
                          step.status === "completed" ? "text-neon-cyan" : step.status === "active" ? "text-primary" : "text-muted-foreground/50"
                        }`}>{step.label}</span>
                      </div>
                      {si < vol.steps.length - 1 && (
                        <div className={`w-8 h-px mb-4 ${
                          step.status === "completed" ? "bg-neon-cyan/40" : "bg-border"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Blockchain Hash */}
                {vol.txHash && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                    <Award className="w-4 h-4 text-neon-cyan" />
                    <span className="text-xs font-mono text-neon-cyan/70">{vol.txHash}</span>
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-primary">
                      View Certificate <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AcceptedVolunteering;
