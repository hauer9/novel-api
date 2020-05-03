import { ISequelizeConfig } from 'sequelize-typescript'

export const prodConf: ISequelizeConfig = {
  dialect: 'mysql',
  host: 'mysql',
  port: 3306,
  database: 'novel',
  username: 'root',
  password: 'asd.0399',
  // timezone: '+8:00',
  logging: false,
}