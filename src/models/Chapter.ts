import { Novel } from './Novel'
import {
  Model,
  Table,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
  DefaultScope,
  Scopes,
} from 'sequelize-typescript'

@Scopes(() => ({
  dir: {
    attributes: [`id`, `chapterTitle`],
  },
}))
@DefaultScope(() => ({
  include: [Novel],
  attributes: { exclude: [`novelId`] },
}))
@Table({
  paranoid: true,
  underscored: true,
})
export class Chapter extends Model<Chapter> {
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
      len: [1, 20],
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
      len: [10, 100000000],
    },
  })
  chapterContent: string
}