import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetConfig from '../hooks/useGetConfig'
import { useToast } from '@/components/ui/use-toast'

type AuthProviderProps = {
    children: React.ReactNode
}

type AuthProviderState = {
    loginUser: (username: string, password: string) => Promise<void>
    tokens: Tokens
}

type Tokens = {
    token?: string
    refresh?: string
}

const initialState: AuthProviderState = {
    loginUser: async () => { },
    tokens: {},
}

export const AuthProviderContext =
    createContext < AuthProviderState > (initialState)

export function AuthProvider({ children }: AuthProviderProps) {
    const { toast } = useToast()
    const [tokens, setTokens] = useState < Tokens > ({})
    const config = useGetConfig()
    const navigate = useNavigate()
    const loginUser = async (username: string, password: string) => {
        console.log({ username, password })
        const response = await fetch(
            `${config?.url ?? 'http://localhost:4000'}/api/v1/auth/login/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            },
        )
        console.log(response)
        const data = await response.json()
        if (response.status === 200) {
            setTokens(data)
            localStorage.setItem('token', data.token ?? '')
            localStorage.setItem('refresh', data.refresh ?? '')
            navigate('/')
        } else {
            console.log({ data })
            toast({
                title: 'Authentication Failed',
                description: data.msg,
            })
        }
    }

    const value = {
        loginUser,
        tokens,
    }

    return (
        <AuthProviderContext.Provider value={value}>
            {children}
        </AuthProviderContext.Provider>
    )
}
