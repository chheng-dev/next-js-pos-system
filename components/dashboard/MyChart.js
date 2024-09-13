// components/MyChart.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MyChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [30, 50, 40, 60, 70],
        borderColor: '#FAC1D9',  // Custom line color
        backgroundColor: '#FAC1D9',  // Custom fill color (bar color)
        pointBorderColor: '#FAC1D9',  // Point border color
        pointBackgroundColor: '#FAC1D9',  // Point fill color
        pointHoverBackgroundColor: '#111214',  // Hover background color
        pointHoverBorderColor: '#FAC1D9',  // Hover border color
      },
      {
        label: 'Revenue',
        data: [20, 10, 60, 80, 100],
        borderColor: '#111214',  // Custom line color
        backgroundColor: '#111214',  // Custom fill color (bar color)
        pointBorderColor: '#111214',  // Point border color
        pointBackgroundColor: '#111214',  // Point fill color
        pointHoverBackgroundColor: '#111214',  // Hover background color
        pointHoverBorderColor: '#111214',  // Hover border color
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Disable aspect ratio to set a custom height
    plugins: {
      legend: {
        display: true,
        postition: 'left',
        align: 'start',
        labels: {
          paddingBottom: 20, // Adjust padding for legend items
          boxWidth: 20, 
        },
      },
      title: {
        display: true,
        text: 'Overview',
        align: 'start'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '400px' }}> 
      <Line data={data} options={options} />
    </div>
  );
};

export default MyChart;
