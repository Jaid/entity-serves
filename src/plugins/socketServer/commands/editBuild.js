import {isEqual, pick} from "lodash"

import buildDataNormalizers from "lib/buildDataNormalizers"

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
  const buildData = buildDataNormalizers[build.type](payload.formData)
  if (isEqual(build.data, buildData)) {
    const message = "Unchanged"
    context.client.emit("toast", message)
    return {
      error: "Unchanged",
      unchanged: true,
    }
  }
  await build.update({
    data: buildData,
  })
  context.client.emit("toast", "Your changes have been published")
  return pick(build, ["id", "seoLinkId"])
}