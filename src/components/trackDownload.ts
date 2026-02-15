export function trackDownload(bookLanguage: string, format: 'pdf' | 'epub') {
  const payload = {
    bookLanguage,
    format,
    browserLanguage: navigator.language,
    referrer: document.referrer || '',
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    pageUrl: window.location.href,
  }

  navigator.sendBeacon(
    '/api/track-download',
    new Blob([JSON.stringify(payload)], { type: 'application/json' }),
  )
}
