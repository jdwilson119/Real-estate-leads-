export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function daysFromToday(iso: string, today = new Date('2026-09-18T00:00:00')): number {
  const target = new Date(`${iso}T00:00:00`)
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}
