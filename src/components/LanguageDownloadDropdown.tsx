'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const bookFiles: Record<string, { pdf: string; epub: string; label: string }> = {
  nl: {
    pdf: '/books/Hotel-met-Duizend-Sterren-Print.pdf',
    epub: '/books/Hotel-met-Duizend-Sterren.epub',
    label: 'Nederlands',
  },
  en: {
    pdf: '/books/Hotel-with-a-Thousand-Stars-Print.pdf',
    epub: '/books/Hotel-with-a-Thousand-Stars.epub',
    label: 'English',
  },
  de: {
    pdf: '/books/Hotel-mit-tausend-Sternen-Print.pdf',
    epub: '/books/Hotel-mit-tausend-Sternen.epub',
    label: 'Deutsch',
  },
  es: {
    pdf: '/books/Hotel-de-Mil-Estrellas-Print.pdf',
    epub: '/books/Hotel-de-Mil-Estrellas.epub',
    label: 'Español',
  },
}

export { bookFiles }

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function LanguageDownloadDropdown({ compact = false }: { compact?: boolean }) {
  const locale = useLocale()
  const t = useTranslations('hero')
  const otherLanguages = Object.entries(bookFiles).filter(([code]) => code !== locale)

  return (
    <Menu as="div" className="relative">
      <MenuButton className="inline-flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium text-white hover:cursor-pointer hover:underline">
        {compact ? (
          <span>🌐</span>
        ) : (
          <>
            <span className="inline">{t('otherLanguages')}</span>
          </>
        )}
        <ChevronDownIcon className="h-4 w-4" />
      </MenuButton>
      <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="py-1">
          {otherLanguages.map(([code, data]) => (
            <div key={code} className="px-3 py-2">
              <p className="text-xs font-semibold text-slate-500">
                {data.label}
              </p>
              <div className="mt-1 flex gap-2">
                <MenuItem>
                  <a
                    href={data.epub}
                    className="text-sm text-slate-700 hover:text-slate-900 hover:underline data-[focus]:bg-slate-100"
                  >
                    EPUB
                  </a>
                </MenuItem>
                <span className="text-slate-300">|</span>
                <MenuItem>
                  <a
                    href={data.pdf}
                    className="text-sm text-slate-700 hover:text-slate-900 hover:underline data-[focus]:bg-slate-100"
                  >
                    PDF
                  </a>
                </MenuItem>
              </div>
            </div>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
