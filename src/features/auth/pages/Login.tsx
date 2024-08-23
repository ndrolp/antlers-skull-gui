import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from '../components/LoginForm'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { ConfigForm } from '../components/ConfigForm'
import useIsElectron from '@/core/hooks/useIsElectron'
import ThemeButton from '@/core/components/ThemeButton'

export const Login = () => {
    const isElectron = useIsElectron()
    return (
        <div className=' p-5 bg-red grid place-items-center w-full h-svh'>
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
                <ThemeButton />
            </div>
            <Card className='min-w-[98%]  md:min-w-[400px] lg:max-w-[35%] xl:max-w-[35%]'>
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
