import {
    CategoryScale, Chart as ChartJS, Filler,
    Legend, LinearScale, LineElement, PointElement, Title,
    Tooltip
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { IndexSensorsResponse } from "../../service/indexsensors/types";
import { indexesInOneChart, chartOptions } from "../../service/general";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

function mapToOptions(options: chartOptions){
    return {
        responsive: true,
        plugins: {
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
            datalabels: {
                display: false
            }
        },
        scales: {
            y: {
                display: options.scalesYDisplay
            },
            x: {
                display: options.scalesXDisplay,
                grid: {
                    display: false
                }
            }
        }
    };
}

function mapToChartData({ labels, dataset }: { labels: Array<any>, dataset: Array<any>, }) {
    return {
        labels,
        datasets: dataset,
    };
}

const colors = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"];

export function MultiLineChart({ data, chartOptions }: { data: indexesInOneChart | undefined, chartOptions: chartOptions }) {
    if (data) {
        let dataset: Array<any> = [];
        const thisdata = data?.data;
        const thisdataName = data?.labelName;
        let index = 0;
        for (const key in thisdata) {
            dataset.push(
                {
                    fill: false,
                    label: thisdataName[index],
                    data: thisdata[key],
                    borderColor: colors[index],
                    backgroundColor: colors[index],
                    // showLine: false
                }
            );
            index++;
        }

        const chartdata = mapToChartData({ labels: data.label, dataset: dataset });
        const options = mapToOptions(chartOptions);

        return <Line options={options} data={chartdata} />;
    }
    return <></>
}
