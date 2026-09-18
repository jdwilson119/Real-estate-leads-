import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Lead, LeadStage } from '../../types'
import { palette, type ThemeMode } from '../../lib/theme'

const STAGES: { key: LeadStage; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'touring', label: 'Touring' },
  { key: 'application', label: 'Application' },
  { key: 'approved', label: 'Approved' },
  { key: 'leased', label: 'Leased' },
]

export function LeadFunnelChart({ leads, mode }: { leads: Lead[]; mode: ThemeMode }) {
  const p = palette(mode)
  const data = STAGES.map((s, i) => ({
    stage: s.label,
    count: leads.filter((l) => l.stage === s.key).length,
    color: p.ordinal[i],
  }))
  const maxCount = Math.max(1, ...data.map((d) => d.count))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 32, left: 8, bottom: 4 }} barCategoryGap={10}>
        <XAxis type="number" domain={[0, maxCount]} hide />
        <YAxis
          type="category"
          dataKey="stage"
          width={90}
          tickLine={false}
          axisLine={false}
          tick={{ fill: p.textSecondary, fontSize: 12 }}
        />
        <Tooltip
          cursor={{ fill: p.grid, opacity: 0.4 }}
          contentStyle={{ background: p.surface, border: `1px solid ${p.grid}`, borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: p.textPrimary, fontWeight: 600 }}
          itemStyle={{ color: p.textSecondary }}
          formatter={(value) => [`${value} leads`, '']}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22} isAnimationActive={false}>
          {data.map((d) => (
            <Cell key={d.stage} fill={d.color} />
          ))}
          <LabelList dataKey="count" position="right" style={{ fill: p.textPrimary, fontSize: 12, fontWeight: 600 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
