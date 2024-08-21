import { ConfigType } from '../hooks/useGetConfig'

export const setConfig = (config: ConfigType): boolean => {
    let value = true
    window.ipcRenderer
        .invoke('set-config', JSON.stringify(config))
        .then(result => {
            value = result
        })
        .catch(() => {
            value = false
        })
    return value
}
