import { Op } from 'sequelize'
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

    const novel = await NovelModel.create({
      title,
      authorId: id,
      typeId,
    })

    try {
      await novel.$create(`chapter`, chapterBody)
    } catch (err) {
      // Remove the novel when created the chapter happend error
      novel.destroy({ force: true })
      return ctx.fail(err.errors[0].message)
    }

    ctx.success()
  }

  // Get list
  async getList(ctx: any) {
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
  async getDetail(ctx: any) {
    const { id } = ctx.params

    const novel = await NovelModel.findByPk(id)

    if (!novel)
      return ctx.notFound()

    // The number of click inc 1 when the user clicked the novel
    novel.increment('clickNum')

    // Get number of words which thr novel
    const chapters: Array<any> = await novel.$get(`chapters`)
    const wordsNum = chapters.reduce(((a, v) => a + v.chapterContent.length), 0)

    ctx.success({
      ...(novel as any).dataValues,
      wordsNum,
    })
  }

  // Get hot novel by click number
  async getHotNovel(ctx: any) {
    const q = ctx.query

    const data = await NovelModel.scope(`hot`).findAndCountAll(q)

    ctx.success(data)
  }
}

export const novelCtrl = new Novel()

