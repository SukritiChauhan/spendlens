import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, input, recommendations, totalMonthlySavings, totalAnnualSavings, summary } = body

    const { error } = await supabase.from('audits').insert({
      id,
      input,
      recommendations,
      total_monthly_savings: totalMonthlySavings,
      total_annual_savings: totalAnnualSavings,
      summary,
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save audit' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('audits')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}