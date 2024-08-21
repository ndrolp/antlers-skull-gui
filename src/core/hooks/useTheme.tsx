import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'
export const useTheme = (): [Theme, () => void] => {
    const [theme, setTheme] = useState < Theme > ('dark')

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (
            storedTheme &&
            (storedTheme === 'dark' || storedTheme === 'light')
        ) {
            setTheme(storedTheme)
        }
    }, [])

    const toggleTheme = () => {
        let themeToApply: Theme = theme
        if (theme === 'dark') themeToApply = 'light'
        else themeToApply = 'dark'
        localStorage.setItem('theme', themeToApply)
        setTheme(themeToApply)
    }

    useEffect(() => {
        const body = document.querySelector('body')
        if (!body) return
        switch (theme) {
            case 'dark':
                body.classList.add('dark')
                break
            case 'light':
                body.classList.remove('dark')
                break
        }
    }, [theme])

    return [theme, toggleTheme]
}
