import { Route, Routes } from 'react-router-dom'
import { Login } from './features/auth/pages/Login'
import { BrowserRouter, Link } from 'react-router-dom'
import { Button } from './components/ui/button'

function App() {
    return (
        <BrowserRouter>
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
    )
}

export default App
