# Fable — Ebook Sharing Platform

Fable is a high-fidelity digital ecosystem designed to connect ebook lovers, avid readers, and collectors with talented writers. Readers can browse, search, and purchase original indie manuscripts securely via Stripe. Writers can publish, unpublish, modify, and delete their creations once verified by a one-time verification fee.

## Key Features

* **Role-Based Workspaces:** Contextual dashboards for Readers (User), Authors (Writers), and Platform Administrators.
* **Secured Session Handlers:** Session validation and Google OAuth flows managed by BetterAuth.
* **Encrypted Stripe Billing:** One-time Stripe payment integration for both book checkouts and lifelong publishing verification upgrades.
* **Modular Search Catalog:** Explore publications with real-time text searches, genre selection tags, price min-max inputs, availability toggles, and sorting options.
* **Interactive Media uploads:** Client-side file uploading streaming ebook covers straight to the ImgBB CDN.
* **Premium Dark Mode Visuals:** Aesthetic layout styled with Tailwind CSS, HeroUI, and Framer Motion staggered reveals.

## Deployed Environments

* **Next.js Client (Vercel):** `https://fable-ebooks.vercel.app` (Placeholder)
* **Express.js API Server (Render):** `https://fable-server.onrender.com` (Placeholder)

## Tech Stack & npm Packages

### Next.js Frontend Client
* **Core:** Next.js, React, React DOM
* **Database & Auth:** BetterAuth, @better-auth/mongo-adapter, MongoDB Driver
* **Payment Processor:** @stripe/stripe-js, Stripe SDK
* **Styling & UI:** Tailwind CSS, @heroui/react, @heroui/styles, next-themes
* **Motion Graphics:** Motion (Framer Motion)
* **Iconographies:** @gravity-ui/icons, lucide-react

### Express.js Backend Server
* **Framework:** Express.js
* **Utilities:** Cors, Dotenv, MongoDB Driver

---
Developed with clean code alignment, structured grid spacing, and descriptive Git micro-commit histories.