# Theme Configuration Documentation

## Overview
CareFlow uses ShadCN UI with Tailwind CSS v4 for styling and theming.

## Installation
- **UI Library**: ShadCN UI (installed)
- **CSS Framework**: Tailwind CSS v4 with @tailwindcss/vite plugin
- **Dependencies**: class-variance-authority, clsx, tailwind-merge

## Theme Structure

### Color Palette
Located in `src/theme/index.ts`:

- **Primary**: Cyan (`#00ADB5`) - Main brand color
- **Secondary**: Dark gray (`#393E46`) - Secondary actions
- **Dark**: Charcoal (`#222831`) - Dark backgrounds
- **Light**: Off-white (`#EEEEEE`) - Light backgrounds
- **Error**: Red (`#EF4444`) - Error states
- **Warning**: Orange (`#F59E0B`) - Warning states
- **Success**: Green (`#10B981`) - Success states

### Typography System
- **Font Families**: 
  - Sans: Inter, system-ui, sans-serif
  - Mono: Fira Code, monospace
- **Font Sizes**: xs (0.75rem) to 4xl (2.25rem)
- **Font Weights**: normal (400), medium (500), semibold (600), bold (700)

### Responsive Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## ThemeProvider
Located in `src/theme/ThemeProvider.tsx`:
- Supports light, dark, and system themes
- Persists theme preference in localStorage
- Provides `useTheme` hook for theme management

## Usage

### Using Theme Hook
```tsx
import { useTheme } from '@/theme/ThemeProvider';

const { theme, setTheme } = useTheme();
setTheme('dark'); // 'light' | 'dark' | 'system'
```

### Adding Components "Exemple"
```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

## Configuration Files
- `components.json`: ShadCN configuration
- `src/index.css`: CSS variables and Tailwind imports
- `vite.config.ts`: Tailwind plugin configuration
- `src/theme/index.ts`: Theme constants
- `src/theme/ThemeProvider.tsx`: Theme context provider
