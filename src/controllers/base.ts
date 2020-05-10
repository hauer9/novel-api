export class BaseCtrl {
  public model: any

  constructor(model: any) {
    this.model = model

    this.create = this.create.bind(this)
    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
    this.getList = this.getList.bind(this)
    this.getDetail = this.getDetail.bind(this)
  }

  async create(ctx: any) {
    const { body } = ctx.request

    await this.model.create(body)
    ctx.success()
  }

  async remove(ctx: any) {
    const { id } = ctx.params

    const instance = await this.model.findByPk(id)

    if (!instance)
      return ctx.notFound()

   await instance.destroy({ force: true })

    ctx.success()
  }

  async update(ctx: any) {
    const { id } = ctx.params
    const { body } = ctx.request

    const instance = await this.model.findByPk(id)

    if (!instance)
      return ctx.notFound()

    await instance.update(body)

    ctx.success()
  }

  async getList(ctx: any) {
    const q = ctx.query

    const data = await this.model.findAndCountAll(q)
    ctx.success(data)
  }

  async getDetail(ctx: any) {
    const { id } = ctx.params

    const instance = await this.model.findByPk(id)

    if (!instance)
      return ctx.notFound()

    ctx.success(instance)
  }
}