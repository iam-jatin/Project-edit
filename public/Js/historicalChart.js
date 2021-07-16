
var numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


const monthlyChart = (data) => {
    const okCountData = data.okCount;
    const rejectCountData = data.rejectCount;
    const month = data.month;

    const dates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
    let okCount = [];
    let rejectCount = [];
    for (let i = 1; i <= 31; i++) {
        okCount.push(okCountData[`${i}`]);
        rejectCount.push(rejectCountData[`${i}`]);
    }
    if (month != 2) {
        dates.push('29');
        dates.push('30');
    }
    if (month % 2 != 0) {
        dates.push('31');
    }




    var bar_ctx = document.getElementById('bar-chart');

    if (bar_ctx) {

        bar_chart = new Chart(bar_ctx, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Ok Count',
                        data: okCount,
                        backgroundColor: "#caf270",
                        hoverBackgroundColor: "#caf270",
                        hoverBorderWidth: 2,
                        hoverBorderColor: 'black',
                    },
                    {
                        label: 'Rejection Count',
                        data: rejectCount,
                        backgroundColor: "#45c490",
                        hoverBackgroundColor: "#45c490",
                        hoverBorderWidth: 2,
                        hoverBorderColor: 'black'
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'label',
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: { display: false },
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            callback: function (value) {
                                return numberWithCommas(value);
                            },
                        },
                    }],
                }, // scales
                legend: { display: true },
                onClick: barClicked
            } // options
        },

        );
    }
}

const updateMonthlyChart = (data) => {
    const okCountData = data.okCount;
    const rejectCountData = data.rejectCount;
    const month = data.month;

    const dates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
    let okCount = [];
    let rejectCount = [];
    for (let i = 1; i <= 31; i++) {
        okCount.push(okCountData[`${i}`]);
        rejectCount.push(rejectCountData[`${i}`]);
    }
    if (month != 2) {
        dates.push('29');
        dates.push('30');
    }
    if (month % 2 != 0) {
        dates.push('31');
    }

    bar_chart.data.labels = dates;
    bar_chart.data.datasets[0].data = okCount;
    bar_chart.data.datasets[1].data = rejectCount;
    bar_chart.update();

}
let flag = true;
let index = -1;
const getGraphData = () => {


    c_day = index
    const c_month = document.getElementById("month").value;
    const c_year = document.getElementById("year").value;

    const httpReq = new XMLHttpRequest();

    // console.log(runningShift);
    httpReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);

            if (flag) {
                hourlyChart(data.hourlyData);
                flag = false;
            }
            else {
                updateHourlyChart(data.hourlyData);
            }

        }
    };

    httpReq.open("GET", '/getCustomDayData/' + Machine_No + '/' + runningShift + '/' + c_month + '/' + c_year + '/' + c_day, true);
    httpReq.send();

}

const plotData = (shift) => {
    if (index != -1) {
        runningShift = shift;
        getGraphData();
    }

}

const barClicked = (event) => {
    // console.log("clicked..");
    const element = bar_chart.getElementAtEvent(event);
    index = element[0]._index + 1;
    getGraphData();
}


const hourlyChart = (data) => {

    const okCountData = data.okData;
    const rejectCountData = data.rejectData;
    let hours = data.hour;

    let okCount = [];
    let rejectCount = [];
    for (let i = 0; i < hours.length; i++) {
        okCount.push(okCountData[`${hours[i]}`]);
        rejectCount.push(rejectCountData[`${hours[i]}`]);
    }

    var ctx = document.getElementById("myChart4").getContext('2d');
    if (ctx) {
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: hours,
                datasets: [{
                    label: 'Ok Count',
                    backgroundColor: "#caf270",
                    data: okCount,
                }, {
                    label: 'Reject Count',
                    backgroundColor: "#45c490",
                    data: rejectCount,
                }],
            },
            options: {
                tooltips: {
                    displayColors: true,
                    callbacks: {
                        mode: 'x',
                    },
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false,
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                        },
                        type: 'linear',
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: { position: 'bottom' },
            }
        });
    }

}

const updateHourlyChart = (data) => {
    const okCountData = data.okData;
    const rejectCountData = data.rejectData;

    let hours = data.hour;
    let okCount = [];
    let rejectCount = [];
    for (let i = 0; i < hours.length; i++) {
        okCount.push(okCountData[`${hours[i]}`]);
        rejectCount.push(rejectCountData[`${hours[i]}`]);
    }

    myChart.data.labels = hours;
    myChart.data.datasets[0].data = okCount;
    myChart.data.datasets[1].data = rejectCount;
    myChart.update();
}



const donutOption = (percentage) => {
    let donutOptions = {
        cutoutPercentage: 85,
        elements: {
            center: {
                text: percentage + '%',
                color: 'white', // Default is #000000
                fontStyle: 'Arial', // Default is Arial
                sidePadding: 40, // Default is 20 (as a percentage)
                minFontSize: 10, // Default is 20 (in px), set to false and text will not wrap.
                lineHeight: 25 // Default is 25 (in px), used for when text wraps
            }
        },
        tooltips: {
            displayColors: true,
            callbacks: {
                mode: 'x',
            },
        },
        scales: {
            xAxes: [{
                stacked: true,
                ticks: {
                    display: false,
                },
                gridLines: {
                    display: false,
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    display: false,
                },
                type: 'linear',
                gridLines: {
                    display: false,
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
    };
    return donutOptions;
}


const donutData = (ok, reject) => {
    var chDonutData = {
        labels: ['okCount', 'rejectionCount'],
        datasets: [
            {
                label: ['okCount', 'rejectionCount'],
                borderWidth: 0,
                data: [ok, reject],
                backgroundColor: [
                    '#16D39A',
                    '#ff7588',
                ],
                hoverOffset: 4
            }
        ]
    };

    return chDonutData;
}

const percentage = (ok, count) => {
    let percentage = 0;
    if (count > 0) {
        percentage = (ok / count) * 100;
    }

    percentage = percentage.toFixed(1);
    return percentage;
}


const chdonut1 = (data) => {

    let chDonutData = donutData(data.okCount, data.rejectionCount);
    let per = percentage(data.okCount, data.count);
    let donutOptions = donutOption(per);
    var chDonut = document.getElementById("chDonut_1");
    if (chDonut) {
        donut1 = new Chart(chDonut, {
            type: 'doughnut',
            data: chDonutData,
            options: donutOptions
        });
    }

}

const chdonut2 = (data) => {

    let chDonutData = donutData(data.okCount, data.rejectionCount);
    let per = percentage(data.okCount, data.count);
    let donutOptions = donutOption(per);
    var chDonut = document.getElementById("chDonut_2");
    if (chDonut) {
        donut2 = new Chart(chDonut, {
            type: 'doughnut',
            data: chDonutData,
            options: donutOptions
        });
    }

}

const chdonut3 = (data) => {

    let chDonutData = donutData(data.okCount, data.rejectionCount);
    let per = percentage(data.okCount, data.count);
    let donutOptions = donutOption(per);
    var chDonut = document.getElementById("chDonut_3");
    if (chDonut) {
        donut3 = new Chart(chDonut, {
            type: 'doughnut',
            data: chDonutData,
            options: donutOptions
        });
    }

}

const chdonut4 = (data) => {

    let chDonutData = donutData(data.okCount, data.rejectionCount);
    let per = percentage(data.okCount, data.count);
    let donutOptions = donutOption(per);
    var chDonut = document.getElementById("chDonut_4");
    if (chDonut) {
        donut4 = new Chart(chDonut, {
            type: 'doughnut',
            data: chDonutData,
            options: donutOptions
        });
    }

}

const updateChDonut1 = (data) => {
    let per = percentage(data.okCount, data.count);

    donut1.data.datasets[0].data = [data.okCount, data.rejectionCount];
    donut1.options.elements.text = per + "%";
    donut1.update();
}

const updateChDonut2 = (data) => {
    let per = percentage(data.okCount, data.count);

    donut2.data.datasets[0].data = [data.okCount, data.rejectionCount];
    donut2.options.elements.text = per + "%";
    donut2.update();
}

const updateChDonut3 = (data) => {
    let per = percentage(data.okCount, data.count);

    donut3.data.datasets[0].data = [data.okCount, data.rejectionCount];
    donut3.options.elements.text = per + "%";
    donut3.update();
}

const updateChDonut4 = (data) => {
    let per = percentage(data.okCount, data.count);

    donut4.data.datasets[0].data = [data.okCount, data.rejectionCount];
    donut4.options.elements.text = per + "%";
    donut4.update();
}






// Code to put text in middle of chart
Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
            // Get ctx from string
            var ctx = chart.chart.ctx;

            // Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Arial';
            var txt = centerConfig.text;
            var color = centerConfig.color || '#000';
            var maxFontSize = centerConfig.maxFontSize || 75;
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
            // Start with a base font of 30px
            ctx.font = "30px " + fontStyle;

            // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(30 * widthRatio);
            var elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
            var minFontSize = centerConfig.minFontSize;
            var lineHeight = centerConfig.lineHeight || 25;
            var wrapText = false;

            if (minFontSize === undefined) {
                minFontSize = 20;
            }

            if (minFontSize && fontSizeToUse < minFontSize) {
                fontSizeToUse = minFontSize;
                wrapText = true;
            }

            // Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse + "px " + fontStyle;
            ctx.fillStyle = color;

            if (!wrapText) {
                ctx.fillText(txt, centerX, centerY);
                return;
            }

            var words = txt.split(' ');
            var line = '';
            var lines = [];

            // Break words up into multiple lines if necessary
            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = ctx.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > elementWidth && n > 0) {
                    lines.push(line);
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }

            // Move the center up depending on line height and number of lines
            centerY -= (lines.length / 2) * lineHeight;

            for (var n = 0; n < lines.length; n++) {
                ctx.fillText(lines[n], centerX, centerY);
                centerY += lineHeight;
            }
            //Draw text in center
            ctx.fillText(line, centerX, centerY);
        }
    }
});




