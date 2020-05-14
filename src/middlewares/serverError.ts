import { Context } from 'koa'
import { logger } from '../utils'

/* 
 * Handle server error 
*/

export const serverError = (err: any, ctx: Context) => {
  const { message } = err
  
  logger.error(message)
}