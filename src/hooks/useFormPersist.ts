import { useEffect } from 'react'
import type { UseFormReturn, FieldValues } from 'react-hook-form'

export type StorageStrategy = 'localStorage' | 'sessionStorage'

export interface UseFormPersistOptions {

    storageKey: string

    storage?: StorageStrategy

    exclude?: string[]

    clearOnSubmit?: boolean
}

export function useFormPersist<TFieldValues extends FieldValues>(
    form: UseFormReturn<TFieldValues>,
    options: UseFormPersistOptions
) {
    const {
        storageKey,
        storage = 'sessionStorage',
        exclude = [],
        clearOnSubmit = true,
    } = options

    const { watch, reset } = form

    // Get storage object
    const storageObject = storage === 'localStorage' ? localStorage : sessionStorage

    // Load persisted data on mount
    useEffect(() => {
        try {
            const savedData = storageObject.getItem(storageKey)
            if (savedData) {
                const parsedData = JSON.parse(savedData)
                reset(parsedData)
            }
        } catch (error) {
            console.error('Failed to load persisted form data:', error)
        }
    }, [storageKey, storageObject, reset])

    // Save form data on change
    useEffect(() => {
        const subscription = watch((formData) => {
            try {
                // Filter out excluded fields
                const dataToSave = { ...formData }
                exclude.forEach((field) => {
                    delete dataToSave[field]
                })

                storageObject.setItem(storageKey, JSON.stringify(dataToSave))
            } catch (error) {
                console.error('Failed to persist form data:', error)
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, storageKey, storageObject, exclude])

    const clearPersistedData = () => {
        try {
            storageObject.removeItem(storageKey)
        } catch (error) {
            console.error('Failed to clear persisted form data:', error)
        }
    }

    const handleSubmitWithClear = (
        onSubmit: (data: TFieldValues) => void | Promise<void>
    ) => {
        return async (data: TFieldValues) => {
            await onSubmit(data)
            if (clearOnSubmit) {
                clearPersistedData()
            }
        }
    }

    return {
        clearPersistedData,
        handleSubmitWithClear,
    }
}
