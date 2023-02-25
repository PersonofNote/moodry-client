import React from 'react';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns'

import { moodColors } from '../constants'
import { useWindowSize } from '../hooks/UseWindowSize'

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/*
const getGradient = (ctx) => {
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop();
    gradient.addColorStop(0.5, 'red');
    gradient.addColorStop(1, 'blue');

  return gradient;
}
*/

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
    },
    tooltip: {
      callbacks: {
          title: function (context) {
            console.log(context)
            const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy at ')
            const dateLabel = new Date(context[0]?.label).toDateString();
            return  result || '';
          },
          label: function(context) {
              let label = context.dataset.notes[context.dataIndex] || 'Note missing';
              
              return label;
          },
          labelColor: function(tooltipItem) {
            return {
                backgroundColor: moodColors[tooltipItem.parsed.y],
            }
        },
      }
  }
  },
  parsing: {
    yAxisKey: 'value',
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'hours'
    }
    },
  },
};


const  LineChart1 = ({moodData}) => {
  const size = useWindowSize();
  const labels = moodData.map(m => m.createdAt);
  const notes = moodData.map(m => m.note)
  const colors = moodData.map(m => moodColors[m.value])
  const data = {
    labels,
    notes,
    datasets: [
      {
        data: moodData.map(m => m.value),
        borderColor: 'white',
        backgroundColor: colors,
        notes,
        pointRadius: size.width > 600 ? 8 : 5
      }
    ],
  };
  return <Line options={options} data={data} />;
}

export default LineChart1
