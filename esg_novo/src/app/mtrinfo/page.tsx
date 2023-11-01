'use client'
import React, { useState, useEffect } from 'react';
import InputMtr from '@/components/inputs/InputMtr';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeRequest } from '@/axios';

function MtrInfo() {
  const [mtr, setMtr] = useState('');
  const [cdf, setCdf] = useState('');
  const [nNF, setNNF] = useState('');
  const [cNf, setCNf] = useState('');
  const [data, setData] = useState('');
  const [volume, setVolume] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (error) {
      toast.warn(error);
      setError('');
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      setData('');
      setMtr('');
      setCdf('');
      setVolume('');
      setNNF('');
      setCNf('');
      setSelectedOption('');
      setSuccess('');
    }
  }, [success]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const filialInfo = localStorage.getItem('ESG:user');
    const terceiroInfo = localStorage.getItem('ESG:userinfo');
    const sistemaMtr = 'SINIR';
    let uf = '';
    let cnpj_loja = '';
    let origem = '';
    let transportador = '';
    let cnpj_transportador = '';
    let destinador = '';
    let cnpj_destinador = '';
    let cod_ibama = '';
    let tipo_tratamento = '';
    let unidade = '';
    let tipo_residuo = 0;
    if (selectedOption === 'Filtro') {
      tipo_residuo = 1;
    }

    if (filialInfo && terceiroInfo) {
      const terceiroObect = JSON.parse(terceiroInfo);
      const filialObject = JSON.parse(filialInfo);

      uf = terceiroObect[tipo_residuo].UF;
      cnpj_loja = terceiroObect[tipo_residuo].CNPJ_FILIAL;
      origem = filialObject.ORIGEM;
      transportador = terceiroObect[tipo_residuo].TRANSPORTADOR;
      cnpj_transportador = terceiroObect[tipo_residuo].CNPJ_TRANS;
      destinador = terceiroObect[tipo_residuo].DESTINADOR_FINAL;
      cnpj_destinador = terceiroObect[tipo_residuo].CNPJ_FINAL;
      cod_ibama = terceiroObect[tipo_residuo].COD_IBAMA;
      tipo_tratamento = terceiroObect[tipo_residuo].TRATAMENTO;
      unidade = terceiroObect[tipo_residuo].UNIDADE;


      makeRequest.post('storemtr', {
        uf, cnpj_loja, origem, transportador, cnpj_transportador, destinador, sistemaMtr,
        cnpj_destinador, cod_ibama, tipo_tratamento, unidade, mtr, cdf, nNF, cNf, data, volume, selectedOption
      })
        .then((res) => {
          setSuccess(res.data.msg);
        }).catch((err) => {
          console.log(err);
          setError(err.response.data.msg);
          setSuccess('');
        })

    }



  };

  return (
    <>
      <InputMtr label="Data de lançamento da MTR:" newState={setData} value={data} children={undefined} />
      <InputMtr label="Numeração MTR:" newState={setMtr} isNumber value={mtr} children={undefined} />
      <InputMtr label="Numeração CDF:" newState={setCdf} isNumber value={cdf} children={undefined} />
      <InputMtr label="Volume coletado:" newState={setVolume} isNumber value={volume} max={2} children={undefined} />
      <InputMtr label="Número NF:" newState={setNNF} isNumber value={nNF} children={undefined} />
      <InputMtr label="Chave de acesso NF:" newState={setCNf} isNumber value={cNf} children={undefined} />
      <InputMtr label="Resíduo:" newState={setSelectedOption} isSelect value={selectedOption}>
        <option value="">Selecione o tipo de resíduo:</option>
        <option value="Óleo">Óleo Usado</option>
        <option value="Filtro">Filtro de Óleo</option>
      </InputMtr>
      <button
        className="bg-blue-600 py-3 font-bold text-white rounded-lg hover:bg-blue-800"
        onClick={(e) => handleSubmit(e)}
      >
        Enviar
      </button>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
}

export default MtrInfo;

