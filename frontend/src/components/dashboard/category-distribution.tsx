"use client";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Logistics", "Inventory", "Finance", "HR"],
  datasets: [
    {
      data: [45000, 32000, 28000, 15000],
      backgroundColor: [
        "rgba(79, 70, 229, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(239, 68, 68, 0.8)",
      ],
      borderColor: [
        "rgba(79, 70, 229, 1)",
        "rgba(16, 185, 129, 1)",
        "rgba(245, 158, 11, 1)",
        "rgba(239, 68, 68, 1)",
      ],
      borderWidth: 0,
      hoverOffset: 20,
      borderRadius: 10,
      spacing: 5,
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "75%",
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 10,
          weight: "bold",
          family: "Inter",
        },
        color: "#94a3b8",
      },
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      titleColor: "#1e293b",
      bodyColor: "#1e293b",
      padding: 12,
      borderColor: "rgba(0,0,0,0.05)",
      borderWidth: 1,
      displayColors: true,
      usePointStyle: true,
      bodyFont: {
        weight: "bold",
        size: 12,
      },
      callbacks: {
        label: (context) => ` $${context.formattedValue}`,
      },
    },
  },
};

export function CategoryDistribution() {
  return (
    <div className="h-[300px] w-full p-2">
      <Doughnut data={data} options={options} />
    </div>
  );
}
