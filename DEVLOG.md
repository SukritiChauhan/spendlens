## Day 1 — 2026-05-09

**Hours worked:** 4

**What I did:** Set up Next.js project with TypeScript and Tailwind. Created GitHub repo. Added all required placeholder markdown files. Built the landing page with hero section and how it works. Created type definitions, pricing data for all 8 required AI tools, and the core audit engine logic. Built the audit form page where users can add their AI tools, plans, seats and monthly spend.Built the results page showing per-tool breakdown, savings hero, email capture with honeypot abuse protection, and Credex CTA for high-savings audits.

**What I learned:** Learned how to structure a Next.js app router project properly. Understood the importance of separating types, data and logic into different files from the start.

**Blockers / what I'm stuck on:** The src/ folder structure conflict with the root app/ folder — Next.js was using the root app/ folder. Need to consolidate this tomorrow.

**Plan for tomorrow:** Build the results page that shows audit recommendations and savings. Add localStorage persistence so form state survives page reloads. Start on the Supabase backend setup for lead capture.

## Day 2 — 2026-05-10

**Hours worked:** 6

**What I did:** Set up Supabase database with leads and audits tables. Created API routes for saving audits, capturing leads, and sending transactional emails via Resend. Built the shareable public URL page at /share/[id] with Open Graph and Twitter Card meta tags. Integrated Anthropic API for AI-generated audit summaries with graceful fallback. Fixed pricing data for all 8 tools to exactly match PDF requirements. Added localStorage persistence for form state across page reloads.

**What I learned:** How to set up Supabase from scratch and create tables via SQL editor. How Next.js API routes work with environment variables. Learned that 401 errors mean invalid API key and 400 with credit balance error means billing issue — two different problems that look similar.

**Blockers / what I'm stuck on:** Anthropic API returning credit balance error — need to add billing credits tomorrow. The /api/audit route returning 404 — need to investigate folder structure issue.

**Plan for tomorrow:** Fix the /api/audit 404 issue. Add Anthropic credits and verify AI summary works. Set up CI/CD with GitHub Actions. Write 5 tests for audit engine. Deploy to Vercel. Start filling in all required markdown documents.

## Day 3 — 2026-05-11

**Hours worked:** 7

**What I did:** Fixed duplicate nested lib folder that was causing Vercel build to fail. Switched from Anthropic API to Groq (free tier, llama-3.1-8b-instant model) for AI summary generation — Anthropic required ₹560 in prepaid credits which was not practical. Fixed decommissioned Groq model error by updating to llama-3.1-8b-instant. Deployed SpendLens to Vercel at https://spendlens-lemon-delta.vercel.app. Filled all required markdown files — PRICING_DATA.md, PROMPTS.md, ARCHITECTURE.md, GTM.md, ECONOMICS.md, LANDING_COPY.md, METRICS.md, README.md, REFLECTION.md. Added screenshots to repo.

**What I learned:** Vercel builds are strict about TypeScript errors that Next.js dev mode ignores. Always run npm run build locally before pushing to catch type errors. Groq is a genuinely good free alternative to paid LLM APIs for simple summarisation tasks.

**Blockers / what I'm stuck on:** Still need to do user interviews — have not sent messages to potential users yet. Need to set up CI/CD and write 5 tests for audit engine. Need to fill USER_INTERVIEWS.md with real conversations.

**Plan for tomorrow:** Send user interview messages first thing. Set up GitHub Actions CI/CD. Write 5 tests for audit engine. Fill USER_INTERVIEWS.md. Final polish and Lighthouse check.