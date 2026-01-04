# Project Architecture

## Overview

This is a modern B2B SaaS application built with Next.js 14 (App Router) featuring authentication, subscription-based access control, and a comprehensive dashboard.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  Next.js App Router + TypeScript + Tailwind CSS             │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Public      │  │  Auth        │  │  Dashboard   │     │
│  │  Pages       │  │  Pages       │  │  Pages       │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Middleware Layer                        │
│  - Route Protection                                          │
│  - Authentication Check                                      │
│  - Subscription Validation                                   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (API Routes)                      │
│  Next.js API Routes + NextAuth                              │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Auth        │  │  User        │  │  Analytics   │     │
│  │  Endpoints   │  │  Endpoints   │  │  Endpoints   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Database Layer                            │
│  PostgreSQL + Prisma ORM                                     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  User        │  │  Subscription│                        │
│  │  Model       │  │  Model       │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow
```
User Input → Login Page → NextAuth API → Database → JWT Session → Dashboard
```

### Protected Route Flow
```
Request → Middleware → Auth Check → Subscription Check → Page/API
```

### Subscription Validation Flow
```
User Request → Get Session → Check Tier → Compare Required Tier → Allow/Deny
```

## Key Components

### 1. Authentication System
- **NextAuth.js** for credential-based authentication
- **bcrypt** for password hashing
- **JWT** sessions for maintaining user state
- **Middleware** for route protection

### 2. Authorization System
- **Tier-based access control** (FREE, LITE, PRO, ADVANCED)
- **Server-side guards** (`requireAuth`, `requireSubscription`)
- **API guards** (`withAuth`, `withSubscription`)
- **Subscription status validation**

### 3. Database Schema
```
User (1) ─────► (1) Subscription
  ├─ id
  ├─ email
  ├─ password (hashed)
  ├─ name
  └─ timestamps
                      ├─ id
                      ├─ userId
                      ├─ tier (enum)
                      ├─ status
                      └─ timestamps
```

## File Organization

### `/app` - Application Routes
```
app/
├── api/                    # API endpoints
│   ├── auth/              # Authentication APIs
│   ├── user/              # User-related APIs
│   └── analytics/         # Analytics APIs
├── dashboard/             # Protected dashboard pages
│   ├── analytics/         # Analytics page (LITE+)
│   ├── docs/              # Documentation section
│   ├── pro/               # Pro features (PRO+)
│   ├── settings/          # User settings
│   └── upgrade/           # Pricing page
├── login/                 # Login page
├── signup/                # Signup page
└── page.tsx               # Landing page
```

### `/lib` - Utilities & Configurations
```
lib/
├── auth.ts               # NextAuth configuration
├── auth-guards.ts        # Server-side authentication guards
├── api-guards.ts         # API route protection
└── prisma.ts             # Prisma client singleton
```

### `/components` - Reusable Components
```
components/
├── Sidebar.tsx           # Dashboard navigation
└── icons.tsx             # Custom SVG icons
```

### `/prisma` - Database
```
prisma/
├── schema.prisma         # Database schema
├── seed.ts               # Database seeding script
└── tsconfig.json         # TypeScript config for Prisma
```

## Access Control Matrix

| Feature                    | FREE | LITE | PRO | ADVANCED |
|---------------------------|------|------|-----|----------|
| Authentication            | ✓    | ✓    | ✓   | ✓        |
| Basic Dashboard           | ✓    | ✓    | ✓   | ✓        |
| Documentation             | ✓    | ✓    | ✓   | ✓        |
| Settings                  | ✓    | ✓    | ✓   | ✓        |
| Analytics Dashboard       | ✗    | ✓    | ✓   | ✓        |
| Usage API                 | ✗    | ✓    | ✓   | ✓        |
| Pro Features              | ✗    | ✗    | ✓   | ✓        |
| Advanced Analytics API    | ✗    | ✗    | ✓   | ✓        |
| Enterprise Features       | ✗    | ✗    | ✗   | ✓        |

## Security Features

### 1. Password Security
- Passwords hashed with bcrypt (12 rounds)
- Never stored in plain text
- Password validation on signup

### 2. Session Security
- JWT tokens with httpOnly cookies
- Secure session management
- Automatic session expiration

### 3. Route Protection
- Middleware-level protection
- Server-side authentication checks
- Subscription validation before page render

### 4. API Security
- Authentication required for all protected endpoints
- Tier-based endpoint access
- Input validation with Zod

### 5. Database Security
- Prepared statements via Prisma
- SQL injection protection
- Type-safe queries

## Extension Points

### Adding New Features

1. **New Subscription Tier**
   - Update `SubscriptionTier` enum in `prisma/schema.prisma`
   - Add to `TIER_HIERARCHY` in `lib/auth-guards.ts`
   - Update pricing page

2. **New Protected Page**
   - Create page in `app/dashboard/`
   - Add `requireSubscription("TIER")` guard
   - Add navigation link in `components/Sidebar.tsx`

3. **New API Endpoint**
   - Create route in `app/api/`
   - Wrap handler with `withAuth` or `withSubscription`
   - Define required tier

4. **Payment Integration**
   - Add payment provider (Stripe/Paddle)
   - Create checkout flow
   - Handle webhooks for subscription updates
   - Update subscription records

## Performance Considerations

- **Server-side rendering** for better SEO and initial load
- **Static generation** for documentation pages
- **Optimistic UI updates** for better UX
- **Database connection pooling** via Prisma
- **JWT sessions** to reduce database queries

## Scalability

The architecture supports:
- Horizontal scaling (stateless)
- Database read replicas
- CDN for static assets
- API rate limiting (ready to implement)
- Caching strategies (ready to implement)

## Future Enhancements

- [ ] Email service integration
- [ ] Payment processing (Stripe)
- [ ] Two-factor authentication
- [ ] API key management
- [ ] Webhook system
- [ ] Advanced analytics
- [ ] Team/organization support
- [ ] Audit logging
- [ ] Rate limiting
- [ ] Redis caching
