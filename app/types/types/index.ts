export type AITool = {
  id: string
  name: string
  vendor: string
  plans: Plan[]
}

export type Plan = {
  id: string
  name: string
  pricePerSeat: number
  minSeats?: number
  maxSeats?: number
  bestFor: string
}

export type UserToolInput = {
  toolId: string
  planId: string
  seats: number
  monthlySpend: number
}

export type AuditInput = {
  tools: UserToolInput[]
  teamSize: number
  useCase: 'coding' | 'writing' | 'data' | 'research' | 'mixed'
}

export type AuditRecommendation = {
  toolId: string
  toolName: string
  currentPlan: string
  currentSpend: number
  recommendedAction: string
  recommendedPlan?: string
  estimatedSavings: number
  reason: string
}

export type AuditResult = {
  id: string
  input: AuditInput
  recommendations: AuditRecommendation[]
  totalMonthlySavings: number
  totalAnnualSavings: number
  summary?: string
  createdAt: string
}
