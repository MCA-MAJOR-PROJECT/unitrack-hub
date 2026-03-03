import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, BookOpen, Sprout, User, Award } from "lucide-react";

const items = [
  { label: "Home", href: "/student", icon: Home },
  { label: "Volunteer", href: "/student/volunteering", icon: Sprout, highlight: true },
  { label: "Activities", href: "/student/activities", icon: BookOpen },
  { label: "Portfolio", href: "/student/profile", icon: User },
  { label: "Wallet", href: "/student/certificates", icon: Award },
];

const MobileBottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border bg-card/80 backdrop-blur-xl">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 transition-colors relative",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.highlight && (
                <span className="absolute -top-1.5 w-10 h-10 rounded-full bg-primary/10 animate-pulse-glow pointer-events-none" />
              )}
              <item.icon className={cn(
                "w-5 h-5 relative z-10",
                item.highlight && active && "text-emerald-400",
                item.highlight && !active && "text-emerald-400/60"
              )} />
              <span className="text-[10px] font-medium relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
