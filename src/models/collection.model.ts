import { BaseModel } from './base'
import User from './user.model'
import Novel from './novel.model'
import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  DefaultScope,
} from 'sequelize-typescript'


@DefaultScope({
  include: [{
    model: () => Novel,
    attributes: { exclude: [`authorId`, `typeId`, `info`, `announcement`] }
  }],
  attributes: { exclude: [`userId`, `novelId`] }
})
@Table({
  indexes: [{
    name: `collecionsIndex`,
    unique: true,
    fields: [`user_id`, `novel_id`],
  }]
})
export default class Collection extends BaseModel {
  // User
  @ForeignKey(() => User)
  @Column({
    comment: `用户`,
    allowNull: false,
  })
  userId: number

  @BelongsTo(() => User, { onDelete: `CASCADE` })
  user: User

  // Novel
  @ForeignKey(() => Novel)
  @Column({
    comment: `作品ID`,
    allowNull: false,
    unique: {
      name: `collecionsIndex`,
      msg: `已收藏过了`,
    },
    validate: {
      notNull: {
        msg: `作品ID不能为空`
      },
    }
  })
  novelId: number

  @BelongsTo(() => Novel, { onDelete: `CASCADE` })
  novel: Novel
}