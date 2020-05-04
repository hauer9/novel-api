import crypto from 'crypto'


export const createMd5Pwd = (pwd: string) => {
  return crypto.createHash(`md5`).update(pwd).digest(`hex`)
}

export const isEmptyObj = (obj: Object) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false
  }
  
  return true
}