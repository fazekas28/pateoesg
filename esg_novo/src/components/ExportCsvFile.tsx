'use client'
import { makeRequest } from '@/axios';
import React from 'react';
import { useState, useEffect } from 'react';
import InputMtr from './inputs/InputMtr';

type DataArray = string[][];

function arrayToCSV(data: DataArray) {
 // Create a CSV string with UTF-8 encoding, wrapping all values with double quotes
 const csv = '\ufeff' + data.map(row => row.map(cell => `"${cell}"`).join(';')).join('\n');
 return csv;
}

function downloadCSV(data: DataArray) {
 const csvContent = arrayToCSV(data);
 const blob = new Blob([csvContent], { type: 'text/csv' });
 const url = URL.createObjectURL(blob);

 const a = document.createElement('a');
 a.href = url;
 a.download = 'data.csv';
 a.click();

 URL.revokeObjectURL(url);
}

function DownloadButton() {
 const [csvData, setCsvData] = useState<DataArray>([]);
 const [dataInicial, setDataInicial] = useState('');
 const [dataFinal, setDataFinal] = useState('');
 const [dataFetched, setDataFetched] = useState(false);

 useEffect(() => {
  const fetchData = async () => {

   try {
    const response = await makeRequest.post('exportCsv', {
     dataInicial,
     dataFinal,
    });
    setCsvData(response.data);
    setDataFetched(true);
   } catch (error) {
    console.error('Erro ao buscar os datos', error);
   }
  };

  if (dataInicial && dataFinal) {
   fetchData();
  }

 }, [dataInicial, dataFinal])


 return (
  <div className="w-full py-5">
   <div className="flex gap-5 w-full items-center">
    <InputMtr label="Data inicial : " newState={setDataInicial} value={dataInicial} children={undefined} />
    <span className="mx-4 text-gray-500 justify-center items-center">à</span>
    <InputMtr label="Data Final : " newState={setDataFinal} value={dataFinal} children={undefined} />
   </div>

   <div className="py-5 text-center">
    {dataFetched && (
     <button className='underline text-lg' onClick={() => downloadCSV(csvData)}>Download</button>
    )}
   </div>
  </div>
 );
}

export default DownloadButton;



