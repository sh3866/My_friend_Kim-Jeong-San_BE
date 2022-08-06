const Sequelize = require("../models/index");

module.exports = {
    findAllPayments: async function () {
        return await Sequelize.Payment.findAll();
    },

    findByRoomId: async function (roomId) {
        return await Sequelize.Payment.findAll({
            where: { RoomId: roomId },
        });
    },
};
