import { BaseCtrl } from './base'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import { jwtSecretKey } from '../conf'
import { User as UserModel } from '../models/User'
import { createMd5Pwd } from '../utils'

class User extends BaseCtrl {
  constructor() {
    super(UserModel)
  }

  // Login ctrl
  async login(ctx: any) {
    const { username = ``, password = `` } = ctx.request.body

    // Created the Md5 password
    const md5Pwd = createMd5Pwd(password)

    // Match username is username or mobile
    const user = await UserModel.findOne({
      where: {
        [Op.or]: [
          { mobile: username },
          { username },
        ],
        password: md5Pwd,
      }
    })

    if (!user)
      return ctx.fail(`用户名或密码错误`)

    // Gen the token and set the token expiration is 7 days
    const token = jwt.sign({
      id: user.id,
      mobile: user.mobile,
    }, jwtSecretKey,
      { expiresIn: `7 days` }
    )

    ctx.success({
      token,
      userInfo: user,
    })
  }

  // Regiest ctrl
  async reg(ctx: any) {
    const { mobile = ``, password = `` } = ctx.request.body

    // Create user and Set default username is mobile
    const user = await UserModel.create({
      username: mobile,
      mobile,
      password,
    })

    const data: any = (user as any).dataValues

    const token = jwt.sign({
      id: data.id,
      mobile: data.mobile,
    }, jwtSecretKey,
      { expiresIn: `7 days` }
    )

    ctx.success({ ...data, token })
  }

  // Get Own info ctrl
  async getOwnInfo(ctx: any) {
    const { id } = ctx.state.user

    const data = await UserModel.findByPk(id)

    ctx.success(data)
  }
}

export const userCtrl = new User()