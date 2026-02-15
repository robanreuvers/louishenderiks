import { NextRequest, NextResponse } from 'next/server'

const AIRTABLE_API_KEY =
  'patJXfuZtwehGsmko.59c061050fbf7955dfe866e626c99477ec0292296d50fd13d351e4f502bc33c8'
const AIRTABLE_BASE_ID = 'app57rQejbx6k255C'
const DOWNLOADS_TABLE_ID = 'tbl7EhQ8VUI4Wvqja'
const EBOOK_RECORD_ID = 'recoDUIWK6CQglV2U'

const LANGUAGE_LABELS: Record<string, string> = {
  nl: 'Nederlands',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
}

function parseDeviceType(userAgent: string): string {
  if (/tablet|ipad/i.test(userAgent)) return 'Tablet'
  if (/mobile|iphone|android.*mobile/i.test(userAgent)) return 'Mobile'
  return 'Desktop'
}

function parseBrowser(userAgent: string): string {
  if (/edg\//i.test(userAgent)) return 'Edge'
  if (/opr\//i.test(userAgent) || /opera/i.test(userAgent)) return 'Opera'
  if (/chrome\//i.test(userAgent) && !/edg\//i.test(userAgent)) return 'Chrome'
  if (/safari\//i.test(userAgent) && !/chrome\//i.test(userAgent))
    return 'Safari'
  if (/firefox\//i.test(userAgent)) return 'Firefox'
  return 'Other'
}

function parseOS(userAgent: string): string {
  if (/windows/i.test(userAgent)) return 'Windows'
  if (/macintosh|mac os/i.test(userAgent)) return 'macOS'
  if (/linux/i.test(userAgent) && !/android/i.test(userAgent)) return 'Linux'
  if (/android/i.test(userAgent)) return 'Android'
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'iOS'
  return 'Other'
}

async function getGeoData(ip: string) {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city`, {
      signal: AbortSignal.timeout(3000),
    })
    if (res.ok) return await res.json()
  } catch {
    // ignore
  }
  return {}
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    const userAgent = request.headers.get('user-agent') || ''

    const geo = await getGeoData(ip)

    const now = new Date().toISOString().split('T')[0]

    const fields: Record<string, unknown> = {
      Name: `Download ${now} - ${body.bookLanguage || 'unknown'} ${body.format || ''}`,
      'E-Book': [EBOOK_RECORD_ID],
      'Download Date': now,
      'Download Source': 'Website',
      'Device Type': parseDeviceType(userAgent),
      'IP Address': ip,
      Country: geo.country || '',
      City: geo.city || '',
      Region: geo.regionName || '',
      Browser: parseBrowser(userAgent),
      OS: parseOS(userAgent),
      'Browser Language': body.browserLanguage || '',
      Referrer: body.referrer || '',
      'Screen Resolution': body.screenResolution || '',
      Timezone: body.timezone || '',
      'File Format': body.format?.toUpperCase() === 'PDF' ? 'PDF' : 'EPUB',
      'Book Language': LANGUAGE_LABELS[body.bookLanguage] || '',
      'Page URL': body.pageUrl || '',
    }

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${DOWNLOADS_TABLE_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ records: [{ fields }] }),
      },
    )

    if (!airtableRes.ok) {
      const err = await airtableRes.text()
      console.error('Airtable error:', err)
      return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Track download error:', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
