import { Sequelize } from 'sequelize-typescript'
import { BaseCtrl } from './base'
import { Novel as NovelModel } from '../models'

export class Novel extends BaseCtrl {
  constructor() {
    super(NovelModel)
  }

  // Create novel
  async create(ctx: any) {
    const { body } = ctx.request
    const { title = '', authorId = 1, typeId = 1, chapterTitle = '', chapterContent = '' } = body
    const novelBody: any = { title, authorId, typeId }
    const chapterBody: any = { chapterTitle, chapterContent }

    const novel = await NovelModel.createItem(novelBody)
    const chapter = await novel.$create(`chapter`, chapterBody)

    if (!novel && !chapter)
      return ctx.fail()

    ctx.success()
  }

  // Get list
  async getList(ctx: any) {
    const q = ctx.query
    const { limit = 20, offset = 0, title = `` } = q

    const data = await NovelModel.findAndCountAll({
      limit,
      offset,
      order: [[`createdAt`, `DESC`]],
      where: {
        title: {
          [Sequelize.Op.like]: `%${title}%`
        },
      },
    })

    if (!data)
      return ctx.fail()

    ctx.success(data)
  }

  // Get detail
  async getDetail(ctx: any) {
    const { id } = ctx.params
    const novel = await NovelModel.getDetail({ id })
    let wordsNum = 0
    if (novel) {
      const chapters: Array<any> = await novel.$get(`chapters`)
      wordsNum = chapters.reduce(((a, v) => a + v.chapterContent.length), 0)
    }

    if (!novel)
      return ctx.fail()

    NovelModel.update(
      { clickNum: Sequelize.literal(`click_num + 1`) },
      { where: { id } },
    )
    ctx.success({ ...novel.dataValues, wordsNum})
  }

  // Get hot novel by click number
  async getHotNovel(ctx: any) {
    const q = ctx.query
    const { limit, offset } = q

    const data = await NovelModel.unscoped().findAndCountAll({
      limit,
      offset,
      attributes: [
        `id`,
        `title`,
        `clickNum`,
      ],
      order: [[`clickNum`, `DESC`]],
    })

    if (!data)
      return ctx.fail()

    ctx.success(data)
  }
}

