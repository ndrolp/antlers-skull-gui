import { Button } from '@/components/ui/button'
import { useTheme } from '../hooks/useTheme'
import { MoonStar, Sun } from 'lucide-react'
import React from 'react'

type ButtonVariant =
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined

interface ThemeButtonProps {
    variant?: ButtonVariant
    disabled?: boolean
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ variant = 'outline' }) => {
    const { toggleTheme, activeTheme } = useTheme()
    return (
        <Button
            onClick={() => {
                toggleTheme()
            }}
            variant={variant}
            size='icon'
        >
            {activeTheme === 'dark' ? (
                <MoonStar className='h-4 w-4' />
            ) : (
                <Sun className='h-4 w-4' />
            )}
        </Button>
    )
}

export default ThemeButton
