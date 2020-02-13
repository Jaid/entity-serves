import Sequelize from "sequelize"

class Login extends Sequelize.Model {

  /**
   * @param {Object<string, import("sequelize").Model>} models
   */
  static associate(models) {
    Login.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    })
  }

}

/**
 * @type {import("sequelize").ModelAttributes}
 */
export const schema = {
  apiKey: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    unique: true,
  },
}

export default Login