'use client';

import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextValue = {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  
  const applyTheme = (value: Theme) => {
    // Always remove before add to avoid stuck state
    document.documentElement.classList.remove('dark');
    document.body?.classList.remove('dark');
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
      document.body?.classList.add('dark');
    }
    try {
      localStorage.setItem('theme', value);
    } catch {}
  };

  // Initialize theme from localStorage or system preference and apply before paint
  useLayoutEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('theme')) as Theme | null;
    const initial: Theme = saved ?? 'light';
    if (!saved) {
      try { localStorage.setItem('theme', 'light'); } catch {}
    }
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  // Keep DOM/classes in sync when theme state changes after init
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setThemeState(next);
    applyTheme(next);
  };

  const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
