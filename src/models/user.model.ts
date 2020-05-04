import { BaseModel } from './base'
import Novel from './novel.model'
import Collection from './collection.model'
import {
  Table,
  Column,
  DefaultScope,
  HasMany,
} from 'sequelize-typescript'
import { createMd5Pwd } from '../utils'


enum IGender {
  '男' = 0,
  '女' = 1,
}

@DefaultScope({
  attributes: { exclude: [`password`] },
})
@Table
export default class User extends BaseModel {
  // Mobile
  @Column({
    comment: `手机号码`,
    allowNull: false,
    unique: {
      name: `mobile`,
      msg: `手机号已存在`,
    },
  })
  mobile: string

  // Password
  @Column({
    comment: `密码`,
    allowNull: false,
  })
  set password(password: string) {
    const md5Pwd = createMd5Pwd(password) // md5加密
    this.setDataValue(`password`, md5Pwd)
  }

  // username
  @Column({
    comment: `用户名`,
    allowNull: false,
    unique: {
      name: `username`,
      msg: `用户名已存在`,
    },
    validate: {
      len: {
        args: [1, 20],
        msg: `用户名字符数应在1-20字符之间`,
      }
    },
  })
  username: string

  // Avatar
  @Column({
    comment: `头像`,
    validate: {
      isUrl: {
        msg: `非法的url`,
      }
    }
  })
  avatar: string

  // Email
  @Column({
    comment: `邮箱`,
    unique: {
      name: `email`,
      msg: `邮箱已存在`,
    },
    validate: {
      isEmail: {
        msg: `邮箱格式错误`,
      }
    }
  })
  email: string

  // Gender
  @Column({
    comment: `性别 (0: 男, 1: 女)`,
  })
  gender: IGender

  // Age
  @Column({
    comment: `年龄`,
    validate: {
      len: {
        args: [0, 200],
        msg: `年龄应在0-200岁之间`,
      }
    }
  })
  age: number

  // Birthday
  @Column({
    comment: `生日日期`,
    validate: {
      isDate: {
        args: true,
        msg: `日期格式错误`,
      }
    }
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