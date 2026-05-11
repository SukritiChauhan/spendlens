import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { recommendations, totalMonthlySavings, totalAnnualSavings, useCase, teamSize } = body

    const toolSummary = recommendations.length > 0
      ? recommendations.map((r: any) => `${r.toolName} (${r.currentPlan}): $${r.currentSpend}/mo — ${r.recommendedAction}`).join(', ')
      : 'various AI tools'

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `Write a concise 100-word audit summary for a ${teamSize}-person team using AI tools for ${useCase}. They could save $${totalMonthlySavings}/mo ($${totalAnnualSavings}/yr). Tools: ${toolSummary}. Be specific and actionable. Write in second person. No bullet points.`
      }],
    })

    const summary = completion.choices[0]?.message?.content || null
    return NextResponse.json({ summary })
  } catch (error: any) {
    console.error('Groq API error:', error?.message)
    return NextResponse.json({
      summary: 'Based on your audit, we have identified potential optimisations for your AI tool stack. Review the recommendations above to reduce costs without compromising capability. Each suggestion is based on current vendor pricing and your specific use case.',
    })
  }
}