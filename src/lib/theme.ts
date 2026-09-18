import { useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark'

function getSystemPref(): ThemeMode {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme(): [ThemeMode, () => void] {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem('leasing-dashboard:theme')
    return stored === 'light' || stored === 'dark' ? stored : getSystemPref()
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
    window.localStorage.setItem('leasing-dashboard:theme', mode)
  }, [mode])

  const toggle = () => setMode((m) => (m === 'light' ? 'dark' : 'light'))
  return [mode, toggle]
}

// Categorical + sequential palette (validated: scripts/validate_palette.js)
export const CATEGORICAL = {
  light: ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'],
  dark: ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767'],
}

// Ordinal ramp (light->dark blue) for ordered stages like the lead funnel.
export const ORDINAL_BLUE = {
  light: ['#86b6ef', '#5598e7', '#2a78d6', '#1c5cab', '#104281', '#0d366b'],
  dark: ['#184f95', '#1c5cab', '#256abf', '#2a78d6', '#3987e5', '#86b6ef'],
}

export const STATUS = {
  good: '#0ca30c',
  warning: '#fab219',
  serious: '#ec835a',
  critical: '#d03b3b',
}

export function palette(mode: ThemeMode) {
  return {
    categorical: CATEGORICAL[mode],
    ordinal: ORDINAL_BLUE[mode],
    status: STATUS,
    surface: mode === 'light' ? '#fcfcfb' : '#1a1a19',
    textPrimary: mode === 'light' ? '#0b0b0b' : '#ffffff',
    textSecondary: mode === 'light' ? '#52514e' : '#c3c2b7',
    muted: '#898781',
    grid: mode === 'light' ? '#e1e0d9' : '#2c2c2a',
    axis: mode === 'light' ? '#c3c2b7' : '#383835',
  }
}
