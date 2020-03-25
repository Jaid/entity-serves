import bcrypt from "bcrypt"

import sanitizeUsername from "lib/sanitizeUsername"

import User from "src/models/User"

export default async (context, payload) => {
  const lowerUser = sanitizeUsername(payload.user)
  const user = await User.findOne({
    where: {
      name: lowerUser,
    },
  })
  if (!user) {
    context.client.emit("toast", "User not found!")
    return {
      error: "User not found!",
    }
  }
  const samePassword = await bcrypt.compare(payload.password, user.password)
  if (!samePassword) {
    context.client.emit("toast", "Incorrect password!")
    return {
      error: "Incorrect password!",
    }
  }
  const login = await user.createLogin()
  context.client.apiKey = login.apiKey
  context.client.userId = user.id
  context.client.emit("toast", `Hello, ${user.title}!`)
  return {
    title: user.title,
    name: user.name,
    key: login.apiKey,
  }
}