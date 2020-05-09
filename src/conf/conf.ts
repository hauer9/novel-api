import { SequelizeOptions } from 'sequelize-typescript'

export interface IConf {
  development: SequelizeOptions
  production: SequelizeOptions
}

export const conf: IConf = {
  development: {
    dialect: `mysql`,
    host: `localhost`,
    port: 3306,
    database: `novel`,
    username: `root`,
    password: `asd.0399`,
    // timezone: `+8:00`,
    logging: false,
  },
  production: {
    dialect: `mysql`,
    host: `mysql`,
    port: 3306,
    database: `novel`,
    username: `root`,
    password: `asd.0399`,
    // timezone: `+8:00`,
    logging: false,
  }
}