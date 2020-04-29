import { BaseCtrl } from './base'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { baseConf } from '../conf'
import { User as UserModel } from '../models'

export class User extends BaseCtrl {
  constructor() {
    super(UserModel)
  }

  // Login ctrl
  async login(ctx: any) {
    const { username = null, password = null } = ctx.request.body

    // Create Md5 password
    const md5Pwd = crypto.createHash('md5').update(password).digest('hex')

    // Match username is username or mobile
    const data = await this.model.getDetail({
      [this.Op.or]: [
        { mobile: username },
        { username },
      ],
      password: md5Pwd,
    })

    if (!data) {
      ctx.fail('用户名或密码错误')
      return
    }

    // Gen token and set token expiration is 7 days
    const token = jwt.sign({
      id: data.id,
      mobile: data.mobile,
    }, baseConf.jwtSecretKey,
      { expiresIn: '7 days' }
    )

    ctx.success(token)
  }

  // Regiest ctrl
  async reg(ctx: any) {
    const { body } = ctx.request

    // Create user and Set default username is mobile
    const user = await this.model.createItem({
      ...body,
      username: body.mobile,
    })

    const data = user.dataValues
    
    if (!data) {
      ctx.fail('注册失败')
      return
    }

    const token = jwt.sign({
      id: data.id,
      mobile: data.mobile,
    }, baseConf.jwtSecretKey,
      { expiresIn: '7 days' }
    )

    ctx.success({ ...data, token })
  }

  // Get User info ctrl
  async getUserInfo(ctx: any) {
    const { id } = ctx.state.user
    const data = await this.model.getDetail({ id })

    if (!data) {
      ctx.fail()
      return
    }
      
    ctx.success(data)
  }
}