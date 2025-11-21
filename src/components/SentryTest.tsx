import { useState } from 'react'
import { captureException, captureMessage } from '@/config/sentry.config'
import * as Sentry from '@sentry/react'

export function SentryTest() {
  const [count, setCount] = useState(0)

  // Test 1: Throw an error that will be caught by Error Boundary
  const testErrorBoundary = () => {
    throw new Error('Test Error Boundary - This error should appear in Sentry!')
  }

  // Test 2: Manually capture an exception
  const testManualException = () => {
    try {
      throw new Error('Test Manual Exception - Captured manually')
    } catch (error) {
      captureException(error as Error, {
        testType: 'manual exception',
        timestamp: new Date().toISOString(),
      })
      alert('Manual exception captured! Check Sentry dashboard.')
    }
  }

  // Test 3: Capture a message
  const testMessage = () => {
    captureMessage('Test message from CareFlow', 'info')
    alert('Message captured! Check Sentry dashboard.')
  }

  // Test 4: Test with user context
  const testWithUserContext = () => {
    Sentry.setUser({
      id: 'test-user-123',
      username: 'Test User',
      email: 'test@example.com',
    })

    captureMessage('Test with user context', 'info')
    alert('Message with user context captured! Check Sentry dashboard.')
  }

  // Test 5: Unhandled promise rejection
  const testPromiseRejection = () => {
    Promise.reject(
      new Error('Test Promise Rejection - Should be caught by Sentry')
    )
    alert('Promise rejection triggered! Check Sentry dashboard.')
  }

  // Test 6: Performance transaction
  const testPerformance = async () => {
    await Sentry.startSpan(
      {
        name: 'test-transaction',
        op: 'test',
      },
      async () => {
        // Simulate some work
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    )
    alert('Performance transaction recorded! Check Sentry Performance tab.')
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          🧪 Sentry Error Tracking Test
        </h1>
        <p className="text-muted-foreground mb-6">
          Use these buttons to test different Sentry features. Check your Sentry
          dashboard after each test.
        </p>

        {/* Status Indicator */}
        <div className="mb-6 p-4 bg-primary/10 rounded-md">
          <p className="text-sm font-semibold text-primary mb-1">
            Sentry Status:
          </p>
          <p className="text-sm text-muted-foreground">
            {import.meta.env.VITE_SENTRY_DSN ? (
              <span className="text-green-600">✅ DSN Configured</span>
            ) : (
              <span className="text-red-600">❌ DSN Not Configured</span>
            )}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Environment: {import.meta.env.MODE}
          </p>
        </div>

        {/* Test Buttons */}
        <div className="space-y-4">
          {/* Test 1 */}
          <div className="border border-border rounded-md p-4">
            <h3 className="font-semibold text-foreground mb-2">
              Test 1: Error Boundary
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Throws an error that will be caught by the Error Boundary. You'll
              see the error fallback UI.
            </p>
            <button
              onClick={testErrorBoundary}
              className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 transition-colors"
            >
              Throw Error
            </button>
          </div>

          {/* Test 2 */}
          <div className="border border-border rounded-md p-4">
            <h3 className="font-semibold text-foreground mb-2">
              Test 2: Manual Exception Capture
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Manually captures an exception with custom context.
            </p>
            <button
              onClick={testManualException}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
            >
              Capture Exception
            </button>
          </div>

          {/* Test 3 */}
          <div className="border border-border rounded-md p-4">
            <h3 className="font-semibold text-foreground mb-2">
              Test 3: Message Capture
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Captures an informational message (not an error).
            </p>
            <button
              onClick={testMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Capture Message
            </button>
          </div>

          {/* Test 4 */}
          <div className="border border-border rounded-md p-4">
            <h3 className="font-semibold text-foreground mb-2">
              Test 4: User Context
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Captures a message with user context attached.
            </p>
            <button
              onClick={testWithUserContext}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Test User Context
            </button>
          </div>

          {/* Test 5 */}
          <div className="border border-border rounded-md p-4">
            <h3 className="font-semibold text-foreground mb-2">
              Test 5: Promise Rejection
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Triggers an unhandled promise rejection.
            </p>
            <button
              onClick={testPromiseRejection}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Reject Promise
            </button>
          </div>

          {/* Test 6 */}
          <div className="border border-border rounded-md p-4">
            <h3 className="font-semibold text-foreground mb-2">
              Test 6: Performance Monitoring
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Records a performance transaction (check Performance tab in
              Sentry).
            </p>
            <button
              onClick={testPerformance}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Test Performance
            </button>
          </div>

          {/* Counter Test */}
          <div className="border border-border rounded-md p-4">
            <h3 className="font-semibold text-foreground mb-2">
              Bonus: State Test
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Verify React is working: Count = {count}
            </p>
            <button
              onClick={() => setCount(count + 1)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Increment Counter
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-muted rounded-md">
          <h3 className="font-semibold text-foreground mb-2">
            📋 How to Verify
          </h3>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>
              Make sure you've set{' '}
              <code className="bg-background px-1 rounded">
                VITE_SENTRY_DSN
              </code>{' '}
              in .env.local
            </li>
            <li>
              Run the app:{' '}
              <code className="bg-background px-1 rounded">npm run dev</code>
            </li>
            <li>Click each test button</li>
            <li>
              Go to your Sentry dashboard:{' '}
              <a
                href="https://sentry.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                sentry.io
              </a>
            </li>
            <li>Check Issues tab for errors and messages</li>
            <li>Check Performance tab for transactions</li>
          </ol>
        </div>

        {/* Warning */}
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ <strong>Note:</strong> Remove this test component before
            deploying to production!
          </p>
        </div>
      </div>
    </div>
  )
}
