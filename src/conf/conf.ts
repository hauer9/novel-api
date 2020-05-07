import { ISequelizeConfig } from 'sequelize-typescript'

export interface IConf {
  development: ISequelizeConfig
  production: ISequelizeConfig
}

export const conf: IConf = {
  development: {
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
    database: 'novel',
    username: 'root',
    password: 'asd.0399',
    // timezone: '+8:00',
    logging: false,
  },
  production: {
    dialect: 'mysql',
    host: 'mysql',
    port: 3306,
    database: 'novel',
    username: 'root',
    password: 'asd.0399',
    // timezone: '+8:00',
    logging: false,
  }
}