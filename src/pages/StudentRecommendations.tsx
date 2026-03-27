import { useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { getRecommendedVolunteering, getRecommendedActivities, ScoredItem } from "@/lib/recommendationService";
import { Sparkles, Sprout, BookOpen, Star, Clock, Users, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecommendationCard = ({ item, navigate }: { item: ScoredItem; navigate: (path: string) => void }) => {
  const isVolunteering = item.type === "volunteering";
  const current = item.currentParticipants || item.enrolled || 0;
  const max = item.maxParticipants || item.capacity || 1;

  return (
    <GlassCard className="!p-5 flex flex-col justify-between hover:neon-glow cursor-pointer group relative overflow-hidden">
      {/* Match Badge */}
      <div className="absolute top-3 right-3">
        <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
          <Sparkles className="w-3 h-3" /> {item.matchPercent}% Match
        </span>
      </div>

      <div>
        {/* Type indicator */}
        <div className="flex items-center gap-2 mb-3">
          {isVolunteering ? (
            <Sprout className="w-4 h-4 text-emerald-400" />
          ) : (
            <BookOpen className="w-4 h-4 text-primary" />
          )}
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
            isVolunteering
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-primary/10 text-primary"
          }`}>
            {isVolunteering ? (item.category || "Volunteering") : (item.activityType || "Activity")}
          </span>
          {item.blockchainVerified && (
            <div className="flex items-center gap-1 text-[10px] text-neon-cyan font-medium">
              <Shield className="w-3 h-3" /> Verified
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors pr-20">
          {item.title}
        </h3>
        {item.department && (
          <p className="text-xs text-muted-foreground mb-1">{item.department} {item.faculty ? `· ${item.faculty}` : ""}</p>
        )}
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Skills */}
        {item.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.skills.map((skill) => (
              <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-primary" /> {item.credits} credits</span>
          {item.duration && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.duration}</span>}
          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {current}/{max}</span>
        </div>

        {/* Match Score Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>Match Score</span>
            <span className="text-primary font-medium">{item.matchPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan transition-all duration-700"
              style={{ width: `${item.matchPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action */}
      <Button
        variant={item.status === "full" ? "neon-outline" : "neon"}
        size="sm"
        className="w-full"
        disabled={item.status === "full"}
        onClick={(e) => {
          e.stopPropagation();
          navigate(isVolunteering ? "/student/volunteering" : `/student/activity/1`);
        }}
      >
        {item.status === "full" ? "Fully Booked" : isVolunteering ? "Apply Now" : "Enroll Now"}
        {item.status !== "full" && <ArrowRight className="w-3 h-3" />}
      </Button>
    </GlassCard>
  );
};

const StudentRecommendations = () => {
  const navigate = useNavigate();
  const recommendedVolunteering = useMemo(() => getRecommendedVolunteering(), []);
  const recommendedActivities = useMemo(() => getRecommendedActivities(), []);

  return (
    <DashboardLayout role="student" userName="Alex">
      <div className="space-y-8 max-w-7xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" /> AI Recommendations
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Personalized picks based on your department, interests & skills
          </p>
        </div>

        {/* Profile Summary */}
        <GlassCard className="!p-4 flex flex-wrap items-center gap-3 border-primary/20">
          <span className="text-xs font-medium text-foreground">Your Profile:</span>
          {["Computer Science", "AI", "Blockchain", "Sustainability", "Leadership", "DSA", "Python"].map((tag) => (
            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
              {tag}
            </span>
          ))}
        </GlassCard>

        {/* Recommended Volunteering */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-foreground">Recommended Volunteering</h2>
            <span className="text-xs text-muted-foreground ml-2">Top {recommendedVolunteering.length} matches</span>
          </div>
          {recommendedVolunteering.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {recommendedVolunteering.map((item, i) => (
                <RecommendationCard key={i} item={item} navigate={navigate} />
              ))}
            </div>
          ) : (
            <GlassCard className="text-center py-8">
              <Sprout className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No volunteering matches found</p>
            </GlassCard>
          )}
        </section>

        {/* Recommended Activities */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Recommended Activities</h2>
            <span className="text-xs text-muted-foreground ml-2">Top {recommendedActivities.length} matches</span>
          </div>
          {recommendedActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {recommendedActivities.map((item, i) => (
                <RecommendationCard key={i} item={item} navigate={navigate} />
              ))}
            </div>
          ) : (
            <GlassCard className="text-center py-8">
              <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No activity matches found</p>
            </GlassCard>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default StudentRecommendations;
