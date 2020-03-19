import {JaidCorePlugin} from "jaid-core"
import {isEqual} from "lodash"

import buildDataNormalizers from "lib/buildDataNormalizers"

import Build from "src/models/Build"

export default class Main extends JaidCorePlugin {

  async normalizeBuilds() {
    const builds = await Build.findAll({
      attributes: [
        "id",
        "data",
        "type",
      ],
    })
    for (const build of builds) {
      const normalizedData = buildDataNormalizers[build.type](build.data)
      if (isEqual(build.data, normalizedData)) {
        continue
      }
      await build.update({
        data: normalizedData,
      }, {
        silent: true,
      })
      this.log(`Build #${build.id} has been normalized`)
    }
  }

  async ready() {
    await this.normalizeBuilds()
  }

  collectModels() {
    const models = {}
    const modelsRequire = require.context("../../models/", true, /.js$/)
    for (const value of modelsRequire.keys()) {
      const modelName = value.match(/\.\/(?<key>[\da-z]+)\./i).groups.key
      models[modelName] = modelsRequire(value)
    }
    return models
  }

}