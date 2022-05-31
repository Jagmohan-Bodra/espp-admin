import React, {useEffect, useRef, useState} from 'react';
import StatusInfo from './StatusInfo';
import Chart from 'chart.js/auto';
// import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {isEmpty} from 'validate.js';

// Chart.register(ChartDataLabels);

const getPercentInArr = (data = [1], value) =>
  (
    (parseFloat(value) / data.reduce((total, item) => total + item, 0)) *
    100
  ).toFixed(2);

const OverviewChart = (props) => {
  const {data, title} = props;
  const ref = useRef(null);
  const [chart, setChart] = useState();
  const dataChart = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        tooltip: {
          callbacks: {
            label: function (context) {
              const {label, formattedValue} = context;
              return `${label} : ${getPercentInArr(
                data.map((item) => item.value),
                formattedValue,
              )}%`;
            },
          },
        },
      },
    ],
  };
  const config = {
    type: 'pie',
    plugins: [ChartDataLabels],
    data: dataChart,
    options: {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          titleColor: '#000',
          boxWidth: 16,
          boxHeight: 16,
          bodyFont: {
            size: 16,
          },
        },
        datalabels: {
          display: true,
          formatter: (val) => {
            return `${getPercentInArr(
              data.map((item) => item.value),
              val,
            )}%`;
            // return ctx.chart.data.labels[ctx.dataIndex];
          },
          color: '#fff',
          font: {
            size: 24,
            weight: 'bold',
          },
          // backgroundColor: '#404040'
        },
      },
    },
  };

  useEffect(() => {
    if (ref.current && !isEmpty(data)) {
      if (!isEmpty(chart)) {
        chart.destroy();
      }
      setChart(new Chart(ref.current, config));
    }
  }, [ref, data]);

  return (
    <div className={`overview-chart`}>
      <div className={`overview-chart_title`}>{title}</div>
      <div className={`overview-chart_content`}>
        <div className={`overview-chart_content_chart`}>
          <canvas width="100" height="100" ref={ref}></canvas>
        </div>
        <div className={`overview-chart_content_info`}>
          {data.map((item, index) => (
            <StatusInfo key={index} text={item.label} color={item.color} />
          ))}
          {/* <StatusInfo text={`Cancel`} color={`#41b6ff`}/>
          <StatusInfo text={`Pending`} color={`#ff544d`}/>
          <StatusInfo text={`Paid`} color={`#ff8d39`}/>
          <StatusInfo text={`Dispatched`} color={`#4fd125`}/>
          <StatusInfo text={`Refund`} color={`#a060fc`}/> */}
        </div>
      </div>
    </div>
  );
};

OverviewChart.defaultProps = {
  data: [],
};

export default OverviewChart;
