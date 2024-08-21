import { CommandItem } from '@/components/ui/command'
import { LucideProps } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

interface SidebarMenuItemParams {
    Icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >
    text: string
    to: string
}

export const SidebarMenuItem: React.FC<SidebarMenuItemParams> = ({
    Icon,
    text,
    to,
}) => {
    return (
        <Link to={to}>
            <CommandItem className='cursor-pointer'>
                <Icon className='mr-2 h-4 w-4' />
                <span>{text}</span>
            </CommandItem>
        </Link>
    )
}
