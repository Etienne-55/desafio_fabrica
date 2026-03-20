export const metadata = {
  title: 'Workshop DevOps 2026',
  description: 'Django + Next.js Docker Workshop',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
