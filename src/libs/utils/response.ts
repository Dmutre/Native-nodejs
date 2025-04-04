import { ServerResponse } from 'http'

export const send = (res: ServerResponse, body: any, statusCode = 200, contentType = 'text/plain') => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', contentType)

  if (typeof body === 'object') {
    res.end(JSON.stringify(body))
  } else {
    res.end(body)
  }
}

export const json = (res: ServerResponse, data: any, statusCode = 200) => {
  send(res, data, statusCode, 'application/json')
}

export const text = (res: ServerResponse, message: string, statusCode = 200) => {
  send(res, message, statusCode, 'text/plain')
}
