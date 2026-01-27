import { setRequestLocale } from 'next-intl/server'

import { Author } from '@/components/Author'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Introduction } from '@/components/Introduction'
import { StickyHeader } from '@/components/StickyHeader'
import { TranslationFeedback } from '@/components/TranslationFeedback'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <StickyHeader />
      <Hero />
      <Introduction />
      <Author />
      <TranslationFeedback />
      <Footer />
    </>
  )
}
