'use client';
import { useState, useEffect } from 'react';
import AuthInput from '@/components/inputs/AuthInputs';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import { makeRequest } from "@/axios";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  // Use useEffect to show toast when error changes
  useEffect(() => {
    if (error) {
      toast.warn(error);
    }
  }, [error]);

  // Use useEffect to show toast when success changes
  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);


  const handleLogin = (e: any) => {
    e.preventDefault()
    makeRequest.post("auth/login", { email, password })
      .then((res) => {
        localStorage.setItem("ESG:user", JSON.stringify(res.data.data.foundUser));
        localStorage.setItem("ESG:token", JSON.stringify(res.data.data.token));
        setSuccess(res.data.msg);
        console.log(res.data.msg)
        setError('');
        router.push('/');

      }).catch((err) => {
        console.log(err);
        setError(err.response.data.msg);
        setSuccess('');
      })
  }

  return (
    <>
      <h1 className='font-bold text-2xl'>LOGIN</h1>
      <AuthInput label='Email:' newState={setEmail} />
      <AuthInput label='Senha:' newState={setPassword} isPassword />
      <button className='bg-blue-600 py-3 font-bold text-white rounded-lg hover:bg-blue-800' onClick={(e) => handleLogin(e)}>Logar</button>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>

  );
}

export default Login;
