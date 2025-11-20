import { z } from 'zod'
import {
    emailSchema,
    nameSchema,
    phoneSchema,
    optionalPhoneSchema,
    optionalUrlSchema,
    optionalStringSchema,
} from './base.schema'

export const profileUpdateSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phone: optionalPhoneSchema,
    avatar: optionalUrlSchema,
    location: optionalStringSchema,
})

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>

export const userPreferencesSchema = z.object({
    theme: z.enum(['light', 'dark', 'system']),
    language: z.string().min(1, 'Language is required'),
    notifications: z.object({
        email: z.boolean(),
        push: z.boolean(),
        sms: z.boolean(),
    }),
    privacy: z.object({
        profileVisibility: z.enum(['public', 'private', 'friends']),
        showEmail: z.boolean(),
        showPhone: z.boolean(),
    }),
})

export type UserPreferencesFormData = z.infer<typeof userPreferencesSchema>

export const contactInfoSchema = z.object({
    phone: phoneSchema,
    alternatePhone: optionalPhoneSchema,
    address: z.object({
        street: z.string().min(1, 'Street address is required'),
        city: z.string().min(1, 'City is required'),
        state: z.string().min(1, 'State is required'),
        zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
        country: z.string().min(1, 'Country is required'),
    }),
})

export type ContactInfoFormData = z.infer<typeof contactInfoSchema>

export const emergencyContactSchema = z.object({
    name: nameSchema,
    relationship: z.string().min(1, 'Relationship is required'),
    phone: phoneSchema,
    alternatePhone: optionalPhoneSchema,
    email: emailSchema.optional().or(z.literal('')),
})

export type EmergencyContactFormData = z.infer<typeof emergencyContactSchema>
