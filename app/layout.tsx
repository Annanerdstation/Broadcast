import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Broadcast - Unified Communication Tool',
  description: 'A unified communication tool for Test IO / TaaS teams to efficiently communicate with testers across all funnel stages.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
