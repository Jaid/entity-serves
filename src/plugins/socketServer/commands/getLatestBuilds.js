import Build from "src/models/Build"

export default async (client, payload) => {
  const result = await Build.findAll({
    where: payload.where,
    limit: payload.limit || 10,
    attributes: [
      "data",
      "type",
      "linkId",
      "seoLinkId",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        association: "User",
        attributes: ["name", "title"],
      },
    ],
    order: [["updatedAt", "DESC"]],
    raw: true,
  })
  return Object.values(result)
}