import Router from 'koa-joi-router'
import { userCtrl, collectionCtrl } from '../controllers'

/* 
 * Defined type routes
*/

const Joi = Router.Joi
const router = Router()


router.prefix('/users')

router.route([
  {
    method: 'post',
    path: '/login',
    validate: {
      body: {
        username: Joi.string().required(),
        password: Joi.string().required(),
      },
      type: 'json',
    },
    handler: async (ctx: any) => userCtrl.login(ctx)
  },
  {
    method: 'post',
    path: '/reg',
    validate: {
      body: {
        mobile: Joi.string().required(),
        password: Joi.string().required(),
      },
      type: 'json',
    },
    handler: async (ctx: any) => userCtrl.reg(ctx)
  },
  {
    method: 'get',
    path: '/info',
    handler: async (ctx: any) => userCtrl.getUserInfo(ctx)
  },
  {
    method: 'get',
    path: '/collections',
    handler: async (ctx: any) => collectionCtrl.getOwnList(ctx)
  },
  {
    method: 'get',
    path: '/:id/collections',
    handler: async (ctx: any) => collectionCtrl.getList(ctx)
  },
  {
    method: 'get',
    path: '/',
    validate: {
      query: {
        limit: Joi.number(),
        offset: Joi.number()
      },
    },
    handler: async (ctx: any) => userCtrl.getList(ctx)
  },
  {
    method: 'get',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      }
    },
    handler: async (ctx: any) => userCtrl.getDetail(ctx)
  },
  {
    method: 'put',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      },
      body: {
        password: Joi.string(),
        username: Joi.string(),
        avatar: Joi.string(),
        email: Joi.string().email(),
        gender: Joi.number().valid([0, 1]),
        age: Joi.number(),
        birthday: Joi.date(),
      },
      type: 'json',
    },
    handler: async (ctx: any) => userCtrl.update(ctx)
  },
  {
    method: 'delete',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      },
    },
    handler: async (ctx: any) => userCtrl.remove(ctx)
  },
])

export const userRoute = router.middleware()