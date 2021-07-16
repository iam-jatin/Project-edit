const { con } = require("../config/db");




exports.todayCountData = async (Machine_No, organisation) => {

    let obj = {
        count: 0,
        okCount: 0,
        rejectionCount: 0,
        title: "Today's"
    }
    const todayCountQuery = 'SELECT SUM(Job_Count) as sum FROM job_data WHERE Organisation=? AND Machine_No=? AND DATE(Recorded_Time)=CURRENT_DATE() ';
    let todayOkCount = 0;

    await con.query(todayCountQuery, [organisation, Machine_No]).then(result => {

        if (result[0].sum == null) {
            todayOkCount = 0;
        }
        else {
            todayOkCount = result[0].sum;
        }

    }).catch(err => {
        console.log(err);
    })


    const rejectionTodayQuery = 'SELECT SUM(Rejection_Count) as sum FROM rejection_data WHERE Organisation=? AND Machine_No=? AND DATE(Recorded_Time)=CURRENT_DATE() ';
    let todayRejectionCount = 0;
    await con.query(rejectionTodayQuery, [organisation, Machine_No]).then(result => {

        if (result[0].sum == null) {
            todayRejectionCount = 0;
        }
        else {
            todayRejectionCount = result[0].sum;
        }

    }).catch(err => {
        console.log(err);
    })

    let todayCount = todayOkCount + todayRejectionCount;
    obj.count = todayCount;
    obj.okCount = todayOkCount;
    obj.rejectionCount = todayRejectionCount;



    // const totalCountQuery = 'SELECT SUM(Job_Count) as sum FROM job_data WHERE Organisation=? AND Machine_No=? ';
    // let totalCount = 0;
    // await con.query(totalCountQuery, [organisation, Machine_No]).then(result => {

    //     if (result[0].sum == null) {
    //         totalCount = 0;
    //     }
    //     else {
    //         totalCount = result[0].sum;
    //     }

    // }).catch(err => {
    //     console.log(err);
    // })


    // const totalRejectionCountQuery = 'SELECT SUM(Rejection_Count) as sum FROM rejection_data WHERE Organisation=? AND Machine_No=?  ';
    // let totalRejectionCount = 0;
    // await con.query(totalRejectionCountQuery, [organisation, Machine_No]).then(result => {

    //     if (result[0].sum == null) {
    //         totalRejectionCount = 0;
    //     }
    //     else {
    //         totalRejectionCount = result[0].sum;
    //     }

    // }).catch(err => {
    //     console.log(err);
    // })


    return obj;
}

exports.monthCountData = async (Machine_No, organisation) => {

    let obj = {
        count: 0,
        okCount: 0,
        rejectionCount: 0,
        title: 'Current Month'
    }

    const date = new Date();
    const month = date.getMonth() + 1;

    const monthCountQuery = 'SELECT SUM(Job_Count) as sum FROM job_data WHERE Organisation=? AND Machine_No=? AND MONTH(Recorded_Time)=? ';
    let monthOkCount = 0;

    await con.query(monthCountQuery, [organisation, Machine_No, month]).then(result => {

        if (result[0].sum == null) {
            monthOkCount = 0;
        }
        else {
            monthOkCount = result[0].sum;
        }

    }).catch(err => {
        console.log(err);
    })


    const rejectionMonthQuery = 'SELECT SUM(Rejection_Count) as sum FROM rejection_data WHERE Organisation=? AND Machine_No=? AND MONTH(Recorded_Time)=? ';
    let monthRejectionCount = 0;
    await con.query(rejectionMonthQuery, [organisation, Machine_No, month]).then(result => {

        if (result[0].sum == null) {
            monthRejectionCount = 0;
        }
        else {
            monthRejectionCount = result[0].sum;
        }

    }).catch(err => {
        console.log(err);
    })

    let monthCount = monthOkCount + monthRejectionCount;
    obj.count = monthCount;
    obj.okCount = monthOkCount;
    obj.rejectionCount = monthRejectionCount;


    return obj;
}

exports.yearCountData = async (Machine_No, organisation) => {

    let obj = {
        count: 0,
        okCount: 0,
        rejectionCount: 0,
        title: 'Current Year'
    }

    const date = new Date();
    const year = date.getFullYear();

    const yearCountQuery = 'SELECT SUM(Job_Count) as sum FROM job_data WHERE Organisation=? AND Machine_No=? AND YEAR(Recorded_Time)=? ';
    let yearOkCount = 0;

    await con.query(yearCountQuery, [organisation, Machine_No, year]).then(result => {

        if (result[0].sum == null) {
            yearOkCount = 0;
        }
        else {
            yearOkCount = result[0].sum;
        }

    }).catch(err => {
        console.log(err);
    })


    const rejectionYearQuery = 'SELECT SUM(Rejection_Count) as sum FROM rejection_data WHERE Organisation=? AND Machine_No=? AND YEAR(Recorded_Time)=?  ';
    let yearRejectionCount = 0;
    await con.query(rejectionYearQuery, [organisation, Machine_No, year]).then(result => {

        if (result[0].sum == null) {
            yearRejectionCount = 0;
        }
        else {
            yearRejectionCount = result[0].sum;
        }

    }).catch(err => {
        console.log(err);
    })

    let yearCount = yearOkCount + yearRejectionCount;
    obj.count = yearCount;
    obj.okCount = yearOkCount;
    obj.rejectionCount = yearRejectionCount;

    return obj;
}

exports.shiftCountData = async (Machine_No, organisation, runningShift, user_id) => {

    let obj = {
        count: 0,
        okCount: 0,
        rejectionCount: 0,
        title: 'Current Shift'
    }

    let start;
    let finish;
    let shiftOkCount = 0;
    let shiftRejectionCount = 0;

    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (runningShift != 0) {
        await con.query('SELECT * FROM `shift` WHERE `user_id`=? AND shift_no=?', [user_id, runningShift]).then(result => {
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


        const shiftCountQuery = 'SELECT SUM(Job_Count) as sum FROM job_data WHERE Organisation=? AND Machine_No=? AND DATE(Recorded_Time)=CURRENT_DATE() AND Recorded_Time BETWEEN ? AND ?';

        await con.query(shiftCountQuery, [organisation, Machine_No, a, b]).then(result => {
            if (result[0].sum == null) {
                shiftOkCount = 0;
            }
            else {
                shiftOkCount = result[0].sum;
            }
        }).catch(err => {
            console.log(err);
        })


        const shiftRejectionQuery = 'SELECT SUM(Rejection_Count) as sum FROM rejection_data WHERE Organisation=? AND Machine_No=? AND DATE(Recorded_Time)=CURRENT_DATE() AND Recorded_Time BETWEEN ? AND ?';

        await con.query(shiftRejectionQuery, [organisation, Machine_No, a, b]).then(result => {
            if (result[0].sum == null) {
                shiftRejectionCount = 0;
            }
            else {
                shiftRejectionCount = result[0].sum;
            }
        }).catch(err => {
            console.log(err);
        })
    }

    obj.count = shiftOkCount + shiftRejectionCount;
    obj.okCount = shiftOkCount;
    obj.rejectionCount = shiftRejectionCount;
    return obj;
}

exports.shiftData = async (machine_no, organisation, ruuningShift, user_id) => {
    let start;
    let finish;
    let data = {};
    let rejectionData = {};
    let hours = [];

    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();



    let obj = {
        data: {},
        rejectionData: {},
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

        await con.query(query1, [organisation, machine_no, a, b]).then(result => {
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

    obj.data = data;
    obj.rejectionData = rejectionData;
    obj.hour = hours;
    return obj
}

exports.a1a2 = async (machine_no, organisation) => {
    let a1 = [];
    let a2 = [];
    let obj = {
        a1: [],
        a2: []
    }
    const date = new Date();
    const hour = date.getHours();
    const query = 'SELECT A1_avg, A2_avg FROM ok_avg WHERE Organisation=? AND Machine_No=? AND DATE(Recorded_TIme)=CURRENT_DATE() AND HOUR(Recorded_Time)=?';

    await con.query(query, [organisation, machine_no, hour]).then(result => {

        result.forEach(row => {
            a1.push(row.A1_avg);
            a2.push(row.A2_avg);
        })
    }).catch(err => {
        console.log(err);
    })
    obj.a1 = a1;
    obj.a2 = a2;
    return obj;
}


exports.hourlyData = async (machine_no, organisation, user_id) => {
    let obj = {
        data: {},
        rejectionData: {},
        hour: []
    }
    let hour = [];
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

    let rejctionData = {
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



    const okQuery = 'SELECT HOUR(Recorded_Time) as hour FROM job_data WHERE Organisation=? AND Machine_No=? AND DATE(Recorded_Time)=CURRENT_DATE()';
    await con.query(okQuery, [organisation, machine_no]).then(result => {

        result.forEach(row => {
            okData[`${row.hour}`] += 1;
        });
    }).catch(err => {
        console.log(err);
    })

    const rejectionQuery = 'SELECT HOUR(Recorded_Time) as hour FROM rejection_data WHERE Organisation=? AND Machine_No=? AND DATE(Recorded_Time)=CURRENT_DATE()';
    await con.query(rejectionQuery, [organisation, machine_no]).then(result => {
        result.forEach(row => {
            rejectionData[`${row.hour}`] += 1;
        });
    }).catch(err => {
        console.log(err);
    })

    for (let i = 0; i <= 23; i++) {
        hour.push(i);
    }
    obj.data = okData;
    obj.rejectionData = rejctionData;
    obj.hour = hour;

    return obj;
}