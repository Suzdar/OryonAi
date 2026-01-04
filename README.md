# OryonAi - B2B SaaS Platform

A complete B2B SaaS web application foundation with authentication, subscription-based access control, and a modern dashboard layout.

## Features

### Authentication
- ✅ Email/password authentication with NextAuth
- ✅ Secure credential provider
- ✅ Protected routes with middleware
- ✅ Session management

### Subscription Management
- ✅ Four subscription tiers: FREE, LITE, PRO, ADVANCED
- ✅ Tier-based access control
- ✅ Subscription status tracking
- ✅ User-specific subscription records

### Dashboard
- ✅ Modern sidebar navigation
- ✅ Responsive layout
- ✅ Protected pages with tier requirements
- ✅ User profile and settings
- ✅ Analytics page (LITE+)
- ✅ Pro features page (PRO+)
- ✅ Upgrade/pricing page

### Documentation System
- ✅ Markdown file rendering
- ✅ Dynamic documentation pages
- ✅ Sidebar navigation
- ✅ Syntax highlighting support

### API Routes
- ✅ Authentication guards
- ✅ Subscription tier validation
- ✅ Example endpoints with protection
- ✅ Type-safe API handlers

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js (Credentials Provider)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS

## Project Structure

```
OryonAi/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts  # NextAuth configuration
│   │   │   └── signup/route.ts         # User registration
│   │   ├── user/
│   │   │   ├── profile/route.ts        # User profile API
│   │   │   └── usage/route.ts          # Usage statistics (LITE+)
│   │   ├── analytics/route.ts          # Analytics API (PRO+)
│   │   └── health/route.ts             # Health check
│   ├── dashboard/
│   │   ├── analytics/page.tsx          # Analytics page (LITE+)
│   │   ├── docs/
│   │   │   ├── [slug]/page.tsx         # Dynamic doc pages
│   │   │   └── page.tsx                # Docs index
│   │   ├── pro/page.tsx                # Pro features (PRO+)
│   │   ├── settings/page.tsx           # User settings
│   │   ├── upgrade/page.tsx            # Pricing/upgrade
│   │   ├── layout.tsx                  # Dashboard layout
│   │   └── page.tsx                    # Dashboard home
│   ├── login/page.tsx                  # Login page
│   ├── signup/page.tsx                 # Signup page
│   ├── layout.tsx                      # Root layout
│   ├── page.tsx                        # Landing page
│   ├── providers.tsx                   # Session provider
│   └── globals.css                     # Global styles
├── components/
│   ├── Sidebar.tsx                     # Navigation sidebar
│   └── icons.tsx                       # Custom SVG icons
├── docs/
│   ├── getting-started.md              # Getting started guide
│   └── api-reference.md                # API documentation
├── lib/
│   ├── auth.ts                         # NextAuth configuration
│   ├── auth-guards.ts                  # Server-side guards
│   ├── api-guards.ts                   # API route guards
│   └── prisma.ts                       # Prisma client
├── prisma/
│   └── schema.prisma                   # Database schema
├── types/
│   └── next-auth.d.ts                  # NextAuth type definitions
├── middleware.ts                       # Route protection
├── tailwind.config.ts                  # Tailwind configuration
├── tsconfig.json                       # TypeScript configuration
├── next.config.js                      # Next.js configuration
├── package.json                        # Dependencies
├── .env.example                        # Environment variables template
└── README.md                           # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**

```bash
cd OryonAi
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/oryonai?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

Generate a secure secret for `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

4. **Set up the database**

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view/edit data
npx prisma studio
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### User Model
- `id`: Unique identifier
- `email`: User email (unique)
- `password`: Hashed password
- `name`: User's full name
- `subscription`: Related subscription record

### Subscription Model
- `id`: Unique identifier
- `userId`: Foreign key to User
- `tier`: Subscription tier (FREE, LITE, PRO, ADVANCED)
- `status`: Subscription status (active, cancelled, expired)
- `startDate`: Subscription start date
- `endDate`: Subscription end date (optional)

## Authentication Flow

1. **Sign Up**: User registers at `/signup`
   - Password is hashed with bcrypt
   - User created with FREE subscription
   - Redirected to login

2. **Sign In**: User logs in at `/login`
   - Credentials validated
   - JWT session created
   - Redirected to dashboard

3. **Protected Routes**: Middleware checks authentication
   - Unauthenticated → redirected to `/login`
   - FREE tier → redirected to `/dashboard/upgrade` (except upgrade page)
   - Inactive subscription → redirected to `/dashboard/upgrade`

## Subscription Tiers

### FREE
- Basic dashboard access
- Documentation
- Settings
- Upgrade page only

### LITE ($29/month)
- Everything in FREE
- Analytics dashboard
- Usage statistics API

### PRO ($99/month)
- Everything in LITE
- Advanced analytics
- Pro features page
- Custom integrations

### ADVANCED ($299/month)
- Everything in PRO
- Enterprise features
- Dedicated support
- Unlimited API calls

## API Routes

### Public Routes
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login (via NextAuth)

### Protected Routes (Authentication Required)
- `GET /api/user/profile` - Get user profile
- `GET /api/health` - Health check

### Tier-Protected Routes
- `GET /api/user/usage` - Usage statistics (LITE+)
- `GET /api/analytics` - Advanced analytics (PRO+)

## Development

### Adding New Protected Pages

1. Create page in `app/dashboard/your-page/page.tsx`
2. Add tier requirement:

```typescript
import { requireSubscription } from "@/lib/auth-guards";

export default async function YourPage() {
  const session = await requireSubscription("PRO"); // or "LITE", "ADVANCED"
  // Your page content
}
```

3. Add to sidebar navigation in `components/Sidebar.tsx`

### Adding New API Routes

```typescript
import { withSubscription } from "@/lib/api-guards";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return withSubscription(async (session) => {
    // Your API logic
    return NextResponse.json({ data: "your data" });
  }, "LITE"); // Minimum tier required
}
```

### Adding Documentation

1. Create a markdown file in `docs/your-doc.md`
2. It will automatically appear in the documentation sidebar
3. Access at `/dashboard/docs/your-doc`

## Deployment

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
```

### Deployment Platforms

- **Vercel** (Recommended for Next.js)
- **Railway** (Database + App)
- **AWS** / **DigitalOcean** / **Azure**

### Build for Production

```bash
npm run build
npm run start
```

## Next Steps

### Implement Payments
- Integrate Stripe or Paddle
- Create checkout flow
- Handle webhooks for subscription updates
- Manage subscription lifecycle

### Add Email Service
- Email verification
- Password reset
- Subscription notifications
- Transactional emails

### Implement AI Features
- Connect to AI APIs
- Create AI-powered features based on tier
- Track AI usage per user

### Enhanced Security
- Rate limiting
- CSRF protection
- API key management
- Two-factor authentication

### Analytics & Monitoring
- Error tracking (Sentry)
- Performance monitoring
- User analytics
- Business metrics

## Security Considerations

- Passwords are hashed with bcrypt (12 rounds)
- JWT sessions with secure httpOnly cookies
- Middleware protection on all dashboard routes
- API route guards for tier validation
- Environment variables for sensitive data
- SQL injection protection via Prisma

## License

MIT License - feel free to use this as a starting point for your SaaS projects.

## Support

For questions or issues, please refer to the documentation at `/dashboard/docs` or contact support@oryonai.com.
