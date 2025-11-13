# Configure API Client

## Acceptance Criteria ✅

- [x] Axios instance configured with interceptors
- [x] Request interceptor adds auth token
- [x] Response interceptor handles errors globally
- [x] Token refresh logic implemented
- [x] API service layer structure created
- [x] Error handling utilities created

## Technical Tasks ✅

- [x] Install axios
- [x] Create services/api/client.ts
- [x] Configure base URL and timeout
- [x] Implement request interceptor for Authorization header
- [x] Implement response interceptor for 401 handling
- [x] Create token refresh logic
- [x] Create API error types
- [x] Create services/api folder structure (auth)

## API Structure

```
src/services/api/
├── client.ts                    # Axios instance with interceptors
├── index.ts                     # Export all services
├── auth/
│   └── authService.ts          # Authentication endpoints
```

## Usage

```typescript
import { authService } from '@/services/api'

// Login
const response = await authService.login({ email, password })

```

## Features

- Automatic token injection in requests
- Token refresh on 401 errors
- Global error handling
- Request/response interceptors
- Type-safe API calls