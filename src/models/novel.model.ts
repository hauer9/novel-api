import { BaseModel } from './base'
import User from './user.model'
import Type from './type.model'
import Chapter from './chapter.model'
import Collection from './collection.model'
import {
  Table,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
  DefaultScope,
  Scopes,
  HasMany,
} from 'sequelize-typescript'


@Scopes({
  hot: {
    attributes: [`id`, `title`, `clickNum`],
    order: [[`clickNum`, `DESC`]],
  }
})
@Scopes({
  simple: {
    include: [() => User, () => Type],
    attributes: { exclude: [`authorId`, `typeId`, `info`, `announcement`] },
  }
})
@DefaultScope({
  include: [() => User, () => Type],
  order: [[`createdAt`, `DESC`]],
})
@Table
export default class Novel extends BaseModel {
  // Title
  @Column({
    comment: `标题`,
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      max: 20,
    },
  })
  title: string

  // Author
  @ForeignKey(() => User)
  @Column({
    comment: `作者`,
    allowNull: false,
    validate: {
      notNull: true,
    },
  })
  authorId: number

  @BelongsTo(() => User, { onDelete: `CASCADE` })
  author: User

  // Type
  @ForeignKey(() => Type)
  @Column({
    comment: `类型`,
    allowNull: false,
    validate: {
      notNull: true,
    },
  })
  typeId: number

  @BelongsTo(() => Type, { onDelete: `NO ACTION` })
  type: Type

  // Cover
  @Column({
    comment: `封面`,
    defaultValue: `https://qiniu.tuscanyyy.top/IMG_0122.JPG`,
    validate: {
      isUrl: true,
    },
  })
  cover: string

  // Info
  @Column({
    comment: `简介`,
    type: DataType.TEXT,
    validate: {
      notEmpty: true,
      max: 500,
    },
  })
  info: string

  // The announcement
  @Column({
    comment: `公告`,
    validate: {
      notEmpty: true,
      max: 100,
    },
  })
  announcement: string

  // Click number
  @Column({
    comment: `点击数`,
    defaultValue: 0,
    validate: {
      isNumeric: true,
    },
  })
  clickNum: number

  // Like number
  @Column({
    comment: `喜欢数`,
    defaultValue: 0,
    validate: {
      isNumeric: true,
    },
  })
  likeNum: number

  // Collection number
  @Column({
    comment: `收藏数`,
    defaultValue: 0,
    validate: {
      isNumeric: true,
    },
  })
  collectionNum: number

  @HasMany(() => Chapter)
  chapters: Chapter[]

  @HasMany(() => Collection)
  collections: Collection[]
}