# Setup Routing System

## Acceptance Criteria ✅

- [x] React Router latest configured
- [x] Route structure defined (public, protected, role-based)
- [x] Protected route wrapper component created
- [x] Role-based route guard implemented
- [x] 404 page created
- [x] Route constants file created

## Technical Tasks ✅

- [x] Install react-router-dom
- [x] Create routes/index.tsx
- [x] Create ProtectedRoute component
- [x] Create RoleBasedRoute component
- [x] Define route constants in constants/routes.ts
- [x] Implement redirect logic for unauthorized access

## Route Structure

```
src/
├── routes/
│   ├── index.tsx           # Main router configuration
│   ├── ProtectedRoute.tsx  # Auth guard
│   └── RoleBasedRoute.tsx  # Role guard
├── constants/
│   └── routes.ts           # Route constants
└── pages/
    ├── Home.tsx
    ├── Login.tsx
    ├── Dashboard.tsx
    └── NotFound.tsx
```

## Usage

**Protected Route:**
```tsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

**Role-Based Route:**
```tsx
<RoleBasedRoute allowedRoles={['admin']}>
  <AdminPanel />
</RoleBasedRoute>
```

## Features

- Public routes: Home, Login
- Protected routes: Dashboard, Profile
- Role-based routes: Admin panel
- 404 page for undefined routes
- Automatic redirects for unauthorized access