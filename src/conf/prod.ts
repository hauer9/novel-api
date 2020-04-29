import { baseConf, IConf } from './base'

export const prodConf: IConf = {
  ...baseConf,
  
  db: {
    dialect: 'mysql',
    host: "119.23.55.24",
    port: 3306,
    database: 'novel',
    username: 'root',
    password: 'asd.0399',
    timezone: '+8:00',
  },
}