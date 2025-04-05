import { ServerResponse } from 'http'
import { json } from './response'
import { logger } from './logger'

export const errorHandler = (res: ServerResponse, error: unknown) => {
  const message = error instanceof Error ? error.message : 'Internal Server Error'

  logger.error(message)

  json(res, { error: message }, 500)
}
