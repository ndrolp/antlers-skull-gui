import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from './core/providers/theme-provider'
import { AuthProvider } from './core/providers/auth-provider'
import Router from './core/components/Router'

function App() {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='theme'>
            <BrowserRouter>
                <Toaster />
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
