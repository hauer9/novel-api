import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from '@koa/cors'
import jwt from 'koa-jwt'
import { unless } from './src/routes'
import {
  error,
  serverError,
  request,
} from './src/middlewares'
import {
  novelRoute,
  typeRoute,
  userRoute,
  chapterRoute,
  collectionRoute,
} from './src/routes'
import { jwtSecretKey } from './src/conf'

/* 
 * Load middlewares
*/


const app = new Koa()

app
  .use(error())                                                       // Catch globel error
  .on(`error`, serverError)                                           // Throw server error
  .use(cors())                                                        // Accesss origin
  .use(logger())                                                      // Print request
  .use(bodyParser())                                                  // Parse body
  .use(request.interceptors.response())                               // Set response body struct
  .use(jwt({ secret: jwtSecretKey }).unless({ custom: unless }))   // Set jwt and unAuth paths
  .use(novelRoute)                                                    // Set routes
  .use(userRoute)
  .use(typeRoute)
  .use(chapterRoute)
  .use(collectionRoute)


export { app }