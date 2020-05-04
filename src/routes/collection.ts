import Router from 'koa-joi-router'
import { collectionCtrl } from '../controllers'

/* 
 * Defined collection routes
*/

const Joi = Router.Joi
const router = Router()


router.prefix('/collections')

router.route([
  // {
  //   method: 'get',
  //   path: '/',
  //   validate: {
  //     query: {
  //       limit: Joi.number(),
  //       offset: Joi.number(),
  //     },
  //   },
  //   handler: async (ctx: any) => collectionCtrl.getList(ctx)
  // },
  // {
  //   method: 'get',
  //   path: '/:id',
  //   validate: {
  //     params: {
  //       id: Joi.number().required(),
  //     }
  //   },
  //   handler: async (ctx: any) => collectionCtrl.getDetail(ctx)
  // },
  {
    method: 'post',
    path: '/',
    validate: {
      body: {
        novelId: Joi.number().required(),
      },
      type: 'json',
    },
    handler: async (ctx: any) => collectionCtrl.create(ctx)
  },
  {
    method: 'put',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      },
      body: {
        authorId: Joi.number(),
        novelId: Joi.number(),
      },
      type: 'json',
    },
    handler: async (ctx: any) => collectionCtrl.update(ctx)
  },
  {
    method: 'delete',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      },
    },
    handler: async (ctx: any) => collectionCtrl.remove(ctx)
  },
])

export const collectionRoute = router.middleware()