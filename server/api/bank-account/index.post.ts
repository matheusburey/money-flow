import { createAccount } from "~~/server/db/bankAccount";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userId = event.context.userId
  const category = await createAccount({ ...body, userId });
  return {
    category
  }
})
