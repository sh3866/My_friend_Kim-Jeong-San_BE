const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");

module.exports = class Menu extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                amount: {
                    type: INTEGER,
                    allowNull: false,
                },
                group: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Menu",
                tableName: "menus",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.Menu.belongsTo(db.Receipt);
    }
};
