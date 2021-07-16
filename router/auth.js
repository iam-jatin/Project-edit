const express = require('express');
const { login, alreadyLoggedIn } = require('./../controller/auth.controller');
const router = express.Router();

router.get('/login', alreadyLoggedIn, (req, res) => {
    res.render('login', { title: 'Login', isLoggedIn: false });
});
router.post('/login', alreadyLoggedIn, login);

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});



module.exports = router;