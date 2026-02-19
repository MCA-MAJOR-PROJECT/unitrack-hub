import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";
import { BarChart3, BookOpen, Users, Award, TrendingUp, CheckCircle, Sprout } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

const monthlyData = [
  { month: "Sep", activities: 4, participants: 85 },
  { month: "Oct", activities: 6, participants: 120 },
  { month: "Nov", activities: 5, participants: 95 },
  { month: "Dec", activities: 3, participants: 70 },
  { month: "Jan", activities: 7, participants: 150 },
  { month: "Feb", activities: 4, participants: 110 },
];

const categoryData = [
  { name: "Workshop", value: 35, color: "hsl(263, 70%, 58%)" },
  { name: "Research", value: 20, color: "hsl(217, 91%, 60%)" },
  { name: "Service", value: 25, color: "hsl(192, 85%, 48%)" },
  { name: "Competition", value: 15, color: "hsl(160, 60%, 45%)" },
  { name: "Seminar", value: 5, color: "hsl(45, 80%, 55%)" },
];

const creditTrend = [
  { week: "W1", credits: 12 },
  { week: "W2", credits: 18 },
  { week: "W3", credits: 15 },
  { week: "W4", credits: 28 },
  { week: "W5", credits: 22 },
  { week: "W6", credits: 35 },
];

const topStudents = [
  { name: "Priya Sharma", credits: 38, activities: 8 },
  { name: "Rahul Verma", credits: 32, activities: 7 },
  { name: "Anita Das", credits: 29, activities: 6 },
  { name: "Vikram Singh", credits: 25, activities: 5 },
  { name: "Meera Patel", credits: 22, activities: 5 },
];

const FacultyAnalytics = () => {
  return (
    <DashboardLayout role="faculty" userName="Dr. Kumar">
      <div className="space-y-6 max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" /> Analytics & Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Track activity performance, participation, and credit distribution</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Activities" value={29} icon={BookOpen} trend="7 this month" trendUp />
          <StatCard label="Total Participants" value={630} icon={Users} trend="18% increase" trendUp />
          <StatCard label="Credits Issued" value={256} icon={Award} trend="35 this week" trendUp />
          <StatCard label="Verification Rate" value="94%" icon={CheckCircle} trend="2% up" trendUp />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Activity Chart */}
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Activities & Participation</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} />
                <Tooltip
                  contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 22%)", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "hsl(210, 40%, 95%)" }}
                />
                <Bar dataKey="activities" fill="hsl(263, 70%, 58%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="participants" fill="hsl(192, 85%, 48%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Category Distribution */}
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Activity Category Distribution</h3>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                    {categoryData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 22%)", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {categoryData.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                    <span className="text-muted-foreground">{c.name}</span>
                    <span className="text-foreground font-medium ml-auto">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Credit Trend */}
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Credit Issuance Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={creditTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} />
                <Tooltip contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 22%)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="credits" stroke="hsl(263, 70%, 58%)" strokeWidth={2} dot={{ fill: "hsl(263, 70%, 58%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Top Students */}
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Top Performing Students</h3>
            <div className="space-y-3">
              {topStudents.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.activities} activities</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{s.credits} cr</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyAnalytics;
