import {JaidCorePlugin} from "jaid-core"
import socketIo from "socket.io"

import socketEnhancer from "lib/socketEnhancer"

export default class SocketServer extends JaidCorePlugin {

  init() {
    this.socketServer = socketIo(this.core.insecureServer)
    this.socketServer.on("connection", client => {
      this.log(`${client.id} connected`)
      client.emit("hello")
    })
    socketEnhancer.enhanceServer(this.socketServer)
  }

}