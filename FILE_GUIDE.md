# 🗺️ File Guide - What Each File Does

A quick reference guide to understand the purpose of every key file in the project.

---

## 🔧 Configuration Files (Root Directory)

### `package.json`
- **Purpose**: Project dependencies and npm scripts
- **Key Scripts**: `dev`, `build`, `db:migrate`, `db:seed`
- **When to Edit**: Adding new packages or scripts

### `tsconfig.json`
- **Purpose**: TypeScript compiler configuration
- **Key Settings**: Path aliases (`@/*`), strict mode, JSX settings
- **When to Edit**: Rarely needed

### `next.config.js`
- **Purpose**: Next.js framework configuration
- **Key Settings**: Server actions enabled
- **When to Edit**: When configuring Next.js features

### `tailwind.config.ts`
- **Purpose**: Tailwind CSS customization
- **Key Settings**: Custom colors (primary palette)
- **When to Edit**: Adding custom design tokens

### `.env.example`
- **Purpose**: Template for environment variables
- **Contents**: DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET
- **Action**: Copy to `.env` and fill in values

### `.gitignore`
- **Purpose**: Files to exclude from version control
- **Includes**: node_modules, .env, .next, build files
- **When to Edit**: Adding more files to ignore

---

## 🛡️ Security & Auth

### `middleware.ts` (Root)
- **Purpose**: Protects routes before they load
- **What it does**:
  - Checks if user is authenticated
  - Validates subscription tier
  - Redirects unauthorized users
- **Protected Routes**: `/dashboard/*`, `/api/*`
- **When to Edit**: Adding/removing protected routes

### `lib/auth.ts`
- **Purpose**: NextAuth configuration
- **What it does**:
  - Defines authentication providers (credentials)
  - Configures JWT sessions
  - Adds user tier to session
- **When to Edit**: Changing auth behavior or adding providers

### `lib/auth-guards.ts`
- **Purpose**: Server-side authentication helpers
- **Key Functions**:
  - `requireAuth()` - Ensures logged in
  - `requireSubscription(tier)` - Ensures minimum tier
  - `hasAccess()` - Checks tier access
- **Used in**: Server components and pages

### `lib/api-guards.ts`
- **Purpose**: API route protection wrappers
- **Key Functions**:
  - `withAuth(handler)` - Requires authentication
  - `withSubscription(handler, tier)` - Requires tier
- **Used in**: API route handlers

### `types/next-auth.d.ts`
- **Purpose**: TypeScript types for NextAuth
- **Extends**: User and Session types to include tier
- **When to Edit**: Adding more session data

---

## 🗄️ Database

### `prisma/schema.prisma`
- **Purpose**: Database schema definition
- **Models**:
  - `User` - User accounts
  - `Subscription` - Subscription records
- **Enums**: `SubscriptionTier` (FREE, LITE, PRO, ADVANCED)
- **When to Edit**: Changing database structure

### `prisma/seed.ts`
- **Purpose**: Populate database with test data
- **Creates**: Test users for each tier
- **Run with**: `npm run db:seed`
- **When to Edit**: Adding more seed data

### `lib/prisma.ts`
- **Purpose**: Prisma Client singleton
- **What it does**: Ensures one Prisma instance in development
- **When to Edit**: Rarely needed

---

## 🎨 Frontend - Layout & Styling

### `app/layout.tsx`
- **Purpose**: Root layout for entire app
- **Wraps**: All pages with common structure
- **Includes**: Metadata, font, SessionProvider
- **When to Edit**: Adding global providers or layout

### `app/providers.tsx`
- **Purpose**: Client-side providers wrapper
- **Provides**: NextAuth session context
- **When to Edit**: Adding more global providers

### `app/globals.css`
- **Purpose**: Global CSS styles
- **Includes**: Tailwind directives, custom utilities
- **When to Edit**: Adding global styles

### `components/Sidebar.tsx`
- **Purpose**: Dashboard navigation sidebar
- **Features**:
  - Navigation links with icons
  - Active state highlighting
  - Tier-based lock icons
  - User profile display
- **When to Edit**: Adding/removing navigation items

### `components/icons.tsx`
- **Purpose**: Custom SVG icon components
- **Icons**: Home, Document, Chart, Cog, Logout, Sparkles
- **When to Edit**: Adding new icons

---

## 📱 Pages - Public

### `app/page.tsx`
- **Purpose**: Landing page (homepage)
- **Features**:
  - Hero section
  - Features grid
  - Pricing preview
  - Call-to-action buttons
- **Redirects**: Logged-in users to dashboard
- **When to Edit**: Customizing landing page

### `app/login/page.tsx`
- **Purpose**: User login page
- **Features**:
  - Email/password form
  - Error handling
  - Sign up link
- **Client Component**: Yes (uses useState, form handling)
- **When to Edit**: Customizing login UI/UX

### `app/signup/page.tsx`
- **Purpose**: User registration page
- **Features**:
  - Full name, email, password fields
  - Password confirmation
  - Input validation
- **Client Component**: Yes
- **When to Edit**: Adding more signup fields

---

## 📱 Pages - Dashboard

### `app/dashboard/layout.tsx`
- **Purpose**: Dashboard layout wrapper
- **Includes**: Sidebar + main content area
- **Applied to**: All `/dashboard/*` pages
- **When to Edit**: Changing dashboard structure

### `app/dashboard/page.tsx`
- **Purpose**: Dashboard home page
- **Tier Required**: Any (but FREE redirected to upgrade)
- **Features**:
  - Welcome message
  - Stats cards
  - Quick actions
- **When to Edit**: Customizing dashboard home

### `app/dashboard/analytics/page.tsx`
- **Purpose**: Analytics dashboard
- **Tier Required**: LITE or higher
- **Features**:
  - Chart placeholders
  - Metrics table
  - Tier notice
- **When to Edit**: Adding real analytics

### `app/dashboard/pro/page.tsx`
- **Purpose**: Pro features showcase
- **Tier Required**: PRO or higher
- **Features**:
  - Feature lists
  - Upgrade notice
- **When to Edit**: Adding pro features

### `app/dashboard/settings/page.tsx`
- **Purpose**: User settings page
- **Tier Required**: Any authenticated user
- **Sections**:
  - Profile information
  - Security (password change)
  - Subscription info
- **When to Edit**: Adding more settings

### `app/dashboard/upgrade/page.tsx`
- **Purpose**: Pricing and upgrade page
- **Tier Required**: Any authenticated user
- **Features**:
  - All tier pricing cards
  - Feature comparison
  - CTA buttons
- **When to Edit**: Updating pricing or features

### `app/dashboard/docs/page.tsx`
- **Purpose**: Documentation index page
- **Features**:
  - Sidebar with doc list
  - Quick links to docs
- **When to Edit**: Customizing docs landing

### `app/dashboard/docs/[slug]/page.tsx`
- **Purpose**: Dynamic documentation pages
- **Features**:
  - Renders markdown files
  - Sidebar navigation
  - Syntax highlighting
- **When to Edit**: Changing markdown rendering

---

## 🔌 API Routes

### `app/api/auth/[...nextauth]/route.ts`
- **Purpose**: NextAuth API handler
- **Handles**: Login, logout, session endpoints
- **Auto-generated**: By NextAuth
- **When to Edit**: Rarely needed

### `app/api/auth/signup/route.ts`
- **Purpose**: User registration endpoint
- **Method**: POST
- **What it does**:
  - Validates input with Zod
  - Hashes password
  - Creates user with FREE subscription
- **When to Edit**: Adding signup logic

### `app/api/user/profile/route.ts`
- **Purpose**: Get user profile
- **Method**: GET
- **Protection**: `withAuth()` - requires login
- **Returns**: User data from session
- **When to Edit**: Adding more profile data

### `app/api/user/usage/route.ts`
- **Purpose**: Get usage statistics
- **Method**: GET
- **Protection**: `withSubscription("LITE")`
- **Returns**: Mock usage data
- **When to Edit**: Implementing real usage tracking

### `app/api/analytics/route.ts`
- **Purpose**: Advanced analytics data
- **Method**: GET
- **Protection**: `withSubscription("PRO")`
- **Returns**: Mock analytics data
- **When to Edit**: Adding real analytics

### `app/api/health/route.ts`
- **Purpose**: API health check
- **Method**: GET
- **Protection**: `withAuth()`
- **Returns**: API status and user info
- **When to Edit**: Adding health checks

---

## 📚 Documentation (Markdown)

### `docs/getting-started.md`
- **Purpose**: User guide for getting started
- **Sections**:
  - Quick start steps
  - Tier descriptions
  - Support info
- **When to Edit**: Updating getting started guide

### `docs/api-reference.md`
- **Purpose**: API documentation
- **Sections**:
  - Authentication
  - Endpoints
  - Rate limits
  - Error codes
- **When to Edit**: Documenting new APIs

> **Note**: Any `.md` file added to `/docs` automatically appears in the documentation section!

---

## 📖 Project Documentation

### `README.md`
- **Purpose**: Main project documentation
- **Sections**:
  - Features overview
  - Project structure
  - Getting started guide
  - Database schema
  - API routes
  - Development guide
  - Deployment guide
- **Audience**: Developers working on the project

### `QUICKSTART.md`
- **Purpose**: Rapid setup guide
- **Sections**:
  - Step-by-step setup
  - Test users
  - Common commands
  - Troubleshooting
- **Audience**: New developers getting started

### `ARCHITECTURE.md`
- **Purpose**: System design documentation
- **Sections**:
  - Architecture diagrams
  - Data flow
  - File organization
  - Security features
  - Scalability
- **Audience**: Architects and senior developers

### `CHECKLIST.md`
- **Purpose**: Setup verification checklist
- **Sections**:
  - Installation checklist
  - Feature testing
  - Code quality checks
  - Production readiness
- **Audience**: Anyone setting up the project

### `PROJECT_SUMMARY.md`
- **Purpose**: Complete implementation overview
- **Sections**:
  - Delivered features
  - Tech stack
  - Quick reference
  - Extension guide
- **Audience**: Project stakeholders and developers

### `FILE_GUIDE.md`
- **Purpose**: This file! File-by-file explanation
- **Audience**: Developers learning the codebase

---

## 🎯 Quick Reference: When to Edit What

### Adding a New Feature
1. Create page in `app/dashboard/your-feature/page.tsx`
2. Add navigation in `components/Sidebar.tsx`
3. (Optional) Add API in `app/api/your-endpoint/route.ts`

### Changing Authentication
1. Edit `lib/auth.ts` for auth config
2. Edit `middleware.ts` for route protection
3. Edit `lib/auth-guards.ts` for guards

### Modifying Database
1. Edit `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Update seed data in `prisma/seed.ts`

### Adding Documentation
1. Create `docs/your-topic.md`
2. Write content in Markdown
3. It automatically appears in docs!

### Customizing Design
1. Edit `tailwind.config.ts` for colors/themes
2. Edit `app/globals.css` for global styles
3. Update components for specific changes

### Changing Subscription Tiers
1. Edit `prisma/schema.prisma` enum
2. Update `lib/auth-guards.ts` hierarchy
3. Update pricing in `app/dashboard/upgrade/page.tsx`

---

## 🔍 Finding Things Fast

### "Where is the authentication logic?"
- **Config**: `lib/auth.ts`
- **Protection**: `middleware.ts`
- **Guards**: `lib/auth-guards.ts`
- **Login**: `app/login/page.tsx`
- **Signup**: `app/signup/page.tsx`

### "Where are the protected pages?"
- **All in**: `app/dashboard/*`
- **Layout**: `app/dashboard/layout.tsx`
- **Navigation**: `components/Sidebar.tsx`

### "Where are the API endpoints?"
- **All in**: `app/api/*`
- **Guards**: `lib/api-guards.ts`

### "Where is the database stuff?"
- **Schema**: `prisma/schema.prisma`
- **Client**: `lib/prisma.ts`
- **Seed**: `prisma/seed.ts`

### "Where are the subscription checks?"
- **Server**: `lib/auth-guards.ts`
- **API**: `lib/api-guards.ts`
- **Middleware**: `middleware.ts`

---

## 📊 File Importance Levels

### 🔴 Critical - Don't Delete
- `middleware.ts`
- `lib/auth.ts`
- `lib/auth-guards.ts`
- `lib/prisma.ts`
- `prisma/schema.prisma`
- `package.json`
- `tsconfig.json`

### 🟡 Important - Modify Carefully
- `app/layout.tsx`
- `app/dashboard/layout.tsx`
- `components/Sidebar.tsx`
- `lib/api-guards.ts`
- `types/next-auth.d.ts`

### 🟢 Safe to Customize
- All page files (`*/page.tsx`)
- Documentation files (`docs/*.md`)
- `app/globals.css`
- `tailwind.config.ts`
- Project documentation files

---

## 🎓 Learning Path

### Day 1: Understanding the Basics
1. Read `README.md`
2. Follow `QUICKSTART.md`
3. Explore `app/page.tsx` (landing)
4. Check `app/login/page.tsx`

### Day 2: Authentication Flow
1. Study `lib/auth.ts`
2. Understand `middleware.ts`
3. Review `lib/auth-guards.ts`
4. Test login/signup flow

### Day 3: Dashboard & Protection
1. Explore `app/dashboard/layout.tsx`
2. Study `components/Sidebar.tsx`
3. Review protected pages
4. Understand tier checking

### Day 4: Database & API
1. Study `prisma/schema.prisma`
2. Review API routes
3. Understand `lib/api-guards.ts`
4. Test API endpoints

### Day 5: Customization
1. Modify a page
2. Add a new route
3. Create documentation
4. Customize styling

---

## 💡 Pro Tips

1. **Use the guards**: Always use `requireAuth()` or `requireSubscription()` in pages
2. **Check middleware**: Understand what routes are protected
3. **Read comments**: Key files have helpful comments
4. **Test tiers**: Use seed data to test different tiers
5. **Follow patterns**: Look at existing code for patterns to follow

---

## 🎯 Common Tasks & Files

| Task | Files to Check |
|------|---------------|
| Change login form | `app/login/page.tsx` |
| Add dashboard page | `app/dashboard/your-page/page.tsx` |
| Protect new page | `lib/auth-guards.ts`, page file |
| Add API endpoint | `app/api/your-endpoint/route.ts` |
| Protect API route | `lib/api-guards.ts` |
| Change database | `prisma/schema.prisma` |
| Add navigation | `components/Sidebar.tsx` |
| Style changes | `tailwind.config.ts`, `app/globals.css` |
| Add docs | `docs/your-doc.md` |
| Configure auth | `lib/auth.ts` |

---

**This guide should help you quickly navigate and understand the codebase!** 🎉

Remember: When in doubt, check the documentation files and code comments!
