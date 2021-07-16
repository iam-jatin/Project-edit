const express = require('express');
const { loginRequired } = require('../controller/auth.controller');
const { livePage, liveData } = require('./../controller/live');
const router = express.Router();

router.get('/liveData/:Machine_No', loginRequired, livePage)
router.get('/getLiveData/:Machine_No/:runShift', loginRequired, liveData)
module.exports = router;