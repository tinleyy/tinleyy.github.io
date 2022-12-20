import {
  CategoryScale, Chart as ChartJS, Filler,
  Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
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
  ChartDataLabels
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
    datalabels: {
      align: function (context: any) {
        var index = context.dataIndex;
        var curr = context.dataset.data[index];
        var prev = context.dataset.data[index - 1];
        var next = context.dataset.data[index + 1];
        return prev < curr && next < curr ? 'end' :
          prev > curr && next > curr ? 'start' :
            'center';
      },
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
        return glyph + ' ' + Math.round(value);
      },
      padding: 6
    },
    layout: {
      padding: {
        top: 32,
        right: 30,
        bottom: 8,
        left: 0
      }
    },
    elements: {
      line: {
        fill: false,
        tension: 0.4,
        borderWidth: 0
      }
    },
  },
  scales: {
    y: {
      display: false
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// export const chartdata = {
//   labels,
//   datasets: [
//     {
//       fill: true,
//       label: 'Index Name',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

function mapToChartData({ labels, data }: { labels: Array<any>, data: Array<any> }) {
  return {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Index Name',
        data: data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
}

export function AreaChart({ data }: { data: IndexSensorsResponse[] | Array<any> }) {
  let amount: Array<any> = [];
  let label: Array<any> = [];
  data.map((d, index) => {
    amount.push(d.amount);
    label.push(d.created_at);
  })

  const chartdata = mapToChartData({ labels: label, data: amount });

  return <Line options={options} data={chartdata} />;
}
