const Sequelize = require("sequelize");

module.exports = class Friend extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.STRING(300),
                    primaryKey: true,
                    autoIncrement: false,
                    allowNull: true,
                },
                name: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                accounts: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },
                profilePhoto: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true, // create at 에 자동 설정
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
        db.User.hasMany(db.Friend);
        db.UserRoom.belongsTo(db.User, {
            foreignKey: "UserId",
            sourceKey: "id",
        });
    }
};
