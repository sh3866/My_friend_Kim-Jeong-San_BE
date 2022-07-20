const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = class Receipt extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true, // create at 에 자동 설정
                underscored: false,
                modelName: "Receipt",
                tableName: "receipts",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.Receipt.belongsTo(db.Room);
    }
};
