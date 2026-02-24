

# Add Registration Page for All User Types

## Overview
Create a single registration page where users can sign up by selecting their role (Student, Faculty, or Admin), entering their details, and creating an account. The page will match the existing login page design with the neon/glass theme.

## What Will Be Built

### New Registration Page
A new `Register.tsx` page with:
- **Role selector** (same 3-button grid as login: Student, Faculty, Admin)
- **Common fields**: Full Name, Email, Password, Confirm Password
- **Role-specific fields**:
  - Student: Student ID, Department, Year of Study
  - Faculty: Faculty ID, Department, Designation
  - Admin: Admin Code (an access code to prevent unauthorized admin signups)
- **Wallet connect option** (same as login page)
- **Link to login** ("Already have an account? Sign In")

### Updated Login Page
- Add a **"Don't have an account? Register"** link below the sign-in form

### Updated Routing
- Add `/register` route in `App.tsx`

## Technical Details

### File 1: `src/pages/Register.tsx` (NEW)
- Mirrors the Login page layout and styling (background effects, GlassCard, role selector)
- Uses `useState` to toggle between roles and show/hide role-specific fields
- Form validation for matching passwords, required fields
- On submit, navigates to the selected role's dashboard (same mock behavior as login)
- Includes password visibility toggle and wallet connect button

### File 2: `src/pages/Login.tsx` (EDIT)
- Add a "Don't have an account? Register" link at the bottom, linking to `/register`

### File 3: `src/App.tsx` (EDIT)
- Import `Register` component
- Add `<Route path="/register" element={<Register />} />`

## Visual Design
The registration page will look nearly identical to the login page, with the same:
- Centered card layout with glass effect
- UniTrack logo and branding at top
- Role selection buttons (Student / Faculty / Admin)
- Neon-styled submit button
- Blockchain footer text
