import { Novel } from './Novel'
import {
  Model,
  Table,
  Column,
  Index,
  HasMany,
  Scopes,
} from 'sequelize-typescript'

@Scopes(() => ({
  novels: {
    include: [{
      model: Novel,
      required: true,
    }],
    order: [[`createdAt`, `DESC`]],
  },
}))
@Table({
  paranoid: true,
  underscored: true,
})
export class Type extends Model<Type> {
  // Name
  @Index({
    unique: true,
  })
  @Column({
    comment: `类型名`,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [2, 10],
    }
  })
  name: string

  @HasMany(() => Novel)
  novels: Novel[]
}