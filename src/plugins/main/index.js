import {JaidCorePlugin} from "jaid-core"
import sequelize from "sequelize"

import Build from "src/models/Build"

export default class Main extends JaidCorePlugin {

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