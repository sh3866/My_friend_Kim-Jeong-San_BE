const { sequelize, User, Room } = require("../models/index");
const roomService = require("../services/roomService");
const ResponseDto = require("../dto/ResponseDto");
const userService = require("../services/userService");
const RoomDto = require("../dto/RoomDto");
const UserDto = require("../dto/UserDto");

module.exports = {
    createRoom: async function (req, res) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            console.log(req.body);
            await roomService.createRoom(req, transaction);

            await transaction.commit();
            res.status(200).send(new ResponseDto(200, "모임방 생성 완료"));
        } catch (err) {
            await transaction?.rollback();
            console.log(err);
            res.status(500).send(new ResponseDto(500, "모임방 생성 실패"));
        }
    },
    deleteRoom: async function (req, res) {
        let transaction;
        console.log(req.params);
        const roomId = req.params.roomId;
        try {
            transaction = await sequelize.transaction();
            await roomService.deleteRoomById(roomId);
            await transaction.commit();
            res.status(200).send(new ResponseDto(200, "모임방 삭제 완료"));
        } catch (err) {
            await transaction?.rollback();
            console.log(err);
            res.status(500).send(new ResponseDto(500, "모임방 삭제 실패"));
        }
    },
    getRooms: async function (req, res) {
        const userId = req.query.userId;

        try {
            if (userId === undefined)
                throw Error("조회할 유저 아이디가 없습니다.");
            let rooms = [];
            const list = await userService.getRooms(userId);
            for (i = 0; i < list.length; i++) {
                for (k = 0; k < list[i].group.length; k++) {
                    let user = await userService.findUserById(list[i].group[k]);
                    list[i].addUser(user);
                }
                rooms.push(list[i].get());
            }
            res.status(200).send(
                new ResponseDto(200, "모임방 조회 성공", rooms)
            );
        } catch (err) {
            console.log(err);
            res.status(500).send(
                new ResponseDto(
                    400,
                    err.message ? err.message : "모임방 조회 실패"
                )
            );
        }
    },
    updateGroup: async function (req, res) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await userService.deleteRoom(req, transaction);
            await roomService.deleteParticipantById(
                req.params.roomId,
                req.query.userId
            );
            await transaction.commit();
            res.status(200).send(new ResponseDto(200, "모임방 나가기 완료"));
        } catch (err) {
            await transaction?.rollback();
            console.log(err);
            res.status(500).send(
                new ResponseDto(
                    err.message ? 400 : 500,
                    err.message ? err.message : "모임방 나가기 실패"
                )
            );
        }
    },
};
