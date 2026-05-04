import {defineConfig} from 'vite'
import {readFileSync} from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify(process.env.VITE_APP_VERSION || pkg.version),
    },
})
