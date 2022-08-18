const Sequelize = require("../models/index");
const Payemnt = require("../models/payment");

module.exports = {
    findAllPayments: async function () {
        return await Sequelize.Payment.findAll();
    },

    findByRoomId: async function (roomId) {
        return await Sequelize.Payment.findAll({
            where: { RoomId: roomId },
        });
    },
    findRoomPayments: async function (roomId) {
        const payments = await Sequelize.Payment.findAll({
            //attributes: ["id", "date", "amount", "payerId", "createdAt"],
            where: { RoomId: roomId },
        });
        const result = [];
        for (i = 0; i < payments.length; i++) {
            p = payments[i];
            await Sequelize.User.findByPk(p.payerId).then((user) => {
                result.push({
                    payerName: user.dataValues.name,
                    date: p.dataValues.date,
                    amount: p.dataValues.amount,
                    num: i + 1,
                });
            });
        }
        return result;
    },
};
