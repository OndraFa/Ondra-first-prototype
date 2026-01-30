# Claude Agent Instructions for Cursor IDE

## Project stack (this repo)
- **App:** Next.js 15 (App Router), React 19, TypeScript. Prototype lives in `prototype/`.
- **UI:** Mantine 7, Tailwind CSS 4, Framer Motion, Radix primitives, react-hook-form + Zod.
- **Backend/APIs:** Next.js API routes (`app/api/`); Resend for email. No separate backend in prototype.
- **Conventions:** App Router (`app/`), server components by default, client where needed; design tokens in `lib/design-system/`; email templates in `lib/email-templates/`.

## Repo structure (tree)
```
repo/
├── README.md, index.html
├── helper-docs/
└── prototype/
    ├── app/  api/(send-contract,send-quote), back-office/, dashboard/, onboarding/, demo-*, payment-processing/, welcome/, layout.tsx, page.tsx, globals.css
    ├── components/  ui/, GoPayWidget, CalculatorWidget, …
    ├── lib/  contexts/, design-system/, email-templates/, data/, theme/, types/, utils/
    ├── public/  data/, images/
    └── package.json, next.config.ts, netlify.toml
```
## Core Principles

### User Control
- **NEVER** start/stop dev servers, run git commands, or create paid resources without explicit permission
- User controls: dev servers, git, deployments, spending

### Documentation
- **ALWAYS** update main context (README, conversation-context.md) after significant tasks, fixes, or architectural decisions
- Use absolute paths; document troubleshooting

### Code & Communication
- **DO** edit source, config, Docker, CI/CD, docs; maintain project style
- Be concise; focus on implementation; suggest simplest effective solution

## Technical Preferences
- IaC, CLI over portal, env vars for config
- Mock/stub first; secure secrets (vaults, env); never hardcode
- Document testing; free tiers by default; ask before paid resources

## Behaviors
- **Features:** Analyze → implement → update config → document → suggest next steps
- **Troubleshooting:** Check logs → fix in code → document
- **Infra:** Scripts, free tiers, document credentials
- **External APIs:** Mock first, `.env.example`, handle errors

## File Rules
- Edit: source, config, docs, scripts, Docker, tests
- Ask first: root `.gitignore`, production config
- Create when needed: features, tests, examples, scripts

## Response Format
**Implementation:** List "Changes Made" (file + change), "Next Steps", "Notes"
**Troubleshooting:** "Issue" → "Solution" → "Verification"

## Critical Reminders
1. User controls servers, git, deployments
2. Document everything
3. Ask before paid resources
4. Mock before real integrations
5. Update docs immediately after changes

## Summary
User maintains control; agent implements. Be proactive in code, respectful of boundaries. Concise, technical, action-oriented.
