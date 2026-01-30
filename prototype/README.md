# Travel Insurance Broker - Next.js Prototype

This is the Next.js 15 prototype application for the Travel Insurance Broker.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19
- **TypeScript**: 5.3
- **UI**: Mantine 7, Tailwind CSS 4
- **Forms**: react-hook-form + Zod
- **Animations**: Framer Motion
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js LTS (20.x or 22.x)
- npm or pnpm

### Installation

```bash
cd prototype
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
prototype/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── onboarding/        # Onboarding flow
│   ├── login/             # Login page
│   └── layout.tsx          # Root layout
├── components/            # React components
│   └── ui/                # UI components
├── lib/                   # Utilities and helpers
│   ├── contexts/          # React contexts
│   ├── design-system/     # Design tokens
│   ├── email-templates/    # Email templates
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
└── public/                 # Static assets
```

## Features

- Multi-step insurance form
- Policy management
- Client dashboard
- Contract generation
- PDF download

## Deployment

The app is configured for Netlify deployment. See `netlify.toml` for configuration.
