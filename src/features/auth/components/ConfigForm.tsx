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
import useGetConfig from '@/core/hooks/useGetConfig'
const configSchema = z.object({
    url: z.string().min(1, {
        message: 'Username is required',
    }),
})

export function ConfigForm() {
    const config = useGetConfig()
    const form = useForm<z.infer<typeof configSchema>>({
        resolver: zodResolver(configSchema),
        defaultValues: {
            url: '',
        },
        values: {
            url: config?.url ?? '',
        },
    })

    const onSubmit = () => { }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='url'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Server URL</FormLabel>
                            <FormControl>
                                <Input
                                    spellCheck='false'
                                    placeholder='URL'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='w-full' type='submit'>
                    Submit
                </Button>
            </form>
        </Form>
    )
}
