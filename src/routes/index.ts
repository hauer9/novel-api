export { default as novelRouter } from './novel'
export { default as userRouter } from './user'
export { default as typeRouter } from './type'
export { default as chapterRouter } from './chapter'

// UnAuth paths
export const unAuthPaths = [
  /^\/users\/login/,
  /^\/users\/reg/,
  /^\/novels/,
  /^\/chapters/,
  /^\/types/,
]