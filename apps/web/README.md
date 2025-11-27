# SOLVY Web - NFC Demo

This folder contains a small NFC payment demo page and supporting files:

- `pages/nfc-demo.tsx` — demo page that mounts the `NFCPaymentFlow` component
- `components/nfc/nfc-payment-flow.tsx` — NFC UI component
- `hooks/useNFC.ts` — React hook wrapper around the `SOLVYNFCManager`
- `lib/nfc/solvy-nfc-manager.ts` — in-memory NFC manager (simulated)
- `types/nfc.ts` — TypeScript interfaces used by the NFC flow

Quick start (recommended if this is a Next.js app):

1. From the `apps/web` folder, install dependencies (if you don't already have them):

```bash
cd apps/web
# choose one package manager
npm init -y
npm install react react-dom next
npm install -D typescript @types/react @types/node
```

2. Add a minimal `tsconfig.json` if you don't have one:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": "."
  }
}
```

3. Add scripts to `package.json` (if using Next):

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "type-check": "tsc --noEmit"
}
```

4. Run the dev server and open the demo:

```bash
npm run dev
# then open http://localhost:3000/nfc-demo
```

Notes

- I added a temporary `types/shims-react.d.ts` in this repo to allow quick tsc checks without installing full dependencies; remove it once you install `@types/react`.
- If your monorepo uses workspace-level tooling (pnpm/workspaces), adapt the commands accordingly.

If you want, I can:

- Install dependencies inside `apps/web` and run the dev server now, or
- Wire the demo into an existing frontend route, or
- Commit these demo files to a new branch and open a PR.
