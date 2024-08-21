import SidebarMenu from './SidebarMenu'
import { SidebarUser } from './SidebarUser'

export default function Sidebar() {
    return (
        <div className='fixed flex flex-col w-[300px]  min-h-screen min-w-[300px]'>
            <SidebarUser />
            <div className='grow p-4'>
                <SidebarMenu />
            </div>
            <div className='p-4'>Settings</div>
        </div>
    )
}
