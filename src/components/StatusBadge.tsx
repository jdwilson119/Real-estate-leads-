import type { LeadStage, PropertyStatus, ShowingStatus } from '../types'

const propertyStyles: Record<PropertyStatus, { bg: string; fg: string; label: string }> = {
  vacant: { bg: '#fab21926', fg: '#9a6a00', label: 'Vacant' },
  occupied: { bg: '#0ca30c22', fg: '#0a7a0a', label: 'Occupied' },
  application: { bg: '#2a78d622', fg: '#1c5cab', label: 'Application Pending' },
  maintenance: { bg: '#d03b3b22', fg: '#a52d2d', label: 'Maintenance' },
}

const leadStyles: Record<LeadStage, { bg: string; fg: string; label: string }> = {
  new: { bg: '#89878122', fg: '#52514e', label: 'New' },
  contacted: { bg: '#2a78d622', fg: '#1c5cab', label: 'Contacted' },
  touring: { bg: '#eda10022', fg: '#9a6a00', label: 'Touring' },
  application: { bg: '#4a3aa722', fg: '#4a3aa7', label: 'Application' },
  approved: { bg: '#1baf7a22', fg: '#0f7a54', label: 'Approved' },
  leased: { bg: '#0ca30c22', fg: '#0a7a0a', label: 'Leased' },
  lost: { bg: '#89878122', fg: '#898781', label: 'Lost' },
}

const showingStyles: Record<ShowingStatus, { bg: string; fg: string; label: string }> = {
  scheduled: { bg: '#2a78d622', fg: '#1c5cab', label: 'Scheduled' },
  completed: { bg: '#0ca30c22', fg: '#0a7a0a', label: 'Completed' },
  cancelled: { bg: '#89878122', fg: '#898781', label: 'Cancelled' },
  'no-show': { bg: '#d03b3b22', fg: '#a52d2d', label: 'No-show' },
}

function Badge({ bg, fg, label }: { bg: string; fg: string; label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap"
      style={{ background: bg, color: fg }}
    >
      {label}
    </span>
  )
}

export function PropertyStatusBadge({ status }: { status: PropertyStatus }) {
  return <Badge {...propertyStyles[status]} />
}

export function LeadStageBadge({ stage }: { stage: LeadStage }) {
  return <Badge {...leadStyles[stage]} />
}

export function ShowingStatusBadge({ status }: { status: ShowingStatus }) {
  return <Badge {...showingStyles[status]} />
}
