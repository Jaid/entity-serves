import {router} from "fast-koa-router"

import {koa} from "src/core"

export default class Main {

  init() {
    const routes = {
      get: {
        "/preview/:productId/:platform": require("./handlers/preview").default,
        "/info/product/:productId/:platform": require("./handlers/info").default,
        "/info/identifier/:platform/:platformIdentifier": require("./handlers/info").default,
      },
      post: {
        "/registerAsin": require("./handlers/registerAsin").default,
        "/triggerCheck/product/:productId": require("./handlers/triggerCheck").default,
      },
    }
    koa.use(router(routes))
  }

}