import Router from 'koa-joi-router'
import { typeCtrl } from '../controllers'

/* 
 * Defined type routes
*/

const Joi = Router.Joi
const router = Router()


router.prefix(`/types`)

router.route([
  {
    method: `get`,
    path: `/`,
    validate: {
      query: {
        limit: Joi.number(),
        offset: Joi.number()
      },
    },
    handler: typeCtrl.getList
  },
  {
    method: `get`,
    path: `/novels`,
    validate: {
      query: {
        limit: Joi.number(),
        offset: Joi.number()
      },
    },
    handler: typeCtrl.getNovelsByTypes
  },
  {
    method: `get`,
    path: `/:id`,
    validate: {
      params: {
        id: Joi.number().required(),
      }
    },
    handler: typeCtrl.getDetail
  },
  {
    method: `post`,
    path: `/`,
    validate: {
      body: {
        name: Joi.string().required(),
      },
      type: `json`,
    },
    handler: typeCtrl.create
  },
  {
    method: `put`,
    path: `/:id`,
    validate: {
      params: {
        id: Joi.number().required(),
      },
      body: {
        name: Joi.string(),
      },
      type: `json`,
    },
    handler: typeCtrl.update
  },
  {
    method: `delete`,
    path: `/:id`,
    validate: {
      params: {
        id: Joi.number().required(),
      },
    },
    handler: typeCtrl.remove
  },
])

export const typeRoute = router.middleware()