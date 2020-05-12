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

    const collecion = await CollectionModel.create({
      userId: id,
      novelId,
    })

    const novel = await collecion.$get(`novel`)

    ctx.success({
      ...(collecion as any).dataValues,
      novel: (novel as any).dataValues,
    })
  }


  // Get the collections list 
  async getList(ctx: any) {
    const { id } = ctx.params
    const q = ctx.query

    const data = await CollectionModel.findAndCountAll({
      ...q,
      where: { userId: id }
    })

    ctx.success(data)
  }

  // Remove the collection
  async remove(ctx: any) {
    const { id } = ctx.params
    const { id: userId } = ctx.state.user

    const instance = await CollectionModel.unscoped().findByPk(id)

    if (!instance)
      return ctx.notFound()

    if (instance.userId !== userId)
      return ctx.notFound(`Collection not found`)

    await instance.destroy({ force: true })

    ctx.success()
  }


}

export const collectionCtrl = new Collection()