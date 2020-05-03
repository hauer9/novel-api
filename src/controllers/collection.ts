import { BaseCtrl } from './base'
import { Collection as CollectionModel } from '../models'

class Collection extends BaseCtrl {
  constructor() {
    super(CollectionModel)
  }

  // Created the user' s collection in state
  async create(ctx: any) {
    const { id } = ctx.state.user
    const { novelId } = ctx.request.body

    await CollectionModel.create({
      userId: id,
      novelId,
    })

    ctx.success()
  }

  // Get Own collections list 
  async getOwnList(ctx: any) {
    const q = ctx.query
    const { id } = ctx.state.user

    const data = await this.model.findAndCountAll({
      ...q,
      where: { userId: id }
    })
    ctx.success(data)
  }

  // Get collections list 
  async getList(ctx: any) {
    const { id } = ctx.params
    const q = ctx.query

    const data = await this.model.findAndCountAll({
      ...q,
      where: { userId: id }
    })
    ctx.success(data)
  }


}

export const collectionCtrl = new Collection()