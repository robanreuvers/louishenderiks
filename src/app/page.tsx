import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const locales = ['nl', 'en', 'fr', 'de', 'es']
const defaultLocale = 'nl'

function getPreferredLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale

  const preferred = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0].trim().substring(0, 2).toLowerCase())
    .find((lang) => locales.includes(lang))

  return preferred || defaultLocale
}

export default async function RootPage() {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')
  const locale = getPreferredLocale(acceptLanguage)
  redirect(`/${locale}`)
}
