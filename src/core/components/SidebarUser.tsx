import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const SidebarUser = () => {
    return (
        <div className='flex items-center justify-start p-3 gap-4 border-b'>
            <div className=''>
                <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <p className='font-bold text-lg'>Admin</p>
                <p className='text-neutral-500 text-sm'>admin@admin.com</p>
            </div>
        </div>
    )
}
