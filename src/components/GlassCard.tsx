import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

const GlassCard = ({ children, className, glow = false, gradient = false, onClick }: GlassCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass p-6 transition-all duration-300 hover:border-glass-border/80",
        glow && "neon-glow",
        gradient && "gradient-border",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
