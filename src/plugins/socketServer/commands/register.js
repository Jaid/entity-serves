import bcrypt from "bcrypt"

import User from "src/models/User"

export default async (client, payload) => {
  const lowerUser = payload.user.toLowerCase()
  const existingUser = await User.findOne({
    where: {
      name: lowerUser,
    },
  })
  if (existingUser) {
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
  return {
    title: user.title,
    name: user.name,
    login: login.apiKey,
  }
}