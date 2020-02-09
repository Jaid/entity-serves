import {JaidCorePlugin} from "jaid-core"
import {last} from "lodash"
import socketIo from "socket.io"

import socketEnhancer from "lib/socketEnhancer"

const commandsRequire = require.context("./commands/", false)

export default class SocketServer extends JaidCorePlugin {

  init() {
    this.socketServer = socketIo(this.core.insecureServer)
    this.socketServer.on("connection", client => {
      client.emit("hello")
      for (const [commandName, command] of Object.entries(this.commands)) {
        client.on(commandName, async (...args) => {
          const result = await command(client, ...args)
          if (result !== undefined) {
            last(args)(result)
          }
        })
      }
    })
    socketEnhancer.enhanceServer(this.socketServer)
    this.commands = commandsRequire.keys().reduce((state, value) => {
      const commandName = value.match(/\.\/(?<key>[\da-z]+)/i).groups.key
      state[commandName] = commandsRequire(value).default
      return state
    }, {})
  }

}