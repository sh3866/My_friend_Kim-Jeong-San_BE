const Sequelize = require("../models/index");

module.exports = {
    findUserById: async function (id) {
        return await Sequelize.User.findOne({ where: { id: id } });
    },
};
