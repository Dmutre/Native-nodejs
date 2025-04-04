import { IncomingMessage } from 'http'

export const parseBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () => {
      try {
        const parsed = JSON.parse(data)
        resolve(parsed)
      } catch (error) {
        reject(error)
      }
    })

    req.on('error', err => {
      reject(err)
    })
  })
}
