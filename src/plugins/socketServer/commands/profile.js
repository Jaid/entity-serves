import User from "src/models/User"

export default async (client, payload) => {
  const lowerUser = payload.toLowerCase()
  const user = await User.findOne({
    where: {
      name: lowerUser,
    },
    attributes: [
      "title",
      "name",
    ],
    raw: true,
  })
  if (!user) {
    return null
  }
  return user
}