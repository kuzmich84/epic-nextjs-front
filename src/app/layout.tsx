import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getGlobalData, getGlobalPageMetadata } from '@/data/loaders'
import { Header } from '@/components/custom/header'
import { Footer } from '@/components/custom/footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata()

  return {
    title: metadata?.title,
    description: metadata.description,
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const globalData = await getGlobalData()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-center" />
        <Header data={globalData.header} />
        {children}
        <Footer data={globalData.footer} />
      </body>
    </html>
  )
}
