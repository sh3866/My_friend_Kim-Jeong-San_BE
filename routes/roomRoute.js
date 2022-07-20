const express = require("express");
const roomController = require("../controllers/roomController");
const router = express.Router();

router.post("/", roomController.createRoom);

module.exports = router;
