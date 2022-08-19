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
    createVote: async function (req, transaction) {
        const items = req.body.items;
        await Sequelize.Vote.create(
            {
                PollId: req.body.poll,
                MenuId: req.body.menu,
                items: req.body.items,
                user_id: req.body.user,
            },
            { transaction: transaction }
        );
        // for (i in items) {
        //     await Sequelize.Vote.create(
        //         {
        //             PollId: req.body.poll,
        //             MenuId: req.body.menu,
        //             item_id: i,
        //             user_id: req.body.user,
        //         },
        //         { transaction: transaction }
        //     );
        // }
    },
    updateVote: async function (req, transaction) {
        const items = req.body.items;
        await Sequelize.Vote.update(
            { items: req.body.items },
            {
                where: {
                    PollId: req.body.poll,
                    MenuId: req.body.menu,
                    user_id: req.body.user,
                },
            },
            { transaction: transaction }
        );
    },
    findPaymentList: async function (roomId) {
        const nPayments = await Sequelize.Payment.findAll({
            attributes: ["amount", "payerId", "group"],
            where: { RoomId: roomId },
        });
        const result = [];
        for (i = 0; i < nPayments.length; i++) {
            p = nPayments[i];
            await Sequelize.User.findByPk(p.payerId).then((user) => {
                result.push({
                    payerId: p.dataValues.payerId,
                    payerName: user.dataValues.name,
                    amount: p.dataValues.amount,
                    group: p.dataValues.group,
                });
            });
        }
        return result;
    },
    findUserName: async function (userId) {
        const user = await Sequelize.User.findByPk(userId);
        const result = user.dataValues.name;
        return result;
    },
};
