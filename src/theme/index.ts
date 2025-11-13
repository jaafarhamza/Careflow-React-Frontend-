export const theme = {
  colors: {
    primary: {
      DEFAULT: '#00ADB5',
      foreground: '#EEEEEE',
    },
    secondary: {
      DEFAULT: '#393E46',
      foreground: '#EEEEEE',
    },
    error: {
      DEFAULT: '#EF4444',
      foreground: '#EEEEEE',
    },
    warning: {
      DEFAULT: '#F59E0B',
      foreground: '#222831',
    },
    success: {
      DEFAULT: '#10B981',
      foreground: '#EEEEEE',
    },
    dark: {
      DEFAULT: '#222831',
      light: '#393E46',
    },
    light: {
      DEFAULT: '#EEEEEE',
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export type Theme = typeof theme;

export { ThemeProvider } from './ThemeProvider';
export { useTheme } from './useTheme';
