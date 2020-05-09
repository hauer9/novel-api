import _ from 'lodash'

/* 
 * Handle all error 
*/

export const error = () => {
  return async (ctx: any, next: any) => {
    return next().catch((err: any) => {
      const status = err.statusCode || err.status || 500

      // return ctx.error(err)

      const {
        isJoi = false,
        details = [],
        name = ``,
        errors = [],
        originalError,
        message = ``,
        fields = [],
      } = err

      if (isJoi) {
        const msg = _.get(details, `[0].message`, `Request parameter error`).replace(/"/g, '')
        return ctx.badRequest(msg)
      }

      if (status === 400)
        return ctx.badRequest(message)
      else if (status === 401)
        return ctx.unAuthenticated(originalError ? originalError.message : message)
      else
        switch (name) {
          case `SequelizeValidationError`:
          case `SequelizeUniqueConstraintError`:
            const msg = _.get(errors, `[0].message`, `Validation error or uniqueConstraint error`)
            return ctx.fail(msg)
          case `SequelizeForeignKeyConstraintError`:
            return ctx.notFound(`${fields[0] || `field`} not found`)
          default:
            // Emit the error
            ctx.app.emit(`error`, err, ctx)

            return ctx.error(message)
        }
    })
  }
}