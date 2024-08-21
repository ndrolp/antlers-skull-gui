import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from '../components/LoginForm'
import { Button } from '@/components/ui/button'
import { MoonStar, Settings } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { ConfigForm } from '../components/ConfigForm'
import useIsElectron from '@/core/hooks/useIsElectron'
import { useTheme } from '@/core/hooks/useTheme'

export const Login = () => {
    const { toggleTheme } = useTheme()
    const isElectron = useIsElectron()
    return (
        <div className=' p-10 bg-red grid place-items-center w-full h-svh'>
            <div className='fixed top-2 right-2 flex gap-2'>
                {isElectron ? (
                    <Dialog>
                        <DialogTrigger>
                            <Button variant='outline' size='icon'>
                                <Settings className='h-4 w-4' />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Configuration</DialogTitle>
                            </DialogHeader>
                            <ConfigForm />
                        </DialogContent>
                    </Dialog>
                ) : (
                    ''
                )}
                <Button
                    onClick={() => {
                        toggleTheme()
                    }}
                    variant='outline'
                    size='icon'
                >
                    <MoonStar className='h-4 w-4' />
                </Button>
            </div>
            <Card className='min-w-[25%]'>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}
