const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

router.get("/", loginController.getKakaoLogin);
router.get("/callback", loginController.loginProcess);




module.exports = router;