# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js 18+ installed
- [ ] PostgreSQL database running
- [ ] Git installed (if cloning)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/oryonai?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Seed database with test users (optional)
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Test Users (if you ran seed)

After seeding, you can log in with:

| Email              | Password      | Tier     |
|--------------------|---------------|----------|
| free@test.com      | password123   | FREE     |
| lite@test.com      | password123   | LITE     |
| pro@test.com       | password123   | PRO      |
| advanced@test.com  | password123   | ADVANCED |

## Common Commands

```bash
# Development
npm run dev                 # Start dev server

# Database
npm run db:push            # Push schema to database
npm run db:migrate         # Create migration
npm run db:seed            # Seed database
npm run db:studio          # Open Prisma Studio

# Production
npm run build              # Build for production
npm run start              # Start production server
```

## Troubleshooting

### Port 3000 already in use
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

### Database connection error
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Verify database credentials

### Prisma errors
```bash
# Reset Prisma client
rm -rf node_modules/.prisma
npx prisma generate
```

## What's Next?

1. **Explore the Dashboard**: Log in and navigate through different pages
2. **Check Documentation**: Visit `/dashboard/docs`
3. **Try Different Tiers**: Log in with different test accounts to see tier-based access
4. **Review Code**: Explore the codebase to understand the architecture
5. **Customize**: Start building your own features on top of this foundation

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review the code comments in key files:
  - `lib/auth-guards.ts` - Authentication helpers
  - `middleware.ts` - Route protection
  - `lib/api-guards.ts` - API protection
  - `prisma/schema.prisma` - Database schema

## File Structure Overview

```
OryonAi/
├── app/              # Next.js pages and API routes
├── components/       # Reusable React components
├── docs/            # Markdown documentation files
├── lib/             # Utility functions and configurations
├── prisma/          # Database schema and migrations
└── types/           # TypeScript type definitions
```

Happy coding! 🚀
