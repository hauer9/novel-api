import { BaseCtrl } from './base'
import { Type as TypeModel } from '../models'

export class Type extends BaseCtrl {
  constructor() {
    super(TypeModel)
  }

  // Get list
  async getNovelsByTypes(ctx: any) {
    const q = ctx.query
    const { limit = 20, offset = 0 } = q

    const data = await TypeModel.scope('novels').findAndCountAll({
      limit,
      offset,
    })

    if (!data)
      return ctx.fail()

    ctx.success(data)
  }
}

