export const metadata = {
  title: 'SOLVY NFC Payment Demo',
  description: 'NFC payment flow demo for SOLVY debit card',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
