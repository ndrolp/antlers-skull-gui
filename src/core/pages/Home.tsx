import { Button } from '@/components/ui/button'
import useAxios from '../hooks/useAxios'

export default function Home() {
    const axios = useAxios()
    return (
        <div>
            <Button
                onClick={() => {
                    axios.post('/users')
                }}
            >
                TestAxios
            </Button>
        </div>
    )
}
