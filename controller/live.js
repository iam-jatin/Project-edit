const { findRunningShift, totalShift, findShift } = require('./shift.controller');
const { todayCountData, monthCountData, yearCountData, shiftData, shiftCountData, a1a2, hourlyData } = require('./liveAnalysis.controller');
const { addMachine, allMachine } = require('./dashboard.controller');
exports.livePage = async (req, res) => {

    const machine_no = req.params.Machine_No;
    const organisation = req.session.organization;
    const user_id = req.session.user_id;
    let runningShift = 0;
    runningShift = await findRunningShift(req);

    const todayCount = await todayCountData(machine_no, organisation);
    const monthCount = await monthCountData(machine_no, organisation);
    const yearCount = await yearCountData(machine_no, organisation);
    const shiftCount = await shiftCountData(machine_no, organisation, runningShift, user_id);
    const shift = await findShift(req);
    // console.log(shift);
    const machine = await allMachine(organisation);
    // const noOfShift = await totalShift(req);

    let countData = [];
    countData.push(shiftCount);
    countData.push(todayCount);
    countData.push(monthCount);
    countData.push(yearCount);

    res.render('live', {
        title: 'Live',
        Machine_No: machine_no,
        organisation: req.session.organisationName,
        runningShift: runningShift,
        countData: countData,
        shift: shift,
        machine: machine
    })
}

exports.liveData = async (req, res) => {
    const machine_no = req.params.Machine_No;
    const organisation = req.session.organization;
    const user_id = req.session.user_id;

    const runningShift = req.params.runShift;

    const todayCount = await todayCountData(machine_no, organisation);
    const monthCount = await monthCountData(machine_no, organisation);
    const yearCount = await yearCountData(machine_no, organisation);
    const shiftCount = await shiftCountData(machine_no, organisation, runningShift, user_id);

    const shift = await findShift(req);
    let currentShiftData = [];
    if (runningShift != 0) {
        currentShiftData = await shiftData(machine_no, organisation, runningShift, user_id);
    } else {
        currentShiftData = await hourlyData(machine_no, organisation, user_id);
    }

    const a1a2Data = await a1a2(machine_no, organisation);

    // console.log(runningShift);
    let countData = [];
    countData.push(shiftCount);
    countData.push(todayCount);
    countData.push(monthCount);
    countData.push(yearCount);
    res.status(200).json({
        status: 'success',
        countData: countData,
        shift: shift,
        currentShiftData: currentShiftData,
        a1a2Data: a1a2Data
    })
}