import type { LoginFormData, RegisterFormData } from '@/utils/validation/schemas'


//Create mock user data

export function createMockUser(overrides = {}) {
    return {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        avatar: null,
        ...overrides,
    }
}

//Create mock login form data
export function createMockLoginData(overrides: Partial<LoginFormData> = {}): LoginFormData {
    return {
        email: 'test@example.com',
        password: 'Password123!',
        rememberMe: false,
        ...overrides,
    }
}

//Create mock register form data
export function createMockRegisterData(
    overrides: Partial<RegisterFormData> = {}
): RegisterFormData {
    return {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        acceptTerms: true,
        ...overrides,
    }
}

//Create mock API response
export function createMockApiResponse<T>(data: T, success = true) {
    return {
        success,
        data,
        message: success ? 'Success' : 'Error',
    }
}

//Create mock API error
export function createMockApiError(message = 'An error occurred', status = 500) {
    return {
        message,
        status,
        code: `ERROR_${status}`,
    }
}

//Create mock auth token
export function createMockAuthToken() {
    return {
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
    }
}
