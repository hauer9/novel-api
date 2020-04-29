import { BaseModel } from './base'
import { Novel } from './novel'
import {
  Table,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'

@Table
export class Chapter extends BaseModel {

  // Novel id
  @ForeignKey(() => Novel)
  @Column({
    comment: '作品ID',
    allowNull: false,
    validate: {
      notNull: {
        msg: '作品ID不能为空'
      },
    }
  })
  novelId: number

  @BelongsTo(() => Novel)
  novel: Novel

  // Chapter title
  @Column({
    comment: '章节标题',
    allowNull: false,
    validate: {
      notNull: {
        msg: '章节标题不能为空'
      },
      len: {
        args: [1, 50],
        msg: '章节标题长度在1-50个字符之间',
      },
    }
  })
  chapterTitle: string

  // Chapter content
  @Column({
    type: DataType.TEXT('long'),
    comment: '章节内容',
    allowNull: false,
    validate: {
      notNull: {
        msg: '内容不能为空'
      },
      len: {
        args: [10, 999999],
        msg: '内容不少于10个字符',
      },
    }
  })
  chapterContent: string
}