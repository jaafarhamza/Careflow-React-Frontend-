# Setup State Management

## Acceptance Criteria ✅

- [x] Redux Toolkit store configured
- [x] React Query configured with default options
- [x] Store slices structure created (auth, user, ui)
- [x] Persist middleware configured for auth state
- [x] DevTools configured

## Technical Tasks ✅

- [x] Install @reduxjs/toolkit, react-redux, @tanstack/react-query
- [x] Create store/index.ts
- [x] Configure Redux DevTools
- [x] Create store/slices folder structure
- [x] Configure React Query DevTools
- [x] Set up query client with retry logic and cache time

## Store Structure

```
src/store/
├── index.ts          # Store configuration
└── slices/
    ├── authSlice.ts  # Authentication state
    ├── userSlice.ts  # User profile & preferences
    └── uiSlice.ts    # UI state (loading, sidebar, notifications)
```

## Usage

```typescript
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { login, logout } from '@/store/slices/authSlice'

// In component
const dispatch = useAppDispatch()
const { isAuthenticated } = useAppSelector(state => state.auth)
```

## Features

- Redux persist for auth/user state
- React Query with 5min stale time, 10min cache
- DevTools enabled in development
- Typed hooks for better TypeScript support