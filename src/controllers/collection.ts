import { Context } from 'koa'
import { BaseCtrl } from './base'
import { Collection as CollectionModel } from '../models/Collection'

class Collection extends BaseCtrl {
  constructor() {
    super(CollectionModel)
  }

  // Created the user' s collection in state
  async create(ctx: Context) {
    const { id } = ctx.state.user
    const { novelId } = ctx.request.body

    const collecion = await CollectionModel.create({
      userId: id,
      novelId,
    })

    const novel = await collecion.$get(`novel`)

    if (novel)
      novel.increment(`collectionsNum`)

    ctx.success({
      ...(collecion as any).dataValues,
      novel: (novel as any).dataValues,
    })
  }


  // Get the collections list 
  async getList(ctx: Context) {
    const { id } = ctx.params
    const q = ctx.query

    const data = await CollectionModel.findAndCountAll({
      ...q,
      where: { userId: id },
    })

    ctx.success(data)
  }

  // Remove the collection
  async remove(ctx: Context) {
    const { id } = ctx.params
    const { id: userId } = ctx.state.user

    const collection = await CollectionModel.unscoped().findByPk(id)

    if (!collection)
      return ctx.notFound()

    if (collection.userId !== userId)
      return ctx.notFound(`Collection not found`)

    const novel = await collection.$get(`novel`)

    if (novel)
      novel.decrement(`collectionsNum`)

    await collection.destroy({ force: true })

    ctx.success()
  }


}

export const collectionCtrl = new Collection()