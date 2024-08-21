import Sidebar from './Sidebar'
import { Button } from '@/components/ui/button'
import { Link, Outlet } from 'react-router-dom'
import { MobileSidebar } from './MobileSidebar'

export default function Layout() {
    return (
        <div className='flex items-start justify-between gap-0'>
            <div className='min-w-[300px] hidden lg:flex hkjkjkjkj border-r min-h-screen'>
                <Sidebar />
            </div>
            <main className='w-full h-full flex flex-col gap-4'>
                <div className='border-b w-full p-4 flex justify-between fixed'>
                    <MobileSidebar />
                    <Link to='/login'>
                        <Button>Login</Button>
                    </Link>
                </div>
                <div className='p-4'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
