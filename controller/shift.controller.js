
const { con } = require('./../config/db');

exports.findShift = async (req) => {
    let shift = [];
    await con.query('SELECT * FROM shift WHERE user_id=?', [req.session.user_id]).then(data => {
        shift = data
    }).catch(err => {
        console.log(err);
    })
    return shift;
}

exports.totalShift = async (req) => {
    let shift = [];
    await con.query('SELECT * FROM shift WHERE user_id=?', [req.session.user_id]).then(data => {

        if (data.length > 0) {
            let d = []
            for (let i = 0; i < data.length; i++) {
                d = data[i];

                let start = data[i].start.split(":");
                let startTime = start[0] + ":" + start[1];

                let finish = data[i].finish.split(":");
                let finishTime = finish[0] + ":" + finish[1];

                d.start = startTime;
                d.finish = finishTime;
                shift.push(d);
            }
        }

    }).catch(err => {
        console.log(err);
    })
    return shift;
}

exports.findRunningShift = async (req) => {
    const date = new Date();
    // console.log(date.getHours());
    let runningShift = 0;
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    await con.query('SELECT * FROM shift WHERE user_id=?', [req.session.user_id]).then(data => {

        if (data.length > 0) {

            for (let i = 0; i < data.length; i++) {

                let startData = data[i].start.split(":");

                let finishData = data[i].finish.split(":");

                let a = new Date(year, month - 1, day, startData[0], startData[1], startData[2]);
                let b = new Date(year, month - 1, day, finishData[0], finishData[1], finishData[2]);

                if (date.getTime() < a.getTime() && date.getTime() < b.getTime() && b.getTime() < a.getTime()) {
                    runningShift = data[i].shift_no;
                }
                else {

                    if (b.getTime() < a.getTime()) {
                        let cDay = day + 1;
                        b = new Date(year, month - 1, cDay, finishData[0], finishData[1], finishData[2]);
                    }

                    if (a < date && b > date) {
                        runningShift = data[i].shift_no;
                    }
                }

                // console.log(a, b);

            }
        }

    }).catch(err => {
        console.log(err);
    })

    return runningShift;
}
