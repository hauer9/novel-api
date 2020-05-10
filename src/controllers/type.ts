import { BaseCtrl } from './base'
import { Type as TypeModel } from '../models'


class Type extends BaseCtrl {
  constructor() {
    super(TypeModel)
  }

  // Get list
  async getNovelsByTypes(ctx: any) {
    const q = ctx.query

    const { rows, count: novelCount } = await TypeModel.scope('novels').findAndCountAll(q)

    ctx.success({
      count: rows.length,
      novelCount,
      rows,
    })
  }
}

export const typeCtrl = new Type()

