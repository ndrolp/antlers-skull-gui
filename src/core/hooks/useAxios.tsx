import axios from 'axios'
import dayjs from 'dayjs'
import { useContext, useMemo } from 'react'
import useGetConfig from './useGetConfig'
import { AuthProviderContext } from '../providers/auth-provider'
import { AxiosInstance } from 'axios'
import { useNavigate } from 'react-router-dom'

const useAxios = (
    useApi: boolean = true,
    version: number = 1,
): AxiosInstance => {
    const navigate = useNavigate()
    const { tokens, setTokens, decodedToken } = useContext(AuthProviderContext)
    const config = useGetConfig()

    const axiosInstance: AxiosInstance = useMemo(() => {
        const apiVersion = version && useApi ? `/v${version}` : ''
        const api = useApi ? '/api' : ''
        return axios.create({
            baseURL: `${config?.url ?? ''}${api}${apiVersion}` ?? '',
            headers: { Authorization: `Bearer ${tokens?.token}` },
        })
    }, [config, tokens, version, useApi])

    axiosInstance.interceptors.request.use(async req => {
        const isExpired =
            dayjs.unix(parseInt(decodedToken?.exp ?? '0')).diff(dayjs()) <= 100
        console.table(tokens)
        if (!isExpired) return req
        const response = await axios.post(
            `${config?.url}/api/v1/auth/refresh/`,
            {
                refresh: tokens?.refresh ?? '',
            },
        )
        if (response.status !== 200) {
            alert('Invalid Token')
            navigate('/login')
        }

        localStorage.setItem('authTokens', JSON.stringify(response.data))

        setTokens({
            ...tokens,
            token: response.data.token,
        })
        // setTokens({ ...tokens, res.data.token })

        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })

    return axiosInstance
}

export default useAxios
