import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetConfig from '../hooks/useGetConfig'
import { useToast } from '@/components/ui/use-toast'
import { jwtDecode } from 'jwt-decode'

type AuthProviderProps = {
    children: React.ReactNode
}

type AuthProviderState = {
    loginUser: (username: string, password: string) => Promise<void>
    tokens?: LoginResponse
    decodedToken?: TokenParsed
}

type User = {
    _id: string
    username: string
    email: string
    name: string
}

type LoginResponse = {
    token?: string
    refresh?: string
    msg?: string
}

type TokenParsed = {
    iat: string
    exp: string
    user: User
}

const initialState: AuthProviderState = {
    loginUser: async () => { },
    tokens: {},
}

export const AuthProviderContext =
    createContext < AuthProviderState > (initialState)

export function AuthProvider({ children }: AuthProviderProps) {
    const { toast } = useToast()
    const [tokens, setTokens] = useState < LoginResponse > ({})
    const [decodedToken, setDecodedToken] = useState < TokenParsed | undefined > ()
    const config = useGetConfig()
    const navigate = useNavigate()
    const loginUser = async (username: string, password: string) => {
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
        const data = (await response.json()) as LoginResponse
        if (response.status === 200) {
            const decodedToken: TokenParsed = await jwtDecode(data.token ?? '')
            console.table(decodedToken.user)
            setDecodedToken(decodedToken)
            setTokens(data)
            localStorage.setItem('token', data.token ?? '')
            localStorage.setItem('refresh', data.refresh ?? '')
            navigate('/')
        } else {
            toast({
                title: 'Authentication Failed',
                description: data.msg,
                duration: 3000,
            })
        }
    }

    const value = {
        loginUser,
        tokens,
        decodedToken,
    }

    return (
        <AuthProviderContext.Provider value={value}>
            {children}
        </AuthProviderContext.Provider>
    )
}
