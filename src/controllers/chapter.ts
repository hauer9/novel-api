import { Context } from 'koa'
import { BaseCtrl } from './base'
import { Chapter as ChapterModel } from '../models/Chapter'
import { Novel as NovelModel } from '../models/Novel'
import { Collection as CollectionModel } from '../models/Collection'
import { verifyToken } from '../utils'

class Chapter extends BaseCtrl {
  constructor() {
    super(ChapterModel)
  }


  /* 
   * Create chapter
   */


  async create(ctx: Context) {
    const { body } = ctx.request

    const novel = await NovelModel.findByPk(body.novelId)

    if (!novel)
      return ctx.notFound(`novelId not found`)

    await ChapterModel.create(body)
    await novel.increment({
      chaptersNum: 1,
      wordsNum: body.chapterContent.length || 0,
    })

    ctx.success()
  }


  /* 
   * Remove the chapter
   */


  async remove(ctx: Context) {
    const { id } = ctx.params

    const chapter = await ChapterModel.unscoped().findByPk(id)

    if (!chapter)
      return ctx.notFound(`chapter not found`)

    const novel = await chapter.$get(`novel`)

    if (!novel)
      return ctx.notFound(`novelId not found`)

    if (novel.chaptersNum === 1)
      return ctx.fail(`only one chapter cannot be deleted, please delete the novel`)

    await chapter.destroy({ force: true })
    await novel.decrement({
      chaptersNum: 1,
      wordsNum: chapter.chapterContent.length || 0,
    })

    ctx.success()
  }

  /* 
   * Get the Dir
   */


  async getDir(ctx: Context) {
    const { novelId } = ctx.params
    const q = ctx.query

    const data = await ChapterModel.scope(`dir`).findAndCountAll({
      ...q,
      where: { novelId },
    })

    ctx.success(data)
  }

  /* 
   * Get the detail
   */


  async getDetail(ctx: Context) {
    const { novelId, id } = ctx.params
    const { authorization = null } = ctx.request.header

    const data: any = await ChapterModel.findOne({
      where: {
        novelId,
        id,
      },
    })

    if (!data)
      return ctx.notFound()

    /* 
     * 1. Check authorization and whether start with the `Bearer`
     * 2. Check the token is valied
     * 3. Check whether collect the novel
     * 4. Finally send the content
     */


    const result: any = verifyToken(authorization)

    if (result) {
      const isCollect = await CollectionModel.findOne({
        where: {
          novelId,
          userId: result.id,
        },
      })

      data.dataValues[`isCollect`] = !!isCollect
    }

    ctx.success(data)
  }
}

export const chapterCtrl = new Chapter()

