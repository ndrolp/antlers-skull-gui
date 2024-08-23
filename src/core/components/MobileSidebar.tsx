import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'
import { useContext } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { SidebarUser } from './SidebarUser'
import { Sidebar } from 'lucide-react'
import SidebarMenu from './SidebarMenu'
import { AuthProviderContext } from '../providers/auth-provider'

export function MobileSidebar() {
    const { logout } = useContext(AuthProviderContext)
    return (
        <div className='grid grid-cols-2 gap-2 md:hidden'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='outline' size='icon'>
                        <Sidebar className='h-4 w-4' />
                    </Button>
                </SheetTrigger>
                <SheetContent side='left' className='flex flex-col'>
                    <SheetHeader className=''>
                        <div className='grow'>
                            <SidebarUser />
                        </div>
                        <div className='hidden'>
                            <SheetTitle>Side Menu</SheetTitle>
                            <SheetDescription>
                                The side menu of the app
                            </SheetDescription>
                        </div>
                    </SheetHeader>
                    <div className='grow border-t'>
                        <SidebarMenu />
                    </div>
                    <Button
                        onClick={() => {
                            logout()
                        }}
                        variant='ghost'
                        className='flex w-full gap-2 justify-start p-2 mt-auto border-t'
                    >
                        <LogOutIcon className='mr-0 h-4 w-4' />
                        <p>Logout</p>
                    </Button>
                </SheetContent>
            </Sheet>
        </div>
    )
}
