import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false // Disable automatic locale detection
});

export default intlMiddleware;

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
