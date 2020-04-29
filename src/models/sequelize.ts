import { Sequelize } from 'sequelize-typescript'
import { devConf, prodConf } from '../conf'
import { Novel } from './novel'
import { User } from './user'
import { Type } from './type'
import { Chapter } from './chapter'

const sequelize = new Sequelize(prodConf.db)

sequelize.addModels([
  Novel,
  User,
  Type,
  Chapter,
])

export { sequelize }