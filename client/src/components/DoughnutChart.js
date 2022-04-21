import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ chartData, options={} }) => {
  return (
    <div>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
