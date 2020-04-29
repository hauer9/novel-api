import { baseConf, IConf } from './base'

export const devConf: IConf = {
  ...baseConf,
  
  db: {
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
    database: 'novel',
    username: 'root',
    password: 'asd.0399',
    timezone: '+8:00',
  },
}