import { Button } from '@/components/ui/button'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import LoadingBar from '@/core/components/LoadingBar'
import { UsersTable } from '../components/UsersTable'
import { UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import useGetUsers from '../hooks/useGetUsers'
import { Input } from '@/components/ui/input'

export const Users = () => {
    const [page] = useState(1)
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
                <Pagination className='mt-2'>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href='#' />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href='#'>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href='#' />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}
