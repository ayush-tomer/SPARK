// src/components/DataChart.jsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DataChart = () => {
  const categoryData = {
    Communities: 6,
    Events: 20,
    Projects: 7,
    ProblemStatements: 5,
    Internships: 6,
  };

  const data = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Count",
        data: Object.values(categoryData),
        backgroundColor: "rgba(34, 197, 94, 0.7)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Data Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4"></h2>
      <div className="hidden md:block">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DataChart;
