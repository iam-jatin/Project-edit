const getData = () => {

    const http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            // console.log(data);

            if (firstTime) {
                plotLineChart(data.currentShiftData);
                a1(data.a1a2Data.a1);
                a2(data.a1a2Data.a2);
                chdonut1(data.countData[0]);
                chdonut2(data.countData[1]);
                chdonut3(data.countData[2]);
                chdonut4(data.countData[3]);
                firstTime = false;
            } else {

                updateLineChart(data.currentShiftData);
                updateA1(data.a1a2Data.a1);
                updateA2(data.a1a2Data.a2);
                updateChDonut1(data.countData[0]);
                updateChDonut2(data.countData[1]);
                updateChDonut3(data.countData[2]);
                updateChDonut4(data.countData[3]);
            }
            let i = 0;
            data.countData.forEach(el => {
                i++;
                document.getElementById("count_" + i).innerHTML = el.count;
                document.getElementById("rejection_" + i).innerHTML = el.rejectionCount;
                document.getElementById("ok_" + i).innerHTML = el.okCount;
            });
        }
    };
    http.open("GET", '/getLiveData/' + Machine_No + '/' + runShift, true);
    http.send();
}

getData();

const getShiftData = (shift) => {
    runShift = shift;
    getData();
}

setInterval(() => {
    getData();
}, 30000);