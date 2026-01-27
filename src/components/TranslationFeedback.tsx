import { useTranslations } from 'next-intl'

export function TranslationFeedback() {
  const t = useTranslations('translationFeedback')

  return (
    <section className="bg-slate-100 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base text-slate-600">
            {t('text')}{' '}
            <a
              href={`mailto:${t('email')}`}
              className="font-medium text-slate-900 underline hover:text-slate-700"
            >
              {t('email')}
            </a>
            . {t('suffix')}
          </p>
        </div>
      </div>
    </section>
  )
}
