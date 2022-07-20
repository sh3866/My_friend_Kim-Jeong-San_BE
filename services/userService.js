const Sequelize = require("../models/index");

module.exports = {
    findUserById: async function (id) {
        return await Sequelize.User.findOne({ where: { id: id } });
    },

    deleteRoom: async function (req, transaction) {
        const userId = req.params.userId;
        const roomId = req.params.roomId;
        console.log(`userId ${userId}/ roomId ${roomId}`);
        return await Sequelize.UserRoom.destroy(
            {
                where: { UserId: userId, RoomId: roomId },
            },
            { transaction }
        );
    },
};
