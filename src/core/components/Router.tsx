import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import { ConfigForm } from '@/features/auth/components/ConfigForm'
import Layout from './Layout'
import Users from '@/features/users/pages/Users'
import Login from '@/features/auth/pages/Login'

export default function Router() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/settings' element={<ConfigForm />} />
                    <Route path='/users' element={<Users />} />
                </Route>
            </Routes>
            <Routes>
                <Route path='/login' element={<Login />} />
            </Routes>
        </>
    )
}
