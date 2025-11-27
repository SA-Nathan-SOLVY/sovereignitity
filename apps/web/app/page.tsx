import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>SOLVY Web App</h1>
      <p>Welcome to the SOLVY NFC payment demo.</p>
      <nav>
        <ul>
          <li>
            <Link href="/nfc-demo">NFC Payment Demo</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
