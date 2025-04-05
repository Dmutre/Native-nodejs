import { IncomingMessage } from 'http'
import { parse } from 'url'

export const getQueryParams = (req: IncomingMessage) => {
  const parsedUrl = parse(req.url || '', true)
  return parsedUrl.query
}
