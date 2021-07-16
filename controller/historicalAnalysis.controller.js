const { con } = require('./../config/db');

exports.historicalData = async (machine_no, organisation, month, year) => {

    let obj = {
        okCount: {},
        rejectCount: {},
        month: month
    }
    let okCount = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0,
        24: 0,
        25: 0,
        26: 0,
        27: 0,
        28: 0,
        29: 0,
        30: 0,
        31: 0
    }

    let rejectCount = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0,
        24: 0,
        25: 0,
        26: 0,
        27: 0,
        28: 0,
        29: 0,
        30: 0,
        31: 0
    }

    const monthlyOkQuery = 'SELECT DATE(Recorded_Time) as date FROM job_data WHERE Organisation=? AND Machine_No=? AND MONTH(Recorded_Time)=? AND YEAR(Recorded_Time)=?';
    await con.query(monthlyOkQuery, [organisation, machine_no, month, year]).then(result => {

        result.forEach(row => {
            okCount[`${row.date.getDate()}`] += 1;
        });
    }).catch(err => {
        console.log(err);
    })

    const monthlyRejectQuery = 'SELECT DATE(Recorded_Time) as date FROM rejection_data WHERE Organisation=? AND Machine_No=? AND MONTH(Recorded_Time)=? AND YEAR(Recorded_Time)=?';
    await con.query(monthlyRejectQuery, [organisation, machine_no, month, year]).then(result => {

        result.forEach(row => {
            rejectCount[`${row.date.getDate()}`] += 1;
        });
    }).catch(err => {
        console.log(err);
    })

    obj.okCount = okCount;
    obj.rejectCount = rejectCount;

    return obj;
}

exports.customDayData = async (machine_no, organisation, day, month, year) => {

    let obj = {
        okData: {},
        rejectData: {},
        hour: [],
    }

    for (i = 0; i <= 23; i++) {
        obj.hour.push(i);
    }

    let okData = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0
    }

    let rejectData = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0
    }

    const okDataQuery = 'SELECT HOUR(Recorded_Time) as hour FROM job_data WHERE Organisation=? AND Machine_No=? AND DAY(Recorded_Time)=? AND MONTH(Recorded_Time)=? AND YEAR(Recorded_Time)=? ';

    await con.query(okDataQuery, [organisation, machine_no, day, month, year]).then(result => {
        result.forEach(row => {
            okData[`${row.hour}`] += 1;
        });
    }).catch(err => {
        console.log(err);
    })

    const rejectDataQuery = 'SELECT HOUR(Recorded_Time) as hour FROM rejection_data WHERE Organisation=? AND Machine_No=? AND DAY(Recorded_Time)=? AND MONTH(Recorded_Time)=? AND YEAR(Recorded_Time)=? ';
    await con.query(rejectDataQuery, [organisation, machine_no, day, month, year]).then(result => {
        result.forEach(row => {
            rejectData[`${row.hour}`] += 1;
        });
    }).catch(err => {
        console.log(err);
    })
    // console.log(okData);

    obj.okData = okData;
    obj.rejectData = rejectData;

    return obj;
}


exports.totalYear = async (machine_no, organisation) => {
    let data = [];
    const query = 'SELECT YEAR(Recorded_Time) as year from job_data WHERE Organisation=? AND Machine_No=? GROUP BY YEAR(Recorded_Time) ORDER BY id DESC ';
    await con.query(query, [organisation, machine_no]).then(result => {
        // console.log(result);
        data = result;
    }).catch(err => {
        console.log(err);
    })
    return data;
}


exports.getShiftWiseData = async (machine_no, organisation, ruuningShift, user_id, day, month, year) => {
    let start;
    let finish;
    let data = {};
    let rejectionData = {};
    let hours = [];

    let customDate = new Date(year, month - 1, day, 0, 0, 0);
    const date = new Date();
    let obj = {
        okData: {},
        rejectData: {},
        hour: []
    }
    if (ruuningShift != 0) {
        await con.query('SELECT * FROM `shift` WHERE `user_id`=? AND shift_no=?', [user_id, ruuningShift]).then(result => {
            start = result[0].start;
            finish = result[0].finish;
        }).catch(err => {
            console.log(err);
        })
        let startData = start.split(":");
        let finishData = finish.split(":");
        let a = new Date(year, month - 1, day, startData[0], startData[1], startData[2]);
        let b = new Date(year, month - 1, day, finishData[0], finishData[1], finishData[2]);

        if (b.getTime() < a.getTime() && date.getTime() < b.getTime()) {
            let cDay = day - 1;
            a = new Date(year, month - 1, cDay, startData[0], startData[1], startData[2]);

        } else if (b.getTime() < a.getTime() && date.getTime() > b.getTime()) {
            let cDay = day + 1;
            b = new Date(year, month - 1, cDay, finishData[0], finishData[1], finishData[2]);
        }

        if (b.getHours() <= a.getHours()) {

            for (let i = a.getHours(); i <= 23; i++) {
                hours.push(i);
            }
            for (let i = 0; i <= b.getHours(); i++) {
                hours.push(i);
            }
        }
        else {

            for (let i = parseInt(startData[0]); i <= parseInt(finishData[0]); i++) {
                hours.push(i);
            }
        }

        const query = 'SELECT HOUR(Recorded_Time) as hour FROM job_data WHERE Organisation=? AND Machine_No=? AND Recorded_Time BETWEEN ? AND ?'

        await con.query(query, [organisation, machine_no, a, b]).then(result => {
            // console.log(result);
            result.forEach(row => {
                if (!data[`${row.hour}`]) {
                    data[`${row.hour}`] = 0;
                }
                data[`${row.hour}`] = data[`${row.hour}`] + 1;
            })
        }).catch(err => {
            console.log(err);
        })

        const query1 = 'SELECT HOUR(Recorded_Time) as hour FROM rejection_data WHERE Organisation=? AND Machine_No=? AND Recorded_Time BETWEEN ? AND ?'

        await con.query(query1, [organisation, machine_no, start, finish]).then(result => {
            result.forEach(row => {
                if (!rejectionData[`${row.hour}`]) {
                    rejectionData[`${row.hour}`] = 0;
                }
                rejectionData[`${row.hour}`] = rejectionData[`${row.hour}`] + 1;
            })
        }).catch(err => {
            console.log(err);
        })

    }

    obj.okData = data;
    obj.rejectData = rejectionData;
    obj.hour = hours;
    return obj;
}