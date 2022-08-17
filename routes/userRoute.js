const express = require("express");
const userController = require("../controllers/userController");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const router = express.Router();

// const { sequelize, User, Room } = require("../models/index");

router.get("/register", function(req, res){
    res.render('register');
});

router.post('/:id/register', registerController.getAccount);

router.post('/login', loginController.getKakaoUser);


module.exports = router;