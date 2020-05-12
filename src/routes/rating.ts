import Router from 'koa-joi-router'
import { ratingCtrl } from '../controllers'

/* 
 * Defined collection routes
*/

const Joi = Router.Joi
const router = Router()


router.prefix(`/ratings`)

router.route([
  {
    method: `post`,
    path: `/`,
    validate: {
      body: {
        novelId: Joi.number().required(),
        rating: Joi.number().required(),
      },
      type: `json`,
    },
    handler: ratingCtrl.create,
  },
  {
    method: `delete`,
    path: `/:id`,
    validate: {
      params: {
        id: Joi.number().required(),
      },
    },
    handler: ratingCtrl.remove,
  },
])

export const ratingRoute = router.middleware()