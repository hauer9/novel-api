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
    unique: {
      name: `name`,
      msg: `类型已存在`,
    },
    validate: {
      notNull: {
        msg: `类型不能为空`
      },
    }
  })
  name: string

  @HasMany(() => Novel)
  novels: Novel[]
}