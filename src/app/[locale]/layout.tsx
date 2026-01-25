import { type Metadata } from 'next'
import { Lora, Playfair_Display } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import { routing } from '@/i18n/routing'

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const messages = (await import(`../../../messages/${locale}.json`)).default

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'nl')) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        lora.variable,
        playfair.variable,
      )}
    >
      <head></head>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
