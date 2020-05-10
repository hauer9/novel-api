import Router from 'koa-joi-router'
import { userCtrl, collectionCtrl } from '../controllers'

/* 
 * Defined user routes
*/

const Joi = Router.Joi
const router = Router()


router.prefix(`/users`)

router.route([
  {
    method: `post`,
    path: `/login`,
    validate: {
      body: {
        username: Joi.string().required(),
        password: Joi.string().required(),
      },
      type: `json`,
    },
    handler: userCtrl.login,
  },
  {
    method: `post`,
    path: `/reg`,
    validate: {
      body: {
        mobile: Joi.string().required(),
        password: Joi.string().required(),
      },
      type: `json`,
    },
    handler: userCtrl.reg,
  },
  {
    method: `get`,
    path: `/info`,
    handler: userCtrl.getOwnInfo,
  },
  {
    method: `get`,
    path: `/:id/collections`,
    validate: {
      params: {
        id: Joi.number().required(),
      },
      query: {
        limit: Joi.number(),
        offset: Joi.number()
      },
    },
    handler: collectionCtrl.getList,
  },
  {
    method: `get`,
    path: `/`,
    validate: {
      query: {
        limit: Joi.number(),
        offset: Joi.number()
      },
    },
    handler: userCtrl.getList,
  },
  {
    method: `get`,
    path: `/:id`,
    validate: {
      params: {
        id: Joi.number().required(),
      }
    },
    handler: userCtrl.getDetail,
  },
  {
    method: `put`,
    path: `/:id`,
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
      type: `json`,
    },
    handler: userCtrl.update,
  },
  {
    method: `delete`,
    path: `/:id`,
    validate: {
      params: {
        id: Joi.number().required(),
      },
    },
    handler: userCtrl.remove,
  },
])

export const userRoute = router.middleware()