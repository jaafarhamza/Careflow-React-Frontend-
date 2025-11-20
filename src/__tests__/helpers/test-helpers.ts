//Wait for an element to be removed from the DOM
export async function waitForElementToBeRemoved(
    callback: () => HTMLElement | null,
    options = { timeout: 3000 }
) {
    const startTime = Date.now()

    while (callback()) {
        if (Date.now() - startTime > options.timeout) {
            throw new Error('Timeout waiting for element to be removed')
        }
        await new Promise((resolve) => setTimeout(resolve, 50))
    }
}

//Mock localStorage
export const mockLocalStorage = (() => {
    let store: Record<string, string> = {}

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString()
        },
        removeItem: (key: string) => {
            delete store[key]
        },
        clear: () => {
            store = {}
        },
        get length() {
            return Object.keys(store).length
        },
        key: (index: number) => {
            const keys = Object.keys(store)
            return keys[index] || null
        },
    }
})()

//Mock sessionStorage
export const mockSessionStorage = (() => {
    let store: Record<string, string> = {}

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString()
        },
        removeItem: (key: string) => {
            delete store[key]
        },
        clear: () => {
            store = {}
        },
        get length() {
            return Object.keys(store).length
        },
        key: (index: number) => {
            const keys = Object.keys(store)
            return keys[index] || null
        },
    }
})()

//Setup storage mocks
export function setupStorageMocks() {
    Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
    })

    Object.defineProperty(window, 'sessionStorage', {
        value: mockSessionStorage,
    })
}

//Clear all storage mocks
export function clearStorageMocks() {
    mockLocalStorage.clear()
    mockSessionStorage.clear()
}
