const interceptors = {
  /* 
  * Defined interface of returning informations 
  * code // 0: fail, 1: success
  */

  response() {
    return async (ctx: any, next: any) => {
      // The format of returning informations when operation is fail
      ctx.fail = (msg: string = `Opt fail`) => {
        ctx.status = 200
        ctx.body = {
          code: 0,
          msg,
          data: null,
          error: null,
        }
      }

      // The format of returning informations when the request is bad
      ctx.badRequest = (msg: string = `Bad Request`) => {
        ctx.status = 400
        ctx.body = {
          code: 0,
          msg,
          data: null,
          error: null,
        }
      }

      // The format of returning informations when object not found
      ctx.notFound = (msg: string = `Object not exist`) => {
        ctx.status = 404
        ctx.body = {
          code: 0,
          msg,
          data: null,
          error: null,
        }
      }

      // The format of returning informations when the user is unAuthenticated
      ctx.unAuthenticated = (msg: string = `UnAuthenticated`) => {
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
          msg: `Internal server error`,
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