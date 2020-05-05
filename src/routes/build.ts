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
      const header = ctx.request.header
      if (header[`x-github-event`] === `push`) {
        console.log(`push`)
      }

      ctx.success()
    }
  },
])

export const buildRoute = router.middleware()