import { Route, Routes } from 'react-router-dom'
import { Login } from './features/auth/pages/Login'
import { BrowserRouter, Link } from 'react-router-dom'
import { Button } from './components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from './core/providers/theme-provider'

function App() {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='theme'>
            <BrowserRouter>
                <Toaster />
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Link to='/login'>
                                <Button>Login</Button>
                            </Link>
                        }
                    />
                </Routes>
                <Routes>
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
