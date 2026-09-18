import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Property } from '../../types'
import { palette, type ThemeMode } from '../../lib/theme'

function monthLabel(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short' })
}

export function LeaseExpirationChart({ properties, mode }: { properties: Property[]; mode: ThemeMode }) {
  const p = palette(mode)
  const today = new Date('2026-09-18T00:00:00')
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today)
    d.setMonth(d.getMonth() + i)
    return { key: `${d.getFullYear()}-${d.getMonth()}`, label: monthLabel(d), year: d.getFullYear(), month: d.getMonth() }
  })

  const data = months.map((m) => ({
    month: m.label,
    count: properties.filter((prop) => {
      if (!prop.leaseEnd) return false
      const d = new Date(prop.leaseEnd)
      return d.getFullYear() === m.year && d.getMonth() === m.month
    }).length,
  }))
  const maxCount = Math.max(1, ...data.map((d) => d.count))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 16, right: 8, left: 0, bottom: 0 }} barCategoryGap={16}>
        <CartesianGrid vertical={false} stroke={p.grid} strokeDasharray="0" />
        <XAxis dataKey="month" tickLine={false} axisLine={{ stroke: p.axis }} tick={{ fill: p.textSecondary, fontSize: 12 }} />
        <YAxis domain={[0, maxCount]} hide />
        <Tooltip
          cursor={{ fill: p.grid, opacity: 0.4 }}
          contentStyle={{ background: p.surface, border: `1px solid ${p.grid}`, borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: p.textPrimary, fontWeight: 600 }}
          itemStyle={{ color: p.textSecondary }}
          formatter={(value) => [`${value} lease${value === 1 ? '' : 's'} expiring`, '']}
        />
        <Bar dataKey="count" fill={p.ordinal[2]} radius={[4, 4, 0, 0]} maxBarSize={40} isAnimationActive={false}>
          <LabelList dataKey="count" position="top" style={{ fill: p.textPrimary, fontSize: 12, fontWeight: 600 }} formatter={(v: React.ReactNode) => (typeof v === 'number' && v > 0 ? v : '')} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
