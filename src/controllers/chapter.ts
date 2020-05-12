import { BaseCtrl } from './base'
import { Chapter as ChapterModel } from '../models/Chapter'
import { Novel as NovelModel } from '../models/Novel'
import { Collection as CollectionModel } from '../models/Collection'
import jwt from 'jsonwebtoken'
import { jwtSecretKey } from '../conf'

class Chapter extends BaseCtrl {
  constructor() {
    super(ChapterModel)
  }


  /* 
   * Create chapter
   */


  async create(ctx: any) {
    const { body } = ctx.request

    const novel = await NovelModel.findByPk(body.novelId)

    if (!novel)
      return ctx.notFound(`novelId not found`)

    try {
      await ChapterModel.create(body)
      await novel.increment(`chaptersNum`)
      await novel.increment(`wordsNum`, { by: body.chapterContent.length || 0 })
    } catch (err) {
      await novel.decrement(`chaptersNum`)
      await novel.decrement(`wordsNum`, { by: body.chapterContent.length || 0 })
    }

    ctx.success()
  }


  /* 
   * Remove the chapter
   */


  async remove(ctx: any) {
    const { id } = ctx.params

    const chapter = await ChapterModel.unscoped().findByPk(id)

    if (!chapter)
      return ctx.notFound(`chapter not found`)

    const novel = await NovelModel.findByPk(chapter.novelId)

    if (!novel)
      return ctx.notFound(`novelId not found`)

    if (novel.chaptersNum === 1)
      return ctx.fail(`only one chapter cannot be deleted, please delete the novel`)

    await chapter.destroy({ force: true })
    await novel.decrement(`chaptersNum`)
    await novel.decrement(`wordsNum`, { by: chapter.chapterContent.length || 0 })

    ctx.success()
  }

  /* 
   * Get the Dir
   */


  async getDir(ctx: any) {
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


  async getDetail(ctx: any) {
    const { novelId, id } = ctx.params
    const { authorization = null } = ctx.request.header

    const data = await ChapterModel.findOne({
      where: {
        novelId,
        id,
      },
    })

    let isCollect = false


    /* 
     * 1. Check authorization and whether start with the `Bearer`
     * 2. Check the token is valied
     * 3. Check whether collect the novel
     * 4. Finally send the content
     */

    if (authorization && authorization.startsWith(`Bearer `)) {

      // 7 is the `Bearer `
      const token = authorization.slice(7)

      try {
        const decoded: any = jwt.verify(token, jwtSecretKey)
        const { id: userId } = decoded

        const isExist = await CollectionModel.findOne({
          where: {
            novelId,
            userId,
          }
        })

        if (isExist)
          isCollect = true

        ctx.success({
          ...(data as any).dataValues,
          isCollect,
        })
      } catch (err) {
        // unAuthenticated
        ctx.success(data)
      }
    }
    else
      ctx.success(data)
  }
}

export const chapterCtrl = new Chapter()

