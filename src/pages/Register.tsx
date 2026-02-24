import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Wallet, GraduationCap, BookOpen, Settings, Eye, EyeOff, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { toast } from "@/hooks/use-toast";

type Role = "student" | "faculty" | "admin";

const roles: { value: Role; label: string; icon: React.ElementType; desc: string }[] = [
  { value: "student", label: "Student", icon: GraduationCap, desc: "Access activities, earn credits & certificates" },
  { value: "faculty", label: "Faculty", icon: BookOpen, desc: "Create activities & verify participation" },
  { value: "admin", label: "Admin", icon: Settings, desc: "Manage users, governance & blockchain logs" },
];

const Register = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Student fields
  const [studentId, setStudentId] = useState("");
  const [studentDepartment, setStudentDepartment] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");

  // Faculty fields
  const [facultyId, setFacultyId] = useState("");
  const [facultyDepartment, setFacultyDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  // Admin fields
  const [adminCode, setAdminCode] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Password mismatch", description: "Passwords do not match.", variant: "destructive" });
      return;
    }

    if (password.length < 6) {
      toast({ title: "Weak password", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }

    toast({ title: "Account created!", description: `Welcome, ${fullName}! Redirecting to your dashboard.` });
    navigate(`/${selectedRole}`);
  };

  const inputClass =
    "w-full mt-1.5 px-4 py-2.5 rounded-lg bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

  return (
    <div className="min-h-screen bg-background bg-grid flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center neon-glow">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">UniTrack</h1>
          <p className="text-sm text-muted-foreground mt-1">Create your account</p>
        </div>

        <GlassCard glow className="animate-slide-up">
          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
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
            {roles.find((r) => r.value === selectedRole)?.desc}
          </p>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Common fields */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@university.edu" className={inputClass} />
            </div>

            {/* Role-specific fields */}
            {selectedRole === "student" && (
              <>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Student ID</label>
                  <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="e.g. STU-2024-001" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Department</label>
                    <input type="text" value={studentDepartment} onChange={(e) => setStudentDepartment(e.target.value)} placeholder="e.g. CS" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Year of Study</label>
                    <input type="text" value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} placeholder="e.g. 3rd" className={inputClass} />
                  </div>
                </div>
              </>
            )}

            {selectedRole === "faculty" && (
              <>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Faculty ID</label>
                  <input type="text" value={facultyId} onChange={(e) => setFacultyId(e.target.value)} placeholder="e.g. FAC-2024-001" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Department</label>
                    <input type="text" value={facultyDepartment} onChange={(e) => setFacultyDepartment(e.target.value)} placeholder="e.g. CS" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Designation</label>
                    <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="e.g. Professor" className={inputClass} />
                  </div>
                </div>
              </>
            )}

            {selectedRole === "admin" && (
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Admin Access Code</label>
                <input type="text" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} placeholder="Enter admin access code" className={inputClass} />
              </div>
            )}

            {/* Password fields */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputClass} mt-0 pr-10`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
            </div>

            <Button type="submit" variant="neon" className="w-full">
              Create Account <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="px-3 text-xs text-muted-foreground bg-card">or</span></div>
          </div>

          <Button variant="glass" className="w-full">
            <Wallet className="w-4 h-4 text-neon-cyan" />
            Connect Wallet (MetaMask)
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign In</Link>
          </p>

          <p className="text-xs text-center text-muted-foreground mt-2">
            Secured by blockchain · Decentralized Identity
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Register;
