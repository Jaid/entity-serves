import deadByDaylight from "dead-by-daylight"
import {Op} from "sequelize"

import Build from "src/models/Build"
import User from "src/models/User"

export default async (client, payload) => {
  const where = {
  }
  if (payload.filterType === "perk") {
    const perk = deadByDaylight.perks[payload.value]
    where.type = perk.for === "killer" ? "killerLoadout" : "survivorLoadout"
    where[Op.or] = [1, 2, 3, 4].map(slotIndex => ({
      data: {
        [`perk${slotIndex}`]: perk.id,
      },
    }))
  } else {
    return null
  }
  const builds = await Build.findAndCountAll({
    where,
    limit: payload.limit || 10,
    attributes: [
      "UserId",
      "data",
      "type",
      "createdAt",
      "updatedAt",
    ],
    raw: true,
    order: [["id", "DESC"]],
    include: [
      {
        model: User,
        attributes: [
          "name",
          "title",
        ],
      },
    ],
  })
  return builds
}