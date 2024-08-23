import { DataTable } from '@/core/components/DataTable'
import usersColumns from '../dataModels'
import useGetUsers from '../hooks/useGetUsers'
import { useState } from 'react'
import LoadingBar from '@/core/components/LoadingBar'

export const UsersTable = () => {
    const [page] = useState(1)
    const { users, loading } = useGetUsers({ page })
    return (
        <div>
            <DataTable data={users[page] ?? []} columns={usersColumns} />
            {loading ? <LoadingBar /> : ''}
        </div>
    )
}
