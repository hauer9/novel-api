import { Context } from 'koa'
import { Sequelize, Op } from 'sequelize'
import { BaseCtrl } from './base'
import { Novel as NovelModel } from '../models/Novel'
import { Rating as RatingModel } from '../models/Rating'
import { verifyToken } from '../utils'
import _ from 'lodash'


class Novel extends BaseCtrl {
  constructor() {
    super(NovelModel)
  }

  // Create novel
  async create(ctx: Context) {
    const { title, typeId, ...firstChapter } = ctx.request.body
    const { id } = ctx.state.user

    const novel = await NovelModel.create({
      title,
      authorId: id,
      typeId,
    })

    try {
      await novel.$create(`chapter`, firstChapter)
      await novel.increment(`wordsNum`, { by: firstChapter.chapterContent.length || 0 })
    } catch (err) {
      // Remove the novel when created the chapter happend error
      await novel.destroy({ force: true })
      return ctx.fail(err.errors[0].message)
    }

    ctx.success()
  }

  // Get list
  async getList(ctx: Context) {
    const { title = ``, ...q } = ctx.query

    const data = await NovelModel.findAndCountAll({
      ...q,
      where: {
        title: { [Op.like]: `%${title}%` }
      },
    })

    ctx.success(data)
  }

  // Get detail
  async getDetail(ctx: Context) {
    const { id } = ctx.params
    const { authorization = null } = ctx.request.header

    const novel = await NovelModel.findByPk(id)

    if (!novel)
      return ctx.notFound()

    // The number of click inc 1 when the user clicked the novel
    novel.increment(`clickNum`)

    /* 
     * Aggregated the stars to get the average of rating source
     */

    const { rows, count } = await <any>RatingModel.unscoped().findAndCountAll({
      attributes: [[Sequelize.fn(`AVG`, Sequelize.col(`rating`)), `source`]],
      where: { novelId: id },
      raw: true,
    })

    const source = _.get(rows, `[0].source`, 0)

    /* 
     * Check is login
     */

    const result: any = verifyToken(authorization)

    const data = {
      ...(novel as any).dataValues,
      rating: {
        source: Number(parseFloat(source).toFixed(1)),
        count,
      },
    }

    if (result) {
      const instance = await RatingModel.unscoped().findOne({
        where: {
          novelId: id,
          userId: result.id,
        }
      })

      if (instance)
        data.rating[`ownSource`] = instance.rating
    }
    
    ctx.success(data)
  }

  // Get hot novel by click number
  async getHotNovel(ctx: Context) {
    const q = ctx.query

    const data = await NovelModel.scope(`hot`).findAndCountAll(q)

    ctx.success(data)
  }
}

export const novelCtrl = new Novel()

