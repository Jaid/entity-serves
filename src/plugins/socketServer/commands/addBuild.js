import {pick} from "lodash"

import Build from "src/models/Build"
import User from "src/models/User"

export default async (context, payload) => {
  if (!context.userId) {
    context.client.emit("toast", "Not logged in!")
    return {error: "Not logged in!"}
  }
  const user = await User.findByPk(context.userId)
  const build = await Build.addBuild(payload.formType, user.id, payload.formData)
  return pick(build, ["id", "seoLinkId"])
}