import { createContext, useMemo, useState } from 'react'
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
    setTokens: React.Dispatch<React.SetStateAction<LoginResponse>>
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
    setTokens: () => { },
}

export const AuthProviderContext =
    createContext<AuthProviderState>(initialState)

export function AuthProvider({ children }: AuthProviderProps) {
    const { toast } = useToast()
    const [tokens, setTokens] = useState<LoginResponse>({
        token: localStorage.getItem('token') ?? '',
        refresh: localStorage.getItem('refresh') ?? '',
    })
    const decodedToken: TokenParsed | undefined = useMemo(() => {
        const decoded: TokenParsed | undefined = tokens?.token
            ? jwtDecode(tokens?.token ?? '')
            : undefined
        console.log(decoded)
        return decoded
    }, [tokens?.token])
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
        setTokens,
    }

    return (
        <AuthProviderContext.Provider value={value}>
            {children}
        </AuthProviderContext.Provider>
    )
}
