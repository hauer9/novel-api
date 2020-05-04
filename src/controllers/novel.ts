import { Sequelize } from 'sequelize-typescript'
import { BaseCtrl } from './base'
import { Novel as NovelModel } from '../models'

class Novel extends BaseCtrl {
  constructor() {
    super(NovelModel)
  }

  // Create novel
  async create(ctx: any) {
    const { title, typeId, ...chapterBody } = ctx.request.body
    const { id } = ctx.state.user

    const novel = await NovelModel.create({ title, authorId: id, typeId })
    try {
      await novel.$create(`chapter`, chapterBody)
    } catch (e) {
      // Remove the novel when created the chapter happend error
      novel.destroy({ force: true })
      return ctx.fail(e.errors[0].message)
    }

    ctx.success()
  }

  // Get list
  async getList(ctx: any) {
    const { title = ``, ...q } = ctx.query
    console.log('print', ctx)

    const data = await NovelModel.findAndCountAll({
      ...q,
      where: {
        title: { [Sequelize.Op.like]: `%${title}%` }
      },
    })

    ctx.success(data)
  }

  // Get detail
  async getDetail(ctx: any) {
    const { id } = ctx.params

    let novel: any

    novel = await NovelModel.findByPk(id)

    if (!novel)
      return ctx.notFound()

    // Get number of words which thr novel
    const chapters: Array<any> = await novel.$get(`chapters`)
    const wordsNum = chapters.reduce(((a, v) => a + v.chapterContent.length), 0)

    // The number of click inc 1 when the user clicked the novel
    novel.increment(`clickNum`)
    ctx.success({ ...novel.dataValues, wordsNum })
  }

  // Get hot novel by click number
  async getHotNovel(ctx: any) {
    const data = await NovelModel.unscoped().findAndCountAll({
      ...ctx.query,
      attributes: [
        `id`,
        `title`,
        `clickNum`,
      ],
      order: [[`clickNum`, `DESC`]],
    })
    ctx.success(data)
  }
}

export const novelCtrl = new Novel()

