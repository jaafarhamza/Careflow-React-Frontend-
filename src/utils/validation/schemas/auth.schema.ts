import { z } from 'zod'
import {
    emailSchema,
    passwordSchema,
    nameSchema,
    confirmPasswordRefine,
    confirmPasswordMessage,
} from './base.schema'

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z
    .object({
        name: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'Please confirm your password'),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: 'You must accept the terms and conditions',
        }),
    })
    .refine(confirmPasswordRefine, confirmPasswordMessage)

export type RegisterFormData = z.infer<typeof registerSchema>

export const forgotPasswordSchema = z.object({
    email: emailSchema,
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'Please confirm your password'),
        token: z.string().min(1, 'Reset token is required'),
    })
    .refine(confirmPasswordRefine, confirmPasswordMessage)

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: passwordSchema,
        confirmPassword: z.string().min(1, 'Please confirm your new password'),
    })
    .refine(
        (data) => data.newPassword === data.confirmPassword,
        {
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        }
    )
    .refine(
        (data) => data.currentPassword !== data.newPassword,
        {
            message: 'New password must be different from current password',
            path: ['newPassword'],
        }
    )

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
