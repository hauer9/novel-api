import Router from 'koa-joi-router'
import { novelCtrl } from '../controllers'

/* 
 * Defined build routes
*/

const router = Router()

router.prefix(`/build`)

router.route([
  {
    method: `post`,
    path: `/`,
    handler: novelCtrl.getList
  },
])

export const buildRoute = router.middleware()