import { Button } from '@/components/ui/button'
import LoadingBar from '@/core/components/LoadingBar'
import { UsersTable } from '../components/UsersTable'
import { UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import useGetUsers from '../hooks/useGetUsers'
import { Input } from '@/components/ui/input'
import Paginator from '@/core/components/Paginator'

export const Users = () => {
    const [page, setPage] = useState(1)
    const { users, loading } = useGetUsers({ page })
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
                <Input />
                <Button variant='outline'>
                    <UserRoundPlus className='mr-2 h-4 w-4' /> Create
                </Button>
            </div>
            <UsersTable data={users[page] ?? []} />
            {loading ? (
                <LoadingBar />
            ) : (
                <Paginator
                    page={page}
                    setPage={setPage}
                    maxSize={30}
                    pageSize={20}
                />
            )}
        </div>
    )
}
