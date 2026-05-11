# Metrics

## North Star Metric

**Audits completed per week**

Why: An audit completed means a user got real value from SpendLens. It is the moment the product fulfils its promise. Everything else — leads, consultations, revenue — flows from this. DAU is wrong for a tool people use once a quarter. Email signups are a vanity metric if the audit was not completed. Audits completed is the one number that captures both acquisition and activation in a single event.

## 3 Input Metrics that drive the North Star

**1. Landing page to audit start rate**
If people land but do not click "Audit My AI Spend", the headline or value proposition is failing. Target: 40% of visitors start an audit. Below 25% = fix the landing page copy immediately.

**2. Audit start to audit completion rate**
If people start the form but do not submit, the form is too long or confusing. Target: 70% of starters complete. Below 50% = simplify the form, reduce friction.

**3. Shareable URL click rate**
Each audit generates a unique shareable URL. If users share it and others click it, the viral loop is working. Target: 15% of audits result in a shared link being clicked at least once. Below 5% = the results page is not compelling enough to share.

## What I would instrument first

1. **Posthog or Mixpanel** — track these events in order:
   - page_viewed (landing)
   - audit_started (clicked Add AI Tool)
   - audit_submitted (clicked Run My Audit)
   - results_viewed
   - email_captured
   - share_link_copied
   - share_link_visited

2. **Funnel analysis** — where do users drop off between audit_started and audit_submitted?

3. **Supabase dashboard** — monitor leads and audits tables for daily volume

4. **Resend dashboard** — email open rate and click rate on confirmation emails

## What number triggers a pivot decision

If after 4 weeks of distribution:
- Fewer than 50 audits completed total → the product is not finding its audience. Pivot distribution strategy entirely.
- Audit completion rate below 40% → the form is too complex. Simplify to 3 fields maximum.
- Zero Credex consultation requests despite audits showing savings → the Credex CTA is not compelling. Redesign the high-savings results page.
- Email capture rate below 10% → users do not trust the product enough. Add social proof and testimonials above the email form.

The single number that would make me shut down and rethink: **zero shares of audit URLs after 100 audits completed.** If nobody shares, the viral loop is dead and paid acquisition becomes the only growth path — which changes the unit economics entirely.