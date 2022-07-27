const express = require("express");
const roomController = require("../controllers/roomController");
const router = express.Router();

router.post("/", roomController.createRoom);
router.get("/", roomController.getRooms);
router.put("/:roomId", roomController.updateGroup);

module.exports = router;
