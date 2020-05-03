import { logger } from '../utils'

/* 
 * Handle server error 
*/

export const serverError = (err: any, ctx: any) => {
  const { message } = err
  
  logger.error(message)
}