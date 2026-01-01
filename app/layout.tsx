import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sumit Deolia - Software Developer | Full-Stack Engineer',
  description: 'Passionate software developer specializing in full-stack web development and mobile app development. Experienced in React.js, Next.js, JavaScript, and Kotlin. View my portfolio, projects, and experience.',
  keywords: ['Sumit Deolia', 'Software Developer', 'Full-Stack Developer', 'React Developer', 'Web Developer', 'Portfolio'],
  authors: [{ name: 'Sumit Deolia' }],
  creator: 'Sumit Deolia',
  openGraph: {
    type: 'website',
    title: 'Sumit Deolia - Software Developer Portfolio',
    description: 'Explore my portfolio featuring innovative projects in web development, AI, and software engineering.',
    siteName: 'Sumit Deolia Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumit Deolia - Software Developer',
    description: 'Full-stack developer passionate about creating efficient, user-friendly applications.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `html {\n  font-family: ${GeistSans.style.fontFamily};\n  --font-sans: ${GeistSans.variable};\n  --font-mono: ${GeistMono.variable};\n}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
