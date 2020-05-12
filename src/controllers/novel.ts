import { Op } from 'sequelize'
import { BaseCtrl } from './base'
import { Novel as NovelModel } from '../models/Novel'


class Novel extends BaseCtrl {
  constructor() {
    super(NovelModel)
  }

  // Create novel
  async create(ctx: any) {
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
    novel.increment(`clickNum`)

    // Get the wordNum
    // const [{ wordsNum }] = await <any>novel.$get(`chapters`, {
    //   attributes: [[Sequelize.fn(`SUM`, Sequelize.fn(`CHAR_LENGTH`, Sequelize.col(`chapter_content`))), `wordsNum`]],
    //   raw: true,
    // })

    ctx.success(novel)
  }

  // Get hot novel by click number
  async getHotNovel(ctx: any) {
    const q = ctx.query

    const data = await NovelModel.scope(`hot`).findAndCountAll(q)

    ctx.success(data)
  }
}

export const novelCtrl = new Novel()

