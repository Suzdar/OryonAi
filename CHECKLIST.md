# Setup Checklist

Use this checklist to ensure your B2B SaaS application is properly set up and ready for development.

## Initial Setup

### Prerequisites
- [ ] Node.js 18 or higher installed
- [ ] PostgreSQL database installed and running
- [ ] Git installed (optional)
- [ ] Code editor (VS Code recommended)

### Installation
- [ ] Navigate to project directory
- [ ] Run `npm install`
- [ ] Verify all dependencies installed without errors

### Environment Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Set up PostgreSQL database
- [ ] Update `DATABASE_URL` in `.env`
- [ ] Generate `NEXTAUTH_SECRET` using `openssl rand -base64 32`
- [ ] Update `NEXTAUTH_SECRET` in `.env`
- [ ] Verify `NEXTAUTH_URL` is set to `http://localhost:3000`

### Database Setup
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Verify migrations completed successfully
- [ ] (Optional) Run `npm run db:seed` to create test users
- [ ] (Optional) Run `npm run db:studio` to view database

### Development Server
- [ ] Run `npm run dev`
- [ ] Open `http://localhost:3000`
- [ ] Verify landing page loads correctly
- [ ] Check console for any errors

## Feature Testing

### Authentication
- [ ] Navigate to signup page (`/signup`)
- [ ] Create a new account
- [ ] Verify redirect to login page
- [ ] Log in with new account
- [ ] Verify redirect to dashboard
- [ ] Log out
- [ ] Try accessing `/dashboard` while logged out
- [ ] Verify redirect to login page

### Dashboard Access
- [ ] Log in as FREE tier user
- [ ] Verify redirect to upgrade page
- [ ] Access upgrade page successfully
- [ ] Try accessing other dashboard pages
- [ ] Verify blocked access

### Subscription Tiers (if seeded)
- [ ] Log in as `lite@test.com`
- [ ] Access analytics page successfully
- [ ] Try accessing pro features page
- [ ] Verify blocked access
- [ ] Log out

- [ ] Log in as `pro@test.com`
- [ ] Access analytics page successfully
- [ ] Access pro features page successfully
- [ ] Verify all features accessible

### Documentation
- [ ] Navigate to `/dashboard/docs`
- [ ] Verify documentation index page loads
- [ ] Click on "Getting Started"
- [ ] Verify markdown renders correctly
- [ ] Click on "API Reference"
- [ ] Verify navigation works
- [ ] Check sidebar updates with active page

### API Endpoints
- [ ] Test public endpoints:
  - [ ] POST `/api/auth/signup` with valid data
  - [ ] Verify user created
  
- [ ] Test protected endpoints (need to be logged in):
  - [ ] GET `/api/user/profile`
  - [ ] GET `/api/health`
  - [ ] Verify returns user data

- [ ] Test tier-protected endpoints:
  - [ ] Log in as LITE user
  - [ ] GET `/api/user/usage`
  - [ ] Verify returns usage data
  - [ ] Try accessing `/api/analytics`
  - [ ] Verify 403 error (insufficient tier)

### UI/UX
- [ ] Check responsive design on mobile
- [ ] Check responsive design on tablet
- [ ] Verify sidebar navigation works
- [ ] Test all navigation links
- [ ] Verify active page highlighting in sidebar
- [ ] Check forms validate input
- [ ] Verify error messages display
- [ ] Test logout functionality

## Code Quality

### File Structure
- [ ] Review project structure
- [ ] Understand file organization
- [ ] Check all required files present
- [ ] Review key configuration files

### TypeScript
- [ ] No TypeScript errors in IDE
- [ ] Run `npm run build`
- [ ] Verify build succeeds
- [ ] Check type definitions are correct

### Code Review
- [ ] Review authentication flow in `lib/auth.ts`
- [ ] Review guards in `lib/auth-guards.ts`
- [ ] Review middleware in `middleware.ts`
- [ ] Review API guards in `lib/api-guards.ts`
- [ ] Review Prisma schema
- [ ] Understand subscription model

## Documentation Review

- [ ] Read `README.md` thoroughly
- [ ] Review `QUICKSTART.md`
- [ ] Study `ARCHITECTURE.md`
- [ ] Understand subscription tiers
- [ ] Review API documentation in `docs/api-reference.md`
- [ ] Understand authentication flow

## Security Check

- [ ] `.env` file is in `.gitignore`
- [ ] `NEXTAUTH_SECRET` is secure and random
- [ ] Passwords are hashed (check signup code)
- [ ] Protected routes have middleware
- [ ] API routes have guards
- [ ] No sensitive data in code
- [ ] Database credentials not hardcoded

## Ready for Development

### Understanding the Codebase
- [ ] Can explain authentication flow
- [ ] Understand subscription tier system
- [ ] Know how to add new protected pages
- [ ] Know how to add new API routes
- [ ] Understand middleware protection
- [ ] Can add new documentation files

### Next Steps
- [ ] Identify features to add
- [ ] Plan database changes if needed
- [ ] Design new pages/components
- [ ] Consider payment integration
- [ ] Plan email service integration
- [ ] Think about additional security features

## Production Readiness Checklist

When ready to deploy:

- [ ] Change `NEXTAUTH_SECRET` to production secret
- [ ] Update `NEXTAUTH_URL` to production URL
- [ ] Set up production PostgreSQL database
- [ ] Update `DATABASE_URL` to production database
- [ ] Run database migrations in production
- [ ] Remove or disable seed script in production
- [ ] Set up error monitoring (Sentry)
- [ ] Set up analytics
- [ ] Configure CORS if needed
- [ ] Set up SSL/HTTPS
- [ ] Configure rate limiting
- [ ] Set up backup strategy
- [ ] Configure logging
- [ ] Performance testing
- [ ] Security audit

## Common Issues & Solutions

### Database Connection Issues
- [ ] PostgreSQL service is running
- [ ] Database exists
- [ ] Credentials are correct
- [ ] Port is not blocked by firewall

### Build Errors
- [ ] Node modules are installed
- [ ] Prisma client is generated
- [ ] No TypeScript errors
- [ ] Environment variables are set

### Authentication Issues
- [ ] `NEXTAUTH_SECRET` is set
- [ ] `NEXTAUTH_URL` matches your URL
- [ ] Database has users table
- [ ] Session cookies are enabled in browser

### Middleware Issues
- [ ] Middleware file is in root directory
- [ ] File is named `middleware.ts` exactly
- [ ] Matcher configuration is correct

## Support Resources

- [ ] Bookmark Next.js documentation
- [ ] Bookmark NextAuth.js documentation
- [ ] Bookmark Prisma documentation
- [ ] Bookmark Tailwind CSS documentation
- [ ] Save this project's documentation links

---

## Status: ⬜ Not Started | 🟡 In Progress | ✅ Complete

Mark your progress as you complete each section. Good luck with your SaaS project! 🚀
