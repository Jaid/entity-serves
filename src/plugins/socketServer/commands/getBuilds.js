import deadByDaylight from "dead-by-daylight"
import {Op} from "sequelize"

import Build from "src/models/Build"
import User from "src/models/User"

function getWhere(payload) {
  const where = {}
  if (payload.type) {
    where.type = payload.type
  }
  if (payload.filterType === "perk") {
    const perk = deadByDaylight.perks[payload.value]
    where.type = perk.for === "killer" ? "killerLoadout" : "survivorLoadout"
    where[Op.or] = [1, 2, 3, 4].map(slotIndex => ({
      data: {
        [`perk${slotIndex}`]: perk.id,
      },
    }))
  }
  return where
}

function getOrder(input) {
  if (input === "latest") {
    return [["id", "DESC"]]
  }
  if (input === "updated") {
    return [["updatedAt", "DESC"]]
  }
  return [["id", "DESC"]]
}

function getAttributes(input) {
  if (!input) {
    return [
      "UserId",
      "data",
      "type",
      "createdAt",
      "updatedAt",
    ]
  }
  return input
}

function getUserInclude(input) {
  if (!input) {
    return {
      model: User,
      attributes: [
        "name",
        "title",
      ],
    }
  }
  return {
    model: User,
    attributes: input.userAttributes,
  }
}

function getLimit(input) {
  if (!input) {
    return 10
  }
  return input
}

export default async (client, payload) => {
  const builds = await Build.findAndCountAll({
    where: getWhere(payload),
    limit: getLimit(payload.limit),
    attributes: getAttributes(payload.attributes),
    raw: true,
    order: getOrder(payload.order),
    include: [getUserInclude(payload.userAttributes)],
  })
  return builds
}