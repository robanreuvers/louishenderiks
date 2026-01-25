import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/Button'
import coverImage from '@/images/cover.jpg'
import heroBg from '@/images/hero-bg.jpg'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <header className="relative overflow-visible">
      <div className="absolute inset-0">
        <Image
          src={heroBg}
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-24 sm:px-6 lg:flex lg:items-end lg:gap-16 lg:px-8 lg:pt-24 lg:pb-16">
        <div className="flex justify-center lg:flex-shrink-0 lg:translate-y-24">
          <div className="relative w-72 rounded-xl shadow-2xl md:w-80 lg:w-md">
            <Image
              className="w-full rounded-xl"
              src={coverImage}
              alt=""
              priority
            />
          </div>
        </div>

        <div className="mt-12 text-center lg:mt-0 lg:text-left">
          <span className="inline-block rounded-full bg-amber-500 px-4 py-1.5 text-sm font-semibold text-slate-900">
            {t('freeBook')}
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-xl text-slate-200 sm:text-2xl">
            {t('subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button href="#download" color="white">
              {t('downloadPdf')}
            </Button>
            <Button href="#download" variant="outline" color="white">
              {t('downloadEpub')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
