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

    it('provides form methods', () => {
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

        // Check that all required methods exist
        expect(result.current.register).toBeDefined()
        expect(result.current.handleSubmit).toBeDefined()
        expect(result.current.setValue).toBeDefined()
        expect(result.current.trigger).toBeDefined()
        expect(result.current.formState).toBeDefined()
    })

    it('handles form submission with valid data', async () => {
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

    it('can update form values', () => {
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

        // Update email value
        result.current.setValue('email', 'new@example.com')

        // Check that value was updated
        expect(result.current.getValues('email')).toBe('new@example.com')
    })

    it('tracks form state', () => {
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

        // Check initial state
        expect(result.current.formState.isDirty).toBe(false)
        expect(result.current.formState.isValid).toBeDefined()
    })
})
