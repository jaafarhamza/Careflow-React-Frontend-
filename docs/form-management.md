# Form Management Documentation

Complete guide for form handling in CareFlow Frontend using React Hook Form and Zod validation.

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Validation Schemas](#validation-schemas)
- [Custom Hooks](#custom-hooks)
- [Form Components](#form-components)
- [Best Practices](#best-practices)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

---

## Installation

The following packages are already installed:

```bash
npm install react-hook-form zod @hookform/resolvers
```

**Dependencies:**

- `react-hook-form@^7.53.2` - Form state management
- `zod@^3.23.8` - Schema validation
- `@hookform/resolvers@^3.9.1` - Validation resolvers

---

## Quick Start

### Basic Form Example

```tsx
import { useFormWithValidation } from '@/hooks/useFormWithValidation'
import { loginSchema, LoginFormData } from '@/utils/validation/schemas'
import { FormField, FormCheckbox } from '@/components/forms'

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormWithValidation<LoginFormData>({
    schema: loginSchema,
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    console.log('Form data:', data)
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email}
        {...register('email')}
      />

      <FormField
        label="Password"
        type="password"
        error={errors.password}
        {...register('password')}
      />

      <FormCheckbox
        label="Remember me"
        error={errors.rememberMe}
        {...register('rememberMe')}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground py-2 rounded-md"
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

---

## Validation Schemas

### Available Schemas

#### Base Schemas (`base.schema.ts`)

Common reusable validation patterns:

```tsx
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  phoneSchema,
  urlSchema,
  dateSchema,
} from '@/utils/validation/schemas'
```

**Email Validation:**

```tsx
emailSchema // Validates email format, lowercase, trimmed
```

**Password Validation:**

```tsx
passwordSchema // Min 8 chars, uppercase, lowercase, number, special char
```

**Name Validation:**

```tsx
nameSchema // 2-50 chars, letters, spaces, hyphens, apostrophes
```

#### Auth Schemas (`auth.schema.ts`)

```tsx
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from '@/utils/validation/schemas'
```

#### User Schemas (`user.schema.ts`)

```tsx
import {
  profileUpdateSchema,
  userPreferencesSchema,
  contactInfoSchema,
  emergencyContactSchema,
} from '@/utils/validation/schemas'
```

### Creating Custom Schemas

```tsx
import { z } from 'zod'
import { emailSchema, nameSchema } from '@/utils/validation/schemas'

export const customFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  age: z.number().min(18, 'Must be 18 or older'),
  role: z.enum(['admin', 'user', 'guest']),
})

export type CustomFormData = z.infer<typeof customFormSchema>
```

---

## Custom Hooks

### useFormWithValidation

Enhanced wrapper around React Hook Form with automatic Zod validation.

```tsx
import { useFormWithValidation } from '@/hooks/useFormWithValidation'

const form = useFormWithValidation({
  schema: mySchema,
  defaultValues: {
    /* ... */
  },
  mode: 'onBlur', // Default: validate on blur
  reValidateMode: 'onChange', // Default: re-validate on change
})
```

**Features:**

- ✅ Automatic Zod resolver integration
- ✅ TypeScript type inference
- ✅ Default validation modes
- ✅ Full React Hook Form API

### useFormPersist

Persist form state to browser storage.

```tsx
import { useFormPersist } from '@/hooks/useFormPersist'

const form = useFormWithValidation({ schema: mySchema })

const { clearPersistedData, handleSubmitWithClear } = useFormPersist(form, {
  storageKey: 'my-form',
  storage: 'sessionStorage', // or 'localStorage'
  exclude: ['password'], // Don't persist sensitive fields
  clearOnSubmit: true, // Clear storage on successful submit
})

// Use with form submission
const onSubmit = handleSubmitWithClear(async (data) => {
  // Your submission logic
})
```

**Features:**

- ✅ Auto-save form state
- ✅ Auto-restore on mount
- ✅ Exclude sensitive fields
- ✅ Clear on successful submission

---

## Form Components

### FormField

Input field with label, error, and helper text.

```tsx
<FormField
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
  error={errors.email}
  required
  {...register('email')}
/>
```

### FormTextarea

Multi-line text input.

```tsx
<FormTextarea
  label="Bio"
  rows={4}
  placeholder="Tell us about yourself"
  error={errors.bio}
  {...register('bio')}
/>
```

### FormSelect

Dropdown select field.

```tsx
<FormSelect
  label="Country"
  placeholder="Select a country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
  error={errors.country}
  {...register('country')}
/>
```

### FormCheckbox

Checkbox with label and description.

```tsx
<FormCheckbox
  label="Accept terms and conditions"
  description="You must accept to continue"
  error={errors.acceptTerms}
  {...register('acceptTerms')}
/>
```

### FormError

Display individual field errors.

```tsx
<FormError error={errors.fieldName} />
```

### FormErrors

Display multiple form errors.

```tsx
import { FormErrors } from '@/components/forms'
import { getAllErrorMessages } from '@/utils/form.utils'

;<FormErrors
  errors={getAllErrorMessages(errors)}
  title="Please fix the following errors:"
/>
```

---

## Best Practices

### 1. Type Safety

Always use TypeScript type inference:

```tsx
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  age: z.number(),
})

type FormData = z.infer<typeof schema> // Auto-generated types
```

### 2. Validation Modes

Choose appropriate validation modes:

```tsx
// Validate on blur (better UX for long forms)
mode: 'onBlur'

// Validate on change (immediate feedback)
mode: 'onChange'

// Validate on submit only
mode: 'onSubmit'
```

### 3. Error Handling

Handle errors gracefully:

```tsx
const onSubmit = async (data: FormData) => {
  try {
    await submitForm(data)
  } catch (error) {
    // Set server errors
    setError('root', {
      message: 'Something went wrong. Please try again.',
    })
  }
}
```

### 4. Form State

Monitor form state for better UX:

```tsx
const {
  formState: {
    isSubmitting,
    isSubmitSuccessful,
    isDirty,
    isValid
  }
} = useFormWithValidation({ schema })

// Disable submit button
<button disabled={isSubmitting || !isDirty || !isValid}>
  Submit
</button>
```

### 5. Default Values

Always provide default values:

```tsx
defaultValues: {
  email: '',
  password: '',
  rememberMe: false
}
```

### 6. Sanitize Data

Clean data before submission:

```tsx
import { sanitizeFormData } from '@/utils/form.utils'

const onSubmit = (data: FormData) => {
  const cleanData = sanitizeFormData(data, {
    removeEmpty: true,
    trimStrings: true,
  })
  // Submit cleanData
}
```

---

## Examples

### Complete Registration Form

```tsx
import { useFormWithValidation } from '@/hooks/useFormWithValidation'
import { registerSchema, RegisterFormData } from '@/utils/validation/schemas'
import { FormField, FormCheckbox, FormErrors } from '@/components/forms'
import { getAllErrorMessages } from '@/utils/form.utils'

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormWithValidation<RegisterFormData>({
    schema: registerSchema,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // API call
      await registerUser(data)
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormErrors errors={getAllErrorMessages(errors)} />

      <FormField
        label="Full Name"
        type="text"
        placeholder="John Doe"
        error={errors.name}
        required
        {...register('name')}
      />

      <FormField
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email}
        required
        {...register('email')}
      />

      <FormField
        label="Password"
        type="password"
        error={errors.password}
        required
        {...register('password')}
      />

      <FormField
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword}
        required
        {...register('confirmPassword')}
      />

      <FormCheckbox
        label="I accept the terms and conditions"
        error={errors.acceptTerms}
        {...register('acceptTerms')}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground py-2 rounded-md"
      >
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  )
}
```

### Form with Persistence

```tsx
import { useFormWithValidation } from '@/hooks/useFormWithValidation'
import { useFormPersist } from '@/hooks/useFormPersist'

export function DraftForm() {
  const form = useFormWithValidation({
    schema: mySchema,
    defaultValues: {
      /* ... */
    },
  })

  const { handleSubmitWithClear } = useFormPersist(form, {
    storageKey: 'draft-form',
    storage: 'localStorage',
    exclude: ['password'],
  })

  const onSubmit = handleSubmitWithClear(async (data) => {
    await submitDraft(data)
  })

  return <form onSubmit={form.handleSubmit(onSubmit)}>{/* Form fields */}</form>
}
```

---

## Troubleshooting

### Common Issues

**1. TypeScript errors with form data**

Ensure you're using type inference:

```tsx
type FormData = z.infer<typeof schema>
```

**2. Validation not triggering**

Check validation mode:

```tsx
mode: 'onBlur' // or 'onChange', 'onSubmit'
```

**3. Persisted data not loading**

Verify storage key is unique:

```tsx
storageKey: 'unique-form-key'
```

**4. Custom validation not working**

Use `.refine()` for custom validation:

```tsx
schema.refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
})
```

---

## Additional Resources

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Form Accessibility Guidelines](https://www.w3.org/WAI/tutorials/forms/)

---
