const { sequelize, User, Room } = require("../models/index");
const ResponseDto = require("../dto/ResponseDto");
const paymentService = require("../services/paymentService");
const userService = require("../services/userService");

module.exports = {
    getPayments: async function (req, res) {
        try {
            const userId = req.query.userId;
            //TODO Validaton 추가

            const result = userId
                ? await userService.getPayments(userId)
                : await paymentService.findAllPayments();

            res.status(200).send(
                new ResponseDto(200, "정산 내역 받아오기 성공", result)
            );
        } catch (err) {
            console.log(err);
            res.status(500).send(
                new ResponseDto(500, "정산 내역 받아오기 실패")
            );
        }
    },
    getRoomPayments: async function (req, res) {
        try {
            const roomId = req.params.roomId;
            const paymentListResult = await paymentService.findRoomPayments(
                roomId
            );
            res.status(200).send(
                new ResponseDto(200, "정산 내역 조회 성공", paymentListResult)
            );
        } catch (err) {
            console.log(err);
            res.status(400).send(new ResponseDto(400, "정산 내역 조회 실패"));
        }
    },
    doVote: async function (req, res) {
        let transaction = await sequelize.transaction();
        try {
            await paymentService.createVote(req, transaction);
            await transaction.commit();
            res.status(200).send({ statusCode: 200, res: "투표 성공" });
        } catch (err) {
            await transaction.rollback();
            console.log(err);
            res.status(400).send({ statusCode: 400, res: "투표 실패" });
        }
    },
    doVoteAgain: async function (req, res) {
        let transaction = await sequelize.transaction();
        try {
            await paymentService.updateVote(req, transaction);
            await transaction.commit();
            res.status(200).send({ statusCode: 200, res: "다시 투표 성공" });
        } catch (err) {
            await transaction.rollback();
            console.log(err);
            res.status(400).send({ statusCode: 400, res: "다시 투표 실패" });
        }
    },
};
