import { BaseModel } from '../models'

export class BaseCtrl {
  public model: typeof BaseModel

  constructor(model: typeof BaseModel) {
    this.model = model
  }

  async create(ctx: any) {
    const { body } = ctx.request

    await this.model.create(body)
    ctx.success()
  }

  async remove(ctx: any) {
    const { id } = ctx.params

    const isExist = await this.model.findByPk(id)

    if (!isExist)
      return ctx.notFound()

    const affectedRows = await this.model.destroy({
      where: { id },
      force: true,
    })

    if (!affectedRows)
      return ctx.badRequest(`删除失败`)

    ctx.success()
  }

  async update(ctx: any) {
    const { id } = ctx.params
    const { body } = ctx.request

    const isExist = await this.model.findByPk(id)

    if (!isExist)
      return ctx.notFound()

    const affectedRows = await this.model.update(
      body,
      { where: { id } },
    )

    if (!affectedRows)
      return ctx.badRequest(`更新失败`)

    ctx.success()
  }

  async getList(ctx: any) {
    const q = ctx.query

    const data = await this.model.findAndCountAll(q)
    ctx.success(data)
  }

  async getDetail(ctx: any) {
    const { id } = ctx.params

    const data = await this.model.findOne({ where: { id } })

    if (!data)
      return ctx.notFound()

    ctx.success(data)
  }
}