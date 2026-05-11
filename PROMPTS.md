# Prompts

## AI Summary Prompt

### Prompt used in production

Write a concise 100-word audit summary for a [teamSize]-person team using AI tools for [useCase]. They could save $[totalMonthlySavings]/mo ($[totalAnnualSavings]/yr). Tools: [toolSummary]. Be specific and actionable. Write in second person. No bullet points.

### Why I wrote it this way

The prompt is intentionally short and constrained. Longer prompts with more instructions caused the model to write generic summaries. By giving it specific numbers and constraints (100 words, second person, no bullets), the output is consistently specific and actionable. The toolSummary variable injects actual tool names, plans and spend so the model has concrete data to reference.

### What I tried that didn't work

Attempt 1 - Too long and generic: "You are an AI spend analyst for startups. Your job is to write a friendly, helpful summary of a startup's AI tool audit. Be encouraging but honest. Mention specific tools. Give actionable advice..." This produced verbose, generic output that did not reference the actual numbers.

Attempt 2 - Role-playing prompt: "You are a CFO reviewing AI tool expenses. Write a memo summarizing the findings..." This produced overly formal language that felt wrong for the product tone.

What worked: Minimal prompt with specific data injected directly. Less instruction, more data.

### Fallback behavior

If the Groq API fails for any reason, the system returns a templated summary: "Based on your audit, we have identified potential optimisations for your AI tool stack. Review the recommendations above to reduce costs without compromising capability."

### Model used

Primary: llama-3.1-8b-instant via Groq API
Fallback: Templated string with no API call