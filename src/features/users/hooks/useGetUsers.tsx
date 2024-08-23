import useAxios from '@/core/hooks/useAxios'
import { useEffect, useState } from 'react'
import { User } from '../types/user'

export interface UseGetUserProps {
    limit?: number
    page?: number
    filter?: User
}

export default function useGetUsers({
    filter,
    limit = 10,
    page = 1,
}: UseGetUserProps = {}) {
    const axios = useAxios()
    const [users, setUsers] = useState < Array < User >> ([])
    const getUsers = async () => {
        if (!axios) return []
        let params = { page, limit }
        if (filter) params = { ...params, ...filter }
        const data = await axios.get < Array < User >> ('/users/', { params })
        console.table(data)
        setUsers(data.data)
    }

    useEffect(() => {
        if (!axios) return
        getUsers()
    }, [axios])

    return { users }
}
