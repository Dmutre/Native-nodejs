import { MediaMetadata } from '../interfaces/metadata.interface'
import { logger } from '../utils/logger'

const metadataStore: Record<string, MediaMetadata> = {}

export const saveMetadata = (metadata: MediaMetadata) => {
  logger.info(`Saving metadata for file: ${metadata.filename}`)
  metadataStore[metadata.filename] = metadata
}

export const getMetadata = (filename: string): MediaMetadata | undefined => {
  logger.info(`Retrieving metadata for file: ${filename}`)
  return metadataStore[filename]
}

export const deleteMetadata = (filename: string) => {
  logger.info(`Deleting metadata for file: ${filename}`)
  delete metadataStore[filename]
}

export const listAllMetadata = (): MediaMetadata[] => {
  logger.info('Listing all metadata')
  return Object.values(metadataStore)
}
