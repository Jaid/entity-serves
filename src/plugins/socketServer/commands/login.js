import bcrypt from "bcrypt"

import User from "src/models/User"

export default async (client, payload) => {
  const lowerUser = payload.user.toLowerCase()
  const user = await User.findOne({
    where: {
      name: lowerUser,
    },
  })
  if (!user) {
    return {
      error: "User not found!",
    }
  }
  const samePassword = await bcrypt.compare(payload.password, user.password)
  if (!samePassword) {
    return {
      error: "Incorrect password!",
    }
  }
  const login = await user.createLogin()
  return {
    title: user.title,
    name: user.name,
    key: login.apiKey,
  }
}