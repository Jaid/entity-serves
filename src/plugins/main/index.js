import {JaidCorePlugin} from "jaid-core"

import User from "src/models/User"

export default class Main extends JaidCorePlugin {

  async ready() {
    // this.log(`Twitch auth URL: http://localhost:${this.core.options.insecurePort}/auth/twitch`)
    // this.core.plugins.twitchAuth.eventEmitter.on("login", async result => {
    //   if (!result.isNew) {
    //     return
    //   }
    //   const twitchUser = result.twitchUser
    //   const user = await User.create({
    //     TwitchUserId: twitchUser.id,
    //     title: twitchUser.displayName,
    //   })
    // })
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