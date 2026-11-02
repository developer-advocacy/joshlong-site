// the api's dates are midnight utc, so they're shown in utc, or they'd be a day early in america.

export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = {month: 'short', day: 'numeric', year: 'numeric'}): string {
  return new Date(iso).toLocaleDateString('en-US', {...options, timeZone: 'UTC'})
}

export function isoDate(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10)
}
