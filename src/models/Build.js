import {paramCase} from "param-case"
import Sequelize from "sequelize"
import uniqid from "uniqid"

class Build extends Sequelize.Model {

  /**
   * @param {Object<string, import("sequelize").Model>} models
   */
  static associate(models) {
    Build.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    })
  }

  static async addBuild(type, userId, payload) {
    const build = await Build.create({
      type,
      UserId: userId,
      data: payload,
      linkId: uniqid.time(),
      seoLinkId: paramCase(payload.title || paramCase(type)),
    })
    return build
  }

}

/**
 * @type {import("sequelize").ModelAttributes}
 */
export const schema = {
  type: {
    type: Sequelize.STRING(32),
    allowNull: false,
  },
  data: {
    type: Sequelize.JSONB,
    allowNull: false,
  },
  linkId: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
  },
  seoLinkId: Sequelize.STRING,
}

export default Build