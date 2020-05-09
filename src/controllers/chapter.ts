import { BaseCtrl } from './base'
import { Chapter as ChapterModel } from '../models'

class Chapter extends BaseCtrl {
  constructor() {
    super(ChapterModel)
  }

  // Get Dir
  async getDir(ctx: any) {
    const { novelId } = ctx.params
    const q = ctx.query

    const data = await ChapterModel.scope(`dir`).findAndCountAll({
      ...q,
      where: { novelId },
    })
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
    ctx.success(data)
  }
}

export const chapterCtrl = new Chapter()

