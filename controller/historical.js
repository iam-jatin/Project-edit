const { findRunningShift, findShift } = require('./shift.controller');
const { todayCountData, monthCountData, yearCountData, shiftCountData } = require('./liveAnalysis.controller');
const { historicalData, customDayData, totalYear, getShiftWiseData } = require('./historicalAnalysis.controller');
const { allMachine } = require('./dashboard.controller');
exports.historical = async (req, res) => {

    const machine_no = req.params.Machine_No;
    const organisation = req.session.organization;
    const user_id = req.session.user_id;

    let runningShift = 0;
    runningShift = await findRunningShift(req);

    const todayCount = await todayCountData(machine_no, organisation);
    const monthCount = await monthCountData(machine_no, organisation);
    const yearCount = await yearCountData(machine_no, organisation);
    const shiftCount = await shiftCountData(machine_no, organisation, runningShift, user_id);
    const machine = await allMachine(organisation);
    const year = await totalYear(machine_no, organisation);
    const shift = await findShift(req);
    let countData = [];
    countData.push(shiftCount);
    countData.push(todayCount);
    countData.push(monthCount);
    countData.push(yearCount);

    res.render('historical', {
        title: 'Historical',
        organisation: req.session.organisationName,
        Machine_No: machine_no,
        runningShift: runningShift,
        countData: countData,
        machine: machine,
        year: year,
        shift: shift
    })
}

exports.getHistoricalData = async (req, res) => {

    const machine_no = req.params.Machine_No;
    const month = req.params.month;
    const year = req.params.year;
    const day = req.params.day;
    const organisation = req.session.organization;
    const user_id = req.session.user_id;

    let runningShift = 0;
    runningShift = await findRunningShift(req);

    const todayCount = await todayCountData(machine_no, organisation);
    const monthCount = await monthCountData(machine_no, organisation);
    const yearCount = await yearCountData(machine_no, organisation);
    const shiftCount = await shiftCountData(machine_no, organisation, runningShift, user_id);

    const monthlyData = await historicalData(machine_no, organisation, month, year);
    const hourlyData = await customDayData(machine_no, organisation, day, month, year);


    let countData = [];
    countData.push(shiftCount);
    countData.push(todayCount);
    countData.push(monthCount);
    countData.push(yearCount);

    res.status(200).json({
        status: 'success',
        countData: countData,
        monthlyData: monthlyData,
        hourlyData: hourlyData
    })

}

exports.customDayData = async (req, res) => {
    const machine_no = req.params.Machine_No;
    const shift = req.params.shiftno;
    const day = req.params.day;
    const month = req.params.month;
    const year = req.params.year;
    const organisation = req.session.organization;

    let hourlyData = [];
    if (shift == 0) {
        hourlyData = await customDayData(machine_no, organisation, day, month, year);
    } else {
        hourlyData = await getShiftWiseData(machine_no, organisation, shift, req.session.user_id, day, month, year);
    }

    res.status(200).json({
        status: 'success',
        hourlyData: hourlyData
    })
}