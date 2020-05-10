import { BaseModel } from './base'
import Novel from './novel.model'
import {
  Table,
  Column,
  HasMany,
  Scopes,
} from 'sequelize-typescript'

@Scopes({
  novels: {
    include: [() => Novel]
  }
})
@Table
export default class Type extends BaseModel {
  // Name
  @Column({
    comment: `类型名`,
    allowNull: false,
    unique: true,
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