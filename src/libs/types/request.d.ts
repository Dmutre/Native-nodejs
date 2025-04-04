import { IncomingMessage } from 'http'

export interface RequestWithBody extends IncomingMessage {
  body?: any
}
