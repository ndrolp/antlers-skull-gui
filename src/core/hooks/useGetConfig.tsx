import { useEffect, useState } from 'react'

export interface ConfigType {
    url: string
}

export default function useGetConfig(iterator = 0) {
    const [config, setConfig] = useState<ConfigType | null>(null)

    useEffect(() => {
        window.ipcRenderer.invoke('get-config', 'ping').then(result => {
            setConfig(result)
        })
    }, [iterator])

    return config
}
