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

    const instance = await this.createOrUpdate({
      userId: id,
      ...body,
    }, {
      userId: id,
      novelId: body.novelId,
    })

    /* 
     * Aggregated the stars to get the average of star count
     */

    const [{ rating }] = await <any>RatingModel.unscoped().findAll({
      attributes: [[Sequelize.fn(`AVG`, Sequelize.col(`rating`)), `rating`]],
      where: { novelId: body.novelId },
      raw: true
    })

    const novel = await instance.$get(`novel`)

    await novel.update({ rating }, {
      where: { id: body.novelId }
    })

    ctx.success()
  }

}

export const ratingCtrl = new Rating()