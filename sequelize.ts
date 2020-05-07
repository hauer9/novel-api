import { Sequelize } from 'sequelize-typescript'
import { conf } from './src/conf'


const sequelize = new Sequelize(conf[process.env.NODE_ENV as 'development' | 'production'])

sequelize.addModels([__dirname + '/src/models/*.model.ts'])

export {
  sequelize
}