const express = require('express');
const { settings, saveShift } = require('./../controller/settings.controller');
const { loginRequired } = require('./../controller/auth.controller')
const router = express.Router();

router.get('/settings', loginRequired, settings);

router.post('/saveShift', loginRequired, saveShift);

module.exports = router;