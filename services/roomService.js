const Sequelize = require("../models/index");
const userService = require("./userService");

module.exports = {
    createRoom: async function (
        name,
        color,
        startDate,
        startTime,
        group,
        transaction
    ) {
        const room = await Sequelize.Room.create(
            {
                name: name,
                color: color,
                startDate: startDate,
                startTime: startTime,
                group: group,
            },
            {
                transaction: transaction,
            }
        );
        if (group)
            group.forEach((id) => {
                userService.findUserById(id).then((user) => {
                    if (user) room.addUser(user.id);
                });
            });
    },
};
