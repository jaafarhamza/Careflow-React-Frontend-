import type { FieldError, FieldErrors, FieldValues } from 'react-hook-form'

export interface FormFieldBaseProps {
    label?: string
    error?: FieldError
    required?: boolean
    disabled?: boolean
    className?: string
}

export interface FormInputProps extends FormFieldBaseProps {
    type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'date'
    placeholder?: string
    autoComplete?: string
}

export interface FormTextareaProps extends FormFieldBaseProps {
    placeholder?: string
    rows?: number
}

export interface FormSelectProps extends FormFieldBaseProps {
    placeholder?: string
    options: Array<{
        value: string | number
        label: string
        disabled?: boolean
    }>
}

export interface FormCheckboxProps extends FormFieldBaseProps {
    description?: string
}

export interface FormRadioGroupProps extends FormFieldBaseProps {
    options: Array<{
        value: string | number
        label: string
        description?: string
    }>
}

export interface FormErrorProps {
    error?: FieldError | string
    className?: string
}

export interface FormSubmissionState {
    isSubmitting: boolean
    isSubmitSuccessful: boolean
    submitCount: number
}

export type FormErrors<T extends FieldValues> = FieldErrors<T>

export interface FormFieldRegistration {
    name: string
    onChange: (event: unknown) => void
    onBlur: (event: unknown) => void
    ref: (instance: unknown) => void
}
