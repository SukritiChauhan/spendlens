'use client'

import { useState, useEffect } from 'react'
import { AI_TOOLS } from '../lib/pricing'
import { AuditInput, UserToolInput } from '../types'

const USE_CASES = [
  { id: 'coding', label: 'Coding' },
  { id: 'writing', label: 'Writing' },
  { id: 'data', label: 'Data Analysis' },
  { id: 'research', label: 'Research' },
  { id: 'mixed', label: 'Mixed' },
]

const STORAGE_KEY = 'spendlens-form-state'

export default function AuditPage() {
  const [teamSize, setTeamSize] = useState(1)
  const [useCase, setUseCase] = useState<AuditInput['useCase']>('mixed')
  const [selectedTools, setSelectedTools] = useState<UserToolInput[]>([])
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setTeamSize(parsed.teamSize || 1)
        setUseCase(parsed.useCase || 'mixed')
        setSelectedTools(parsed.tools || [])
      }
    } catch (e) {
      console.error('Failed to load saved form state', e)
    }
    setLoaded(true)
  }, [])

  // Save to localStorage whenever form changes
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        teamSize,
        useCase,
        tools: selectedTools,
      }))
    } catch (e) {
      console.error('Failed to save form state', e)
    }
  }, [teamSize, useCase, selectedTools, loaded])

  const addTool = () => {
    setSelectedTools([
      ...selectedTools,
      {
        toolId: AI_TOOLS[0].id,
        planId: AI_TOOLS[0].plans[0].id,
        seats: 1,
        monthlySpend: 0,
      },
    ])
  }

  const removeTool = (index: number) => {
    setSelectedTools(selectedTools.filter((_, i) => i !== index))
  }

  const updateTool = (index: number, field: keyof UserToolInput, value: string | number) => {
    const updated = [...selectedTools]
    if (field === 'toolId') {
      const tool = AI_TOOLS.find(t => t.id === value)
      updated[index] = {
        ...updated[index],
        toolId: value as string,
        planId: tool?.plans[0].id || '',
      }
    } else {
      updated[index] = { ...updated[index], [field]: value }
    }
    setSelectedTools(updated)
  }

  const handleSubmit = () => {
    if (selectedTools.length === 0) return
    const audit: AuditInput = { tools: selectedTools, teamSize, useCase }
    localStorage.setItem('spendlens-audit', JSON.stringify(audit))
    window.location.href = '/results'
  }

  if (!loaded) return null

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="flex items-center px-8 py-5 border-b border-gray-100 bg-white">
        <a href="/" className="text-xl font-bold text-emerald-600">SpendLens</a>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Your AI Spend</h1>
        <p className="text-gray-500 mb-8">Add each AI tool your team pays for below.</p>

        {/* Team Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Team Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Team Size</label>
              <input
                type="number"
                min={1}
                value={teamSize}
                onChange={e => setTeamSize(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Primary Use Case</label>
              <select
                value={useCase}
                onChange={e => setUseCase(e.target.value as AuditInput['useCase'])}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white"
              >
                {USE_CASES.map(u => (
                  <option key={u.id} value={u.id}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tools */}
        {selectedTools.map((tool, index) => {
          const toolData = AI_TOOLS.find(t => t.id === tool.toolId)
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Tool {index + 1}</h3>
                <button
                  onClick={() => removeTool(index)}
                  className="text-red-400 text-sm hover:text-red-600"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">AI Tool</label>
                  <select
                    value={tool.toolId}
                    onChange={e => updateTool(index, 'toolId', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white"
                  >
                    {AI_TOOLS.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Plan</label>
                  <select
                    value={tool.planId}
                    onChange={e => updateTool(index, 'planId', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white"
                  >
                    {toolData?.plans.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} {p.pricePerSeat > 0 ? `— $${p.pricePerSeat}/seat` : '— Custom/Usage-based'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Number of Seats</label>
                  <input
                    type="number"
                    min={1}
                    value={tool.seats}
                    onChange={e => updateTool(index, 'seats', Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Monthly Spend ($)</label>
                  <input
                    type="number"
                    min={0}
                    value={tool.monthlySpend}
                    onChange={e => updateTool(index, 'monthlySpend', Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white"
                  />
                </div>
              </div>
            </div>
          )
        })}

        <button
          onClick={addTool}
          className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-4 text-gray-400 hover:border-emerald-400 hover:text-emerald-600 transition mb-6"
        >
          + Add AI Tool
        </button>

        <button
          onClick={handleSubmit}
          disabled={selectedTools.length === 0}
          className="w-full bg-emerald-600 text-white py-4 rounded-full font-semibold text-lg hover:bg-emerald-700 transition disabled:opacity-40"
        >
          Run My Audit →
        </button>
      </div>
    </main>
  )
}