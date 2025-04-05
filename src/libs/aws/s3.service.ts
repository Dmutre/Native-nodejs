import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import config from '../config/config'
import { logger } from '../utils/logger'

export class S3Service {
  private readonly s3: S3Client
  private readonly bucketName: string
  private readonly config = config()

  constructor() {
    this.s3 = new S3Client({
      region: this.config.AWS_REGION,
      credentials: {
        accessKeyId: this.config.AWS_ACCESS_KEY_ID!,
        secretAccessKey: this.config.AWS_SECRET_ACCESS_KEY!,
      },
    })

    this.bucketName = this.config.AWS_BUCKET_NAME!
  }

  async uploadFile(key: string, body: Buffer, contentType: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    })

    logger.info(`Uploading file to S3: ${key}`)

    await this.s3.send(command)
  }

  async getFileUrl(key: string, expiresInSeconds = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    })

    logger.info(`Generating signed URL for file: ${key}`)
    logger.info(`Expires in: ${expiresInSeconds} seconds`)

    return getSignedUrl(this.s3, command, { expiresIn: expiresInSeconds })
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    })

    logger.info(`Deleting file from S3: ${key}`)

    await this.s3.send(command)
  }
}
