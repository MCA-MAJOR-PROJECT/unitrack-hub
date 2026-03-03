

# UniTrack Hierarchy & Polish Update

## 1. Navigation Reorder

**`src/components/DashboardLayout.tsx`** — Reorder `studentNav` array to: Home → Volunteering → My Volunteering → Activities → Profile/Portfolio → Certificates → Settings.

**`src/components/MobileBottomNav.tsx`** — Reorder `items` array to: Home → Volunteer → Activities → Portfolio → Wallet.

## 2. Index.tsx — Volunteering First Layout

Reorder the sections inside `<main>`:
1. Hero (unchanged)
2. Volunteering Opportunities section (move up from position 3)
3. Credit Progress + Recent Achievements grid (move up)
4. Academic Activities section (move down)

Remove the Stats Grid section (lines 86-101) — it duplicates dashboard data and clutters the landing page.

## 3. Reduce Glow Intensity (index.css)

- `.neon-glow` box-shadow: reduce opacity values from `0.15`/`0.05` to `0.06`/`0.02`
- `.neon-glow-blue`: same reduction
- Across pages: change `hover:neon-glow` on non-interactive decorative cards — no change needed in CSS, the class itself gets toned down globally

## 4. Typography & Spacing

**`src/pages/StudentDashboard.tsx`**: Change top-level `space-y-6` to `space-y-8`. Change section headers `text-sm font-semibold` to `text-base font-semibold` with `mb-2` after headings.

**`src/pages/Index.tsx`**: Section headers already `text-lg font-bold` — upgrade to `text-xl font-bold`.

**`src/pages/ActivitiesFeed.tsx`**: `space-y-6` → `space-y-8`.

## 5. ActivitiesFeed — Volunteering Priority CTA

Insert a subtle glass banner below the header section (after line 149):

```
<GlassCard className="!p-3 flex items-center justify-between border-emerald-500/20">
  <div className="flex items-center gap-2">
    <Sprout className="w-4 h-4 text-emerald-400" />
    <span className="text-xs text-muted-foreground">🌱 Volunteering opportunities are prioritized for community engagement.</span>
  </div>
  <Button variant="neon-outline" size="sm" className="h-7 text-xs" onClick={() => navigate("/student/volunteering")}>
    Browse Volunteering
  </Button>
</GlassCard>
```

Import `Sprout` from lucide-react in ActivitiesFeed.

## Files Modified

| File | Change |
|------|--------|
| `src/components/DashboardLayout.tsx` | Reorder `studentNav` array |
| `src/components/MobileBottomNav.tsx` | Reorder `items` array |
| `src/pages/Index.tsx` | Remove stats grid, reorder sections, upgrade heading sizes |
| `src/index.css` | Reduce glow opacity values |
| `src/pages/StudentDashboard.tsx` | Spacing and typography tweaks |
| `src/pages/ActivitiesFeed.tsx` | Add volunteering CTA banner, spacing update |

No new files. No components removed. No new routes.

