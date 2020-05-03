import { BaseCtrl } from './base'
import { Sequelize } from 'sequelize-typescript'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { jwtSecretKey } from '../conf'
import { User as UserModel } from '../models'

class User extends BaseCtrl {
  constructor() {
    super(UserModel)
  }

  // Login ctrl
  async login(ctx: any) {
    const { username = '', password = '' } = ctx.request.body

    // Created the Md5 password
    const md5Pwd = crypto.createHash('md5').update(password).digest('hex')

    // Match username is username or mobile
    const user = await UserModel.findOne({
      where: {
        [Sequelize.Op.or]: [
          { mobile: username },
          { username },
        ],
        password: md5Pwd,
      }
    })

    if (!user)
      return ctx.fail('用户名或密码错误')

    // Gen the token and set the token expiration is 7 days
    const token = jwt.sign({
      id: user.id,
      mobile: user.mobile,
    }, jwtSecretKey,
      { expiresIn: '7 days' }
    )

    ctx.success({ token })
  }

  // Regiest ctrl
  async reg(ctx: any) {
    const { body } = ctx.request

    // Create user and Set default username is mobile
    const user = await UserModel.create({
      ...body,
      username: body.mobile,
    }, {
      raw: true
    })

    const token = jwt.sign({
      id: user.id,
      mobile: user.mobile,
    }, jwtSecretKey,
      { expiresIn: '7 days' }
    )

    ctx.success({ ...user, token })
  }

  // Get User info ctrl
  async getUserInfo(ctx: any) {
    const { id } = ctx.state.user

    const data = await UserModel.findOne({ where: { id } })
    ctx.success(data)
  }
}

export const userCtrl = new User()