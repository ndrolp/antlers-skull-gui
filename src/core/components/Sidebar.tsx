import { LogOutIcon } from 'lucide-react'
import SidebarMenu from './SidebarMenu'
import { SidebarUser } from './SidebarUser'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
    const navigate = useNavigate()
    return (
        <div className='fixed flex flex-col w-[300px]  min-h-screen min-w-[300px]'>
            <SidebarUser />
            <div className='grow p-4'>
                <SidebarMenu />
            </div>
            <div className='px-4 py-3 border-t'>
                <Button
                    onClick={() => {
                        navigate('/login')
                    }}
                    variant='ghost'
                    className='flex w-full gap-2 justify-start p-2'
                >
                    <LogOutIcon className='mr-0 h-4 w-4' />
                    <p>Logout</p>
                </Button>
            </div>
        </div>
    )
}
