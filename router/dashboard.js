const express = require('express');
const { dashboardData, addMachine, updateMachine, deleteMachine } = require('./../controller/dashboard.controller');
const { loginRequired } = require('./../controller/auth.controller');
const { dailyData } = require('../controller/data.controller');
const router = express.Router();

router.get('/dashboard', loginRequired, dashboardData);
router.post('/addDevice', loginRequired, addMachine);
router.post('/deleteDevice', loginRequired, deleteMachine);
router.post('/updateDevice', loginRequired, updateMachine);
router.get('/addDatabase', dailyData);

module.exports = router;