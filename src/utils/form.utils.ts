import type { FieldError, FieldErrors, FieldValues } from 'react-hook-form'

export function getErrorMessage(error?: FieldError | string): string | undefined {
    if (!error) return undefined
    if (typeof error === 'string') return error
    return error.message
}

export function hasFormErrors<T extends FieldValues>(errors: FieldErrors<T>): boolean {
    return Object.keys(errors).length > 0
}

export function getAllErrorMessages<T extends FieldValues>(errors: FieldErrors<T>): string[] {
    const messages: string[] = []

    const extractMessages = (obj: unknown) => {
        if (!obj || typeof obj !== 'object') return

        Object.values(obj).forEach((value) => {
            if (value && typeof value === 'object') {
                if ('message' in value && typeof value.message === 'string') {
                    messages.push(value.message)
                } else {
                    extractMessages(value)
                }
            }
        })
    }

    extractMessages(errors)
    return messages
}

export function formatFieldName(fieldName: string): string {
    return fieldName
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
        .trim()
}


export function sanitizeFormData<T extends Record<string, unknown>>(
    data: T,
    options: {
        removeEmpty?: boolean
        trimStrings?: boolean
    } = {}
): Partial<T> {
    const { removeEmpty = true, trimStrings = true } = options
    const sanitized: Partial<T> = {}

    Object.entries(data).forEach(([key, value]) => {
        let processedValue = value

        // Trim strings
        if (trimStrings && typeof value === 'string') {
            processedValue = value.trim()
        }

        // Remove empty values
        if (removeEmpty && (processedValue === '' || processedValue === null || processedValue === undefined)) {
            return
        }

        sanitized[key as keyof T] = processedValue as T[keyof T]
    })

    return sanitized
}


//Create form default values with type safety

export function createDefaultValues<T extends Record<string, unknown>>(
    values: T
): T {
    return values
}

//Debounce function for form validation
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: number | null = null

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

//Check if a field is dirty (has been modified)
export function isFieldDirty(
    fieldName: string,
    dirtyFields: Record<string, unknown>
): boolean {
    return fieldName in dirtyFields
}

export function getNestedError(
    errors: FieldErrors,
    path: string
): FieldError | undefined {
    const keys = path.split('.')
    let current: unknown = errors

    for (const key of keys) {
        if (!current || typeof current !== 'object') return undefined
        current = (current as Record<string, unknown>)[key]
    }

    return current as FieldError | undefined
}

//Convert form data to FormData for file uploads
export function toFormData<T extends Record<string, unknown>>(
    data: T
): FormData {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
            formData.append(key, value)
        } else if (value instanceof FileList) {
            Array.from(value).forEach((file) => {
                formData.append(key, file)
            })
        } else if (Array.isArray(value)) {
            value.forEach((item) => {
                formData.append(key, String(item))
            })
        } else if (value !== null && value !== undefined) {
            formData.append(key, String(value))
        }
    })

    return formData
}
