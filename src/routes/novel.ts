import Router from 'koa-joi-router'
import { Novel as Ctrl } from '../controllers'

/* 
 * Defined novel routes
*/

const Joi = Router.Joi
const router = Router()
const ctrl = new Ctrl()

router.prefix('/novels')

router.route([
  {
    method: 'get',
    path: '/',
    validate: {
      query: {
        limit: Joi.number(),
        offset: Joi.number(),
        title: Joi.string(),
      },
    },
    handler: async (ctx: any) => ctrl.getList(ctx)
  },
  {
    method: 'get',
    path: '/hot',
    validate: {
      query: {
        limit: Joi.number(),
        offset: Joi.number(),
      },
    },
    handler: async (ctx: any) => ctrl.getHotNovel(ctx)
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
        title: Joi.string().required(),
        authorId: Joi.number().required(),
        typeId: Joi.number().required(),
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
        title: Joi.string(),
        typeId: Joi.number(),
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