import {pick} from "lodash"

import Build from "src/models/Build"

export default async (context, payload) => {
  if (!payload.id) {
    const message = "ID not given"
    context.client.emit("toast", message)
    return {error: message}
  }
  const build = await Build.findByPk(payload.id)
  if (build.UserId !== context.userId) {
    const message = "You are not allowed to edit this build"
    context.client.emit("toast", message)
    return {error: message}
  }
  const changed = await build.applyEdit(payload.formData)
  if (!changed) {
    const message = "Unchanged"
    context.client.emit("toast", message)
    return {
      error: "Unchanged",
      unchanged: true,
    }
  }
  context.client.emit("toast", "Your changes have been published")
  return pick(build, ["id", "seoLinkId"])
}