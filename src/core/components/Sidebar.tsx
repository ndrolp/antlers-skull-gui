import { LogOutIcon } from 'lucide-react'
import SidebarMenu from './SidebarMenu'
import { SidebarUser } from './SidebarUser'
import { Button } from '@/components/ui/button'
import { useContext } from 'react'
import { AuthProviderContext } from '../providers/auth-provider'

export default function Sidebar() {
    const { logout } = useContext(AuthProviderContext)
    return (
        <div className='fixed flex flex-col w-[300px]  min-h-screen min-w-[300px] border-r'>
            <SidebarUser />
            <div className='grow p-4'>
                <SidebarMenu />
            </div>
            <div className='px-4 py-3 border-t'>
                <Button
                    onClick={() => {
                        logout()
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
