import { ColumnDef } from '@tanstack/react-table'
import { User } from './types/user'

export const usersColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'username',
        header: 'Username',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'lastName',
        header: 'LastName',
    },
]

export default usersColumns
