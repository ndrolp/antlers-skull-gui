import { app, BrowserWindow, globalShortcut, ipcMain, Menu } from 'electron'
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'fs'
import os from 'os'

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, 'public')
    : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
        },
    })

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send(
            'main-process-message',
            new Date().toLocaleString(),
        )
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(RENDERER_DIST, 'index.html'))
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(() => {
    createWindow()
    Menu.setApplicationMenu(Menu.buildFromTemplate([]))
    globalShortcut.register('CommandOrControl+Shift+I', () => {
        // Toggle Developer Tools
        if (win) {
            win.webContents.toggleDevTools()
        }
    })

    // Menu.setApplicationMenu(Menu.buildFromTemplate([]))
    ipcMain.handle('set-config', async (_event, args) => {
        try {
            const homeDir = os.homedir()
            const configFilePath = path.join(
                homeDir,
                '.config',
                '.antlers.gui.json',
            )
            fs.writeFileSync(configFilePath, args)
            return true
        } catch (error) {
            return false
        }
    })

    ipcMain.handle('get-config', async () => {
        const homeDir = os.homedir()
        const configFilePath = path.join(
            homeDir,
            '.config',
            '.antlers.gui.json',
        )
        if (!fs.existsSync(configFilePath)) {
            return {}
        }
        const value = fs.readFileSync(configFilePath, 'utf-8')
        return JSON.parse(value ?? {})
    })
})
