import { Sequelize } from 'sequelize-typescript'
import { conf } from './src/conf'


const env = process.env.NODE_ENV as `development` | `production`

export const sequelize = new Sequelize({
  ...conf[env],
  modelPaths: [__dirname + `/src/models`]
})