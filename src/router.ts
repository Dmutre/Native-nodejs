import { IncomingMessage, ServerResponse } from 'http'
import { errorHandler } from './libs/utils/error-handler'
import { json } from './libs/utils/response'
import { Route } from './libs/interfaces/router.interface'
import { Handler } from './libs/types/handler'
import { Method } from './libs/types/methods'

const routes: Route[] = []

export const addRoute = (method: Method, path: string, handler: Handler) => {
  const pathRegex = new RegExp(`^${path.replace(/:([^/]+)\b/g, '(?<$1>[^/]+)')}$`)
  routes.push({ method, path: pathRegex, handler })
}

export const router = async (req: IncomingMessage, res: ServerResponse) => {
  const method = req.method || ''
  const url = req.url?.split('?')[0] || ''

  const route = routes.find(r => r.method === method && r.path.test(url))

  if (route) {
    const match = route.path.exec(url)
    const params = match?.groups || {}

    await Promise.resolve(route.handler(req, res, params))
      .catch((error: Error) => errorHandler(res, error))
  } else {
    json(res, { message: 'Not found' }, 404)
  }
}
