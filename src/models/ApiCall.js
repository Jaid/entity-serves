import Sequelize from "sequelize"

import Login from "src/models/Login"

class ApiCall extends Sequelize.Model {

  /**
   * @param {Object<string, import("sequelize").Model>} models
   */
  static associate(models) {
    ApiCall.belongsTo(models.User)
  }

  async createLogin() {
    const login = await Login.create({UserId: this.id})
    return login
  }

}

/**
 * @type {import("sequelize").ModelAttributes}
 */
export const schema = {
  type: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
  payload: Sequelize.JSONB,
  time: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  result: Sequelize.JSONB,
}

export default ApiCall