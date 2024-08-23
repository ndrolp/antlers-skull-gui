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
        }
    }, [iterator])

    return config
}
