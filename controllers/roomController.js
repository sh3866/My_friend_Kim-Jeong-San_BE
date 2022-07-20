const { sequelize, User, Room } = require("../models/index");
const roomService = require("../services/roomService");
const ResponseDto = require("../dto/ResponseDto");

module.exports = {
    createRoom: async function (req, res) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            console.log(req.body);
            await roomService.createRoom(
                req.body.name,
                req.body.color,
                req.body.startDate,
                req.body.startTime,
                req.body.group,
                transaction
            );

            await transaction.commit();
            res.status(200).send(new ResponseDto(200, "모임방 생성 완료"));
        } catch (err) {
            await transaction?.rollback();
            console.log(err);
            res.status(500).send(new ResponseDto(500, "모임방 생성 실패"));
        }
    },
};
