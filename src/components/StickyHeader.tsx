'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { Button } from '@/components/Button'
import { bookFiles, LanguageDownloadDropdown } from '@/components/LanguageDownloadDropdown'

export function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false)
  const locale = useLocale()
  const t = useTranslations('hero')
  const files = bookFiles[locale] || bookFiles.nl

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <span className="text-sm font-medium text-white sm:text-base hidden sm:block">
          {t('title')}
        </span>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button href={files.epub} color="white" className="text-sm">
            {t('downloadEpub')}
          </Button>
          <Button href={files.pdf} variant="outline" color="white" className="text-sm">
            {t('downloadPdf')}
          </Button>
          <LanguageDownloadDropdown />
        </div>
      </div>
    </div>
  )
}
