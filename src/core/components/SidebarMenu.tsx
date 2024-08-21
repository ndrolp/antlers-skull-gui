import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import { SidebarMenuItem } from './SidebarMenuItem'
import { AppWindow, IdCard, Settings, User, UserPen } from 'lucide-react'

export default function SidebarMenu() {
    return (
        <Command className='bg-transparent'>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading='Management'>
                    <SidebarMenuItem Icon={User} text='Users' to='/users' />
                    <SidebarMenuItem
                        Icon={AppWindow}
                        text='Applications'
                        to='/applications'
                    />
                    <SidebarMenuItem Icon={IdCard} text='Roles' to='/roles' />
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading='Options'>
                    <SidebarMenuItem
                        Icon={UserPen}
                        text='Profile'
                        to='/profile'
                    />
                    <SidebarMenuItem
                        Icon={Settings}
                        text='Settings'
                        to='/settings'
                    />
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
