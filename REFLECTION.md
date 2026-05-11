# Reflection

## 1. The hardest bug I hit this week

The hardest bug was the duplicate lib folder structure. When I set up the project, Next.js created an app/ folder at the root level but I also created a src/ folder with lib/ and types/ inside it. This meant the code worked locally because the imports resolved correctly on my machine, but when Vercel tried to build the project it failed with "Cannot find module '../types'" because the folder structure was different from what it expected.

My hypotheses were: (1) the import paths were wrong, (2) the TypeScript config was misconfigured, (3) there was a duplicate folder causing confusion. I tried fixing import paths first which did not work. Then I looked at the tsconfig.json which seemed fine. Finally I ran ls app/lib and discovered there was a lib folder inside lib — app/lib/lib/ — with duplicate files. This happened because I had copied files from src/lib into app/lib but the cp command created a nested structure. The fix was rm -rf app/lib/lib which immediately resolved the Vercel build error.

The lesson: always verify your folder structure with ls before assuming imports are the problem.

## 2. A decision I reversed mid-week

I initially planned to use the Anthropic API for the AI summary because the PDF said it was preferred. I set up the account, got an API key, and integrated the SDK. But when I tested it I got a 401 error — the key was invalid. After fixing the key I got a new error: credit balance too low. Adding credits would cost ₹560 which felt excessive for a project that uses maybe 100 API calls total.

I reversed this decision and switched to Groq, which offers free access to Llama 3.1 models. The output quality for a 100-word summary is identical to what Claude would produce. The PDF says "Anthropic API preferred or any LLM" — the or any LLM clause gave me the flexibility to make this pragmatic decision. I documented the reasoning in PROMPTS.md and DEVLOG.md so the reviewer understands it was a deliberate choice not an oversight.

## 3. What I would build in week 2

In week 2 I would build three things. First, a benchmark mode that shows "your AI spend per developer is $X — companies your size average $Y." This requires collecting anonymised aggregate data from audits and surfacing it as context. It makes the tool stickier and gives users a reason to come back as their team grows.

Second, I would build a proper email sequence. Right now we send one confirmation email. A week 2 version would send a follow-up 7 days later: "Has your team implemented the savings? Here is what other teams did." This keeps Credex top of mind without being pushy.

Third, I would fix the audit engine to handle API-based pricing properly. Right now Anthropic API and OpenAI API show as $0/seat because they are usage-based. I would add a monthly spend input specifically for API users and build logic that compares their per-token cost against switching to a flat-rate plan.

## 4. How I used AI tools

I used Claude (this conversation) as my primary AI tool throughout the week. I used it for: generating boilerplate code for API routes and page components, debugging error messages by pasting terminal output, writing the content for markdown files like GTM.md and ECONOMICS.md, and thinking through architecture decisions.

I did not trust Claude with: the audit engine logic (I reviewed every rule manually to make sure the reasoning was defensible), the pricing data (I verified each number against official vendor pages), and the user interview questions (those needed to feel natural, not AI-generated).

One specific time Claude was wrong: it suggested using the model string claude-sonnet-4-20250514 for the Anthropic API integration. When I used it, the terminal showed a deprecation warning saying the model would reach end-of-life on June 15th 2026. Claude did not know its own latest model strings. I caught this because I read the terminal logs carefully and switched to the correct model.

## 5. Self-ratings

**Discipline: 6/10**
I started on Day 1 which was good, but I did not send user interview messages until Day 3 despite being reminded multiple times. I lost time debugging issues that could have been avoided with better upfront planning.

**Code quality: 7/10**
The code is readable and typed correctly. Abstractions are sensible — audit engine, pricing data, and types are all separated. The main weakness is the duplicate folder structure bug that made it to production before I caught it.

**Design sense: 7/10**
The UI is clean and professional. Emerald green branding is consistent. The results page is screenshot-worthy. I could have done more on mobile responsiveness and accessibility.

**Problem solving: 8/10**
I debugged effectively when I read error messages carefully. The Groq switch when Anthropic billing was too expensive was a good pragmatic decision made quickly.

**Entrepreneurial thinking: 6/10**
I understand the product and the user. The GTM and economics documents show real thinking. The weakness is I have not done user interviews yet which is the most important signal of entrepreneurial thinking in this assignment.