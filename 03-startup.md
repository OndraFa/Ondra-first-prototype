# 03 – Startup: Get Your Machine Ready for Vibe-Coding

> **For AI agents:** This file is intended to be imported into the user’s IDE (e.g. as context or a rule) so you can help them complete the setup. When the user asks for setup or “get ready” help, use this document to guide them step by step. Assume they already have **Git**, **GitHub**, **Netlify**, **Cursor IDE**, and **this repo checked out locally**; focus only on Node.js (LTS), opening the repo folder in Cursor, and installing project dependencies when `prototype/` exists. Suggest the correct commands for their OS (macOS vs Windows) where steps differ.

---

**How to use this file:** Import or reference this file in your IDE (e.g. add it to Cursor’s context with @ or paste it into the chat) when you ask your AI agent for setup help. The agent will use it to guide you step by step.

You’ve already set up **Git**, **GitHub**, **Netlify**, and **Cursor IDE**, and you have **this repo checked out** (e.g. via the [sales-showcase how-to](https://github.com/petrbuch/sales-showcase/blob/main/how-to.md)). This guide adds what you need for **this repo**: Node.js, open the repo in Cursor, and install project dependencies when `prototype/` exists.

---

## What You’ll Do Here

| Step | Why |
|------|-----|
| **Node.js** (LTS) | Runs the Next.js app and gives you `npm` for installing libraries. |
| **Open repo in Cursor** | Open the repo folder you already have in the IDE you use. |

Optional later: **Netlify CLI** (if you deploy from your machine), **pnpm** (alternative to npm).

---

## 1. Node.js (LTS)

We use **Node.js LTS** (e.g. 20.x or 22.x) for Next.js and npm.

### macOS

**Option A – Installer (easiest)**  
1. Go to [nodejs.org](https://nodejs.org).  
2. Download the **LTS** version.  
3. Run the `.pkg` and follow the steps.  
4. Restart the terminal (or Cursor), then run:

```bash
node -v   # e.g. v20.x.x or v22.x.x
npm -v    # e.g. 10.x.x
```

**Option B – Homebrew**  
If you use Homebrew:

```bash
brew install node@20
# or: brew install node   # latest LTS
```

### Windows

1. Go to [nodejs.org](https://nodejs.org).  
2. Download the **LTS** Windows installer (`.msi`).  
3. Run it; leave “Add to PATH” checked.  
4. Restart the terminal (or Cursor), then run:

```bash
node -v   # e.g. v20.x.x or v22.x.x
npm -v    # e.g. 10.x.x
```

---

## 2. Open the Repo in Cursor

You already have the repo checked out. Open it in Cursor: **File → Open Folder** → select the `lnd-proto-training` folder (wherever you cloned it).

---

## 3. Install Project Dependencies (when `prototype/` exists)

When the **Next.js app** is in place under `prototype/`, install its libraries:

```bash
cd prototype
npm install
```

If the project uses **pnpm** instead, the repo will say so; then use `pnpm install`.

After that, the session lead will tell you how to start the dev server (e.g. `npm run dev` or `pnpm dev`).

---

## 4. Optional: Netlify CLI

Only if you’re told to deploy or manage the site from your machine:

```bash
npm install -g netlify-cli
netlify login
```

---

## Quick Checklist

- [ ] Node.js LTS installed → `node -v` and `npm -v` work  
- [ ] Repo folder opened in Cursor  
- [ ] (When applicable) `cd prototype && npm install` run successfully  

---

## If Something Fails

- **“command not found” (node, npm):** Restart the terminal (and Cursor) after installing; on Windows, ensure the Node installer added it to PATH.  
- **Permission errors (npm):** Avoid `sudo npm`. If you hit permission issues, we can fix the Node/npm path or use a version manager (nvm/fnm) in a follow-up.

Once this checklist is done, you’re ready to follow the vibe-coding instructions and work in `prototype/` with the stack described in **02-structure.md**.
