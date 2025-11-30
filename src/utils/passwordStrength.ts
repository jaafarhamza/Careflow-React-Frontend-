export interface PasswordStrength {
    score: number // 0-4
    label: string
    color: string
    feedback: string[]
}

export function calculatePasswordStrength(password: string): PasswordStrength {
    if (!password) {
        return {
            score: 0,
            label: 'Too weak',
            color: 'text-destructive',
            feedback: ['Password is required'],
        }
    }

    let score = 0
    const feedback: string[] = []

    // Length check
    if (password.length >= 8) {
        score++
    } else {
        feedback.push('Use at least 8 characters')
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
        score++
    } else {
        feedback.push('Include uppercase letters')
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
        score++
    } else {
        feedback.push('Include lowercase letters')
    }

    // Number check
    if (/[0-9]/.test(password)) {
        score++
    } else {
        feedback.push('Include numbers')
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
        score++
    } else {
        feedback.push('Include special characters')
    }

    // Bonus for length
    if (password.length >= 12) {
        score = Math.min(score + 1, 5)
    }

    // Normalize score to 0-4
    const normalizedScore = Math.min(Math.floor(score / 1.25), 4)

    const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong']
    const colors = [
        'text-destructive',
        'text-orange-500',
        'text-yellow-500',
        'text-blue-500',
        'text-green-500',
    ]

    return {
        score: normalizedScore,
        label: labels[normalizedScore],
        color: colors[normalizedScore],
        feedback: feedback.length > 0 ? feedback : ['Password is strong!'],
    }
}

export function getPasswordStrengthBarColor(score: number): string {
    const colors = [
        'bg-destructive',
        'bg-orange-500',
        'bg-yellow-500',
        'bg-blue-500',
        'bg-green-500',
    ]
    return colors[score] || colors[0]
}
