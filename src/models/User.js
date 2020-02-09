import Sequelize from "sequelize"

import Login from "src/models/Login"

class User extends Sequelize.Model {

  /**
   * @param {Object<string, import("sequelize").Model>} models
   */
  static associate(models) {
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
  title: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.CHAR(60),
    allowNull: false,
  },
}

export default User