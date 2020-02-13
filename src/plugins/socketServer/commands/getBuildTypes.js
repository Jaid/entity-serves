import sequelize from "sequelize"

import Build from "src/models/Build"

export default async () => {
  const result = await Build.findAll({
    attributes: [
      "type",
      [sequelize.fn("COUNT", "id"), "count"],
    ],
    group: ["type"],
    raw: true,
  })
  return Object.values(result)
}