import { defineConfig, loadEnv } from 'vite'
import type { Plugin, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'

// import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// @ts-expect-error Vercel handlers are plain JavaScript modules.
import initializePayment from './api/payments/initialize.js'
// @ts-expect-error Vercel handlers are plain JavaScript modules.
import verifyPayment from './api/payments/verify.js'

const serverOnlyEnv = [
  'PAYSTACK_SECRET_KEY',
  'APP_BASE_URL',
  'MFC_API_BASE_URL',
  'MFC_PROMOTER_REGISTRATION_URL',
  'MFC_FULFILLMENT_TOKEN',
]

function localPaymentApi(): Plugin {
  const handlers = new Map<string, (req: any, res: any) => Promise<unknown>>([
    ['/api/payments/initialize', initializePayment],
    ['/api/payments/verify', verifyPayment],
  ])

  return {
    name: 'mfc-local-payment-api',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req: any, res: any, next: (error?: Error) => void) => {
        const pathname = new URL(req.url || '/', 'http://localhost').pathname
        const handler = handlers.get(pathname)
        if (!handler) return next()
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ error: 'Method not allowed.' }))
        }

        try {
          let rawBody = ''
          for await (const chunk of req) rawBody += chunk
          req.body = rawBody ? JSON.parse(rawBody) : {}
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ error: 'Request body must be valid JSON.' }))
        }

        if (!process.env.APP_BASE_URL && req.headers.host) {
          const protocol = req.headers['x-forwarded-proto'] || 'http'
          process.env.APP_BASE_URL = `${protocol}://${req.headers.host}`
        }

        const response = {
          status(code: number) {
            res.statusCode = code
            return this
          },
          json(payload: unknown) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
            return this
          },
        }

        try {
          await handler(req, response)
        } catch {
          if (!res.writableEnded) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Local payment API failed. Please try again.' }))
          }
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of serverOnlyEnv) {
    if (!process.env[key] && env[key]) process.env[key] = env[key]
  }

  return {
    plugins: [react(), tailwindcss(), localPaymentApi()],
  }
})
// export default defineConfig({
// })
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://apime.myfamilycompanion.org",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
//       },
//     },
//   },
// });
