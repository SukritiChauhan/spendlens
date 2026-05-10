import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      email,
      company,
      role,
      teamSize,
      auditId,
      tools,
      totalMonthlySavings,
      totalAnnualSavings,
      honeypot,
    } = body

    // Honeypot check — if filled, it's a bot
    if (honeypot) {
      return NextResponse.json({ success: true })
    }

    // Basic validation
    if (!email || !auditId) {
      return NextResponse.json(
        { error: 'Email and audit ID are required' },
        { status: 400 }
      )
    }

    // Save to Supabase
    const { error } = await supabase.from('leads').insert({
      email,
      company,
      role,
      team_size: teamSize,
      audit_id: auditId,
      tools,
      total_monthly_savings: totalMonthlySavings,
      total_annual_savings: totalAnnualSavings,
      is_high_savings: totalMonthlySavings > 500,
      honeypot,
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}