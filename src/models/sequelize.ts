import { Sequelize } from 'sequelize-typescript'
import { devConf } from '../conf'
import { Novel } from './novel'
import { User } from './user'
import { Type } from './type'
import { Chapter } from './chapter'

const sequelize = new Sequelize(devConf.db)

sequelize.addModels([
  Novel,
  User,
  Type,
  Chapter,
])

export {
  sequelize
}