import { useForm } from 'react-hook-form'
import type { UseFormProps, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export function useFormWithValidation<TFieldValues extends FieldValues = FieldValues>(
    {
        schema,
        ...options
    }: {
        schema: z.ZodType<TFieldValues>
    } & Omit<UseFormProps<TFieldValues>, 'resolver'>
) {
    return useForm<TFieldValues>({

        /* eslint-disable  @typescript-eslint/no-explicit-any */
        resolver: zodResolver(schema as any),
        mode: 'onBlur',
        reValidateMode: 'onChange',
        ...options,
    })
}

export interface FormConfig<TFieldValues extends FieldValues> {
    schema: z.ZodType<TFieldValues>
    defaultValues?: UseFormProps<TFieldValues>['defaultValues']
    mode?: UseFormProps<TFieldValues>['mode']
    reValidateMode?: UseFormProps<TFieldValues>['reValidateMode']
}

export function createFormHook<TFieldValues extends FieldValues>(
    config: FormConfig<TFieldValues>
) {
    return () => useFormWithValidation<TFieldValues>(config)
}
