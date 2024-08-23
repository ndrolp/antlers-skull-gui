import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useAxios from './useAxios'

export interface UsePaginatedResponseProps<TBody, TParams> {
    url: string
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
    limit?: number
    page?: number
    body?: TBody
    params?: TParams
    options?: AxiosRequestConfig<TBody>
}

export type UsePaginatedResponseReturn<TResponse> = {
    loading: boolean
    data: TResponse | undefined
    error: AxiosError | undefined
    axiosResponse: AxiosResponse<TResponse> | undefined
}

export default function usePaginatedResponse<TResponse, TBody, TParams>({
    url,
    method = 'get',
    limit = 12,
    page = 1,
    body = undefined,
    params = undefined,
    options = undefined,
}: UsePaginatedResponseProps<
    TBody,
    TParams
>): UsePaginatedResponseReturn<TResponse> {
    const axios = useAxios()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<AxiosError | undefined>(undefined)
    const [axiosResponse, setAxiosResponse] = useState<
        AxiosResponse<TResponse> | undefined
    >(undefined)
    const data = useMemo(() => {
        if (!axiosResponse?.data) return undefined
        return axiosResponse.data
    }, [axiosResponse?.data])

    const getData = useCallback(async () => {
        try {
            if (loading) return
            if (!axios) {
                return
            }
            setLoading(true)

            const requestOptions = options || {}
            requestOptions.params = { ...params, limit, page }
            requestOptions.data = body

            const response = await axios<TResponse>(url, requestOptions)
            setAxiosResponse(response)
        } catch (error) {
            setError(error as AxiosError)
        } finally {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axios, options, params, limit, page, body, url])

    useEffect(() => {
        getData()
    }, [url, method, limit, page, body, options, params, getData])

    return { loading, data, axiosResponse, error }
}
