import axios from 'axios'
import dayjs from 'dayjs'
import { useContext, useMemo } from 'react'
import useGetConfig from './useGetConfig'
import { AuthProviderContext } from '../providers/auth-provider'
import { AxiosInstance } from 'axios'

const useAxios = (
    useApi: boolean = true,
    version: number = 1,
): AxiosInstance => {
    const { logout, tokens, setTokens, decodedToken } =
        useContext(AuthProviderContext)
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
        if (!isExpired) return req
        try {
            const response = await axios.post(
                `${config?.url}/api/v1/auth/refresh/`,
                {
                    refresh: tokens?.refresh ?? '',
                },
            )

            localStorage.setItem('authTokens', JSON.stringify(response.data))

            setTokens({
                ...tokens,
                token: response.data.token,
            })
            // setTokens({ ...tokens, res.data.token })

            req.headers.Authorization = `Bearer ${response.data.access}`
        } catch {
            logout()
        }
        return req
    })

    return axiosInstance
}

export default useAxios
