import { http, HttpResponse } from 'msw'

const API_URL = 'http://localhost:3000/api'

export const handlers = [
    // Auth endpoints
    http.post(`${API_URL}/auth/login`, async ({ request }) => {
        const body = await request.json() as { email: string; password: string }

        // Mock successful login
        if (body.email === 'test@example.com' && body.password === 'Password123!') {
            return HttpResponse.json({
                success: true,
                data: {
                    token: 'mock-jwt-token',
                    refreshToken: 'mock-refresh-token',
                    user: {
                        id: '1',
                        name: 'Test User',
                        email: 'test@example.com',
                        role: 'user',
                    },
                },
            })
        }

        // Mock failed login
        return HttpResponse.json(
            {
                success: false,
                message: 'Invalid credentials',
            },
            { status: 401 }
        )
    }),

    http.post(`${API_URL}/auth/logout`, () => {
        return HttpResponse.json({
            success: true,
            message: 'Logged out successfully',
        })
    }),

    http.post(`${API_URL}/auth/refresh`, () => {
        return HttpResponse.json({
            success: true,
            data: {
                token: 'new-mock-jwt-token',
            },
        })
    }),

    http.post(`${API_URL}/auth/register`, async ({ request }) => {
        const body = await request.json() as { name: string; email: string; password: string }

        return HttpResponse.json({
            success: true,
            data: {
                token: 'mock-jwt-token',
                refreshToken: 'mock-refresh-token',
                user: {
                    id: '2',
                    name: body.name,
                    email: body.email,
                    role: 'user',
                },
            },
        })
    }),

    // User endpoints
    http.get(`${API_URL}/users/me`, () => {
        return HttpResponse.json({
            success: true,
            data: {
                id: '1',
                name: 'Test User',
                email: 'test@example.com',
                role: 'user',
                avatar: null,
            },
        })
    }),

    http.put(`${API_URL}/users/me`, async ({ request }) => {
        const body = await request.json()

        return HttpResponse.json({
            success: true,
            data: body,
        })
    }),

    // Error scenarios
    http.get(`${API_URL}/error/500`, () => {
        return HttpResponse.json(
            {
                success: false,
                message: 'Internal server error',
            },
            { status: 500 }
        )
    }),

    http.get(`${API_URL}/error/404`, () => {
        return HttpResponse.json(
            {
                success: false,
                message: 'Not found',
            },
            { status: 404 }
        )
    }),
]
