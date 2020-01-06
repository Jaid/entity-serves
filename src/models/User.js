import Sequelize from "sequelize"

class User extends Sequelize.Model {

  /**
   * @param {Object<string, import("sequelize").Model>} models
   */
  static associate(models) {
    User.belongsTo(models.TwitchUser)
  }

}

/**
 * @type {import("sequelize").ModelAttributes}
 */
export const schema = {
  title: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
}

export default User