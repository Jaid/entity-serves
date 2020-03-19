import {paramCase} from "param-case"
import Sequelize from "sequelize"

import buildDataNormalizers from "lib/buildDataNormalizers"

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
    const buildData = buildDataNormalizers[type](payload)
    const build = await Build.create({
      type,
      UserId: userId,
      data: buildData,
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
  seoLinkId: Sequelize.STRING,
}

export const modelOptions = {
  paranoid: true,
}

export default Build