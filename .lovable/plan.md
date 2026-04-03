

# Certificate Wallet Upgrade + Faculty Verify Panel Enhancement

Two tasks adapted to the existing React/Tailwind codebase (no Flutter, no Firestore — uses mock data matching the project pattern).

---

## Task 1: Upgrade Certificate Wallet (`src/pages/CertificateWallet.tsx`)

**Current state**: Static cards with category filters. No type distinction (activity vs volunteering), no credits field, no status indicator, no empty state.

**Changes**:
- Add `type` field (`"activity"` | `"volunteering"`) to each certificate in mock data
- Add `credits` and `status` (`"issued"` | `"verified"`) fields
- Show type icon: `BookOpen` for activity, `Leaf` for volunteering
- Display credits prominently on each card
- Show status badge (issued = amber, verified = green) alongside existing BlockchainBadge
- Add empty state: "No certificates yet" message with icon when filtered list is empty
- Add summary stats row at top: Total Certificates, Total Credits, Verified count

## Task 2: Upgrade Faculty Verify Panel (`src/pages/FacultyVerify.tsx`)

**Current state**: Two filter states (`pending` | `verified`). No "completed" status. Simple table layout.

**Changes**:
- Expand filter tabs from `["all", "pending", "verified"]` to `["all", "pending", "completed", "verified"]`
- Add mock data entries with `status: "completed"` (submitted but not yet blockchain-verified)
- Add `type` field to data (`"activity"` | `"volunteering"`) for each request
- Tab behavior:
  - **Pending**: Show Approve/Reject buttons (existing)
  - **Completed**: Show info only, no action buttons, subtle "Awaiting verification" label
  - **Verified**: Show info + verified badge, no action buttons
- Add count badges on each tab button
- Add `completedDate` field shown for completed/verified items

---

## Files Modified

| File | Change |
|------|--------|
| `src/pages/CertificateWallet.tsx` | Add type/credits/status fields, type icons, empty state, summary stats |
| `src/pages/FacultyVerify.tsx` | Add "completed" tab, type field, conditional action rendering, count badges |

No new files. No new routes. No removed components.

