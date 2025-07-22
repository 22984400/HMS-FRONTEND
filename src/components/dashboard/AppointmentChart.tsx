import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DashboardStats } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AppointmentChartProps {
  data: DashboardStats['appointmentTrends'];
}

export const AppointmentChart: React.FC<AppointmentChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Appointments',
        data: data.map(item => item.appointments),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Appointments',
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <Bar data={chartData} options={options} />
    </div>
  );
};