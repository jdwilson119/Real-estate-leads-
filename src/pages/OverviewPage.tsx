import type { Lead, Property, Showing } from '../types'
import type { ThemeMode } from '../lib/theme'
import { KpiCard } from '../components/KpiCard'
import { LeadFunnelChart } from '../components/charts/LeadFunnelChart'
import { PropertyStatusChart } from '../components/charts/PropertyStatusChart'
import { LeaseExpirationChart } from '../components/charts/LeaseExpirationChart'
import { LeadStageBadge, PropertyStatusBadge } from '../components/StatusBadge'
import { formatCurrency, formatDate, daysFromToday } from '../lib/format'

interface Props {
  properties: Property[]
  leads: Lead[]
  showings: Showing[]
  mode: ThemeMode
}

function Card({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: 'var(--surface-1)', border: '1px solid var(--border-hairline)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  )
}

export function OverviewPage({ properties, leads, showings, mode }: Props) {
  const totalUnits = properties.length
  const occupied = properties.filter((p) => p.status === 'occupied').length
  const vacant = properties.filter((p) => p.status === 'vacant').length
  const occupancyRate = totalUnits ? Math.round((occupied / totalUnits) * 100) : 0

  const activeLeads = leads.filter((l) => !['leased', 'lost'].includes(l.stage)).length

  const upcomingShowings = showings
    .filter((s) => s.status === 'scheduled' && daysFromToday(s.date) >= 0 && daysFromToday(s.date) <= 7)
    .sort((a, b) => a.date.localeCompare(b.date))

  const avgDaysOnMarket = vacant
    ? Math.round(
        properties.filter((p) => p.status === 'vacant').reduce((sum, p) => sum + p.daysOnMarket, 0) / vacant,
      )
    : 0

  const leasesExpiringSoon = properties.filter((p) => p.leaseEnd && daysFromToday(p.leaseEnd) <= 60 && daysFromToday(p.leaseEnd) >= 0)

  const potentialRentRoll = properties.reduce((sum, p) => sum + p.rent, 0)
  const actualRentRoll = properties.filter((p) => p.status === 'occupied').reduce((sum, p) => sum + p.rent, 0)

  const propertyById = new Map(properties.map((p) => [p.id, p]))
  const leadById = new Map(leads.map((l) => [l.id, l]))

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Occupancy rate" value={`${occupancyRate}%`} sublabel={`${occupied}/${totalUnits} units occupied`} tone={occupancyRate >= 80 ? 'good' : occupancyRate >= 60 ? 'warning' : 'critical'} />
        <KpiCard label="Vacant units" value={String(vacant)} sublabel={`Avg ${avgDaysOnMarket} days on market`} tone={vacant > 0 ? 'warning' : 'good'} />
        <KpiCard label="Active leads" value={String(activeLeads)} sublabel={`${leads.length} total in pipeline`} />
        <KpiCard label="Showings this week" value={String(upcomingShowings.length)} sublabel="Next 7 days" />
        <KpiCard label="Monthly rent roll" value={formatCurrency(actualRentRoll)} sublabel={`of ${formatCurrency(potentialRentRoll)} potential`} />
        <KpiCard
          label="Leases expiring (60d)"
          value={String(leasesExpiringSoon.length)}
          sublabel={leasesExpiringSoon.length > 0 ? 'Reach out for renewal' : 'All clear'}
          tone={leasesExpiringSoon.length > 0 ? 'warning' : 'good'}
        />
        <KpiCard label="Total properties" value={String(totalUnits)} sublabel="Under management" />
        <KpiCard
          label="Applications in review"
          value={String(leads.filter((l) => l.stage === 'application').length)}
          sublabel="Awaiting approval"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Lead funnel">
          <LeadFunnelChart leads={leads} mode={mode} />
        </Card>
        <Card title="Portfolio status">
          <PropertyStatusChart properties={properties} mode={mode} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Lease expirations (next 6 months)">
          <LeaseExpirationChart properties={properties} mode={mode} />
        </Card>
        <Card title="Upcoming showings">
          {upcomingShowings.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              No showings scheduled in the next 7 days.
            </p>
          ) : (
            <ul className="flex flex-col divide-y" style={{ borderColor: 'var(--border-hairline)' }}>
              {upcomingShowings.map((s) => {
                const prop = propertyById.get(s.propertyId)
                const lead = leadById.get(s.leadId)
                return (
                  <li key={s.id} className="flex items-center justify-between py-2.5 first:pt-0">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {lead?.name ?? 'Unknown lead'}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {prop ? `${prop.address}${prop.unit ? ` #${prop.unit}` : ''}` : 'Unknown property'}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm tabular-nums" style={{ color: 'var(--text-primary)' }}>
                        {formatDate(s.date)}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {s.time}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </Card>
      </div>

      <Card title="Attention needed">
        <ul className="flex flex-col divide-y" style={{ borderColor: 'var(--border-hairline)' }}>
          {properties
            .filter((p) => p.status === 'vacant')
            .sort((a, b) => b.daysOnMarket - a.daysOnMarket)
            .map((p) => (
              <li key={p.id} className="flex items-center justify-between py-2.5 first:pt-0">
                <div className="flex flex-col">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {p.address}
                    {p.unit ? ` #${p.unit}` : ''}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {p.city}, {p.state} · {formatCurrency(p.rent)}/mo
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs tabular-nums" style={{ color: p.daysOnMarket > 30 ? '#d03b3b' : 'var(--text-muted)' }}>
                    {p.daysOnMarket} days on market
                  </span>
                  <PropertyStatusBadge status={p.status} />
                </div>
              </li>
            ))}
          {leasesExpiringSoon.map((p) => (
            <li key={`lease-${p.id}`} className="flex items-center justify-between py-2.5 first:pt-0">
              <div className="flex flex-col">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {p.address}
                  {p.unit ? ` #${p.unit}` : ''}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {p.tenantName} · lease ends {formatDate(p.leaseEnd!)}
                </span>
              </div>
              <LeadStageBadge stage="contacted" />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
