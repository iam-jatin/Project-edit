// First Line Chart

const lineChartOption = {
  legend: { display: false },
  scales: {
    yAxes: [{ ticks: { min: 6, max: 16 } }],
  }
}

const a1 = (data) => {
  const myChart = document.getElementById("myChart");
  if (myChart) {
    var xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
    var yValues = data;

    a1Chart = new Chart(myChart, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,1)",
          data: yValues
        }]
      },
      options: lineChartOption
    });
  }

}

const updateA1 = (data) => {
  var yValues = data;
  a1Chart.data.datasets[0].data = yValues;
  a1Chart.update();
}

const a2 = (data) => {
  const myCharts = document.getElementById("myCharts");
  if (myCharts) {
    // Second line chart
    var xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
    var yValues = data;

    a2Chart = new Chart(myCharts, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,1)",
          data: yValues
        }]
      },
      options: lineChartOption
    });
  }

}

const updateA2 = (data) => {
  var yValues = data;
  a2Chart.data.datasets[0].data = yValues;
  a2Chart.update();
}




var numberWithCommas = function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const plotLineChart = (data) => {


  const hour = data.hour;
  const okData = data.data;
  const rejectData = data.rejectionData;

  const ok = [];
  const reject = [];
  hour.forEach(el => {
    if (okData[`${el}`]) {
      ok.push(okData[`${el}`]);
    }
    else {
      ok.push(0);
    }

    if (rejectData[`${el}`]) {
      reject.push(rejectData[`${el}`]);
    }
    else {
      reject.push(0);
    }

  })

  var bar_ctx = document.getElementById('bar-chart');
  if (bar_ctx) {

    bar_chart = new Chart(bar_ctx, {
      type: 'bar',
      data: {
        labels: hour,
        datasets: [
          {
            label: 'Ok Count',
            data: ok,
            backgroundColor: "#caf270",
            hoverBackgroundColor: "#caf270",
            hoverBorderWidth: 2,
            hoverBorderColor: 'black',
          },
          {
            label: 'Reject Count',
            data: reject,
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
        legend: { display: true }
      } // options
    },

    );

  }
}

const updateLineChart = (data) => {
  const hour = data.hour;
  const okData = data.data;
  const rejectData = data.rejectionData;

  const ok = [];
  const reject = [];
  hour.forEach(el => {
    if (okData[`${el}`]) {
      ok.push(okData[`${el}`]);
    }
    else {
      ok.push(0);
    }

    if (rejectData[`${el}`]) {
      reject.push(rejectData[`${el}`]);
    }
    else {
      reject.push(0);
    }

  })

  bar_chart.data.labels = hour;
  bar_chart.data.datasets[0].data = ok;
  bar_chart.data.datasets[1].data = reject;
  bar_chart.update();
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


