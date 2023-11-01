'use client'
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from 'react-chartjs-2';
import { makeRequest } from '@/axios';

ChartJS.register(
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
);

const filialMapping: Record<string, string> = {
 "PATEO ILHA DO RETIRO": "RECIFE",
 "PATEO RETIRO": "RETIRO",
 "PATEO SÃO LUIZ": "SÃO LUIZ",
 "PATEO BEQUIMÃO": "BEQUIMÃO",
 "PATEO MANAUS": "MANAUS",
 "PATEO OLINDA": "OLINDA",
 "PATEO FEIRA DE SANTANA": "FEIRA",
 "PATEO JOÃO PESSOA": "JOÃO PESSOA",
 "PATEO JABOATÃO": "PIEDADE"
};

export const BarChart = () => {

 const [data, setData] = useState<number[]>([]);
 const [labels, setLabels] = useState([] as any);
 const [chartData, setChartData] = useState({
  labels: [],
  datasets: [{
   label: 'Coletas',
   data: [],
   backgroundColor: 'rgb(53, 162, 235, 0.4)',
  }]
 });
 const [chartOptions, setChartOptions] = useState({});

 useEffect(() => {
  setChartOptions({
   plugins: {
    legend: {
     position: 'top'
    },
    title: {
     display: true,
     text: 'Coletas Óleo e Filtro'
    }
   },
   maintainAspectRatio: false,
   responsive: true
  });
 }, []);

 useEffect(() => {
  makeRequest.post('barchart')
   .then((res) => {
    setData(res.data.data);
    setLabels(res.data.labels.map((label: string | number ) => filialMapping[label] || label));
   })
   .catch((err) => {
    console.log(err);
   });
 }, []);

 useEffect(() => {
  // Update chartData when data and labels change
  setChartData({
   labels,
   datasets: [{
    label: 'Coletas',
    data,
    backgroundColor: 'rgb(53, 162, 235, 0.4)',
   }]
  });
 }, [data, labels]);

 return (
  <div className="w-full h-auto lg:w-1/2 flex items-center justify-center">
   <Bar data={chartData} options={chartOptions} />
  </div>
 );
}

