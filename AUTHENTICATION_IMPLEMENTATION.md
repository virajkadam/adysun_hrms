# Authentication Implementation

## Overview
This implementation provides comprehensive route protection for the Adysun HRMS application with both server-side and client-side authentication checks.

## Components

### 1. Middleware (`middleware.ts`)
- **Server-side protection**: Intercepts requests before they reach the client
- **Protected routes**: `/dashboard`, `/employees`, `/employments`, `/salaries`, etc.
- **Public routes**: `/login`, `/candidate/enquiry`, `/verify`
- **Cookie-based auth**: Uses `adminSessionId` and `employeeSessionId` cookies
- **Automatic redirects**: Redirects unauthenticated users to login with return URL

### 2. AuthGuard Component (`src/components/auth/AuthGuard.tsx`)
- **Client-side protection**: Prevents unauthorized access to protected components
- **User type restrictions**: Can restrict to admin-only, employee-only, or both
- **Loading states**: Shows spinner while checking authentication
- **Automatic redirects**: Redirects based on user type and permissions

### 3. Updated DashboardLayout
- **Wrapped with AuthGuard**: All dashboard pages now require authentication
- **Configurable user types**: Can specify which user types can access each page
- **No UI leakage**: Prevents sidebar/header from showing without auth

### 4. Enhanced AuthContext
- **Cookie management**: Sets cookies for server-side middleware
- **Proper cleanup**: Clears both localStorage and cookies on logout
- **Session persistence**: Maintains authentication state across page reloads

## Usage

### For Admin-Only Pages:
```tsx
<DashboardLayout allowedUserTypes={['admin']}>
  {/* Page content */}
</DashboardLayout>
```

### For Employee-Only Pages:
```tsx
<DashboardLayout allowedUserTypes={['employee']}>
  {/* Page content */}
</DashboardLayout>
```

### For Both Admin and Employee:
```tsx
<DashboardLayout allowedUserTypes={['admin', 'employee']}>
  {/* Page content */}
</DashboardLayout>
```

## Security Features

1. **Server-side protection**: Middleware prevents unauthorized access at the server level
2. **Client-side protection**: AuthGuard ensures proper authentication on the client
3. **No UI leakage**: Protected routes won't show any dashboard elements without authentication
4. **Automatic redirects**: Users are redirected to login and back to their intended destination
5. **Cookie-based auth**: Secure cookies for server-side middleware validation
6. **Proper cleanup**: All auth data is cleared on logout

## Protected Routes
- `/dashboard` - Admin dashboard
- `/employees` - Employee management
- `/employments` - Employment management
- `/salaries` - Salary management
- `/enquiry` - Enquiry management
- `/profile` - User profile
- `/documents` - Document management
- `/attendance` - Attendance tracking
- `/leaves` - Leave management
- `/employee-dashboard` - Employee dashboard

## Public Routes
- `/login` - Login page
- `/candidate/enquiry` - Job enquiry form
- `/verify` - Verification page

## Implementation Status
✅ Middleware created and configured
✅ AuthGuard component implemented
✅ DashboardLayout updated with authentication
✅ AuthContext enhanced with cookie management
✅ Login page updated with redirect handling
✅ Key pages updated with user type restrictions

The authentication system is now fully implemented and will prevent unauthorized access to protected routes while maintaining a smooth user experience. 