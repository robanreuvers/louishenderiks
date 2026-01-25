import { type Metadata } from 'next'
import { Lora, Playfair_Display } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

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

export const metadata: Metadata = {
  title: 'Hotel met Duizend Sterren',
  description: 'Een autobiografische reis door Europa, het Midden-Oosten en Afrika.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        lora.variable,
        playfair.variable,
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
