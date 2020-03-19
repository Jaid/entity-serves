import Sequelize from "sequelize"

class BuildRevision extends Sequelize.Model {

  /**
   * @param {Object<string, import("sequelize").Model>} models
   */
  static associate(models) {
    BuildRevision.belongsTo(models.Build, {
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
  data: {
    type: Sequelize.JSONB,
    allowNull: false,
  },
}

/**
 * @type {import("sequelize").ModelOptions}
 */
export const modelOptions = {
  updatedAt: false,
}

export default BuildRevision