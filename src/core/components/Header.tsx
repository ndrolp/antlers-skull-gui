import { MobileSidebar } from './MobileSidebar'
import ThemeButton from './ThemeButton'

export default function Header() {
    return (
        <div className='border-b w-full p-4 flex justify-start sticky'>
            <MobileSidebar />
            <div className='grow'></div>
            <ThemeButton variant='ghost' />
        </div>
    )
}
