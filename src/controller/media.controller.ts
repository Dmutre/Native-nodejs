import { IncomingMessage, ServerResponse } from 'http'
import { json } from '../libs/utils/response'
import { parseBody } from '../libs/utils/body-parser'
import { S3Service } from '../libs/aws/s3.service'
import { errorHandler } from '../libs/utils/error-handler'
import { FileParameter } from '../libs/interfaces/file.interface'
import { getQueryParams } from '../libs/utils/query-params'
import { saveMetadata, deleteMetadata } from '../libs/metadata/metadata.service'

const s3Service = new S3Service()

const allowedContentTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf'
]

const getKeyFromQuery = (req: IncomingMessage): string => {
  const { key } = getQueryParams(req)
  if (!key || Array.isArray(key)) {
    throw new Error('Missing or invalid required field: key')
  }
  return key
}

const getBody = async (req: IncomingMessage): Promise<FileParameter> => {
  const body = await parseBody(req)
  if (!body) {
    throw new Error('Missing request body')
  }
  return body
}

const validateContentType = (contentType: string) => {
  if (!allowedContentTypes.includes(contentType)) {
    throw new Error(`Invalid content type: ${contentType}`)
  }
}

const success = (res: ServerResponse, message: string, key: string) => {
  json(res, { message, key })
}

export const uploadMedia = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { file, filename, contentType } = await getBody(req)

    if (!file || !filename || !contentType) {
      throw new Error('Missing required fields: file, filename, or contentType')
    }

    validateContentType(contentType)

    const buffer = Buffer.from(file, 'base64')

    await s3Service.uploadFile(filename, buffer, contentType)

    saveMetadata({
      filename,
      contentType,
      size: buffer.length,
      uploadedAt: new Date().toISOString()
    })

    success(res, 'File uploaded successfully', filename)
  } catch (error) {
    errorHandler(res, error)
  }
}

export const getMedia = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const key = getKeyFromQuery(req)

    const signedUrl = await s3Service.getFileUrl(key)

    json(res, { message: 'File URL generated successfully', url: signedUrl })
  } catch (error) {
    errorHandler(res, error)
  }
}

export const updateMedia = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { file, contentType, filename } = await getBody(req)

    if (!file || !contentType || !filename) {
      throw new Error('Missing required fields: file, contentType, or filename for update')
    }

    validateContentType(contentType)

    const buffer = Buffer.from(file, 'base64')

    await s3Service.uploadFile(filename, buffer, contentType)

    saveMetadata({
      filename,
      contentType,
      size: buffer.length,
      uploadedAt: new Date().toISOString()
    })

    success(res, 'File updated successfully', filename)
  } catch (error) {
    errorHandler(res, error)
  }
}

export const deleteMedia = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const key = getKeyFromQuery(req)

    await s3Service.deleteFile(key)

    deleteMetadata(key)

    success(res, 'File deleted successfully', key)
  } catch (error) {
    errorHandler(res, error)
  }
}
