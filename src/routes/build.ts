import Router from 'koa-joi-router'

/* 
 * Defined build routes
*/

const router = Router()

router.prefix(`/build`)

router.route([
  {
    method: 'post',
    path: '/',
    handler: async (ctx: any) => {
      console.log('print', ctx)
    }
  },
])

export const buildRoute = router.middleware()