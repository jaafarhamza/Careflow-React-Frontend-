import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useFormWithValidation } from '../useFormWithValidation'
import { loginSchema } from '@/utils/validation/schemas'

describe('useFormWithValidation', () => {
    it('initializes with default values', () => {
        const { result } = renderHook(() =>
            useFormWithValidation({
                schema: loginSchema,
                defaultValues: {
                    email: '',
                    password: '',
                    rememberMe: false,
                },
            })
        )

        expect(result.current.formState.defaultValues).toEqual({
            email: '',
            password: '',
            rememberMe: false,
        })
    })

    it('validates form data with Zod schema', async () => {
        const { result } = renderHook(() =>
            useFormWithValidation({
                schema: loginSchema,
                defaultValues: {
                    email: '',
                    password: '',
                    rememberMe: false,
                },
            })
        )

        // Trigger validation
        result.current.setValue('email', 'invalid-email')
        result.current.setValue('password', '')

        await waitFor(() => {
            result.current.trigger()
        })

        await waitFor(() => {
            expect(result.current.formState.errors.email).toBeDefined()
        })
    })

    it('clears errors when valid data is provided', async () => {
        const { result } = renderHook(() =>
            useFormWithValidation({
                schema: loginSchema,
                defaultValues: {
                    email: '',
                    password: '',
                    rememberMe: false,
                },
            })
        )

        // Set invalid data
        result.current.setValue('email', 'invalid')
        await waitFor(() => result.current.trigger('email'))

        // Set valid data
        result.current.setValue('email', 'test@example.com')
        await waitFor(() => result.current.trigger('email'))

        await waitFor(() => {
            expect(result.current.formState.errors.email).toBeUndefined()
        })
    })

    it('handles form submission', async () => {
        const { result } = renderHook(() =>
            useFormWithValidation({
                schema: loginSchema,
                defaultValues: {
                    email: 'test@example.com',
                    password: 'Password123!',
                    rememberMe: false,
                },
            })
        )

        let submittedData: unknown = null
        const onSubmit = (data: unknown) => {
            submittedData = data
        }

        await result.current.handleSubmit(onSubmit)()

        await waitFor(() => {
            expect(submittedData).toEqual({
                email: 'test@example.com',
                password: 'Password123!',
                rememberMe: false,
            })
        })
    })

    it('sets isSubmitting state during submission', async () => {
        const { result } = renderHook(() =>
            useFormWithValidation({
                schema: loginSchema,
                defaultValues: {
                    email: 'test@example.com',
                    password: 'Password123!',
                    rememberMe: false,
                },
            })
        )

        const onSubmit = async () => {
            await new Promise((resolve) => setTimeout(resolve, 100))
        }

        const submitPromise = result.current.handleSubmit(onSubmit)()

        // Should be submitting
        await waitFor(() => {
            expect(result.current.formState.isSubmitting).toBe(true)
        })

        await submitPromise

        // Should not be submitting after completion
        await waitFor(() => {
            expect(result.current.formState.isSubmitting).toBe(false)
        })
    })
})
