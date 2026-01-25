import { setRequestLocale } from 'next-intl/server'

import { Author } from '@/components/Author'
import { Community } from '@/components/Community'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Introduction } from '@/components/Introduction'
import { Testimonials } from '@/components/Testimonials'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <Introduction />
      <Community />
      <Author />
      <Testimonials />
      <Footer />
    </>
  )
}
