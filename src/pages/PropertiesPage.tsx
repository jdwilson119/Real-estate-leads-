import { useMemo, useState } from 'react'
import type { Property, PropertyStatus } from '../types'
import { formatCurrency, formatDate } from '../lib/format'

interface Props {
  properties: Property[]
  onUpdateStatus: (id: string, status: PropertyStatus) => void
}

const STATUS_OPTIONS: PropertyStatus[] = ['vacant', 'occupied', 'application', 'maintenance']
const FILTERS: ('all' | PropertyStatus)[] = ['all', 'vacant', 'occupied', 'application', 'maintenance']

export function PropertiesPage({ properties, onUpdateStatus }: Props) {
  const [filter, setFilter] = useState<'all' | PropertyStatus>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchesStatus = filter === 'all' || p.status === filter
      const matchesQuery =
        query.trim() === '' ||
        `${p.address} ${p.city} ${p.state}`.toLowerCase().includes(query.trim().toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [properties, filter, query])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
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
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search address or city..."
          className="text-sm px-3 py-1.5 rounded-lg outline-none w-56"
          style={{ background: 'var(--surface-1)', border: '1px solid var(--border-hairline)', color: 'var(--text-primary)' }}
        />
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ background: 'var(--surface-1)', border: '1px solid var(--border-hairline)' }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-hairline)' }}>
              {['Property', 'Type', 'Beds/Baths', 'Rent', 'Status', 'Available', 'Days on Market'].map((h) => (
                <th key={h} className="text-left font-medium px-4 py-2.5 text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {p.address}
                      {p.unit ? ` #${p.unit}` : ''}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {p.city}, {p.state}
                      {p.tenantName ? ` · ${p.tenantName}` : ''}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize" style={{ color: 'var(--text-secondary)' }}>
                  {p.type}
                </td>
                <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                  {p.bedrooms === 0 ? '—' : `${p.bedrooms} bd`} / {p.bathrooms} ba
                </td>
                <td className="px-4 py-3 tabular-nums font-medium" style={{ color: 'var(--text-primary)' }}>
                  {formatCurrency(p.rent)}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={p.status}
                    onChange={(e) => onUpdateStatus(p.id, e.target.value as PropertyStatus)}
                    className="text-xs font-medium rounded-full px-2.5 py-1 outline-none capitalize cursor-pointer"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border-hairline)', color: 'var(--text-primary)' }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                  {p.status === 'occupied' && p.leaseEnd ? `Lease ends ${formatDate(p.leaseEnd)}` : formatDate(p.availableDate)}
                </td>
                <td className="px-4 py-3 tabular-nums" style={{ color: p.daysOnMarket > 30 ? '#d03b3b' : 'var(--text-secondary)' }}>
                  {p.status === 'occupied' ? '—' : p.daysOnMarket}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  No properties match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
