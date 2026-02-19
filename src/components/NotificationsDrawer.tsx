import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bell, Award, Star, Sprout, Shield, CheckCircle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "blockchain" | "credit" | "certificate" | "activity";
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, title: "🔗 Certificate Minted", description: "Blockchain Fundamentals NFT credential issued — Tx: 0x7a2...f3b", time: "2m ago", type: "certificate", read: false },
  { id: 2, title: "⭐ Credits Awarded", description: "+3 credits for AI Workshop 2025 participation", time: "1h ago", type: "credit", read: false },
  { id: 3, title: "🌱 Volunteering Approved", description: "You've been accepted for Campus Green Initiative", time: "3h ago", type: "activity", read: false },
  { id: 4, title: "🔗 Smart Contract Executed", description: "Credit distribution verified on-chain — Block #18,294", time: "5h ago", type: "blockchain", read: true },
  { id: 5, title: "📜 Certificate Ready", description: "AI & Machine Learning certificate ready to claim", time: "1d ago", type: "certificate", read: true },
  { id: 6, title: "⭐ Credits Awarded", description: "+5 credits for Blockchain Dev Bootcamp", time: "2d ago", type: "credit", read: true },
  { id: 7, title: "📋 New Activity Posted", description: "Research Paper Workshop — 4 credits available", time: "3d ago", type: "activity", read: true },
];

const typeIcons: Record<string, React.ElementType> = {
  blockchain: Shield,
  credit: Star,
  certificate: Award,
  activity: BookOpen,
};

const typeColors: Record<string, string> = {
  blockchain: "bg-neon-cyan/10 text-neon-cyan",
  credit: "bg-primary/10 text-primary",
  certificate: "bg-amber-500/10 text-amber-400",
  activity: "bg-emerald-500/10 text-emerald-400",
};

const NotificationsDrawer = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[9px] font-bold text-primary-foreground animate-pulse">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-card border-border w-full sm:w-96 p-0">
        <SheetHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-foreground text-base">Notifications</SheetTitle>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                Mark all read
              </button>
            )}
          </div>
        </SheetHeader>
        <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
          {notifications.map((n) => {
            const Icon = typeIcons[n.type];
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn(
                  "w-full text-left px-4 py-3 border-b border-border/50 hover:bg-secondary/40 transition-colors flex gap-3",
                  !n.read && "bg-secondary/20"
                )}
              >
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5", typeColors[n.type])}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm font-medium", n.read ? "text-muted-foreground" : "text-foreground")}>{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.description}</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">{n.time}</p>
                </div>
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsDrawer;
