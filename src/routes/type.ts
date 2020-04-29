import Router from 'koa-joi-router'
import { Type as Ctrl } from '../controllers'

/* 
 * Defined type routes
*/

const Joi = Router.Joi
const router = Router()
const ctrl = new Ctrl()

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
    handler: async (ctx: any) => ctrl.getList(ctx)
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
    handler: async (ctx: any) => ctrl.getNovelsByTypes(ctx)
  },
  {
    method: 'get',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      }
    },
    handler: async (ctx: any) => ctrl.getDetail(ctx)
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
    handler: async (ctx: any) => ctrl.create(ctx)
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
    handler: async (ctx: any) => ctrl.update(ctx)
  },
  {
    method: 'delete',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      },
    },
    handler: async (ctx: any) => ctrl.remove(ctx)
  },
])

export default router.middleware()