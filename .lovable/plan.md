

## Issues Identified

### 1. Landing Page Before Login
The page at `/` (Index.tsx) is a public landing/marketing page that shows before login. Two options:
- **Option A**: Remove it and make `/login` the default route
- **Option B**: Keep it as a landing page (current behavior is intentional — most apps have a landing page before login)

I will redirect `/` to `/login` so users go straight to the login page, since this is a campus platform where all users need to authenticate first.

### 2. Student Dashboard Stats — List Instead of Grid on Mobile
The stats section on `/student` uses `grid-cols-1` on mobile, making it look like a vertical list. I will change it to a 2-column grid on mobile (`grid-cols-2`) to match the desired layout, with the 5th card (Rank) spanning full width at the bottom.

---

## Technical Changes

### File 1: `src/App.tsx`
- Change the `/` route to redirect to `/login` instead of showing the Index landing page
- Keep the Index page accessible at a route like `/welcome` if needed, or simply remove it from routing

### File 2: `src/pages/StudentDashboard.tsx` (line 47)
- Change `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5` to `grid grid-cols-2 lg:grid-cols-5`
- This makes stats display as a 2-column grid on all screen sizes, matching the reference screenshot

### File 3: `src/pages/Index.tsx` (Stats Grid section)
- Similarly update the home page stats grid from `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` — ensure it also uses a proper grid on mobile

