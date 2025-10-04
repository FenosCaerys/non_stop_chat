import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/providers/AuthProvider'
import PWAInstaller from '@/components/PWAInstaller'
import MessageNotification from '@/components/notifications/MessageNotification'
import SessionDebug from '@/components/debug/SessionDebug'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NonStop Chat | Caerys',
  description: 'Application de messagerie en temps réel',
  manifest: '/manifest.json',
  themeColor: '#3b82f6',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'NonStop Chat',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'NonStop Chat',
    title: 'NonStop Chat | Caerys',
    description: 'Application de messagerie en temps réel',
  },
  twitter: {
    card: 'summary',
    title: 'NonStop Chat | Caerys',
    description: 'Application de messagerie en temps réel',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NonStop Chat" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icons/icon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/icon-96x96.png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <MessageNotification />
          <SessionDebug />
          <PWAInstaller />
        </AuthProvider>
      </body>
    </html>
  )
}
