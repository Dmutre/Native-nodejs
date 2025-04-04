import http from 'http'
import router from './routes'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  router.lookup(req, res)
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
