import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, BookOpen, Award, User, LogOut, Menu,
  Users, FileCheck, Settings, Activity, Shield, ChevronLeft,
  Wallet, Bell, Sprout, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileBottomNav from "@/components/MobileBottomNav";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const studentNav: NavItem[] = [
  { label: "Home", href: "/student", icon: LayoutDashboard },
  { label: "Activities", href: "/student/activities", icon: BookOpen },
  { label: "Volunteering", href: "/student/volunteering", icon: Sprout },
  { label: "My Volunteering", href: "/student/volunteering/accepted", icon: Award },
  { label: "Profile / Portfolio", href: "/student/profile", icon: User },
  { label: "Certificates", href: "/student/certificates", icon: Award },
  { label: "Settings", href: "/student/settings", icon: Settings },
];

const facultyNav: NavItem[] = [
  { label: "Dashboard", href: "/faculty", icon: LayoutDashboard },
  { label: "Create Activity", href: "/faculty/create", icon: BookOpen },
  { label: "Create Volunteering", href: "/faculty/volunteering/create", icon: Sprout },
  { label: "Verify", href: "/faculty/verify", icon: FileCheck },
  { label: "Analytics", href: "/faculty/analytics", icon: Activity },
  { label: "Profile", href: "/faculty/profile", icon: User },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Activities", href: "/admin/activities", icon: BookOpen },
  { label: "Blockchain", href: "/admin/blockchain", icon: Shield },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface DashboardLayoutProps {
  children: ReactNode;
  role: "student" | "faculty" | "admin";
  userName?: string;
}

const DashboardLayout = ({ children, role, userName = "User" }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = role === "student" ? studentNav : role === "faculty" ? facultyNav : adminNav;
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  const NavContent = () => (
    <>
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          {sidebarOpen && (
            <div className="animate-slide-up">
              <p className="text-sm font-semibold text-foreground">UniTrack</p>
              <p className="text-xs text-muted-foreground">{roleLabel} Portal</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/15 text-primary neon-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary")} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary w-full transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background bg-grid flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border bg-sidebar transition-all duration-300 shrink-0",
          sidebarOpen ? "w-60" : "w-16"
        )}
      >
        <NavContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-sidebar border-r border-border flex flex-col z-10">
            <NavContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card/40 backdrop-blur-lg flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <ChevronLeft className={cn("w-4 h-4 transition-transform", !sidebarOpen && "rotate-180")} />
            </Button>
            <h2 className="text-sm font-medium text-muted-foreground">{roleLabel} Dashboard</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neon-cyan rounded-full animate-pulse-glow" />
            </Button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
              <Wallet className="w-4 h-4 text-neon-cyan" />
              <span className="text-xs font-medium text-foreground">0x7f...3a2b</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-xs font-bold text-primary-foreground">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {role === "student" && <MobileBottomNav />}
    </div>
  );
};

export default DashboardLayout;
