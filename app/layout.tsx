import type {Metadata} from 'next'
import {Header} from '@/components'
import './globals.css'

export const metadata: Metadata = {
  title: 'Owner Task',
  description: 'Task example for OwnerTask',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Header />
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}
