const { con } = require('./../config/db');

exports.login = async (req, res) => {
    const user_id = req.body.user_id;
    const password = req.body.password;

    await con.query('SELECT * FROM users WHERE User_ID=?', [user_id]).then(async (result) => {
        if (result.length === 1) {
            if (password === result[0].Password) {

                req.session.user_id = result[0].User_ID;
                req.session.organization = result[0].Organisation;
                // console.log(req.session.user_id);
                await con.query('SELECT * FROM organisation_id_table').then(data => {
                    // console.log(data);
                    req.session.organisationName = data[0].Organisation_Name;
                }).catch(err => {
                    console.log(err);
                })
                req.session.name = result[0].Name;

                res.redirect('/dashboard');

            } else {
                req.flash('error', 'Wrong password!');
                res.redirect('/auth/login');
            }
        }
        else {
            req.flash('error', 'Wrong username or email');
            res.redirect('/auth/login');
        }
    }).catch(err => {
        console.log(err);
    })
}

exports.alreadyLoggedIn = (req, res, next) => {
    if (req.session.user_id) {
        res.redirect('/dashboard');
        next();
    } else {
        next();
    }
}

exports.loginRequired = (req, res, next) => {
    if (req.session.user_id) {
        // s = req.session;
        next();
    } else {

        res.redirect('/auth/login');
    }
}