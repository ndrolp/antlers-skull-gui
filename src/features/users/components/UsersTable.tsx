import { DataTable } from '@/core/components/DataTable'
import { User } from '../types/user'
import usersColumns from '../dataModels'

export const UsersTable = ({ data }: { data: Array<User> }) => {
    return (
        <div>
            <DataTable data={data} columns={usersColumns} />
        </div>
    )
}
