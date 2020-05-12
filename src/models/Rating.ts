import { User } from './User'
import { Novel } from './Novel'
import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  DefaultScope,
  Index,
  DataType,
} from 'sequelize-typescript'


@DefaultScope(() => ({
  include: [{
    model: Novel,
    attributes: { exclude: [`authorId`, `typeId`, `info`, `announcement`] },
  }],
  attributes: { exclude: [`userId`, `novelId`] },
  order: [[`createdAt`, `DESC`]],
}))
@Table({
  paranoid: true,
  underscored: true,
  indexes: [{
    unique: true,
    name: `rating_index`,
    fields: [`user_id`, `novel_id`],
  }]
})
export class Rating extends Model<Rating> {
  // User
  @ForeignKey(() => User)
  @Column({
    comment: `用户`,
    allowNull: false,
    validate: {
      notNull: true,
    },
  })
  userId: number

  @BelongsTo(() => User, { onDelete: `CASCADE` })
  user: User

  // Novel
  @ForeignKey(() => Novel)
  @Column({
    comment: `作品ID`,
    allowNull: false,
    validate: {
      notNull: true,
    },
  })
  novelId: number

  // Star count
  @Index
  @Column({
    comment: `星数`,
    type: DataType.TINYINT({ length: 1 }),
    defaultValue: 0,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 1,
      max: 5,
    },
  })
  starCount: number

  @BelongsTo(() => Novel, { onDelete: `CASCADE` })
  novel: Novel
}