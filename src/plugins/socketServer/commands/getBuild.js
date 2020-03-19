import Build from "src/models/Build"
import User from "src/models/User"

export default async (context, payload) => {
  const build = await Build.findByPk(Number(payload), {
    attributes: [
      "id",
      "UserId",
      "data",
      "type",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: User,
        attributes: [
          "name",
          "title",
        ],
      },
    ],
    raw: true,
  })
  if (!build) {
    return null
  }
  if (build.UserId === context.client.userId) {
    build.editable = true
  }
  return build
}