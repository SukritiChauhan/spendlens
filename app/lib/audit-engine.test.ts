import { describe, test, expect } from '@jest/globals'
import { runAudit } from './audit-engine'
import { AuditInput } from '../types'

describe('Audit Engine', () => {
  test('1. Returns zero savings for optimal single-seat Pro plan', () => {
    const input: AuditInput = {
      tools: [{ toolId: 'cursor', planId: 'cursor-pro', seats: 1, monthlySpend: 20 }],
      teamSize: 1,
      useCase: 'coding',
    }
    const result = runAudit(input)
    expect(result.recommendations[0].recommendedAction).toBe('No change needed')
    expect(result.totalMonthlySavings).toBe(0)
  })

  test('2. Recommends downgrade when Team plan used for 2 users', () => {
    const input: AuditInput = {
      tools: [{ toolId: 'claude', planId: 'claude-team', seats: 2, monthlySpend: 60 }],
      teamSize: 2,
      useCase: 'writing',
    }
    const result = runAudit(input)
    expect(result.recommendations[0].estimatedSavings).toBeGreaterThan(0)
    expect(result.totalMonthlySavings).toBeGreaterThan(0)
  })

  test('3. Flags high spend for Credex referral when over $500/mo', () => {
    const input: AuditInput = {
      tools: [{ toolId: 'claude', planId: 'claude-team', seats: 20, monthlySpend: 600 }],
      teamSize: 20,
      useCase: 'mixed',
    }
    const result = runAudit(input)
    expect(result.recommendations[0].recommendedAction).toContain('Credex')
    expect(result.totalMonthlySavings).toBeGreaterThan(0)
  })

  test('4. Calculates annual savings as 12x monthly savings', () => {
    const input: AuditInput = {
      tools: [{ toolId: 'claude', planId: 'claude-team', seats: 20, monthlySpend: 600 }],
      teamSize: 20,
      useCase: 'mixed',
    }
    const result = runAudit(input)
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12)
  })

  test('5. Handles multiple tools and sums savings correctly', () => {
    const input: AuditInput = {
      tools: [
        { toolId: 'claude', planId: 'claude-team', seats: 20, monthlySpend: 600 },
        { toolId: 'chatgpt', planId: 'chatgpt-team', seats: 2, monthlySpend: 60 },
      ],
      teamSize: 20,
      useCase: 'mixed',
    }
    const result = runAudit(input)
    expect(result.recommendations).toHaveLength(2)
    const totalSavings = result.recommendations.reduce((sum, r) => sum + r.estimatedSavings, 0)
    expect(result.totalMonthlySavings).toBe(totalSavings)
  })
})