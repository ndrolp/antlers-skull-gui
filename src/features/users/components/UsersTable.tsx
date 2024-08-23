import { DataTable } from '@/core/components/DataTable'
import usersColumns from '../dataModels'
import useGetUsers from '../hooks/useGetUsers'
import { useState } from 'react'

export const UsersTable = () => {
    const [page] = useState(1)
    const { users, loading } = useGetUsers({ page })
    return (
        <div>
            {loading ? <h1>Loading</h1> : ''}
            <DataTable data={users[page] ?? []} columns={usersColumns} />
        </div>
    )
}
