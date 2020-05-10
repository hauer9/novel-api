import { BaseModel } from './base'
import Novel from './novel.model'
import Collection from './collection.model'
import {
  Table,
  Column,
  DataType,
  DefaultScope,
  HasMany,
} from 'sequelize-typescript'
import { createMd5Pwd } from '../utils'


@DefaultScope({
  attributes: { exclude: [`password`] },
})
@Table
export default class User extends BaseModel {
  // Mobile
  @Column({
    comment: `手机号码`,
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [6, 20],
    },
  })
  mobile: string

  // Password
  @Column({
    comment: `密码`,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      min: 6,
    },
  })
  set password(password: string) {
    const md5Pwd = createMd5Pwd(password) // md5加密
    this.setDataValue(`password`, md5Pwd)
  }

  // username
  @Column({
    comment: `用户名`,
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      max: 20,
    },
  })
  username: string

  // Avatar
  @Column({
    comment: `头像`,
    defaultValue: `https://qiniu.tuscanyyy.top/head-659651_1920.png`,
    validate: {
      isUrl: true,
    }
  })
  avatar: string

  // Email
  @Column({
    comment: `邮箱`,
    unique: true,
    validate: {
      isEmail: true,
    }
  })
  email: string

  // Gender
  @Column({
    comment: `性别 (0: 未知, 1: 男, 2: 女, 9: 不适用)`,
    type: DataType.TINYINT({ length: 1 }),
    defaultValue: 0,
    validate: {
      isIn: [[`0`, `1`, `2`, `9`]],
    },
  })
  gender: number

  // Age
  @Column({
    comment: `年龄`,
    type: DataType.TINYINT({ length: 3 }),
    validate: {
      isNumeric: true,
      max: 188,
    },
  })
  age: number

  // Birthday
  @Column({
    comment: `生日日期`,
    validate: {
      isDate: true,
    },
  })
  birthday: Date

  // IsAdmin
  @Column({
    comment: `是否管理员`,
    defaultValue: false,
  })
  isAdmin: boolean

  @HasMany(() => Novel)
  novels: Novel[]

  @HasMany(() => Collection)
  collections: Collection[]
}