import { Handler } from '../types/handler' 

export interface Route {
  method: string
  path: RegExp
  handler: Handler
}