// Internationalization Configuration for FinClick.AI
// Complete bilingual support for Arabic (RTL) and English (LTR)

import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];

export const pathnames = {
  '/': '/',
  '/dashboard': '/dashboard',
  '/analysis': '/analysis',
  '/reports': '/reports',
  '/admin': '/admin',
  '/auth': '/auth',
  '/login': '/login'
} as const;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

// Translation messages are now loaded from JSON files in the messages directory
