import { BaseCtrl } from './base'
import { Type as TypeModel } from '../models/Type'


class Type extends BaseCtrl {
  constructor() {
    super(TypeModel)
  }

  // Get list
  async getNovelsByTypes(ctx: any) {
    const q = ctx.query

    const data = await TypeModel.scope(`novels`).findAndCountAll(q)

    ctx.success(data)
  }
}

export const typeCtrl = new Type()

