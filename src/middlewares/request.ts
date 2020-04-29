import { logger, consoleTheme } from '../utils'

const interceptors = {
  request() {
    return async (ctx: any, next: any) => {
      const { request, response } = ctx
      const { url, method, } = request
      logger.debug(url, method,  `Request`, consoleTheme.testing)
      await next()
    }
  },


  /* 
  * Defined interface of returning informations 
  * code // 0: fail, 1: success
  */

  response() {
    return async (ctx: any, next: any) => {

      // The format of returning informations when operation is fail
      ctx.fail = (msg: string = '请求失败') => {
        ctx.body = {
          code: 0,
          msg,
          data: null,
          error: null,
        }
      }

      // The format of returning informations when operation is success
      ctx.success = (
        data: any = null,
        msg: string | null = null
      ) => {
        ctx.body = {
          code: 1,
          msg,
          data,
          error: null,
        }
      }

      // The format of returning informations when operation is error
      ctx.error = (msg: string) => {
        ctx.body = {
          code: 0,
          msg: '服务器内部错误',
          data: null,
          error: msg,
        }
      }

      await next()
    }
  }
}

export const request = {
  interceptors,
}