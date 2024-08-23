import { UsersTable } from '../components/UsersTable'
import useGetUsers from '@/features/users/hooks/useGetUsers'

export const Users = () => {
    const { users } = useGetUsers()
    return (
        <div>
            <UsersTable data={users} />
        </div>
    )
}
