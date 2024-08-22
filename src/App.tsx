import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './features/auth/pages/Login'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from './core/providers/theme-provider'
import Layout from './core/components/Layout'
import Home from './core/pages/Home'
import { AuthProvider } from './core/providers/auth-provider'
import { ConfigForm } from './features/auth/components/ConfigForm'

function App() {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='theme'>
            <BrowserRouter>
                <Toaster />
                <AuthProvider>
                    <Routes>
                        <Route path='/' element={<Layout />}>
                            <Route path='/' element={<Home />} />
                            <Route path='/settings' element={<ConfigForm />} />
                        </Route>
                    </Routes>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
