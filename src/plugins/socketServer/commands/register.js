import bcrypt from "bcrypt"

import User from "src/models/User"

export default async (context, payload) => {
  const lowerUser = payload.user.toLowerCase()
  const existingUser = await User.findOne({
    where: {
      name: lowerUser,
    },
  })
  if (existingUser) {
    context.client.emit("toast", `${existingUser.title} already exists`)
    return {
      error: "Already exists!",
    }
  }
  const hash = await bcrypt.hash(payload.password, 5)
  const user = await User.create({
    title: payload.user,
    name: lowerUser,
    password: hash,
  })
  const login = await user.createLogin()
  context.client.apiKey = login.apiKey
  context.client.userId = user.id
  context.client.emit("toast", `Welcome, ${user.title}!`)
  return {
    title: user.title,
    name: user.name,
    key: login.apiKey,
  }
}