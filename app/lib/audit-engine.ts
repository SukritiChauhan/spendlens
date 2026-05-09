import { AuditInput, AuditRecommendation, AuditResult } from '../types'
import { AI_TOOLS } from './pricing'

export function runAudit(input: AuditInput): AuditResult {
  const recommendations: AuditRecommendation[] = []

  for (const userTool of input.tools) {
    const tool = AI_TOOLS.find(t => t.id === userTool.toolId)
    if (!tool) continue

    const currentPlan = tool.plans.find(p => p.id === userTool.planId)
    if (!currentPlan) continue

    const currentSpend = userTool.monthlySpend
    let estimatedSavings = 0
    let recommendedAction = 'No change needed'
    let recommendedPlan = currentPlan.name
    let reason = 'You are on the optimal plan for your usage.'

    // Check if team plan makes sense for seat count
    if (userTool.seats <= 2 && currentPlan.name === 'Team') {
      const proPlan = tool.plans.find(p => p.name === 'Pro')
      if (proPlan) {
        const proSpend = proPlan.pricePerSeat * userTool.seats
        estimatedSavings = currentSpend - proSpend
        recommendedAction = 'Downgrade to Pro'
        recommendedPlan = 'Pro'
        reason = `Team plan requires minimum 5 seats but you only have ${userTool.seats}. Pro plan saves you $${estimatedSavings}/mo.`
      }
    }

    // Check if enterprise is overkill for small teams
    if (userTool.seats < 10 && currentPlan.name === 'Enterprise') {
      recommendedAction = 'Consider Team plan'
      recommendedPlan = 'Team'
      reason = `Enterprise is designed for 10+ seats. With ${userTool.seats} seats, Team plan likely covers your needs at lower cost.`
      estimatedSavings = currentSpend * 0.3
    }

    // Check coding use case — suggest Cursor over ChatGPT
    if (
      input.useCase === 'coding' &&
      userTool.toolId === 'chatgpt' &&
      currentSpend > 20
    ) {
      recommendedAction = 'Switch to Cursor for coding tasks'
      reason = `For coding, Cursor Pro ($20/seat) provides deeper IDE integration than ChatGPT at the same price point.`
      estimatedSavings = 0
    }

    // Check if paying retail for Claude when Credex can help
    if (
      currentSpend > 500 &&
      (userTool.toolId === 'claude' || userTool.toolId === 'chatgpt')
    ) {
      recommendedAction = 'Contact Credex for discounted credits'
      reason = `At $${currentSpend}/mo you qualify for discounted AI credits through Credex, potentially saving 20-40%.`
      estimatedSavings = currentSpend * 0.3
    }

    recommendations.push({
      toolId: userTool.toolId,
      toolName: tool.name,
      currentPlan: currentPlan.name,
      currentSpend,
      recommendedAction,
      recommendedPlan,
      estimatedSavings: Math.max(0, estimatedSavings),
      reason,
    })
  }

  const totalMonthlySavings = recommendations.reduce(
    (sum, r) => sum + r.estimatedSavings,
    0
  )

  return {
    id: crypto.randomUUID(),
    input,
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    createdAt: new Date().toISOString(),
  }
}