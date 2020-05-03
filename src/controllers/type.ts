import { BaseCtrl } from './base'
import { Type as TypeModel } from '../models'

class Type extends BaseCtrl {
  constructor() {
    super(TypeModel)
  }

  // Get list
  async getNovelsByTypes(ctx: any) {
    const data = await TypeModel.scope('novels').findAndCountAll(ctx.query)
    ctx.success(data)
  }
}

export const typeCtrl = new Type()

