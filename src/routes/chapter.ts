import Router from 'koa-joi-router'
import { chapterCtrl } from '../controllers'

/* 
 * Defined chapter routes
*/

const Joi = Router.Joi
const router = Router()


router.prefix(`/chapters`)

router.route([
  {
    method: `post`,
    path: `/`,
    validate: {
      body: {
        novelId: Joi.number().required(),
        chapterTitle: Joi.string().required(),
        chapterContent: Joi.string().required(),
      },
      type: `json`,
    },
    handler: chapterCtrl.create,
  },
  {
    method: `put`,
    path: `/:id`,
    validate: {
      params: {
        id: Joi.number().required(),
      },
      body: {
        novelId: Joi.number().required(),
        chapterTitle: Joi.string(),
        chapterContent: Joi.string(),
      },
      type: `json`,
    },
    handler: chapterCtrl.update,
  },
  {
    method: `delete`,
    path: `/:id`,
    validate: {
      params: {
        id: Joi.number().required(),
      },
    },
    handler: chapterCtrl.remove,
  },
])

export const chapterRoute = router.middleware()