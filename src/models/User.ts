import { Novel } from './Novel'
import { Collection } from './Collection'
import {
  Model,
  Table,
  Column,
  Index,
  DataType,
  DefaultScope,
  HasMany,
} from 'sequelize-typescript'
import { createMd5Pwd } from '../utils'


@DefaultScope(() => ({
  attributes: { exclude: [`password`] },
}))
@Table({
  paranoid: true,
  underscored: true,
})
export class User extends Model<User> {
  // Mobile
  @Index({
    unique: true,
  })
  @Column({
    comment: `手机号码`,
    allowNull: false,
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
  @Index({
    unique: true,
  })
  @Column({
    comment: `用户名`,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [1, 20],
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
  @Index({
    unique: true,
  })
  @Column({
    comment: `邮箱`,
    validate: {
      isEmail: true,
    }
  })
  email: string

  // Gender
  @Column({
    comment: `性别 (0: 未知, 1: 男, 2: 女, 3: 不适用)`,
    type: DataType.TINYINT({ length: 1 }),
    defaultValue: 0,
    validate: {
      isInt: true,
      min: 0,
      max: 3,
    },
  })
  gender: number

  // Age
  @Column({
    comment: `年龄`,
    type: DataType.TINYINT({ length: 3 }),
    validate: {
      isNumeric: true,
      len: [0, 188],
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