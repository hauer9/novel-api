import Router from 'koa-joi-router'
import { collectionCtrl } from '../controllers'

/* 
 * Defined collection routes
*/

const Joi = Router.Joi
const router = Router()


router.prefix(`/collections`)

router.route([
  {
    method: `get`,
    path: `/`,
    validate: {
      query: {
        limit: Joi.number(),
        offset: Joi.number(),
      },
    },
    handler: async (ctx: any) => {
      ctx.success()
    }
  },
  // {
  //   method: `get`,
  //   path: `/:id`,
  //   validate: {
  //     params: {
  //       id: Joi.number().required(),
  //     }
  //   },
  //   handler: collectionCtrl.getDetail
  // },
  {
    method: `post`,
    path: `/`,
    validate: {
      body: {
        novelId: Joi.number().required(),
      },
      type: `json`,
    },
    handler: collectionCtrl.create
  },
  {
    method: `put`,
    path: `/:id`,
    validate: {
      params: {
        id: Joi.number().required(),
      },
      body: {
        authorId: Joi.number(),
        novelId: Joi.number(),
      },
      type: `json`,
    },
    handler: collectionCtrl.update
  },
  {
    method: `delete`,
    path: `/:id`,
    validate: {
      params: {
        id: Joi.number().required(),
      },
    },
    handler: collectionCtrl.remove
  },
])

export const collectionRoute = router.middleware()