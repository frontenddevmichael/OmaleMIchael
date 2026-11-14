import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      // the case studies are imported as raw text through import.meta.glob;
      // a full reload makes edits land immediately instead of waiting for a
      // module that Vite has no component to hot swap
      name: 'case-study-reload',
      handleHotUpdate({ file, server }) {
        if (!file.includes('/src/content/work/')) return
        server.ws.send({ type: 'full-reload' })
        return []
      },
    },
  ],
})
