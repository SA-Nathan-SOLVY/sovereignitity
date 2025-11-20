# Sovereignitity - Sovereign Banking Dashboard

A comprehensive financial management platform integrating VA benefits, IBC policy loans, and business revenue.

## Features

- **VA Benefits Integration** - Track and route $3,751.59 monthly payments
- **IBC Policy Loan Automation** - $8,414.76 available from OneAmerica policy
- **Business Revenue Tracking** - Evergreen Beauty Lounge integration
- **Debt Management** - Optimized repayment strategies
- **Budget Planning** - Complete household expense tracking
- **Stripe Banking** - Financial accounts for sovereign money management

## Quick Start

1. **Clone repository**
   \`\`\`bash
   git clone https://github.com/SA-Nathan-SOLVY/sovereignitity.git
   cd sovereignitity
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Setup environment**
   \`\`\`bash
   cp .env.local.example .env.local
   # Edit .env.local with your Stripe keys
   \`\`\`

4. **Setup database**
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   \`\`\`

5. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open http://localhost:3000**

## Deployment

This repository is connected to Vercel for automatic deployments.

## Technology Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe Treasury & Financial Accounts

## License

MIT