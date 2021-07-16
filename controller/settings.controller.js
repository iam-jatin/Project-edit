const { con } = require('./../config/db');
const { findRunningShift, totalShift } = require('./shift.controller');

exports.settings = async (req, res) => {

    let shift = [];
    let runningShift = 0;


    shift = await totalShift(req);
    runningShift = await findRunningShift(req);
    res.render('settings', {
        title: 'Settings',
        organisation: req.session.organisationName,
        shift: shift,
        runningShift: runningShift
    });
}


exports.saveShift = async (req, res) => {
    const user_id = req.session.user_id;
    

    let row = parseInt(req.body.row);
    let shiftData = [];
    await con.query('SELECT * FROM `shift` WHERE user_id=?', [user_id]).then(data => {
        shiftData = data;
    });



    if (shiftData.length > row) {
        for (let i = row + 1; i <= shiftData.length; i++) {
            await con.query('DELETE FROM `shift` WHERE shift_no=?', [i]).then(d => {

            }).catch(err => {
                console.log(err);
            })
        }

        await con.query('SELECT * FROM `shift` WHERE user_id=?', [user_id]).then(data => {
            shiftData = data;
        });
    }

    for (let i = 0; i < shiftData.length; i++) {
        const start = req.body['start_' + (i + 1)];
        const finish = req.body['finish_' + (i + 1)];

        await con.query('UPDATE `shift` SET start=? , finish=? WHERE user_id=? AND shift_no=?', [start, finish, user_id, i + 1]).then(result => {

        }).catch(err => {
            console.log(err);
        })
    }

    for (let i = shiftData.length; i < row; i++) {
        const start = req.body['start_' + (i + 1)];
        const finish = req.body['finish_' + (i + 1)];

        await con.query('INSERT INTO `shift` (`user_id`,`shift_no`,`start`,`finish`) VALUES(?,?,?,?)', [user_id, i + 1, start, finish]).then(result => {

        }).catch(err => {
            console.log(err);
        })
    }

    res.redirect('/settings')
}