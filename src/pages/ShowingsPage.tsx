import { useMemo } from 'react'
import type { Lead, Property, Showing, ShowingStatus } from '../types'
import { formatDate } from '../lib/format'

interface Props {
  showings: Showing[]
  leads: Lead[]
  properties: Property[]
  onUpdateStatus: (id: string, status: ShowingStatus) => void
}

const STATUS_OPTIONS: ShowingStatus[] = ['scheduled', 'completed', 'cancelled', 'no-show']

export function ShowingsPage({ showings, leads, properties, onUpdateStatus }: Props) {
  const leadById = new Map(leads.map((l) => [l.id, l]))
  const propertyById = new Map(properties.map((p) => [p.id, p]))

  const sorted = useMemo(() => [...showings].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)), [showings])

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--surface-1)', border: '1px solid var(--border-hairline)' }}
    >
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-hairline)' }}>
            {['Date', 'Time', 'Lead', 'Property', 'Status'].map((h) => (
              <th key={h} className="text-left font-medium px-4 py-2.5 text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((s) => {
            const lead = leadById.get(s.leadId)
            const prop = propertyById.get(s.propertyId)
            return (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-primary)' }}>
                  {formatDate(s.date)}
                </td>
                <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                  {s.time}
                </td>
                <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>
                  {lead?.name ?? 'Unknown'}
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                  {prop ? `${prop.address}${prop.unit ? ` #${prop.unit}` : ''}` : 'Unknown'}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={s.status}
                    onChange={(e) => onUpdateStatus(s.id, e.target.value as ShowingStatus)}
                    className="text-xs font-medium rounded-full px-2.5 py-1 outline-none capitalize cursor-pointer"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border-hairline)', color: 'var(--text-primary)' }}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

