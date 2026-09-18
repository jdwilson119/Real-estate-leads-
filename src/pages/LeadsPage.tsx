import { useMemo, useState } from 'react'
import type { Lead, LeadStage, Property } from '../types'
import { formatCurrency, formatDate } from '../lib/format'

interface Props {
  leads: Lead[]
  properties: Property[]
  onUpdateStage: (id: string, stage: LeadStage) => void
}

const STAGES: LeadStage[] = ['new', 'contacted', 'touring', 'application', 'approved', 'leased', 'lost']
const FILTERS: ('all' | LeadStage)[] = ['all', ...STAGES]

export function LeadsPage({ leads, properties, onUpdateStage }: Props) {
  const [filter, setFilter] = useState<'all' | LeadStage>('all')
  const propertyById = new Map(properties.map((p) => [p.id, p]))

  const filtered = useMemo(() => {
    return leads
      .filter((l) => filter === 'all' || l.stage === filter)
      .sort((a, b) => b.lastContact.localeCompare(a.lastContact))
  }, [leads, filter])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1.5 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="text-xs font-medium px-3 py-1.5 rounded-full capitalize transition-colors"
            style={{
              background: filter === f ? 'var(--text-primary)' : 'var(--surface-1)',
              color: filter === f ? 'var(--surface-1)' : 'var(--text-secondary)',
              border: '1px solid var(--border-hairline)',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ background: 'var(--surface-1)', border: '1px solid var(--border-hairline)' }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-hairline)' }}>
              {['Lead', 'Interested In', 'Source', 'Budget', 'Move-in', 'Last Contact', 'Stage'].map((h) => (
                <th key={h} className="text-left font-medium px-4 py-2.5 text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => {
              const prop = propertyById.get(l.propertyId)
              return (
                <tr key={l.id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {l.name}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {l.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                    {prop ? `${prop.address}${prop.unit ? ` #${prop.unit}` : ''}` : '—'}
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                    {l.source}
                  </td>
                  <td className="px-4 py-3 tabular-nums font-medium" style={{ color: 'var(--text-primary)' }}>
                    {formatCurrency(l.budget)}
                  </td>
                  <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                    {formatDate(l.moveInDate)}
                  </td>
                  <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                    {formatDate(l.lastContact)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={l.stage}
                      onChange={(e) => onUpdateStage(l.id, e.target.value as LeadStage)}
                      className="text-xs font-medium rounded-full px-2.5 py-1 outline-none capitalize cursor-pointer"
                      style={{ background: 'var(--surface-2)', border: '1px solid var(--border-hairline)', color: 'var(--text-primary)' }}
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  No leads match this stage.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
