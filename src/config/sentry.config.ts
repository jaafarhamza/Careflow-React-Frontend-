import * as Sentry from '@sentry/react'

// Initialize Sentry error tracking and performance monitoring
export function initSentry() {
    const dsn = import.meta.env.VITE_SENTRY_DSN
    const environment = import.meta.env.MODE

    // Only initialize if DSN is provided
    if (!dsn) {
        console.warn('Sentry DSN not provided. Error tracking is disabled.')
        return
    }

    Sentry.init({
        dsn,
        environment,

        // Enable performance monitoring
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({
                maskAllText: true,
                blockAllMedia: true,
            }),
        ],

        // Performance Monitoring
        tracesSampleRate: environment === 'production' ? 0.1 : 1.0, // 10% in prod, 100% in dev

        // Session Replay
        replaysSessionSampleRate: 0.1, // 10% of sessions
        replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

        // Set tracePropagationTargets to control for which URLs trace propagation should be enabled
        tracePropagationTargets: ['localhost', /^https:\/\/api\.careflow\.app/],

        // Release tracking
        release: import.meta.env.VITE_APP_VERSION || 'development',

        // Privacy & Security
        beforeSend(event, hint) {
            // Filter out sensitive data
            if (event.request) {
                // Remove sensitive headers
                if (event.request.headers) {
                    delete event.request.headers['Authorization']
                    delete event.request.headers['Cookie']
                }

                // Scrub sensitive query parameters
                if (event.request.url) {
                    event.request.url = scrubSensitiveData(event.request.url) as string
                }
            }

            // Remove sensitive data from breadcrumbs
            if (event.breadcrumbs) {
                event.breadcrumbs = event.breadcrumbs.map((breadcrumb) => {
                    if (breadcrumb.data) {
                        breadcrumb.data = scrubSensitiveData(breadcrumb.data) as Record<
                            string,
                            unknown
                        >
                    }
                    return breadcrumb
                })
            }

            // Filter out specific errors
            if (shouldIgnoreError(event, hint)) {
                return null
            }

            return event
        },

        // Ignore specific errors
        ignoreErrors: [
            // Browser extensions
            'top.GLOBALS',
            'chrome-extension://',
            'moz-extension://',
            // Network errors that are expected
            'NetworkError',
            'Network request failed',
            // ResizeObserver errors (common and harmless)
            'ResizeObserver loop limit exceeded',
            'ResizeObserver loop completed with undelivered notifications',
        ],

        // Deny URLs (don't report errors from these sources)
        denyUrls: [
            // Browser extensions
            /extensions\//i,
            /^chrome:\/\//i,
            /^moz-extension:\/\//i,
        ],
    })
}

// Scrub sensitive data from strings and objects
function scrubSensitiveData(data: unknown): unknown {
    if (typeof data === 'string') {
        // Remove email addresses
        let scrubbed = data.replace(
            /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
            '[EMAIL]'
        )
        // Remove phone numbers
        scrubbed = scrubbed.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]')
        // Remove tokens
        scrubbed = scrubbed.replace(/token=[^&]+/gi, 'token=[REDACTED]')
        scrubbed = scrubbed.replace(/apikey=[^&]+/gi, 'apikey=[REDACTED]')
        return scrubbed
    }

    if (typeof data === 'object' && data !== null) {
        const scrubbed: Record<string, unknown> = {}
        for (const [key, value] of Object.entries(data)) {
            // Skip sensitive keys
            if (isSensitiveKey(key)) {
                scrubbed[key] = '[REDACTED]'
            } else {
                scrubbed[key] = scrubSensitiveData(value)
            }
        }
        return scrubbed
    }

    return data
}

// Check if a key contains sensitive information
function isSensitiveKey(key: string): boolean {
    const sensitiveKeys = [
        'password',
        'token',
        'secret',
        'apikey',
        'api_key',
        'authorization',
        'auth',
        'ssn',
        'social_security',
        'credit_card',
        'card_number',
    ]

    return sensitiveKeys.some((sensitive) => key.toLowerCase().includes(sensitive))
}

// Determine if an error should be ignored
function shouldIgnoreError(event: Sentry.Event, hint: Sentry.EventHint): boolean {
    const error = hint.originalException

    // Ignore cancelled requests
    if (error instanceof Error && error.message.includes('cancel')) {
        return true
    }

    // Ignore 404 errors (expected in many cases)
    if (event.exception?.values?.[0]?.value?.includes('404')) {
        return true
    }

    return false
}

// Set user context for error tracking
export function setUserContext(user: {
    id: string
    email?: string
    username?: string
    role?: string
}) {
    Sentry.setUser({
        id: user.id,
        // Only include non-PII or hashed data
        username: user.username,
        role: user.role,
        // Don't include email in production for privacy
        ...(import.meta.env.MODE !== 'production' && { email: user.email }),
    })
}

// Clear user context (on logout)
export function clearUserContext() {
    Sentry.setUser(null)
}

// Add custom context to errors
export function addContext(key: string, value: Record<string, unknown>) {
    Sentry.setContext(key, value)
}

// Manually capture an exception
export function captureException(error: Error, context?: Record<string, unknown>) {
    if (context) {
        Sentry.withScope((scope) => {
            Object.entries(context).forEach(([key, value]) => {
                scope.setContext(key, value as Record<string, unknown>)
            })
            Sentry.captureException(error)
        })
    } else {
        Sentry.captureException(error)
    }
}

// Manually capture a message
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
    Sentry.captureMessage(message, level)
}
