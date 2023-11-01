import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SiMicrosoftexcel } from 'react-icons/si';
import { FiCheckSquare } from 'react-icons/fi';
import { PiStudentFill } from 'react-icons/pi';
import { BsFiletypePdf, BsFiletypeDoc, BsBarChartLine, BsPeople } from 'react-icons/bs';


interface IUser {
  IMG: string,
  NOME: string,
  ORIGEM: string
}

function Sidebar() {

  const [user, setUser] = useState<IUser | undefined>(undefined)

  useEffect(() => {
    let value = localStorage.getItem('ESG:user');
    if (value) {
      setUser(JSON.parse(value));
    }
  }, []);

  return (
    <aside className='pl-4'>
      <nav className='flex flex-col gap-5 text-gray-600 font-semibold'>
        <Link href='' className='flex gap-2 pb-5 items-center'>
          <Image src={
            user?.IMG
              ? user.IMG
              : 'https://img.freepik.com/free-icons/user_318-159711.jpg'
          }
            alt='imagem do perfil'
            className='w-8 h-8 rounded-full'
            width="10"
            height="10"
            unoptimized
          />
          <span>{user?.ORIGEM}</span>
        </Link>

        <Link href='/mtrinfo' className='flex gap-3 items-center'>
          <BsFiletypeDoc className='w-6 h-6' />
          Enviar MTR
        </Link>

        <Link href='' className='flex gap-3 items-center'>
          <BsFiletypePdf className='w-6 h-6' />
          Enviar PDF
        </Link>

        <Link href='/exportfile' className='flex gap-3 items-center'>
          <SiMicrosoftexcel className='w-6 h-6' />
          Exportar
        </Link>

        <Link href='' className='flex gap-3 items-center'>
          <PiStudentFill className='w-6 h-6' />
          Tutorial
        </Link>

        <Link href='' className='flex gap-3 items-center'>
          <FiCheckSquare className='w-6 h-6' />
          Validação
        </Link>

        <Link href='/dashboard' className='flex gap-3 items-center'>
          <BsBarChartLine className='w-6 h-6' />
          DashBoard
        </Link>

        <Link href='' className='flex gap-3 items-center'>
          <BsPeople className='w-6 h-6' />
          Contatos
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar;