import Sequelize from "sequelize"

class Login extends Sequelize.Model {

  /**
   * @param {Object<string, import("sequelize").Model>} models
   */
  static associate(models) {
    // models.User.hasMany(Login)
    Login.belongsTo(models.User)
  }

}

/**
 * @type {import("sequelize").ModelAttributes}
 */
export const schema = {
  apiKey: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
}

export default Login