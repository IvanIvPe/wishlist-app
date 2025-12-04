import React from 'react'
import '@/app/globals.css'
import Navbar from '@/app/components/Navbar/Navbar'
import Footer from '@/app/components/Footer/Footer'
import ToastProvider from '@/app/components/Toast/Toast'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ flex: 10 }}>
          {children}
        </main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
} 