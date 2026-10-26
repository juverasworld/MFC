import { defineConfig, loadEnv } from 'vite'
import type { Connect, Plugin, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
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

type PaymentRequest = Connect.IncomingMessage & {
  body?: Record<string, unknown>
}

type PaymentResponse = {
  status(code: number): PaymentResponse
  json(payload: unknown): PaymentResponse
}

type PaymentHandler = (req: PaymentRequest, res: PaymentResponse) => Promise<unknown>
type LocalResponse = {
  statusCode: number
  writableEnded: boolean
  setHeader(name: string, value: string): void
  end(body?: string): void
}

const maximumRequestCharacters = 64 * 1024

function sendJson(res: LocalResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function localPaymentApi(): Plugin {
  const handlers = new Map<string, PaymentHandler>([
    ['/api/payments/initialize', initializePayment],
    ['/api/payments/verify', verifyPayment],
  ])

  return {
    name: 'mfc-local-payment-api',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((incomingReq, res, next) => {
        const req = incomingReq as PaymentRequest
        const pathname = new URL(req.url || '/', 'http://localhost').pathname
        const handler = handlers.get(pathname)
        if (!handler) return next()
        if (req.method !== 'POST') {
          return sendJson(res, 405, { error: 'Method not allowed.' })
        }

        void handleLocalPaymentRequest(req, res, handler)
      })
    },
  }
}

async function handleLocalPaymentRequest(
  req: PaymentRequest,
  res: LocalResponse,
  handler: PaymentHandler,
) {
  let body: unknown
  try {
    let rawBody = ''
    for await (const chunk of req) {
      rawBody += chunk
      if (rawBody.length > maximumRequestCharacters) {
        sendJson(res, 413, { error: 'Request body is too large.' })
        return
      }
    }

    body = rawBody ? JSON.parse(rawBody) : {}
  } catch {
    sendJson(res, 400, { error: 'Request body must be valid JSON.' })
    return
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    sendJson(res, 400, { error: 'Request body must be a JSON object.' })
    return
  }
  req.body = body as Record<string, unknown>

  const response: PaymentResponse = {
    status(code) {
      res.statusCode = code
      return response
    },
    json(payload) {
      if (!res.writableEnded) sendJson(res, res.statusCode || 200, payload)
      return response
    },
  }

  try {
    await handler(req, response)
    if (!res.writableEnded) sendJson(res, 500, { error: 'Local payment API did not return a response.' })
  } catch {
    if (!res.writableEnded) sendJson(res, 500, { error: 'Local payment API failed. Please try again.' })
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
