const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                accounts: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },

                profilePhoto: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "User",
                tableName: "users",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {}
};
