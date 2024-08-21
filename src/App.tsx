import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './features/auth/pages/Login'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from './core/providers/theme-provider'
import Layout from './core/components/Layout'

function App() {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='theme'>
            <BrowserRouter>
                <Toaster />
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='/' element={<Login />} />
                    </Route>
                </Routes>
                <Routes>
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
