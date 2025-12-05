import { createCategory } from "~~/server/db/categories"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userId = event.context.userId
  const category = await createCategory({ ...body, userId })
  return {
    category
  }
})
