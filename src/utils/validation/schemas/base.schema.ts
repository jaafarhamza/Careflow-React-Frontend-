import { z } from 'zod'

export const emailSchema = z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .toLowerCase()
    .trim()

export const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
    )

export const firstNameSchema = z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(
        /^[a-zA-Z\s'-]+$/,
        'Name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .trim()

export const lastNameSchema = z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(
        /^[a-zA-Z\s'-]+$/,
        'Name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .trim()

export const phoneSchema = z
    .string()
    .min(1, 'Phone number is required')
    .regex(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
        'Invalid phone number format'
    )
    .trim()

export const optionalPhoneSchema = z
    .string()
    .regex(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
        'Invalid phone number format'
    )
    .optional()
    .or(z.literal(''))

export const urlSchema = z
    .string()
    .url('Invalid URL format')
    .trim()

export const optionalUrlSchema = z
    .string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal(''))

export const dateSchema = z.coerce.date({
    message: 'Invalid date format',
})

export const futureDateSchema = z.coerce.date().refine(
    (date) => date > new Date(),
    'Date must be in the future'
)

export const pastDateSchema = z.coerce.date().refine(
    (date) => date < new Date(),
    'Date must be in the past'
)

export const dateOfBirthSchema = z.coerce.date().refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear()
    return age >= 18
}, 'You must be at least 18 years old')

export const requiredStringSchema = (fieldName: string) =>
    z.string().min(1, `${fieldName} is required`).trim()

export const optionalStringSchema = z.string().optional().or(z.literal(''))

export const numericStringSchema = z
    .string()
    .regex(/^\d+$/, 'Must be a valid number')

export const positiveNumberSchema = z
    .number()
    .positive('Must be a positive number')

export const confirmPasswordRefine = <T extends { password: string; confirmPassword: string }>(
    data: T
) => data.password === data.confirmPassword

export const confirmPasswordMessage = {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
}
