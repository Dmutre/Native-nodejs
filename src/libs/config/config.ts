import { config } from 'dotenv'
import { Config } from '../interfaces/config.interface'

config()

export default (): Config => ({
  PORT: Number(process.env.PORT || 3000),
  HOST: process.env.HOST || 'localhost',

  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || '',
})