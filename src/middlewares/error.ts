/* 
 * Handle all error 
*/

export const error = () => {
  return async (ctx: any, next: any) => {
    return next().catch((err: any) => {
      const status = err.statusCode || err.status || 500

      // return ctx.error(err)

      const {
        name = ``,
        errors = [],
        originalError,
        message = ``,
        fields = [],
      } = err

      console.log(errors)


      if (status === 400)
        return ctx.badRequest(message)
      else if (status === 401)
        return ctx.unAuthenticated(originalError ? originalError.message : message)
      else
        switch (name) {
          case `SequelizeValidationError`:
          case `SequelizeUniqueConstraintError`:
            return ctx.fail(errors[0].message)
          case `SequelizeForeignKeyConstraintError`:
            return ctx.notFound(`${fields[0]} not found`)
          default:
            // Emit the error
            ctx.app.emit(`error`, err, ctx)

            return ctx.error(message)
        }
    })
  }
}