// the appearances that haven't ended yet, soonest first.
export function upcoming(appearances: Appearance[], now = new Date()): Appearance[] {
  const today = now.toISOString().slice(0, 10)
  return appearances.filter(a => (a.endDate || a.startDate).slice(0, 10) >= today)
}
