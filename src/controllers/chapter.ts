import { BaseCtrl } from './base'
import { Chapter as ChapterModel } from '../models'

export class Chapter extends BaseCtrl {
  constructor() {
    super(ChapterModel)
  }

  // Get Dir
  async getDir(ctx: any) {
    const q = ctx.query
    const { novelId } = ctx.params
    const { limit, offset } = q

    const data = await ChapterModel.findAndCountAll({
      limit,
      offset,
      attributes: [
        'id', 
        'chapterTitle',
      ],
      where: {
        novelId,
      },
    })

    if (!data)
      return ctx.fail()

    ctx.success(data)
  }

  // Get detail
  async getDetail(ctx: any) {
    const { novelId, id } = ctx.params
    const data = await ChapterModel.findOne({
      where: {
        novelId,
        id,
      },
    })

    if (!data)
      return ctx.fail()

    ctx.success(data)
  }
}

