const interceptors = {
  /* 
  * Defined interface of returning informations 
  * code // 0: fail, 1: success
  */

  response() {
    return async (ctx: any, next: any) => {
      // The format of returning informations when operation is fail
      ctx.fail = (msg: string = `请求失败`) => {
        ctx.status = 200
        ctx.body = {
          code: 0,
          msg,
          data: null,
          error: null,
        }
      }

      // The format of returning informations when the request is bad
      ctx.badRequest = (msg: string = `请求有误`) => {
        ctx.status = 400
        ctx.body = {
          code: 0,
          msg,
          data: null,
          error: null,
        }
      }

      // The format of returning informations when object not found
      ctx.notFound = (msg: string = `对象不存在`) => {
        ctx.status = 404
        ctx.body = {
          code: 0,
          msg,
          data: null,
          error: null,
        }
      }

      // The format of returning informations when the user is unAuthenticated
      ctx.unAuthenticated = (msg: string) => {
        ctx.status = 401
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
        ctx.status = 200
        ctx.body = {
          code: 1,
          msg,
          data,
          error: null,
        }
      }

      // The format of returning informations when operation is error
      ctx.error = (error: any) => {
        ctx.status = 500
        ctx.body = {
          code: 0,
          msg: `内部服务器错误`,
          data: null,
          error,
        }
      }

      await next()
    }
  }
}

export const request = {
  interceptors,
}