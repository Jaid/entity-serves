import {JaidCorePlugin} from "jaid-core"

export default class Main extends JaidCorePlugin {

  async ready() {
    this.log(`Twitch auth URL: http://localhost:${this.core.options.insecurePort}/auth/twitch`)
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