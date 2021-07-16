
const shiftAvailable = () => {

    if (i == 0) {
        document.getElementById("shiftAvailable").style = "width:900px";
    }
    else {
        document.getElementById("shiftAvailable").style = "width:900px;display:none";
    }
}


shiftAvailable();

const changeBtn = () => {
    document.getElementById("addShiftBtn").innerHTML = "Save Change";
}

const addShift = () => {
    const shiftBody = document.getElementById("shiftBody");

    let text = shiftBody.innerHTML;

    if (i < 3) {
        i++;
        text += '<tr id=row_' + i + '><th>' + i + '</th><td><label class="mr-2"></label><input type="time" id="start_' + i + '" name="start_' + i + '"></td > <td><label  class="mr-2"> </label><input type="time" id="finish_' + i + '" name="finish_' + i + '"></td></tr>'

        shiftBody.innerHTML = text;
        document.getElementById("noOfShift").innerHTML = i;
        document.getElementById("row").value = i;
        changeBtn();
    }
    shiftAvailable();
}

const removeShift = () => {

    if (i > 0) {
        if (document.getElementById("row_" + i)) {
            document.getElementById("row_" + i).remove();
            i--;
            document.getElementById("noOfShift").innerHTML = i;
            document.getElementById("row").value = i;
        }
    }
    shiftAvailable();
    changeBtn();
}

const validateShift = () => {

    const row = parseInt(document.getElementById("row").value);


    let start1;
    let finish1;

    let startTime1;
    let finishTime1;

    if (row >= 1) {
        start1 = document.getElementById("start_1").value;
        finish1 = document.getElementById("finish_1").value;
        startTime1 = new Date('2021-06-11T' + start1 + 'Z');
        finishTime1 = new Date('2021-06-11T' + finish1 + 'Z');
    }

    let start2;
    let finish2;
    let startTime2;
    let finishTime2;
    if (row >= 2) {
        start2 = document.getElementById("start_2").value;
        finish2 = document.getElementById("finish_2").value;
        startTime2 = new Date('2021-06-11T' + start2 + 'Z');
        finishTime2 = new Date('2021-06-11T' + finish2 + 'Z');

    }

    let start3;
    let finish3;
    let startTime3;
    let finishTime3;
    if (row >= 3) {
        start3 = document.getElementById("start_3").value;
        finish3 = document.getElementById("finish_3").value;
        startTime3 = new Date('2021-06-11T' + start3 + 'Z');
        finishTime3 = new Date('2021-06-11T' + finish3 + 'Z');
    }



    let flag = true;


    if (row >= 2) {
        if (startTime2.getTime() > startTime1.getTime() && startTime2.getTime() < finishTime1.getTime()) {
            flag = false;
        }

        if (finishTime2.getTime() > startTime1.getTime() && finishTime2.getTime() < finishTime1.getTime()) {
            flag = false;
        }
    }

    if (row >= 3) {
        if (startTime3.getTime() > startTime2.getTime() && startTime3.getTime() < finishTime2.getTime()) {
            flag = false;
        }

        if (finishTime3.getTime() > startTime2.getTime() && finishTime3.getTime() < finishTime2.getTime()) {
            flag = false;
        }

        if (startTime3.getTime() > startTime1.getTime() && startTime3.getTime() < finishTime1.getTime()) {
            flag = false;
        }

        if (finishTime3.getTime() > startTime1.getTime() && finishTime3.getTime() < finishTime1.getTime()) {
            flag = false;
        }

    }


    if (!flag) {
        alert("Please check Shift may be overlape");
    }

    return flag;

}

