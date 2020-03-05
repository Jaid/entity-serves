import {pick} from "lodash"

import Build from "src/models/Build"
import User from "src/models/User"

export default async (context, payload) => {
  if (!context.userId) {
    return {error: "Not logged in!"}
  }
  const user = await User.findByPk(context.userId)
  const build = await Build.addBuild(payload.formType, user.id, payload.formData)
  context.logger.info(`Created build: ${build.linkId}/${build.seoLinkId}`)
  return pick(build, ["linkId", "seoLinkId"])
}