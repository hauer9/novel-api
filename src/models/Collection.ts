import { User } from './User'
import { Novel } from './Novel'
import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  DefaultScope,
} from 'sequelize-typescript'


@DefaultScope(() => ({
  include: [{
    model: Novel,
    attributes: { exclude: [`authorId`, `typeId`, `info`, `announcement`] },
  }],
  attributes: { exclude: [`userId`, `novelId`] },
}))
@Table({
  paranoid: true,
  underscored: true,
  indexes: [{
    unique: true,
    name: `collection_index`,
    fields: [`user_id`, `novel_id`],
  }]
})
export class Collection extends Model<Collection> {
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

  @BelongsTo(() => Novel, { onDelete: `CASCADE` })
  novel: Novel
}