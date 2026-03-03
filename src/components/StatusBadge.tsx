import { cn } from "@/lib/utils";

type Status = "applied" | "active" | "completed" | "verified" | "certified" | "open" | "full" | "pending";

const statusConfig: Record<Status, { label: string; className: string }> = {
  applied: { label: "Applied", className: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  active: { label: "Active", className: "bg-primary/10 text-primary border-primary/30" },
  completed: { label: "Completed", className: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
  verified: { label: "Verified", className: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30" },
  certified: { label: "Certified", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  open: { label: "Open", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  full: { label: "Full", className: "bg-muted text-muted-foreground border-border" },
  pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  return (
    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium border inline-flex items-center", config.className, className)}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
