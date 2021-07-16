const { con } = require('./../config/db');
const { findRunningShift, findShift } = require('./shift.controller')
exports.dashboardData = async (req, res) => {
    const organization = req.session.organization;
    // const organization = 7;

    let machineData = [];

    const fetchMachineQuery = `SELECT id,Organisation,Machine_ID,Machine_Name,Machine_Type,Device_ID FROM machine_id_table WHERE Organisation=? `;

    await con.query(fetchMachineQuery, [organization]).then(async (result) => {
        // console.log(result.length)

        for (let i = 0; i < result.length; i++) {

            let obj = {
                id: result[i].id,
                Organisation: result[i].Organisation,
                Machine_ID: result[i].Machine_ID,
                Machine_Name: result[i].Machine_Name,
                Machine_Type: result[i].Machine_Type,
                Device_ID: result[i].Device_ID,
                production: 0,
                rejection: 0,
                total: 0,
            }

            let production = 0;
            let rejection = 0;
            let total = 0;

            const countQuery = ' SELECT SUM(Job_Count) as production FROM job_data WHERE Organisation=? AND Machine_No=? AND Device_ID=? ';
            await con.query(countQuery, [result[i].Organisation, result[i].Machine_ID, result[i].Device_ID]).then(data => {
                if (data.length > 0 && data[0].production != null) {
                    production = data[0].production;
                }
            }).catch(err => {
                if (err) {
                    console.log(err);
                }
            })

            const rejectQuery = ' SELECT SUM(Rejection_Count) as rejection FROM rejection_data WHERE Organisation=? AND Machine_No=? AND Device_ID=? ';
            await con.query(rejectQuery, [result[i].Organisation, result[i].Machine_ID, result[i].Device_ID]).then(data => {
                if (data.length > 0 && data[0].rejection != null) {
                    rejection = data[0].rejection;
                }


            }).catch(err => {
                if (err) {
                    console.log(err);
                }
            })

            total = production + rejection

            obj.production = production;
            obj.rejection = rejection;
            obj.total = total;

            machineData.push(obj);
        }


        let runningShift = 0;
        runningShift = await findRunningShift(req);
        const shift = await findShift(req);
        res.render('dashboard', {
            title: 'Dashboard',
            machineData: machineData,
            organisation: req.session.organisationName,
            runningShift: runningShift,
            shift: shift
        })

    }).catch(err => {
        if (err) {
            console.log(err);
        }
    });
}

exports.addMachine = async (req, res) => {


    const organisation = req.session.organization;
    const Machine_ID = req.body.machineId;
    const Machine_Name = req.body.machineName;
    const Machine_Type = req.body.machineType;
    const Device_ID = req.body.deviceId;

    const date = new Date();
    const created_at = date;
    const updated_at = date;


    const insertQuery = ' INSERT INTO `machine_id_table`(`Organisation`,`Machine_ID`,`Machine_Name`,`Machine_Type`,`Device_ID`,`created_at`,`updated_at`) VALUES(?,?,?,?,?,?,?)';

    await con.query(insertQuery, [organisation, Machine_ID, Machine_Name, Machine_Type, Device_ID, created_at, updated_at]).then(result => {

    }).catch(err => {
        console.log(err);
    })

    res.redirect('/dashboard');

}

exports.deleteMachine = async (req, res) => {

    await con.query('DELETE FROM `machine_id_table` WHERE id=?', [req.body.id]).then(result => {

    }).catch(err => {
        console.log(err);
    });
    res.redirect('/dashboard');
}

exports.updateMachine = async (req, res) => {


    const id = req.body.id;
    const Machine_ID = req.body.machineId;
    const Machine_Name = req.body.machineName;
    const Machine_Type = req.body.machineType;
    const Device_ID = req.body.deviceId;

    const date = new Date();

    const updated_at = date;


    const updateQuery = ' UPDATE `machine_id_table` SET Machine_ID=? , Machine_Name=? , Machine_Type=?,Device_ID=? ,updated_at=? WHERE ID=?';

    await con.query(updateQuery, [Machine_ID, Machine_Name, Machine_Type, Device_ID, updated_at, id]).then(result => {

    }).catch(err => {
        console.log(err);
    })

    res.redirect('/dashboard');

}

exports.allMachine = async (organisation) => {

    let data = [];

    await con.query('SELECT * FROM machine_id_table WHERE Organisation=?', [organisation]).then(result => {
        data = result;
    }).catch(err => {
        console.log(err);
    })

    return data;

}