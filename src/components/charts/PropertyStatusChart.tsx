import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Property, PropertyStatus } from '../../types'
import { palette, type ThemeMode } from '../../lib/theme'

const STATUSES: { key: PropertyStatus; label: string }[] = [
  { key: 'occupied', label: 'Occupied' },
  { key: 'vacant', label: 'Vacant' },
  { key: 'application', label: 'Application Pending' },
  { key: 'maintenance', label: 'Maintenance' },
]

export function PropertyStatusChart({ properties, mode }: { properties: Property[]; mode: ThemeMode }) {
  const p = palette(mode)
  const data = STATUSES.map((s, i) => ({
    status: s.label,
    count: properties.filter((prop) => prop.status === s.key).length,
    color: p.categorical[i],
  }))
  const maxCount = Math.max(1, ...data.map((d) => d.count))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 32, left: 8, bottom: 4 }} barCategoryGap={10}>
        <XAxis type="number" domain={[0, maxCount]} hide />
        <YAxis
          type="category"
          dataKey="status"
          width={130}
          tickLine={false}
          axisLine={false}
          tick={{ fill: p.textSecondary, fontSize: 12 }}
        />
        <Tooltip
          cursor={{ fill: p.grid, opacity: 0.4 }}
          contentStyle={{ background: p.surface, border: `1px solid ${p.grid}`, borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: p.textPrimary, fontWeight: 600 }}
          itemStyle={{ color: p.textSecondary }}
          formatter={(value) => [`${value} units`, '']}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22} isAnimationActive={false}>
          {data.map((d) => (
            <Cell key={d.status} fill={d.color} />
          ))}
          <LabelList dataKey="count" position="right" style={{ fill: p.textPrimary, fontSize: 12, fontWeight: 600 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
