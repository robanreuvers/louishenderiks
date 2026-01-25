import { useTranslations } from 'next-intl'

import { GridPattern } from '@/components/GridPattern'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="relative pt-5 pb-20 sm:pt-14 sm:pb-32">
      <div className="absolute inset-x-0 top-0 h-32 mask-[linear-gradient(white,transparent)] text-slate-900/10">
        <GridPattern x="50%" />
      </div>
      <div className="relative text-center text-sm text-slate-600">
        <div className="mb-4">
          <LanguageSwitcher />
        </div>
        <p>
          {t('copyright')} &copy; {new Date().getFullYear()} Louis Henderiks
        </p>
        <p>{t('allRightsReserved')}</p>
      </div>
    </footer>
  )
}
