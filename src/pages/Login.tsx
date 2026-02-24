import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Wallet, GraduationCap, BookOpen, Settings, Eye, EyeOff, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";

type Role = "student" | "faculty" | "admin";

const roles: { value: Role; label: string; icon: React.ElementType; desc: string }[] = [
  { value: "student", label: "Student", icon: GraduationCap, desc: "Access activities, earn credits & certificates" },
  { value: "faculty", label: "Faculty", icon: BookOpen, desc: "Create activities & verify participation" },
  { value: "admin", label: "Admin", icon: Settings, desc: "Manage users, governance & blockchain logs" },
];

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-background bg-grid flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center neon-glow">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">UniTrack</h1>
          <p className="text-sm text-muted-foreground mt-1">Academic Activity & Credit Management</p>
        </div>

        <GlassCard glow className="animate-slide-up">
          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                  selectedRole === role.value
                    ? "border-primary bg-primary/10 neon-glow"
                    : "border-border bg-secondary/50 hover:border-muted-foreground/30"
                }`}
              >
                <role.icon className={`w-5 h-5 mx-auto mb-1 ${selectedRole === role.value ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs font-medium ${selectedRole === role.value ? "text-foreground" : "text-muted-foreground"}`}>
                  {role.label}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mb-6">
            {roles.find(r => r.value === selectedRole)?.desc}
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@university.edu"
                className="w-full mt-1.5 px-4 py-2.5 rounded-lg bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="neon" className="w-full">
              Sign In <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="px-3 text-xs text-muted-foreground bg-card">or</span></div>
          </div>

          {/* Wallet Connect */}
          <Button variant="glass" className="w-full">
            <Wallet className="w-4 h-4 text-neon-cyan" />
            Connect Wallet (MetaMask)
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-primary hover:underline">Register</a>
          </p>

          <p className="text-xs text-center text-muted-foreground mt-2">
            Secured by blockchain · Decentralized Identity
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;
