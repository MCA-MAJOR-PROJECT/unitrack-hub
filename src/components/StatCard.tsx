import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

const StatCard = ({ label, value, icon: Icon, trend, trendUp, className }: StatCardProps) => {
  return (
    <div className={cn("glass p-5 flex items-start justify-between group hover:neon-glow transition-all duration-300", className)}>
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        {trend && (
          <p className={cn("text-xs mt-1 font-medium", trendUp ? "text-neon-cyan" : "text-destructive")}>
            {trendUp ? "↑" : "↓"} {trend}
          </p>
        )}
      </div>
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
    </div>
  );
};

export default StatCard;
