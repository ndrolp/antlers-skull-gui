import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useContext } from 'react'
import { AuthProviderContext } from '../providers/auth-provider'

export const SidebarUser = () => {
    const { decodedToken } = useContext(AuthProviderContext)
    return (
        <div className='flex items-center justify-start py-2 px-4 gap-4 border-b'>
            <div className=''>
                <Avatar>
                    {
                        // <AvatarImage src='https://github.com/shadsdacn.png' />
                    }
                    <AvatarFallback>
                        {decodedToken?.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div>
                <p className='font-bold h-4'>{decodedToken?.user.name}</p>
                <p className='text-neutral-500 text-sm'>
                    {decodedToken?.user.email}
                </p>
            </div>
        </div>
    )
}
