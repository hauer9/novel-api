import Router from 'koa-joi-router'
import { typeCtrl } from '../controllers'

/* 
 * Defined type routes
*/

const Joi = Router.Joi
const router = Router()


router.prefix('/types')

router.route([
  {
    method: 'get',
    path: '/',
    validate: {
      query: {
        limit: Joi.number(),
        offset: Joi.number()
      },
    },
    handler: async (ctx: any) => typeCtrl.getList(ctx)
  },
  {
    method: 'get',
    path: '/novels',
    validate: {
      query: {
        limit: Joi.number(),
        offset: Joi.number()
      },
    },
    handler: async (ctx: any) => typeCtrl.getNovelsByTypes(ctx)
  },
  {
    method: 'get',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      }
    },
    handler: async (ctx: any) => typeCtrl.getDetail(ctx)
  },
  {
    method: 'post',
    path: '/',
    validate: {
      body: {
        name: Joi.string().required(),
      },
      type: 'json',
    },
    handler: async (ctx: any) => typeCtrl.create(ctx)
  },
  {
    method: 'put',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      },
      body: {
        name: Joi.string(),
      },
      type: 'json',
    },
    handler: async (ctx: any) => typeCtrl.update(ctx)
  },
  {
    method: 'delete',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      },
    },
    handler: async (ctx: any) => typeCtrl.remove(ctx)
  },
])

export const typeRoute = router.middleware()