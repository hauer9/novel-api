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
    handler: novelCtrl.getList
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
    handler: novelCtrl.getHotNovel
  },
  {
    method: 'get',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      }
    },
    handler: novelCtrl.getDetail
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
    handler: novelCtrl.create
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
    handler: novelCtrl.update
  },
  {
    method: 'delete',
    path: '/:id',
    validate: {
      params: {
        id: Joi.number().required(),
      },
    },
    handler: novelCtrl.remove
  },
])

export const novelRoute = router.middleware()