/* 
 * Handle error 
*/

export const error = () => {
  return async (ctx: any, next: any) => {
    return next().catch((err: any) => {

      const { status, errors = [], message } = err

      // Catch normal error
      if (errors.length) {
        ctx.status = 200
        return ctx.fail(errors[0].message)
      }

      // Catch unauth
      if (status === 401) {
        ctx.status = 401
        return ctx.fail('未授权无法访问')
      }

      // Catch server error
      if (!status) {
        ctx.status = 500
        return ctx.error(message)
      } 
      
      // Throw other error
      ctx.throw(err)
    })
  }
}