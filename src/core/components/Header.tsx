import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { MobileSidebar } from './MobileSidebar'
import ThemeButton from './ThemeButton'

export default function Header() {
    return (
        <div className='border-b w-full p-4 flex justify-start sticky'>
            <MobileSidebar />
            <div className='grow'>
                <Link to='/login'>
                    <Button>Login</Button>
                </Link>
            </div>
            <ThemeButton variant='ghost' />
        </div>
    )
}
