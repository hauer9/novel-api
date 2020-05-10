import { BaseModel } from './base'
import Novel from './novel.model'
import {
  Table,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
  Scopes,
} from 'sequelize-typescript'

@Scopes({
  dir: {
    attributes: [`id`, `chapterTitle`]
  },
})
@Table
export default class Chapter extends BaseModel {
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

  // Chapter title
  @Column({
    comment: `章节标题`,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      max: 20,
    },
  })
  chapterTitle: string

  // Chapter content
  @Column({
    comment: `章节内容`,
    type: DataType.TEXT({ length: `long` }),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      min: 10,
    },
  })
  chapterContent: string
}