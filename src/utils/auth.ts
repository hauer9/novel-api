import jwt from 'jsonwebtoken'
import { jwtSecretKey } from '../conf'


/* 
 * Auth
 */


export const verifyToken = (authorization: string | null) => {
  if (authorization && authorization.startsWith(`Bearer `)) {
    // 7 is the `Bearer `
    const token = authorization.slice(7)

    try {
      return jwt.verify(token, jwtSecretKey)
    } catch (err) {
      return false
    }
  }
  else
    return false
}