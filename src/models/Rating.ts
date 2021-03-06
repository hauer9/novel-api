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
  @Index
  @ForeignKey(() => Novel)
  @Column({
    comment: `作品ID`,
    allowNull: false,
    validate: {
      notNull: true,
    },
  })
  novelId: number

  // Rating
  @Column({
    comment: `分数`,
    type: DataType.TINYINT({ length: 1 }),
    defaultValue: 0,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 2,
      max: 10,
      isEven(value: number) {
        if (value % 2 !== 0)
          throw new Error(`only even values are allowed`);
      },
    },
  })
  rating: number

  @BelongsTo(() => Novel, { onDelete: `CASCADE` })
  novel: Novel
}