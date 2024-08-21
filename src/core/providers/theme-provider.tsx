import { createContext, useEffect, useMemo, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
    activeTheme: Theme
}

const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
    toggleTheme: () => null,
    activeTheme: 'system',
}

export const ThemeProviderContext =
    createContext < ThemeProviderState > (initialState)

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'vite-ui-theme',
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState < Theme > (
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
    )

    const activeTheme = useMemo(() => {
        let activeTheme = theme
        if (theme === 'system') {
            activeTheme = window.matchMedia('(prefers-color-scheme: dark)')
                .matches
                ? 'dark'
                : 'light'
        }
        return activeTheme
    }, [theme])

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove('light', 'dark')

        if (theme === 'system') {
            const systemTheme = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches
                ? 'dark'
                : 'light'

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
        toggleTheme: () => {
            const systemTheme = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches
                ? 'dark'
                : 'light'

            const currentTheme = theme === 'system' ? systemTheme : theme
            const nextTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark'
            localStorage.setItem(storageKey, nextTheme)
            setTheme(nextTheme)
        },
        activeTheme,
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}
