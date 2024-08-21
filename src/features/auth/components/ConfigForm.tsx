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
import useGetConfig, { ConfigType } from '@/core/hooks/useGetConfig'
import { setConfig } from '@/core/lib/setConfig'
import { useToast } from '@/components/ui/use-toast'
const configSchema = z.object({
    url: z.string().url().min(1, {
        message: 'Username is required',
    }),
})

export function ConfigForm() {
    const { toast } = useToast()
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

    const setInvalidUrl = (remove: boolean = false) => {
        if (!remove)
            form.setError(
                'url',
                { message: 'Invalid URL' },
                { shouldFocus: true },
            )
        form.clearErrors('url')
    }

    const onSubmit = async (values: ConfigType) => {
        if (setConfig(values)) {
            const urlValid = await testUrl()
            if (!urlValid) return false
            toast({ title: 'Settings properly saved' })
        }
    }

    const testUrl = async () => {
        try {
            const response = await fetch(
                `${form.getValues().url}/api/healthcheck`,
            )
            if (response.status === 200) {
                toast({ title: 'The url is accesible' })
                setInvalidUrl(true)
                return true
            } else {
                setInvalidUrl()
                return false
            }
        } catch {
            setInvalidUrl()
            return false
        }
    }

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
                                <div className='flex w-full items-center space-x-2'>
                                    <Input
                                        spellCheck='false'
                                        placeholder='URL'
                                        {...field}
                                    />
                                    <Button
                                        onClick={testUrl}
                                        type='button'
                                        variant='secondary'
                                    >
                                        Test
                                    </Button>
                                </div>
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
