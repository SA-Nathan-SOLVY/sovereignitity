import './globals.css'

export const metadata = {
  title: 'SOVEREIGNITITY™ - Sovereign Banking Platform',
  description: 'VA Benefits + IBC Policy Loans + Business Integration',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}