const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.get('/:roomId/room', paymentController.getRoomPayments);

module.exports = router;
