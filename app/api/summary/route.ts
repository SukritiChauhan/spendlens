import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { recommendations, totalMonthlySavings, totalAnnualSavings, useCase, teamSize } = body

    console.log('API key exists:', !!process.env.ANTHROPIC_API_KEY)
    console.log('API key prefix:', process.env.ANTHROPIC_API_KEY?.substring(0, 15))

    const toolSummary = recommendations.length > 0
      ? recommendations.map((r: any) => `${r.toolName}: $${r.currentSpend}/mo`).join(', ')
      : 'various AI tools'

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `Write a 100-word audit summary for a ${teamSize}-person team using AI tools for ${useCase}. They could save $${totalMonthlySavings}/mo. Tools: ${toolSummary}. Be specific and actionable. Second person. No bullets.`
      }],
    })

    const summary = message.content[0].type === 'text' ? message.content[0].text : null
    return NextResponse.json({ summary })
  } catch (error: any) {
    console.error('Anthropic error:', error?.message)
    return NextResponse.json({
      summary: 'Based on your audit, we have identified potential optimisations for your AI tool stack. Review the recommendations above to reduce costs without compromising capability.',
    })
  }
}