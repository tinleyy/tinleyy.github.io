import {
  CategoryScale, Chart as ChartJS, ChartOptions, Filler,
  Legend, LinearScale, LineElement, PointElement, TimeScale, Title,
  Tooltip
} from 'chart.js';
import "chartjs-adapter-date-fns";
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { de } from "date-fns/locale";
import moment from "moment";
import { Line } from 'react-chartjs-2';
import { chartOptions } from "../../service/general";
import { IndexSensorsResponse } from "../../service/indexsensors/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartDataLabels,
  annotationPlugin,
  TimeScale
);

function average(ctx: any) {
  let values: Array<any> = [];
  values = ctx.chart.data.datasets[0].data;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function mapToOptions({ options, firstdatedatalabel, lastdatedatalabel, xMax, xMin, yMin, yMax, standard, showHighestBox }: { options: chartOptions, firstdatedatalabel: Array<any>, lastdatedatalabel: Array<any>, xMax: number, xMin: number, yMin: number, yMax: number, standard: number, showHighestBox: boolean }) {
  const option: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: options.legendDisplay
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
      datalabels: options.datalabelsDisplay ? {
        align: function (context: any) {
          var index = context.dataIndex;
          var curr = context.dataset.data[index];
          var prev = context.dataset.data[index - 1];
          var next = context.dataset.data[index + 1];

          return firstdatedatalabel.includes(index) ? 'right'
            : lastdatedatalabel.includes(index) ? 'left'
              : prev < curr && next < curr ? 'end' :
                prev > curr && next > curr ? 'start' :
                  'center';
        },
        display: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderColor: 'rgba(128, 128, 128, 0.7)',
        borderRadius: 4,
        borderWidth: 1,
        color: function (context: any) {
          var i = context.dataIndex;
          var value = context.dataset.data[i];
          var prev = context.dataset.data[i - 1];
          var diff = prev !== undefined ? value - prev : 0;
          return diff < 0 ? 'blue' :
            diff > 0 ? 'red' :
              'gray';
        },
        offset: 8,
        formatter: function (value: any, context: any) {
          var i = context.dataIndex;
          var prev = context.dataset.data[i - 1];
          var diff = prev !== undefined ? prev - value : 0;
          var glyph = diff < 0 ? '▲' : diff > 0 ? '▼' : '◆';
          return glyph + ' ' + value.toFixed(3);
        },
        padding: 6
      } : {
        display: false
      },
      annotation: {
        annotations: {
          box1: {
            display: showHighestBox,
            type: 'box',
            xMin: xMin,
            xMax: xMax,
            yMin: yMin,
            yMax: yMax,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          },
          line1: {
            display: standard === 0 ? false : true,
            type: 'line',
            yMin: standard,
            yMax: standard,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
          },
          line2: {
            display: standard === 0 ? false : true,
            type: 'line',
            borderColor: 'black',
            borderDash: [6, 6],
            borderDashOffset: 0,
            borderWidth: 1,
            scaleID: 'y',
            value: (ctx) => average(ctx)
          },
          label1: {
            display: standard === 0 ? false : true,
            type: 'label',
            // xValue: xMax,
            yValue: standard,
            position: 'center',
            backgroundColor: '#fff',
            // borderWidth: 1,
            content: ['Standard'],
            font: {
              size: 10
            }
          }
        }
      }
    },
    scales: {
      y: {
        display: options.scalesYDisplay,
        beginAtZero: true
      },
      x: {
        display: options.scalesXDisplay,
        grid: {
          display: false
        },
        type: "time",
        time: {
          displayFormats: {
            millisecond: "HH:mm:ss.SSS",
            second: "yyyy-MM-dd HH:mm:ss.SSS",
            minute: "yyyy-MM-dd HH:mm:ss.SSS",
            hour: "yyyy-MM-dd HH:mm:ss.SSS",
            day: "yyyy-MM-dd HH:mm:ss.SSS",
            week: "yyyy-MM-dd HH:mm:ss.SSS",
            month: "MM",
            quarter: "yyyy-MM-dd HH:mm:ss.SSS",
            year: "yyyy MMM"
          },
          unit: "year"
        },
        adapters: {
          date: {
            locale: de
          }
        },
      }
    }
  };
  return option;
}

function mapToChartData({ labels, data, fillArea, showLine }: { labels: Array<any>, data: Array<any>, fillArea: boolean, showLine: boolean }) {
  return {
    labels,
    datasets: [
      {
        fill: fillArea,
        label: 'Index Name',
        data: data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        showLine: showLine
      },
    ],
  };
}

const colors = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"];
export function AreaChart({ data, chartOptions, fillArea, showLine, standard, showHighestBox }: { data: IndexSensorsResponse[] | Array<any>, chartOptions: chartOptions, fillArea: boolean, showLine: boolean, standard: number, showHighestBox: boolean }) {
  let amount: Array<any> = [];
  let highestamount: Array<any> = [];
  let label: Array<any> = [];
  let sorted_label: Array<any> = [];
  let firstdatedatalabel: Array<any> = [];
  let lastdatedatalabel: Array<any> = [];

  data.map((d, index) => {
    amount.push(d.amount);
    highestamount.push(d.amount);

    label.push(d.created_at);
    sorted_label.push(d.created_at);
  })

  let highestamountdate = ""
  sorted_label.sort((a, b) => +new Date(a) - +new Date(b))
    sorted_label = Array.from(new Set(sorted_label))
    highestamount.sort((a, b) => b - a)

    data.map((d, index) => {
      if (d.created_at === sorted_label[0]) {
        firstdatedatalabel.push(index);
      } else if (d.created_at === sorted_label[sorted_label.length - 1]) {
        lastdatedatalabel.push(index);
      }
  
      if (d.amount === highestamount[0]) {
        highestamountdate = d.created_at;
      }
    })
  
  const xMax = (parseInt(moment(highestamountdate).format('YYYY')) - 1971 + 1) * 31556952000 + 4665600000;
  const xMin = xMax - 4665600000 - 4665600000;

  const chartdata = mapToChartData({ labels: label, data: amount, fillArea: fillArea, showLine: showLine });
  const options = mapToOptions({
    options: chartOptions,
    firstdatedatalabel: firstdatedatalabel,
    lastdatedatalabel: lastdatedatalabel,
    xMax: xMax,
    xMin: xMin,
    yMin: highestamount[0] - 30,
    yMax: highestamount[0] + 30,
    standard: standard,
    showHighestBox: showHighestBox
  });

  console.log(chartdata);

  return <Line options={options} data={chartdata} />;
}
