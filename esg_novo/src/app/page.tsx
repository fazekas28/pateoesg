'use client';
import Header from '@/components/main/Header'
import Sidebar from '@/components/main/Sidebar';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { makeRequest } from '@/axios';
import { TableMainOleo } from '@/components/main/TableMainOleo';
import { TableMainFilter } from '@/components/main/TableMainFilter';

export default function Home() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState('');
  const [apiCallMade, setApiCallMade] = useState(false);

  useEffect(() => {
    const info = localStorage.getItem('ESG:user');
    if (!info) {

      return;

    } else {
      const parsedInfo = JSON.parse(info);
      const filial = parsedInfo.ORIGEM;
      setUserInfo(filial);
    }
  }, []);

  useEffect(() => {
    if (userInfo && !apiCallMade) {
      makeRequest.post("auth/getuserinfo", { filial: userInfo })
        .then((res) => {
          localStorage.setItem("ESG:userinfo", JSON.stringify(res.data.userInfo));
          setApiCallMade(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userInfo, apiCallMade]);

  useEffect(() => {
    let value = localStorage.getItem('ESG:token');
    if (!value) {
      router.push('/login');
    }
  }, [router]);



  return (
    <main className="w-full flex min-h-screen flex-col items-center bg-zinc-100">
      <Header />
      <div className='w-full flex flex-col md:flex-row'>
        <div className='flex justify-start pt-10 md:w-1/3 sm:w-full'>
          <Sidebar />
        </div>
        <div className='flex flex-col gap-20 pt-10 justify-center relative overflow-x-auto'>
          <TableMainOleo />
          <TableMainFilter />
        </div>
      </div>
    </main>

  )
}


