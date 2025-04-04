import http from 'http'
import { router, addRoute } from './router'
import * as mediaController from './controller/media.controller'
import dotenv from 'dotenv'
import { logger } from './libs/utils/logger'

dotenv.config()

const PORT = process.env.PORT ?? 3000

addRoute('POST', '/media', mediaController.uploadMedia)
addRoute('GET', '/media/:id', mediaController.getMedia)
addRoute('PUT', '/media/:id', mediaController.updateMedia)
addRoute('DELETE', '/media/:id', mediaController.deleteMedia)

const server = http.createServer((req, res) => {
  router(req, res)
})

server.listen(PORT, () => {
  logger.log(`Server is running on http://localhost:${PORT}`)
})
