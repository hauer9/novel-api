/* 
 * Defined some descriptor
 */


export const isExist = () => {
  return (
    target: any,
    propertyKey: string,
    descriptor: any,
  ) => {
    const originalMethor = descriptor.value

    descriptor.value = async function () {
      const args = Array.from(arguments)
      const ctx = args[0]
      const { id } = ctx.params

      const isExist = await this.model.findByPk(id)
      if (!isExist)
        return ctx.notFound()

      const result = originalMethor.apply(this, args)

      return result
    }

    return descriptor
  }
}