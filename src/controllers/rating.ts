import { Context } from 'koa'
import { BaseCtrl } from './base'
import { Rating as RatingModel } from '../models/Rating'


class Rating extends BaseCtrl {
  constructor() {
    super(RatingModel)
  }


  /* 
   * Create the rating
  */


  async create(ctx: Context) {
    const { id } = ctx.state.user
    const { body } = ctx.request

    await this.createOrUpdate({
      userId: id,
      ...body,
    }, {
      userId: id,
      novelId: body.novelId,
    })

    ctx.success()
  }

}

export const ratingCtrl = new Rating()