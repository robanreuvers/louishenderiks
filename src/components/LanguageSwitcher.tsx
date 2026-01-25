'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export function LanguageSwitcher() {
  const t = useTranslations('language')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = () => {
    const newLocale = locale === 'nl' ? 'en' : 'nl'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <button
      onClick={switchLocale}
      className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      <span className="text-base">🌐</span>
      {t('switchTo')}
    </button>
  )
}
