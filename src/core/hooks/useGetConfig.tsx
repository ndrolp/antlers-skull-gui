import { useEffect, useState } from 'react'
import useIsElectron from './useIsElectron'

export interface ConfigType {
    url: string
}

export default function useGetConfig(iterator = 0) {
    const [config, setConfig] = useState < ConfigType | null > (null)
    const isElectron = useIsElectron()

    useEffect(() => {
        if (isElectron) {
            window.ipcRenderer.invoke('get-config', 'ping').then(result => {
                setConfig(result)
            })
        } else {
            //TODO: Use environment variables for the configuration on the web
            setConfig({ url: 'http://localhost:3000' })
        }
    }, [iterator])

    return config
}
