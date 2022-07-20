const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.put("/:userId/room/:roomId", userController.deleteRoom);

module.exports = router;
