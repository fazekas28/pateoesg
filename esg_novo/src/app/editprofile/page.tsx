'use client';
import { useState, useEffect } from 'react';
import AuthInput from '@/components/inputs/AuthInputs';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InputEdit from '@/components/inputs/InputEdit';
import { makeRequest } from '@/axios';

function EditProfile() {
  const [user, setUser] = useState({ NOME: '', EMAIL: '', SENHA: '', IMG: '', ID: '', ORIGEM: '', ROLE: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [visible, setVisible] = useState('false');

  var nome = user.NOME;
  var email = user.EMAIL;
  var password = user.SENHA;
  var id = user.ID;

  const router = useRouter();



  // Use useEffect to show toast when error changes
  useEffect(() => {
    if (error) {
      toast.warn(error);
      setError('');
    }
  }, [error]);

  // Use useEffect to show toast when success changes
  useEffect(() => {
    if (success) {
      toast.success(success);
      setSuccess('');
    }
  }, [success]);


  useEffect(() => {
    let value = localStorage.getItem('ESG:user');
    if (value) {
      setUser(JSON.parse(value));

    }
  }, []);
  useEffect(() => {
    setSelectedOption(user.ORIGEM);
    if (user.ROLE === 'ADMIN') {
      setVisible('true')
    }
  }, [user.ORIGEM]);



  const handleEditUser = (e: any) => {
    e.preventDefault();
    makeRequest.post("auth/edit", { nome, email, password, id, selectedOption })
      .then((res) => {
        localStorage.setItem("ESG:user", JSON.stringify(user));
        setSuccess(res.data.msg);
        setError('');
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.msg);
        setSuccess('');
      });
  }


  return (

    <>

      <div className="flex flex-col items-center gap-3 justify-center">
        <h1 className='font-bold text-2xl'>Editar usuário</h1>
        <Image
          src={
            user.IMG.length > 0
              ? user.IMG
              : 'https://img.freepik.com/free-icons/user_318-159711.jpg'
          }
          alt='imagem do perfil'
          className='w-20 h-20 rounded-full flex flex-col'
          width="20"
          height="20"
          unoptimized
        />
      </div>

      {selectedOption && (
        <InputEdit
          label="Filial:"
          newState={value => {
            setUser({ ...user, ORIGEM: value });
            setSelectedOption(value);
          }}
          isSelect
          value={user.ORIGEM}
          isInvisible={visible}
        >
          <option value="">Selecione a filial:</option>
          <option value="PATEO ILHA DO RETIRO">PATEO ILHA DO RETIRO</option>
          <option value="PATEO OLINDA">PATEO OLINDA</option>
          <option value="PATEO RETIRO">PATEO RETIRO</option>
          <option value="PATEO JABOATÃO">PATEO PIEDADE</option>
          <option value="PATEO JOÃO PESSOA">PATEO JOÃO PESSOA</option>
          <option value="PATEO BEQUIMÃO">PATEO BEQUIMÃO</option>
          <option value="PATEO SÃO LUIZ">PATEO SÃO LUIZ</option>
          <option value="PATEO FEIRA DE SANTANA">PATEO FEIRA DE SANTANA</option>
          <option value="PATEO MANAUS">PATEO MANAUS</option>
        </InputEdit>
      )}
      {user.ID && (
        <AuthInput label='Nome:' newState={value => setUser({ ...user, NOME: value })} initialValue={user.NOME || ''} />
      )}
      {user.ID && (
        <AuthInput label='Email:' newState={value => setUser({ ...user, EMAIL: value })} initialValue={user.EMAIL || ''} />
      )}
      {user.ID && (
        <AuthInput label='Senha:' newState={value => setUser({ ...user, SENHA: value })} initialValue={user.SENHA || ''} />
      )}
      {user.ID && (
        <AuthInput label='' newState={value => setUser({ ...user, ID: value })} initialValue={user.ID} isInvisible />
      )}

      <button className='bg-blue-600 py-3 font-bold text-white rounded-lg hover-bg-blue-800' onClick={handleEditUser}>Editar</button>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
}

export default EditProfile;
