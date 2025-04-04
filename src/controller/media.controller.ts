import { IncomingMessage, ServerResponse } from 'http'
import { json } from '../libs/utils/response'

export const uploadMedia = async (req: IncomingMessage, res: ServerResponse, params: Record<string, string>) => {
  json(res, { message: 'Upload endpoint hit!' })
}

export const getMedia = async (req: IncomingMessage, res: ServerResponse, params: Record<string, string>) => {
  json(res, { message: 'Get media', id: params.id })
}

export const updateMedia = async (req: IncomingMessage, res: ServerResponse, params: Record<string, string>) => {
  json(res, { message: 'Update media', id: params.id })
}

export const deleteMedia = async (req: IncomingMessage, res: ServerResponse, params: Record<string, string>) => {
  json(res, { message: 'Delete media', id: params.id })
}
