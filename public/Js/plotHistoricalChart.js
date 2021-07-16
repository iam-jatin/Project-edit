
const getData = () => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            // console.log(data);

            if (firstTime) {
                monthlyChart(data.monthlyData);
                chdonut1(data.countData[0]);
                chdonut2(data.countData[1]);
                chdonut3(data.countData[2]);
                chdonut4(data.countData[3]);
                firstTime = false;
            } else {
                updateMonthlyChart(data.monthlyData);
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
    const url = '/getHistoricalData/' + Machine_No + '/' + month + '/' + year + '/' + day;
    http.open("GET", url, true);
    http.send();
}

getData();

setInterval(() => {
    getData();
}, 30000)

const changeGraph = () => {
    month = document.getElementById("month").value;
    year = document.getElementById("year").value;
    getData();
}