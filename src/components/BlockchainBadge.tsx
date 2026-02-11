import { cn } from "@/lib/utils";
import { Shield, CheckCircle, Clock } from "lucide-react";

interface BlockchainBadgeProps {
  status: "verified" | "pending" | "unverified";
  txHash?: string;
  className?: string;
}

const BlockchainBadge = ({ status, txHash, className }: BlockchainBadgeProps) => {
  const config = {
    verified: { icon: CheckCircle, label: "Verified on Chain", color: "text-neon-cyan bg-neon-cyan/10 border-neon-cyan/30" },
    pending: { icon: Clock, label: "Pending", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" },
    unverified: { icon: Shield, label: "Not Verified", color: "text-muted-foreground bg-muted border-border" },
  };

  const { icon: Icon, label, color } = config[status];

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", color, className)}>
      <Icon className="w-3 h-3" />
      <span>{label}</span>
      {txHash && <span className="text-muted-foreground ml-1 font-mono">{txHash}</span>}
    </div>
  );
};

export default BlockchainBadge;
