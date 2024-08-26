import { useEffect, useState } from 'react'
import { User } from '../types/user'
import usePaginatedResponse from '@/core/hooks/usePaginatedResponse'
import { PaginatedData } from '@/core/types/paginatedData'

export interface UseGetUserProps {
    filter?: User
    page?: number
}

export default function useGetUsers({
    filter,
    page = 1,
}: UseGetUserProps = {}) {
    const { count, data, loading, error } = usePaginatedResponse<
        User[],
        undefined,
        object
    >({
        url: '/users/',
        params: filter,
        page,
    })

    const [paginatedData, setPaginatedData] = useState<PaginatedData<User[]>>(
        {},
    )

    useEffect(() => {
        const currentData = paginatedData
        if (!data) return

        const newPaginatedData: PaginatedData<User[]> = { ...currentData }
        newPaginatedData[page] = data

        setPaginatedData(newPaginatedData)
    }, [data, page])

    return { users: paginatedData, loading, error, count }
}
