import { Sequelize } from 'sequelize-typescript'

export class BaseCtrl {
  public model: any
  public Op: any

  constructor(model: any) {
    this.model = model
    this.Op = Sequelize.Op
  }

  async create(ctx: any) {
    const { body } = ctx.request
    const data = await this.model.createItem(body)

    if (!data)
      return ctx.fail()

    ctx.success()
  }

  async remove(ctx: any) {
    const { id } = ctx.params
    const affectedCount = await this.model.remove(id)
    if (!affectedCount)
      return ctx.fail()

    ctx.success()
  }

  async update(ctx: any) {
    const { id } = ctx.params
    const { body } = ctx.request

    const [affectedCount] = await this.model.updateItem(id, body)

    if (!affectedCount)
      return ctx.fail()

    ctx.success()
  }

  async getList(ctx: any) {
    const q = ctx.query

    const data = await this.model.getList(q)

    if (!data)
      return ctx.fail()

    ctx.success(data)
  }

  async getDetail(ctx: any) {
    const { id } = ctx.params
    const data = await this.model.getDetail({ id })
    if (!data)
      return ctx.fail()

    ctx.success(data)
  }
}