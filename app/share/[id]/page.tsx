import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data } = await supabase
    .from('audits')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!data) return { title: 'SpendLens Audit' }

  const savings = data.total_monthly_savings
  const title = savings > 0
    ? `I could save $${savings}/mo on AI tools — SpendLens`
    : 'My AI stack is optimised — SpendLens'

  return {
    title,
    description: 'Free AI spend audit for startups. See where you are overpaying.',
    openGraph: {
      title,
      description: 'Free AI spend audit for startups. See where you are overpaying.',
      url: `https://spendlens.vercel.app/share/${params.id}`,
      siteName: 'SpendLens',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: 'Free AI spend audit for startups. See where you are overpaying.',
    },
  }
}

export default async function SharePage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from('audits')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !data) notFound()

  const isHighSavings = data.total_monthly_savings > 500
  const isLowSavings = data.total_monthly_savings < 100

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white">
        <a href="/" className="text-xl font-bold text-emerald-600">SpendLens</a>
        
          href="/audit"
          className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition"
        >
          Audit My Stack
        </a>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <p className="text-center text-gray-400 text-sm mb-6">
          Someone shared their AI spend audit with you
        </p>

        {/* Hero */}
        <div className={`rounded-2xl p-8 mb-8 text-center ${isLowSavings ? 'bg-blue-50' : 'bg-emerald-50'}`}>
          {isLowSavings ? (
            <div>
              <div className="text-4xl mb-3">✅</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                This stack is spending well.
              </h1>
              <p className="text-gray-500">
                Their AI stack looks optimised for their team size and use case.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-emerald-600 font-medium text-sm uppercase tracking-wide mb-2">
                Potential Savings Found
              </p>
              <h1 className="text-5xl font-bold text-gray-900 mb-1">
                ${data.total_monthly_savings.toFixed(0)}
                <span className="text-2xl text-gray-400">/mo</span>
              </h1>
              <p className="text-emerald-600 font-semibold text-xl">
                ${data.total_annual_savings.toFixed(0)} saved per year
              </p>
            </div>
          )}
        </div>

        {/* Credex CTA */}
        {isHighSavings && (
          <div className="bg-gray-900 text-white rounded-2xl p-6 mb-8">
            <p className="text-emerald-400 text-sm font-medium uppercase tracking-wide mb-2">
              Credex can help
            </p>
            <h2 className="text-xl font-bold mb-2">
              Get discounted AI credits and save even more
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Credex sources discounted AI infrastructure credits from companies that overforecast.
              You could save an additional 20-40% on top of these recommendations.
            </p>
            
              href="https://credex.rocks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-emerald-400 transition"
            >
              Book a Credex Consultation
            </a>
          </div>
        )}

        {/* Breakdown */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Audit Breakdown</h2>
        <div className="space-y-4 mb-8">
          {data.recommendations.map((rec: any, i: number) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{rec.toolName}</h3>
                  <p className="text-sm text-gray-400">Plan: {rec.currentPlan}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Monthly spend</p>
                  <p className="font-semibold text-gray-900">${rec.currentSpend}/mo</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium text-emerald-700 mb-1">{rec.recommendedAction}</p>
                <p className="text-sm text-gray-500">{rec.reason}</p>
                {rec.estimatedSavings > 0 && (
                  <p className="text-sm font-semibold text-emerald-600 mt-2">
                    Save ${rec.estimatedSavings.toFixed(0)}/mo
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <h3 className="font-semibold text-gray-900 mb-2">
            Audit your own AI spend
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Free, no login required. Takes 2 minutes.
          </p>
          
            href="/audit"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-emerald-700 transition"
          >
            Start My Free Audit
          </a>
        </div>
      </div>
    </main>
  )
}