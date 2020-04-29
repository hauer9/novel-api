import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from '@koa/cors'
import jwt from 'koa-jwt'
import { sequelize } from './src/models'
import { devConf } from './src/conf'
import { unAuthPaths } from './src/routes'
import {
  error,
  request,
} from './src/middlewares'
import {
  novelRouter,
  typeRouter,
  userRouter,
  chapterRouter,
} from './src/routes'

/* 
 * Base config
*/

const { port, jwtSecretKey } = devConf


/* 
 * Connect database
*/

sequelize.sync({
  alter: true,
  // force: true,
})


/* 
 * Load middlewares
*/


const app = new Koa()

app
  .use(error())                                                       // Catch globel error
  .use(logger())                                                      // Print to log
  .use(cors())                                                        // Accesss origin
  .use(bodyParser())                                                  // Parse body
  .use(request.interceptors.request())                                // Set request ctx
  .use(request.interceptors.response())                               // Set response body struct
  .use(jwt({ secret: jwtSecretKey }).unless({ path: unAuthPaths }))   // Set jwt and unAuth paths
  .use(novelRouter)                                                   // Set routes
  .use(userRouter)
  .use(typeRouter)
  .use(chapterRouter)

/* 
 * Listen port   
*/

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  console.log('Press CTRL-C to stop \n')
})