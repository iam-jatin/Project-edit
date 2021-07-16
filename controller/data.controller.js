const { con } = require('./../config/db');

exports.dailyData = async (req, res) => {

    await con.query('SELECT * FROM job_data').then(result => {
        console.log(result[0]);
        console.log(result.length);
        result.forEach(async (el) => {
            await con.query('SELECT * FROM daily_data WHERE Organisation=? AND Machine_No=? AND inserted_time=?', [el.Organisation, el.Machine_No, el.Recorded_Time]).then(async (d) => {
                if (d.length > 0) {
                    await con.query('UPDATE daily_data SET Job_Count=? WHERE id=? AND Organisation=? AND Machine_No=? AND inserted_time=?', [d.id, d.Job_Count + 1, d.Organisation, d.Machine_No, d.inserted_time]).then(r => {

                    }).catch(err => {
                        console.log(err);
                    })
                }
                else {
                    await con.query(' INSERT INTO `daily_data`(`Organisation`,`Machine_No`,`Device_ID`,`Job_Count`,`Date`) VALUES(?,?,?,?,?) ', [el.Organisation, el.Machine_No, el.Device_ID, el.Job_Count, el.Recorded_Time]).then(r => {

                    }).catch(err => {
                        console.log(err);
                    })
                }
            }).catch(err => {
                console.log(err);
            })
        });



    }).catch(err => {
        console.log(err);
    })

    res.status(200).json({
        status: "ok"
    })
}