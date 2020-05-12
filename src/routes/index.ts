export * from './novel'
export * from './user'
export * from './type'
export * from './chapter'
export * from './collection'
export * from './rating'

// UnAuth paths
export const unAuthPaths = [
  { url: /^\/users\/login/, methods: [`POST`] },
  { url: /^\/users\/reg/, methods: [`POST`] },
  { url: /^\/users\/\d+/, methods: [`GET`] },
  { url: /^\/novels/, methods: [`GET`] },
  { url: /^\/chapters/, methods: [`GET`] },
  { url: /^\/types/, methods: [`GET`] },
]

export const unless = (ctx: any) => {
  const req = ctx.request
  for (let path of unAuthPaths) {
    const { url, methods } = path
    if (req.url.match(url)) {
      for (let method of methods) {
        if (method === req.method)
          return true
      }
    }
  }
  return false
}