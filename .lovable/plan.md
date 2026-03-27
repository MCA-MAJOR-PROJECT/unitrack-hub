

# AI Recommendations Page for UniTrack

**Note**: Your prompt references Flutter/Firebase, but UniTrack is a **React + Vite + Tailwind** project. This plan adapts the feature to the existing tech stack using the same design system.

## What Will Be Built

A new **Student Recommendations** page at `/student/recommendations` that uses a scoring algorithm to surface the best-matching volunteering opportunities and activities based on the student's profile (department, interests, skills).

## New Files

### 1. `src/lib/recommendationService.ts`
- Recommendation scoring logic (pure TypeScript, no backend needed with current mock data)
- Score calculation: +5 department match, +3 interest match, +2 skill match, +1 popularity
- Exports `getRecommendedVolunteering()` and `getRecommendedActivities()` functions
- Uses the same mock data arrays from VolunteeringFeed and ActivitiesFeed
- Mock student profile: `{ department: "Computer Science", interests: ["AI", "Blockchain", "Sustainability"], skills: ["Leadership", "DSA", "Communication"] }`

### 2. `src/pages/StudentRecommendations.tsx`
- Wrapped in `DashboardLayout` with `role="student"`
- Header: "AI Recommendations" with sparkle/brain icon and subtitle
- Two sections: **Recommended Volunteering** (top 5) and **Recommended Activities** (top 5)
- Each card (GlassCard) shows: title, credits, department/category, match score badge ("⭐ Recommended"), and Apply/Enroll button
- Match percentage indicator on each card
- Empty state handling
- Same dark neon glass styling as existing pages

## Modified Files

### 3. `src/pages/StudentDashboard.tsx`
- Add "AI Recommendations" button in the header action buttons area (alongside existing "Apply Volunteering" and "Enroll Activity")
- Uses a brain/sparkles icon, navigates to `/student/recommendations`

### 4. `src/components/DashboardLayout.tsx`
- Add nav item to `studentNav` array: `{ label: "AI Picks", href: "/student/recommendations", icon: Sparkles }` — placed after Activities

### 5. `src/App.tsx`
- Add route: `<Route path="/student/recommendations" element={<StudentRecommendations />} />`

## Scoring Logic Detail

```text
For each volunteering/activity item:
  score = 0
  if item.department matches student.department → +5
  for each student.interest that appears in item title/category/description → +3
  for each student.skill in item.skills array → +2
  if item.currentParticipants/maxParticipants > 0.5 → +1 (popularity)
  
Sort DESC by score, return top 5
```

## UI Card Layout

```text
┌─────────────────────────────────┐
│ ⭐ 92% Match                    │
│ AI & Machine Learning Workshop  │
│ AI & ML Dept. · 5 Credits       │
│ "Intensive hands-on workshop…"  │
│ Skills: Leadership, DSA         │
│          [Enroll →]             │
└─────────────────────────────────┘
```

## Files Summary

| File | Action |
|------|--------|
| `src/lib/recommendationService.ts` | CREATE |
| `src/pages/StudentRecommendations.tsx` | CREATE |
| `src/pages/StudentDashboard.tsx` | EDIT — add AI button |
| `src/components/DashboardLayout.tsx` | EDIT — add nav item |
| `src/App.tsx` | EDIT — add route |

