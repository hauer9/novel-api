import { Context } from 'koa'
import Router from 'koa-joi-router'


/* 
 * Defined build routes
*/

const router = Router()

router.prefix(`/build`)

router.route([
  {
    method: `post`,
    path: `/`,
    handler: async (ctx: Context) => {
      const { } = ctx.request.header
      console.log('print', ctx.request.header)
      ctx.success()
    }
  },
])

export const buildRoute = router.middleware()