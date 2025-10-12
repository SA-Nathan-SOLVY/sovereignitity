import './globals.css'

export const metadata = {
  title: 'Sovereignitity - Sovereign Banking Dashboard',
  description: 'Integrated VA Benefits + IBC Policy Loans + Business Revenue Management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}