import { Button } from '@/components/ui/button'
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

export function MobileSidebar() {
    return (
        <div className='grid grid-cols-2 gap-2 lg:hidden'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='outline' size='icon'>
                        <Sidebar className='h-4 w-4' />
                    </Button>
                </SheetTrigger>
                <SheetContent side='left'>
                    <SheetHeader className=''>
                        <SidebarUser />
                        <div className='hidden'>
                            <SheetTitle>Side Menu</SheetTitle>
                            <SheetDescription>
                                The side menu of the app
                            </SheetDescription>
                        </div>
                    </SheetHeader>
                    <SidebarMenu />
                </SheetContent>
            </Sheet>
        </div>
    )
}
