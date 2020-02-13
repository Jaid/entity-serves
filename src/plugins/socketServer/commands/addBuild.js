import {pick} from "lodash"

import Build from "src/models/Build"
import User from "src/models/User"

export default async (client, payload) => {
  if (!client.userId) {
    return {error: "Not logged in!"}
  }
  const user = await User.findByPk(client.userId)
  const build = await Build.addBuild(payload.formType, user.id, payload.formData)
  return pick(build, ["linkId", "seoLinkId"])
}