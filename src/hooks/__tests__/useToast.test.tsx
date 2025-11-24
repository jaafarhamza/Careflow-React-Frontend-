import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useToast } from '../useToast'
import { ToastProvider } from '@/context/ToastProvider'
import React from 'react'

describe('useToast Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('provides addToast and removeToast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    )
    const { result } = renderHook(() => useToast(), { wrapper })

    expect(result.current.toasts).toEqual([])
    expect(typeof result.current.addToast).toBe('function')
    expect(typeof result.current.removeToast).toBe('function')
  })

  it('adds a toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    )
    const { result } = renderHook(() => useToast(), { wrapper })

    act(() => {
      result.current.addToast({
        type: 'success',
        message: 'Success!',
      })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].message).toBe('Success!')
  })

  it('removes a toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    )
    const { result } = renderHook(() => useToast(), { wrapper })

    act(() => {
      result.current.addToast({
        type: 'info',
        message: 'Info',
      })
    })

    const id = result.current.toasts[0].id

    act(() => {
      result.current.removeToast(id)
    })

    expect(result.current.toasts).toHaveLength(0)
  })

  it('auto-dismisses toast after duration', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    )
    const { result } = renderHook(() => useToast(), { wrapper })

    act(() => {
      result.current.addToast({
        type: 'warning',
        message: 'Warning',
        duration: 1000,
      })
    })

    expect(result.current.toasts).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.toasts).toHaveLength(0)
  })
})
