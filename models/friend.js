const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = class Friend extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                friendId: {
                    type: INTEGER,
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Friend",
                tableName: "friends",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.Friend.belongsTo(db.User);
    }
};
