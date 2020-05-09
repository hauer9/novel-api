import { BaseCtrl } from './base'
import { Chapter as ChapterModel, Collection as CollectionModel } from '../models'
import jwt from 'jsonwebtoken'
import { jwtSecretKey } from '../conf'

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
     * 2. Check the token is valied, Do nothing when the token error
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

