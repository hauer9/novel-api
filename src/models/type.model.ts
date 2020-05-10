import { BaseModel } from './base'
import Novel from './novel.model'
import {
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
@Table
export default class Type extends BaseModel {
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
      max: 10,
    }
  })
  name: string

  @HasMany(() => Novel)
  novels: Novel[]
}