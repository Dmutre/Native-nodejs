import { IncomingMessage, ServerResponse } from 'http'
import { parseBody } from '../libs/utils/body-parser'

export const homeController = {
  home: (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello from Native Node Server with TypeScript!')
  },

  postData: async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const body = await parseBody(req)
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ received: body }))
    } catch (error) {
      res.statusCode = 400
      res.end('Invalid JSON')
    }
  }
}
