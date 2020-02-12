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

  static async addKillerLoadout(userId, payload) {
    const {title = "Killer Loadout", ...rawData} = payload
    const build = await Build.create({
      UserId: userId,
      type: "killerLoadout",
      title,
      data: rawData,
      linkId: uniqid.time(),
      seoLinkId: paramCase(title),
    })
    return build
  }

}

/**
 * @type {import("sequelize").ModelAttributes}
 */
export const schema = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Build",
  },
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