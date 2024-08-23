import { Button } from '@/components/ui/button'
import { UsersTable } from '../components/UsersTable'
import { UserRoundPlus } from 'lucide-react'

export const Users = () => {
    return (
        <div className='flex flex-col gap-2'>
            <div>
                <Button variant='outline'>
                    <UserRoundPlus className='mr-2 h-4 w-4' /> Create
                </Button>
            </div>
            <UsersTable />
        </div>
    )
}
