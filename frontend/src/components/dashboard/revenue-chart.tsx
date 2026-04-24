"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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

export function RevenueChart() {
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#0f172a',
        bodyColor: '#6366f1',
        borderColor: '#f1f5f9',
        borderWidth: 1,
        padding: 16,
        cornerRadius: 16,
        displayColors: false,
        titleFont: { size: 14, weight: '900' as any },
        bodyFont: { size: 13, weight: 'bold' as any },
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => ` Revenue: $${(context.parsed.y || 0).toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          font: { size: 11, weight: 'bold' as any },
          padding: 10
        },
        border: {
          display: false
        }
      },
      y: {
        grid: {
          color: '#f8fafc',
        },
        ticks: {
          color: '#94a3b8',
          font: { size: 11, weight: 'bold' as any },
          padding: 10,
          callback: (value) => `$${Number(value) / 1000}k`
        },
        border: {
          display: false
        }
      }
    }
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Revenue',
        data: [42000, 55000, 48000, 75000, 68000, 82000, 95000, 91000, 105000, 120000, 115000, 145000],
        borderColor: '#4f46e5',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(79, 70, 229, 0.12)');
          gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');
          return gradient;
        },
        borderWidth: 4,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#4f46e5',
        pointBorderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#4f46e5',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 4,
        tension: 0.4,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
