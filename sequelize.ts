import { Sequelize } from 'sequelize-typescript'
import { devConf, prodConf } from './src/conf'

const sequelize = new Sequelize(devConf)

sequelize.addModels([__dirname + '/src/models/*.model.ts'])

export {
  sequelize
}