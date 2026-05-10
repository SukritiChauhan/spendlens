'use client'

import { useEffect, useState } from 'react'
import { AuditInput, AuditResult } from '../types'
import { runAudit } from '../lib/audit-engine'

export default function ResultsPage() {
  const [result, setResult] = useState<AuditResult | null>(null)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('spendlens-audit')
      if (saved) {
        const input: AuditInput = JSON.parse(saved)
        const auditResult = runAudit(input)
        setResult(auditResult)
        saveAudit(auditResult)
      }
    } catch (e) {
      console.error('Failed to load audit', e)
    }
  }, [])

  const saveAudit = async (auditResult: AuditResult) => {
    try {
      await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: auditResult.id,
          input: auditResult.input,
          recommendations: auditResult.recommendations,
          totalMonthlySavings: auditResult.totalMonthlySavings,
          totalAnnualSavings: auditResult.totalAnnualSavings,
          summary: auditResult.summary,
        }),
      })
      setShareUrl(`${window.location.origin}/share/${auditResult.id}`)
    } catch (e) {
      console.error('Failed to save audit', e)
    }
  }

  const handleSubmit = async () => {
    if (!email || !result) return
    if (honeypot) return
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          company,
          role,
          teamSize: result.input.teamSize,
          auditId: result.id,
          tools: result.input.tools,
          totalMonthlySavings: result.totalMonthlySavings,
          totalAnnualSavings: result.totalAnnualSavings,
          honeypot,
        }),
      })
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          totalMonthlySavings: result.totalMonthlySavings,
          totalAnnualSavings: result.totalAnnualSavings,
          isHighSavings: result.totalMonthlySavings > 500,
        }),
      })
      setSubmitted(true)
    } catch (e) {
      console.error('Failed to submit', e)
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No audit found.</p>
          <a href="/audit" className="text-emerald-600 font-medium hover:underline">Start a new audit</a>
        </div>
      </main>
    )
  }

  const isHighSavings = result.totalMonthlySavings > 500
  const isLowSavings = result.totalMonthlySavings < 100

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white">
        <a href="/" className="text-xl font-bold text-emerald-600">SpendLens</a>
        <a href="/audit" className="text-sm text-gray-500 hover:text-emerald-600">New Audit</a>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className={`rounded-2xl p-8 mb-8 text-center ${isLowSavings ? 'bg-blue-50' : 'bg-emerald-50'}`}>
          {isLowSavings ? (
            <div>
              <div className="text-4xl mb-3">✅</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">You are spending well.</h1>
              <p className="text-gray-500">Your current AI stack looks optimised for your team size and use case.</p>
            </div>
          ) : (
            <div>
              <p className="text-emerald-600 font-medium text-sm uppercase tracking-wide mb-2">Potential Savings Found</p>
              <h1 className="text-5xl font-bold text-gray-900 mb-1">${result.totalMonthlySavings.toFixed(0)}<span className="text-2xl text-gray-400">/mo</span></h1>
              <p className="text-emerald-600 font-semibold text-xl">${result.totalAnnualSavings.toFixed(0)} saved per year</p>
            </div>
          )}
        </div>

        {isHighSavings && (
          <div className="bg-gray-900 text-white rounded-2xl p-6 mb-8">
            <p className="text-emerald-400 text-sm font-medium uppercase tracking-wide mb-2">Credex can help</p>
            <h2 className="text-xl font-bold mb-2">Get discounted AI credits and save even more</h2>
            <p className="text-gray-400 text-sm mb-4">Credex sources discounted AI infrastructure credits from companies that overforecast. At your spend level, you could save an additional 20-40% on top of these recommendations.</p>
            <a href="https://credex.rocks" target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-emerald-400 transition">Book a Credex Consultation</a>
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Audit Breakdown</h2>
        <div className="space-y-4 mb-8">
          {result.recommendations.map((rec, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{rec.toolName}</h3>
                  <p className="text-sm text-gray-400">Current plan: {rec.currentPlan}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Current spend</p>
                  <p className="font-semibold text-gray-900">${rec.currentSpend}/mo</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium text-emerald-700 mb-1">{rec.recommendedAction}</p>
                <p className="text-sm text-gray-500">{rec.reason}</p>
                {rec.estimatedSavings > 0 && (
                  <p className="text-sm font-semibold text-emerald-600 mt-2">Save ${rec.estimatedSavings.toFixed(0)}/mo</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {!submitted ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            {!showEmailForm ? (
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">{isLowSavings ? 'Get notified when new optimisations apply to your stack' : 'Get your full report by email'}</h3>
                <p className="text-sm text-gray-500 mb-4">{isLowSavings ? 'We will reach out when better options become available.' : 'We will send you this audit plus personalised next steps.'}</p>
                <button onClick={() => setShowEmailForm(true)} className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-emerald-700 transition">
                  {isLowSavings ? 'Notify Me' : 'Send My Report'}
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Your details</h3>
                <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="space-y-3">
                  <input type="email" placeholder="Email address *" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" required />
                  <input type="text" placeholder="Company name (optional)" value={company} onChange={e => setCompany(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" />
                  <input type="text" placeholder="Your role (optional)" value={role} onChange={e => setRole(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white" />
                  <button onClick={handleSubmit} disabled={loading} className="w-full bg-emerald-600 text-white py-3 rounded-full font-semibold text-sm hover:bg-emerald-700 transition disabled:opacity-40">
                    {loading ? 'Sending...' : 'Send Report'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-emerald-50 rounded-2xl p-6 mb-6 text-center">
            <p className="text-2xl mb-2">🎉</p>
            <h3 className="font-semibold text-gray-900 mb-1">Report sent!</h3>
            <p className="text-sm text-gray-500">Check your inbox for your full audit.</p>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Share this audit</h3>
          <p className="text-sm text-gray-500 mb-4">Know someone overpaying for AI tools? Share SpendLens with them.</p>
          <button
            onClick={() => {
              const url = shareUrl || window.location.href
              navigator.clipboard.writeText(url)
              alert('Link copied!')
            }}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-200 transition"
          >
            Copy Share Link
          </button>
        </div>
      </div>
    </main>
  )
}