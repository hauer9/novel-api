import Router from 'koa-joi-router'
import { novelCtrl } from '../controllers'

/* 
 * Defined novel routes
*/

const Joi = Router.Joi
const router = Router()


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
    handler: async (ctx: any) => novelCtrl.getList(ctx)
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
    handler: async (ctx: any) => novelCtrl.getHotNovel(ctx)
  },
  {
    method: 'get',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      }
    },
    handler: async (ctx: any) => novelCtrl.getDetail(ctx)
  },
  {
    method: 'post',
    path: '/',
    validate: {
      body: {
        title: Joi.string().required(),
        typeId: Joi.number().required(),
        chapterTitle: Joi.string().required(),
        chapterContent: Joi.string().required(),
      },
      type: 'json',
    },
    handler: async (ctx: any) => novelCtrl.create(ctx)
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
    handler: async (ctx: any) => novelCtrl.update(ctx)
  },
  {
    method: 'delete',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      },
    },
    handler: async (ctx: any) => novelCtrl.remove(ctx)
  },
])

export const novelRoute = router.middleware()