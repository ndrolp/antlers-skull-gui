import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthProviderContext } from '@/core/providers/auth-provider'

const loginSchema = z.object({
    username: z.string().min(1, {
        message: 'Username is required',
    }),
    password: z.string().min(1, {
        message: 'Password is required',
    }),
})

export function LoginForm() {
    const { loginUser } = useContext(AuthProviderContext)
    const form = useForm < z.infer < typeof loginSchema >> ({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })
    // const navigate = useNavigate()

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        // console.log(values)
        loginUser(values.username, values.password)
        // navigate('/')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='Username' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='Password'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='w-full' type='submit'>
                    Login
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm
