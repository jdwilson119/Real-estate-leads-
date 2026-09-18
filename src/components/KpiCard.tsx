interface KpiCardProps {
  label: string
  value: string
  sublabel?: string
  tone?: 'default' | 'good' | 'warning' | 'critical'
}

const toneColor: Record<NonNullable<KpiCardProps['tone']>, string> = {
  default: 'var(--text-secondary)',
  good: '#0ca30c',
  warning: '#fab219',
  critical: '#d03b3b',
}

export function KpiCard({ label, value, sublabel, tone = 'default' }: KpiCardProps) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-1"
      style={{ background: 'var(--surface-1)', border: '1px solid var(--border-hairline)' }}
    >
      <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
      <span className="text-2xl font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
        {value}
      </span>
      {sublabel && (
        <span className="text-xs font-medium" style={{ color: toneColor[tone] }}>
          {sublabel}
        </span>
      )}
    </div>
  )
}
