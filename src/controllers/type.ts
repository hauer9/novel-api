import { BaseCtrl } from './base'
import { Type as TypeModel } from '../models'

class Type extends BaseCtrl {
  constructor() {
    super(TypeModel)
  }

  // Get list ...
  async getNovelsByTypes(ctx: any) {
    const q = ctx.query

    const { rows, count: novelCount } = await TypeModel.scope('novels').findAndCountAll(q)
    const { count } = await TypeModel.findAndCountAll(q)

    ctx.success({
      count,
      novelCount,
      rows,
    })
  }
}

export const typeCtrl = new Type()

