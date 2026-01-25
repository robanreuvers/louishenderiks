import { useTranslations } from 'next-intl'

import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'

export function Introduction() {
  const t = useTranslations('introduction')

  return (
    <section
      id="introduction"
      aria-label="Introduction"
      className="pt-32 pb-16 sm:pb-20 md:pt-44 lg:pt-48 lg:pb-32"
    >
      <Container className="text-lg tracking-tight text-slate-700">
        <SectionHeading number="1" id="introduction-title">
          {t('label')}
        </SectionHeading>
        <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
          {t('title')}
        </p>
        <p className="mt-4">{t('paragraph1')}</p>
        <p className="mt-4">{t('paragraph2')}</p>
        <p className="mt-4">{t('paragraph3')}</p>
      </Container>
    </section>
  )
}
