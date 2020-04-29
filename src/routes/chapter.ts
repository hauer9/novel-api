import Router from 'koa-joi-router'
import { Chapter as Ctrl } from '../controllers'

/* 
 * Defined novel routes
*/

const Joi = Router.Joi
const router = Router()
const ctrl = new Ctrl()

router.prefix('/chapters')

router.route([
  {
    method: 'get',
    path: '/dir/:novelId',
    validate: {
      params: {
        novelId: Joi.number().required(),
      },
      query: {
        limit: Joi.number(),
        offset: Joi.number()
      },
    },
    handler: async (ctx: any) => ctrl.getDir(ctx)
  },
  {
    method: 'get',
    path: '/:novelId/:id',
    validate: {
      params: {
        novelId: Joi.number().required(),
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
        novelId: Joi.number().required(),
        chapterTitle: Joi.string().required(),
        chapterContent: Joi.string().required(),
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
        novelId: Joi.number().required(),
        chapterTitle: Joi.string(),
        chapterContent: Joi.string(),
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