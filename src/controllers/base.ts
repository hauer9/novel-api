import { Context } from 'koa'


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


  /* 
   * Create the instance
  */


  async create(ctx: Context) {
    const { body } = ctx.request

    await this.model.create(body)

    ctx.success()
  }

  /* 
   * Create or update the instance
   */


  async createOrUpdate(item: any, where: any) {

    const instance = await this.model.findOne({ where })

    if (instance)
      return await instance.update(item, { where })
    else
      return await this.model.create(item)
  }


  /* 
   * Remove the instance
   */


  async remove(ctx: Context) {
    const { id } = ctx.params

    const instance = await this.model.findByPk(id)

    if (!instance)
      return ctx.notFound()

    await instance.destroy({ force: true })

    ctx.success()
  }


  /* 
   * Update the instance
   */


  async update(ctx: Context) {
    const { id } = ctx.params
    const { body } = ctx.request

    const instance = await this.model.findByPk(id)

    if (!instance)
      return ctx.notFound()

    await instance.update(body)

    ctx.success()
  }


  /* 
   * Get the list
   */


  async getList(ctx: Context) {
    const q = ctx.query

    const data = await this.model.findAndCountAll(q)
    ctx.success(data)
  }


  /* 
   * Get the detail
   */


  async getDetail(ctx: Context) {
    const { id } = ctx.params

    const instance = await this.model.findByPk(id)

    if (!instance)
      return ctx.notFound()

    ctx.success(instance)
  }
}