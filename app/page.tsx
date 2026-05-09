import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <span className="text-xl font-bold text-emerald-600">SpendLens</span>
        <Link
          href="/audit"
          className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition"
        >
          Start Free Audit →
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center px-6 py-24">
        <p className="text-emerald-600 font-medium text-sm mb-4 uppercase tracking-wide">
          Free AI Spend Audit
        </p>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          Are you overpaying for AI tools?
        </h1>
        <p className="text-xl text-gray-500 mb-10">
          Enter your AI subscriptions and get an instant audit — where
          you're overspending, what to switch, and how much you could save.
          Free, no login required.
        </p>
        <Link
          href="/audit"
          className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition"
        >
          Audit My AI Spend →
        </Link>
        <p className="text-gray-400 text-sm mt-4">
          Takes 2 minutes · No login required · Instant results
        </p>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Enter your tools',
                desc: 'Tell us what AI tools you pay for, which plan, and how many seats.',
              },
              {
                step: '2',
                title: 'Get your audit',
                desc: 'We instantly analyse your stack against current pricing and usage benchmarks.',
              },
              {
                step: '3',
                title: 'Save money',
                desc: 'See exactly where to downgrade, switch, or consolidate — with real numbers.',
              },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm">
        Built by SpendLens · Powered by{' '}
        <a href="https://credex.rocks" className="text-emerald-600 hover:underline">
          Credex
        </a>
      </footer>
    </main>
  )
}