import http from 'http'
import { router, addRoute } from './router'
import * as mediaController from './controller/media.controller'
import { logger } from './libs/utils/logger'
import Config from './libs/config/config'

const config = Config()

const PORT = config.PORT
const HOST = config.HOST

addRoute('POST', '/media', mediaController.uploadMedia)
addRoute('GET', '/media', mediaController.getMedia)
addRoute('PUT', '/media', mediaController.updateMedia)
addRoute('DELETE', '/media', mediaController.deleteMedia)

const server = http.createServer((req, res) => {
  router(req, res)
})

server.listen(PORT, HOST, () => {
  logger.log(`Server is running on http://${HOST}:${PORT}`)
})
