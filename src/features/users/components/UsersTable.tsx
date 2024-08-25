import { DataTable } from '@/core/components/DataTable'
import usersColumns from '../dataModels'
import { User } from '../types/user'

export const UsersTable = ({ data }: { data: User[] }) => {
    return (
        <div>
            <DataTable data={data ?? []} columns={usersColumns} />
        </div>
    )
}
