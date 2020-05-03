import { Sequelize } from 'sequelize-typescript'
import { devConf, prodConf } from './src/conf'

const sequelize = new Sequelize(prodConf)

sequelize.addModels([__dirname + '/src/models/*.model.ts'])

export {
  sequelize
}