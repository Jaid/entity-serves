import {omit} from "lodash"

import Build from "src/models/Build"
import User from "src/models/User"

export default async (client, payload) => {
  const lowerUser = payload.toLowerCase()
  const user = await User.findOne({
    where: {
      name: lowerUser,
    },
    attributes: [
      "id",
      "title",
      "name",
    ],
    raw: true,
  })
  if (!user) {
    return null
  }
  const latestBuilds = await Build.findAll({
    where: {
      UserId: user.id,
    },
    limit: 10,
    attributes: [
      "data",
      "type",
      "linkId",
      "seoLinkId",
      "createdAt",
      "updatedAt",
    ],
    order: [["updatedAt", "DESC"]],
    raw: true,
  })
  return {
    user: omit(user, "id"),
    latestBuilds,
  }
}