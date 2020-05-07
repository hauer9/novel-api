import Router from 'koa-joi-router'

const router = Router()

router.prefix(`/deploy`)

router.route({
  method: `post`,
  path: `/`,
  handler: async (ctx: any) => {
    console.log(ctx)
  },
})

export const deployRoute = router.middleware()