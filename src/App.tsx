import { useState } from 'react'
import { properties as seedProperties, leads as seedLeads, showings as seedShowings } from './data/seedData'
import type { LeadStage, Property, PropertyStatus, ShowingStatus } from './types'
import { useLocalData } from './lib/useLocalData'
import { useTheme } from './lib/theme'
import { OverviewPage } from './pages/OverviewPage'
import { PropertiesPage } from './pages/PropertiesPage'
import { LeadsPage } from './pages/LeadsPage'
import { ShowingsPage } from './pages/ShowingsPage'

const TABS = ['Overview', 'Properties', 'Leads', 'Showings'] as const
type Tab = (typeof TABS)[number]

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>('Overview')
  const [mode, toggleTheme] = useTheme()

  const [properties, setProperties] = useLocalData<Property[]>('properties', seedProperties)
  const [leads, setLeads] = useLocalData('leads', seedLeads)
  const [showings, setShowings] = useLocalData('showings', seedShowings)

  const updatePropertyStatus = (id: string, status: PropertyStatus) =>
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))

  const updateLeadStage = (id: string, stage: LeadStage) =>
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage } : l)))

  const updateShowingStatus = (id: string, status: ShowingStatus) =>
    setShowings((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-0)' }}>
      <header
        className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 py-3"
        style={{ background: 'var(--surface-0)', borderBottom: '1px solid var(--border-hairline)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: '#2a78d6', color: '#fff' }}>
            H
          </div>
          <span className="font-semibold text-sm md:text-base" style={{ color: 'var(--text-primary)' }}>
            Harbor Leasing
          </span>
        </div>
        <nav className="flex items-center gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{
                background: tab === t ? 'var(--surface-1)' : 'transparent',
                color: tab === t ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: tab === t ? '1px solid var(--border-hairline)' : '1px solid transparent',
              }}
            >
              {t}
            </button>
          ))}
        </nav>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-hairline)' }}
        >
          {mode === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </header>

      <main className="px-4 md:px-6 py-5 max-w-6xl mx-auto">
        {tab === 'Overview' && <OverviewPage properties={properties} leads={leads} showings={showings} mode={mode} />}
        {tab === 'Properties' && <PropertiesPage properties={properties} onUpdateStatus={updatePropertyStatus} />}
        {tab === 'Leads' && <LeadsPage leads={leads} properties={properties} onUpdateStage={updateLeadStage} />}
        {tab === 'Showings' && (
          <ShowingsPage showings={showings} leads={leads} properties={properties} onUpdateStatus={updateShowingStatus} />
        )}
      </main>
    </div>
  )
}
