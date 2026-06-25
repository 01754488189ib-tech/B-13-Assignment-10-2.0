# Fable — Digital Ebook Sharing Platform

Fable is a digital platform connecting ebook lovers, collectors, and independent writers. Readers can browse catalog books, wishlist titles, and purchase original manuscripts. Verified writers can easily publish work, toggle item visibility, and trace royalty details, while system administrators oversee transaction ledgers and account clearances.

## Live Project Deployment

- Deployed Live Site: https://fable-plum-nine.vercel.app
- Live Backend REST API: https://fable-backend.vercel.app

## Core Functional Features

- **BetterAuth Integration**: Secure email/password configurations, session streaming, and Google Social OAuth.
- **Demo Portal Access**: Side-by-side quick login credentials for Reader, Writer, and Admin testing.
- **Stripe Sandbox Checkout**: Dynamic checkout sessions for book purchases and writer publishing verifications.
- **Unrestricted Admin Override**: Administrative bypass enabling superusers to read book contents on details pages.
- **Server-Side Filtering & Sorting**: Multi-tier catalog filters supporting search, genre categories, price bounds, and stock checks.
- **Writer Ebooks Management**: Paginated table rendering, dynamic status toggling, and complete manuscript editing.
- **Interactive Leaderboard**: Real-time sales-based aggregation rendering the top three literary pioneers.
- **Sleek Skeletons**: Fallback skeleton loading screens for route navigations, tables, and browse cards.
- **Global Theme Switcher**: Lightweight visual light/dark toggle persisting user selections via localStorage.

## NPM Packages Installed

- `@heroui/react`
- `better-auth`
- `stripe`
- `mongodb`
- `motion`
- `@gravity-ui/icons`
- `lucide-react`

## Environment Variables Configuration (.env.local)

To run this Next.js frontend project locally, create a `.env.local` file in your root folder and define the following variables:

```env
MONGO_DB_URI=your_mongodb_connection_string
AUTH_DB_NAME=b_13_assignment_10
BETTER_AUTH_SECRET=your_better_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:5001
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_imgbb_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret