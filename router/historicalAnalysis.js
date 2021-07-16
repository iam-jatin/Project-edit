const express = require('express');
const { loginRequired } = require('../controller/auth.controller');
const { historical, getHistoricalData, customDayData } = require('./../controller/historical');
const router = express.Router();


router.get('/getCustomDayData/:Machine_No/:shiftno/:month/:year/:day', loginRequired, customDayData);
router.get('/historicalData/:Machine_No', loginRequired, historical);
router.get('/getHistoricalData/:Machine_No/:month/:year/:day', loginRequired, getHistoricalData);

module.exports = router;