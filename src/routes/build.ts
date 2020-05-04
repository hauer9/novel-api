import Router from 'koa-joi-router'
import { buildCtrl } from '../controllers'

/* 
 * Defined build routes
*/

const router = Router()

router.prefix(`/build`)

router.route([
  {
    method: `post`,
    path: `/`,
    handler: buildCtrl.autoBuild
  },
])

export const buildRoute = router.middleware()