import React, { useEffect, useState } from 'react';
import { makeRequest } from '@/axios';

interface IUser {
  ORIGEM: string;
}
interface IInfo {
  volume: number;
  descartes: number;
  volumeBefore: number;
  descartesBefore: number;
}


export const TableMainFilter = () => {

  const [user, setUser] = useState<IUser>();
  const [filtro, setFiltro] = useState<IInfo>()
  const [currentMonth, setCurrentMonth] = useState('');
  const [beforeMonth, setBeforeMonth] = useState('');
  const [currentyear, setCurrentYear] = useState(Number);

  useEffect(() => {
    let value = localStorage.getItem('ESG:user');
    if (value) {
      setUser(JSON.parse(value));
    }
  }, []);

  useEffect(() => {
    if (user) { // Check if user has a value
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const residuo = 'Filtro';

      makeRequest
        .post("filtro", { month, origem: user.ORIGEM })
        .then((res) => {
          setFiltro(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    const currentDate = new Date();
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const currentMonthName = monthNames[currentDate.getMonth()];
    const beforeMonthName = monthNames[currentDate.getMonth() - 1];
    setCurrentYear(currentDate.getFullYear())
    setCurrentMonth(currentMonthName);
    setBeforeMonth(beforeMonthName)
  }, []);




  return (

    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="caption-bottom">
          Tabela Filtro : informações referentes às coleta dos filtros
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-tl-lg">
              Mês
            </th>
            <th scope="col" className="px-6 py-3">
              Coletas
            </th>
            <th scope="col" className="px-6 py-3">
              Volume
            </th>
            <th scope="col" className="px-6 py-3 rounded-tr-lg">
              Unidade
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
              {currentMonth}/{currentyear}
            </th>
            <td className="px-6 py-4 text-center">
              {filtro?.descartes}
            </td>
            <td className="px-6 py-4 text-center">
              {filtro?.volume}
            </td>
            <td className="px-6 py-4 text-center">
              TON
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center rounded-bl-lg">
              {beforeMonth}/{currentyear}
            </th>
            <td className="px-6 py-4 text-center">
              {filtro?.descartesBefore}
            </td>
            <td className="px-6 py-4 text-center">
              {filtro?.volumeBefore}
            </td>
            <td className="px-6 py-4 text-center rounded-br-lg">
              TON
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}