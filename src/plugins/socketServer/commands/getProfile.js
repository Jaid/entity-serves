import Build from "src/models/Build"
import User from "src/models/User"

import getBuilds from "./getBuilds"

export default async (context, payload) => {
  const lowerUser = payload.toLowerCase()
  const user = await User.findOne({
    where: {
      name: lowerUser,
    },
    attributes: [
      "id",
      "title",
      "name",
      "createdAt",
    ],
    raw: true,
  })
  if (!user) {
    return null
  }
  const latestBuilds = await getBuilds(context, {
    filterType: "userId",
    value: user.id,
  })
  return {
    user,
    latestBuilds,
  }
}