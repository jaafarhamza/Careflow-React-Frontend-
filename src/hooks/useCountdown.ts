import { useState, useEffect, useCallback } from 'react'

export function useCountdown(initialSeconds: number) {
    const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if (!isActive || secondsRemaining <= 0) {
            return
        }

        const interval = setInterval(() => {
            setSecondsRemaining((prev) => {
                if (prev <= 1) {
                    setIsActive(false)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [isActive, secondsRemaining])

    const start = useCallback(() => {
        setIsActive(true)
    }, [])

    const reset = useCallback((seconds?: number) => {
        setSecondsRemaining(seconds ?? initialSeconds)
        setIsActive(true)
    }, [initialSeconds])

    const stop = useCallback(() => {
        setIsActive(false)
    }, [])

    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }, [])

    return {
        secondsRemaining,
        isActive,
        start,
        reset,
        stop,
        formatTime: formatTime(secondsRemaining),
    }
}
