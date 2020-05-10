import { BaseCtrl } from './base'
import { Collection as CollectionModel } from '../models/Collection'

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


  // Get collections list 
  async getList(ctx: any) {
    const { id } = ctx.params
    const q = ctx.query

    const data = await CollectionModel.findAndCountAll({
      ...q,
      where: { userId: id }
    })

    ctx.success(data)
  }
}

export const collectionCtrl = new Collection()