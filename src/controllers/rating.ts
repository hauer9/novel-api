import { BaseCtrl } from './base'
import { Sequelize } from 'sequelize-typescript'
import { Rating as RatingModel } from '../models/Rating'


class Rating extends BaseCtrl {
  constructor() {
    super(RatingModel)
  }


  /* 
   * Create the rating
  */


  async create(ctx: any) {
    const { id } = ctx.state.user
    const { body } = ctx.request

    const rating = await this.createOrUpdate({
      userId: id,
      ...body,
    }, {
      userId: id,
      novelId: body.novelId,
    })

    /* 
     * Aggregated the stars to get the average of star count
     */

    const [{ starCount }] = await <any>RatingModel.unscoped().findAll({
      attributes: [[Sequelize.fn(`AVG`, Sequelize.col(`star_count`)), `starCount`]],
      where: { novelId: body.novelId },
    })

    const novel = await rating.$get(`novel`)

    await novel.update({ starCount }, {
      where: { id: body.novelId }
    })

    ctx.success()
  }

}

export const ratingCtrl = new Rating()