import Build from "src/models/Build"
import User from "src/models/User"

export default async (client, payload) => {
  const build = await Build.findOne({
    where: {
      linkId: payload,
    },
    attributes: [
      "title",
      "data",
      "type",
      "createdAt",
      "updatedAt",
    ],
    raw: true,
  })
  if (!build) {
    return null
  }
  const user = await User.findByPk(client.userId, {
    attributes: [
      "name",
      "title",
    ],
    raw: true,
  })
  return {
    ...build,
    userName: user.name,
    userTitle: user.title,
  }
}