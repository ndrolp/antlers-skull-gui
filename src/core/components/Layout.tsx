import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className='flex items-start justify-between gap-0'>
            <div className='min-w-[300px] hidden md:flex hkjkjkjkj border-r min-h-screen'>
                <Sidebar />
            </div>
            <main className='w-full h-full flex flex-col gap-0'>
                <Header />
                <div className='p-4 '>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
