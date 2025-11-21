# Error Tracking Documentation

Comprehensive guide for error tracking and monitoring using Sentry in the CareFlow Frontend application.

## 📋 Table of Contents

- [Overview](#overview)
- [Setup Instructions](#setup-instructions)
- [Configuration](#configuration)
- [Error Boundaries](#error-boundaries)
- [User Context](#user-context)
- [Privacy & Security](#privacy--security)
- [Performance Monitoring](#performance-monitoring)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

Sentry provides comprehensive error tracking and performance monitoring for the CareFlow application. It helps identify, diagnose, and fix errors in production.

### Key Features

- ✅ Automatic error capture and reporting
- ✅ Source maps for debugging minified code
- ✅ User context for better error diagnosis
- ✅ Performance monitoring and tracing
- ✅ Privacy-focused data scrubbing
- ✅ Error boundaries for graceful error handling
- ✅ Session replay for debugging

---

## Setup Instructions

### 1. Create Sentry Account

1. Go to [sentry.io](https://sentry.io)
2. Sign up or log in
3. Create a new project:
   - Platform: **React**
   - Project name: **careflow-frontend**
4. Copy your **DSN** (Data Source Name)

### 2. Configure Environment Variables

Create or update `.env.local`:

```env
# Sentry Configuration
VITE_SENTRY_DSN=https://your-dsn@sentry.io/your-project-id
VITE_APP_VERSION=1.0.0

# For CI/CD (source map upload)
SENTRY_ORG=your-org-name
SENTRY_PROJECT=careflow-frontend
SENTRY_AUTH_TOKEN=your-auth-token
```

**Get Auth Token:**

1. Go to Sentry → Settings → Account → API → Auth Tokens
2. Create new token with `project:releases` and `project:write` scopes
3. Copy token to `SENTRY_AUTH_TOKEN`

### 3. Add to GitHub Secrets

For CI/CD source map upload:

```
Settings → Secrets and variables → Actions

Add secrets:
- SENTRY_ORG
- SENTRY_PROJECT
- SENTRY_AUTH_TOKEN
- VITE_SENTRY_DSN
```

---

## Configuration

### Sentry Initialization

Sentry is initialized in [sentry.config.ts](file:///c:/Users/dell/OneDrive/Bureau/sprint_3/careflow-frontend/src/config/sentry.config.ts):

```typescript
import { initSentry } from '@/config/sentry.config'

// Initialize before React renders
initSentry()
```

### Configuration Options

#### Environment Detection

- **Development**: 100% error sampling, verbose logging
- **Production**: Filtered errors, privacy-focused

#### Performance Monitoring

- **Development**: 100% transaction sampling
- **Production**: 10% transaction sampling

#### Privacy Settings

- Automatic PII scrubbing
- Sensitive data filtering
- Token removal

---

## Error Boundaries

### Global Error Boundary

The app is wrapped with an Error Boundary in [main.tsx](file:///c:/Users/dell/OneDrive/Bureau/sprint_3/careflow-frontend/src/main.tsx):

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary'

;<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Component-Level Error Boundaries

Add error boundaries around critical sections:

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary'

function MyPage() {
  return (
    <ErrorBoundary>
      <CriticalComponent />
    </ErrorBoundary>
  )
}
```

### Custom Fallback UI

Provide custom error UI:

```tsx
<ErrorBoundary
  fallback={
    <div>
      <h1>Something went wrong</h1>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  }
>
  <App />
</ErrorBoundary>
```

### Error Recovery

The default error boundary provides:

- **Try Again**: Reset error state
- **Reload Page**: Full page reload
- **Go Home**: Navigate to homepage

---

## User Context

### Automatic User Tracking

User context is automatically set on login using the `useSentryUser` hook:

```tsx
import { useSentryUser } from '@/hooks/useSentryUser'

function App() {
  useSentryUser() // Automatically syncs user context
  return <div>...</div>
}
```

### Manual User Context

Set user context manually:

```typescript
import { setUserContext, clearUserContext } from '@/config/sentry.config'

// On login
setUserContext({
  id: user.id,
  username: user.name,
  role: user.role,
  email: user.email, // Only in development
})

// On logout
clearUserContext()
```

### Privacy Considerations

- **User ID**: Always included (non-PII)
- **Username**: Included if non-PII
- **Role**: Included for context
- **Email**: Only in development mode

---

## Privacy & Security

### Automatic Data Scrubbing

The following data is automatically scrubbed:

#### Sensitive Headers

- `Authorization`
- `Cookie`
- `X-Auth-Token`

#### Personal Information

- Email addresses → `[EMAIL]`
- Phone numbers → `[PHONE]`
- Tokens → `[REDACTED]`

#### Sensitive Keys

- `password`
- `token`
- `secret`
- `apikey`
- `ssn`
- `credit_card`

### Custom Data Scrubbing

Add custom scrubbing in `sentry.config.ts`:

```typescript
beforeSend(event) {
  // Custom scrubbing logic
  if (event.request?.data) {
    event.request.data = scrubCustomData(event.request.data)
  }
  return event
}
```

### HIPAA Compliance

For HIPAA compliance:

1. **Sentry Business Plan**: Required for BAA
2. **Data Residency**: Choose US region
3. **Enhanced Scrubbing**: Enable in Sentry settings
4. **Audit Logs**: Enable in Sentry

---

## Performance Monitoring

### Automatic Instrumentation

Sentry automatically tracks:

- Page load performance
- Navigation timing
- API requests
- Component render times

### Custom Transactions

Track custom operations:

```typescript
import * as Sentry from '@sentry/react'

async function processData() {
  const transaction = Sentry.startTransaction({
    name: 'processData',
    op: 'task',
  })

  try {
    // Your code here
    await doWork()
  } finally {
    transaction.finish()
  }
}
```

### Performance Budgets

Set performance budgets in Sentry dashboard:

- Page load < 3s
- API requests < 1s
- Component render < 100ms

---

## Best Practices

### 1. Error Handling

```typescript
// ✅ Good: Let error boundary catch it
function Component() {
  const data = useQuery('data', fetchData)
  return <div>{data.value}</div>
}

// ❌ Avoid: Swallowing errors
function Component() {
  try {
    const data = useQuery('data', fetchData)
    return <div>{data.value}</div>
  } catch (error) {
    console.log(error) // Error not reported to Sentry
    return null
  }
}
```

### 2. Manual Error Capture

```typescript
import { captureException } from '@/config/sentry.config'

try {
  await riskyOperation()
} catch (error) {
  captureException(error, {
    context: {
      operation: 'riskyOperation',
      userId: user.id,
    },
  })
  // Handle error gracefully
}
```

### 3. Contextual Information

```typescript
import { addContext } from '@/config/sentry.config'

// Add context before error occurs
addContext('formData', {
  formType: 'registration',
  step: 2,
})
```

### 4. Error Filtering

Ignore expected errors:

```typescript
// In sentry.config.ts
ignoreErrors: ['NetworkError', 'User cancelled', 'AbortError']
```

### 5. Source Maps

Always enable source maps in production:

```typescript
// vite.config.ts
build: {
  sourcemap: true
}
```

---

## Troubleshooting

### Errors Not Appearing in Sentry

**Check DSN Configuration:**

```bash
# Verify environment variable
echo $VITE_SENTRY_DSN
```

**Check Initialization:**

```typescript
// Should see in console (development)
console.log('Sentry initialized')
```

**Check Network:**

- Open DevTools → Network
- Look for requests to `sentry.io`
- Check for errors

### Source Maps Not Working

**Verify Upload:**

```bash
# Check build output
npm run build

# Should see:
# ✓ Sentry source maps uploaded
```

**Check Auth Token:**

- Verify `SENTRY_AUTH_TOKEN` is set
- Check token has correct scopes

**Manual Upload:**

```bash
npx @sentry/cli releases files <version> upload-sourcemaps ./dist
```

### Too Many Errors

**Increase Sampling:**

```typescript
// sentry.config.ts
sampleRate: 0.1, // Only capture 10% of errors
```

**Add Error Filters:**

```typescript
beforeSend(event) {
  if (shouldIgnore(event)) {
    return null
  }
  return event
}
```

### Performance Impact

**Reduce Transaction Sampling:**

```typescript
tracesSampleRate: 0.05, // 5% of transactions
```

**Disable in Development:**

```typescript
if (import.meta.env.MODE === 'development') {
  return // Don't initialize Sentry
}
```

---

## Error Types

### Captured Automatically

- **Unhandled Exceptions**: JavaScript errors
- **Promise Rejections**: Unhandled promise rejections
- **React Errors**: Component errors (via Error Boundary)
- **Network Errors**: Failed API requests

### Captured Manually

```typescript
import { captureException, captureMessage } from '@/config/sentry.config'

// Capture exception
captureException(new Error('Something went wrong'))

// Capture message
captureMessage('User performed action', 'info')
```

---

## Monitoring Dashboard

### Key Metrics

1. **Error Rate**: Errors per minute
2. **Affected Users**: Unique users experiencing errors
3. **Error Frequency**: Most common errors
4. **Performance**: Page load times, API latency

### Alerts

Set up alerts in Sentry:

- Error spike (>10 errors/min)
- New error types
- Performance degradation
- High error rate for specific users

---

## Integration with CI/CD

Source maps are automatically uploaded during production builds:

```yaml
# .github/workflows/deploy.yml
- name: Build application
  run: npm run build
  env:
    SENTRY_ORG: ${{ secrets.SENTRY_ORG }}
    SENTRY_PROJECT: ${{ secrets.SENTRY_PROJECT }}
    SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
```

---

## Additional Resources

- [Sentry Documentation](https://docs.sentry.io/)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Privacy Best Practices](https://docs.sentry.io/product/data-management-settings/scrubbing/server-side-scrubbing/)
- [Performance Monitoring](https://docs.sentry.io/product/performance/)

---
