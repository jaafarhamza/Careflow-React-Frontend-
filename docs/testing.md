# Testing Documentation

Comprehensive guide for testing in the CareFlow Frontend application using Vitest, React Testing Library, and Mock Service Worker (MSW).

## 📋 Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Overview

### Testing Stack

- **Vitest** - Fast unit test framework for Vite projects
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom DOM matchers
- **@testing-library/user-event** - User interaction simulation
- **MSW (Mock Service Worker)** - API mocking

### Why Vitest?

- ⚡ Faster than Jest (native ESM support)
- 🔧 Designed specifically for Vite
- 🎯 Jest-compatible API
- 📦 Smaller bundle size
- 🔥 Hot Module Replacement (HMR) for tests

---

## Setup

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom msw
```

### Configuration Files

#### vitest.config.ts

- Test environment configuration
- Coverage settings
- Path aliases

#### src/setupTests.ts

- Global test setup
- MSW server initialization
- Browser API mocks

---

## Running Tests

### Available Commands

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage
npm run test:coverage
```

### Watch Mode

Tests run in watch mode by default during development:

```bash
npm test
```

Press `h` in watch mode to see available commands.

### Coverage Report

Generate and view coverage report:

```bash
npm run test:coverage
```

Coverage thresholds are set to 80% for:

- Statements
- Branches
- Functions
- Lines

---

## Writing Tests

### Component Tests

Test components using the custom `render` function from `test-utils.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/test-utils'
import { MyComponent } from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('handles user interaction', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText('Clicked')).toBeInTheDocument()
  })
})
```

### Hook Tests

Test custom hooks using `renderHook`:

```tsx
import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useMyHook } from '../useMyHook'

describe('useMyHook', () => {
  it('returns expected value', () => {
    const { result } = renderHook(() => useMyHook())

    expect(result.current.value).toBe('expected')
  })

  it('updates value', async () => {
    const { result } = renderHook(() => useMyHook())

    result.current.setValue('new value')

    await waitFor(() => {
      expect(result.current.value).toBe('new value')
    })
  })
})
```

### Integration Tests

Test full page flows with API mocking:

```tsx
import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/test-utils'
import { LoginPage } from '../LoginPage'

describe('LoginPage Integration', () => {
  it('handles login flow', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    // Fill form
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'Password123!')

    // Submit
    await user.click(screen.getByRole('button', { name: /login/i }))

    // Verify success
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeTruthy()
    })
  })
})
```

---

## Best Practices

### 1. Use Semantic Queries

Prefer queries that reflect how users interact with your app:

```tsx
// ✅ Good - accessible and semantic
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText(/email/i)
screen.getByText(/welcome/i)

// ❌ Avoid - implementation details
screen.getByTestId('submit-button')
screen.getByClassName('email-input')
```

### 2. Test User Behavior, Not Implementation

```tsx
// ✅ Good - tests behavior
it('shows error when email is invalid', async () => {
  const user = userEvent.setup()
  render(<LoginForm />)

  await user.type(screen.getByLabelText(/email/i), 'invalid')
  await user.click(screen.getByRole('button', { name: /submit/i }))

  expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
})

// ❌ Avoid - tests implementation
it('sets error state', () => {
  const { result } = renderHook(() => useForm())
  result.current.setError('email', { message: 'Invalid' })
  expect(result.current.errors.email).toBeDefined()
})
```

### 3. Use waitFor for Async Operations

```tsx
// ✅ Good
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})

// ❌ Avoid
await new Promise((resolve) => setTimeout(resolve, 1000))
expect(screen.getByText('Loaded')).toBeInTheDocument()
```

### 4. Clean Up After Tests

The `afterEach` hook in `setupTests.ts` automatically cleans up:

- DOM elements
- MSW handlers
- React Testing Library state

### 5. Mock External Dependencies

Use MSW for API calls:

```tsx
// src/__tests__/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json({ users: [] })
  }),
]
```

---

## Common Patterns

### Testing Forms

```tsx
import { render } from '@/test-utils'
import userEvent from '@testing-library/user-event'

it('validates form input', async () => {
  const user = userEvent.setup()
  render(<MyForm />)

  const emailInput = screen.getByLabelText(/email/i)
  await user.type(emailInput, 'invalid-email')
  await user.tab() // Trigger blur validation

  expect(screen.getByText(/invalid email format/i)).toBeInTheDocument()
})
```

### Testing with Redux

```tsx
import { render } from '@/test-utils'

it('uses Redux state', () => {
  const { store } = render(<MyComponent />, {
    preloadedState: {
      auth: { isAuthenticated: true },
    },
  })

  expect(screen.getByText('Welcome')).toBeInTheDocument()
  expect(store.getState().auth.isAuthenticated).toBe(true)
})
```

### Testing Navigation

```tsx
import { render } from '@/test-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('navigates to dashboard', async () => {
  const user = userEvent.setup()
  render(<LoginPage />)

  // Perform login
  await user.type(screen.getByLabelText(/email/i), 'test@example.com')
  await user.type(screen.getByLabelText(/password/i), 'Password123!')
  await user.click(screen.getByRole('button', { name: /login/i }))

  // Check navigation (URL or rendered content)
  await waitFor(() => {
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
  })
})
```

### Testing API Calls

```tsx
import { server } from '@/__tests__/mocks/server'
import { http, HttpResponse } from 'msw'

it('handles API error', async () => {
  // Override handler for this test
  server.use(
    http.get('/api/users', () => {
      return HttpResponse.json({ message: 'Server error' }, { status: 500 })
    })
  )

  render(<UserList />)

  await waitFor(() => {
    expect(screen.getByText(/error loading users/i)).toBeInTheDocument()
  })
})
```

### Testing Accessibility

```tsx
it('is accessible', () => {
  render(<MyComponent />)

  const button = screen.getByRole('button')
  expect(button).toHaveAccessibleName('Submit')

  const input = screen.getByLabelText(/email/i)
  expect(input).toHaveAttribute('aria-required', 'true')
})
```

---

## Troubleshooting

### Tests Timing Out

Increase timeout for slow operations:

```tsx
await waitFor(
  () => {
    expect(screen.getByText('Loaded')).toBeInTheDocument()
  },
  { timeout: 5000 }
)
```

### Element Not Found

Use `screen.debug()` to see current DOM:

```tsx
screen.debug() // Prints entire document
screen.debug(screen.getByRole('button')) // Prints specific element
```

### Async Updates Not Reflecting

Wrap in `waitFor`:

```tsx
await waitFor(() => {
  expect(screen.getByText('Updated')).toBeInTheDocument()
})
```

### MSW Not Intercepting Requests

1. Check handler URL matches exactly
2. Ensure server is started in `setupTests.ts`
3. Verify request method (GET, POST, etc.)

```tsx
// Debug MSW
server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url)
})
```

### Coverage Not Meeting Thresholds

1. Check which files are not covered:

   ```bash
   npm run test:coverage
   ```

2. Add tests for uncovered code

3. Adjust thresholds in `vitest.config.ts` if needed

---

## File Structure

```
src/
├── __tests__/
│   ├── helpers/
│   │   ├── test-helpers.ts
│   │   └── mock-factories.ts
│   └── mocks/
│       ├── handlers.ts
│       └── server.ts
├── components/
│   └── forms/
│       └── __tests__/
│           └── FormField.test.tsx
├── hooks/
│   └── __tests__/
│       └── useFormWithValidation.test.ts
├── pages/
│   └── __tests__/
│       └── Login.test.tsx
├── setupTests.ts
└── test-utils.tsx
```

---

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [MSW Documentation](https://mswjs.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---
