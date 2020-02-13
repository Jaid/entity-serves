import {omit} from "lodash"

import Build from "src/models/Build"
import User from "src/models/User"

export default async (client, payload) => {
  const build = await Build.findOne({
    where: {
      linkId: payload,
    },
    attributes: [
      "UserId",
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
  const user = await User.findByPk(build.UserId, {
    attributes: [
      "name",
      "title",
    ],
    raw: true,
  })
  return {
    ...omit(build, "UserId"),
    userName: user.name,
    userTitle: user.title,
  }
}