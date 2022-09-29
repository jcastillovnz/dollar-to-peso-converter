import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import styles from '../styles/Home.module.css'
import { getCurrenciesValues } from './api';
import dayjs from 'dayjs';

const Home: NextPage = () => {

  const [argPriceBuy, setArgPriceBuy] = useState(0);

  const [argPriceSell, setArgPriceSell] = useState(0);

  const [usd, setDolar] = useState(0.0);

  const [arg, setArg] = useState(0.0);

  const [lastUpdate, setLastUpdate] = useState();

  useEffect(
    () => {
      const usdToArg = isNaN(1 / argPriceSell) || (1 / argPriceSell) === Infinity ? 0 : (1 / argPriceSell);
      const argToUsd = usdToArg * arg;
     setDolar(argToUsd)
    },
    [argPriceSell, arg],
  );

  useEffect(
    () => {
      const oneUsdToArg = isNaN(argPriceSell / 1) || (argPriceSell / 1) === Infinity ? 0 : (argPriceSell / 1);
      const usdValue = usd * oneUsdToArg;
      setArg(usdValue)
    },
    [argPriceSell, usd],
  );

  (async () => {
    try {
      const data = await getCurrenciesValues();
      setArgPriceBuy(data.blue.value_buy);
      setArgPriceSell(data.blue.value_sell);
      setLastUpdate(data.last_update)
    }
    catch (error) {
      console.log(error)
    }

  })();


  return (
    <div className={styles.container}>
      <Head>
        <title>Conversor dolar a peso</title>
        <meta name="google-site-verification" content="jLy-jCzipmoaCT6-hXgJARacqDIXXhb_clgvi86fN1c" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="description" content="Conversor dolar a peso, convertir dolar a pesos, precio de dolar argentina, conversor dolar a peso argentino, dólar a peso argentino blue" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 style={{ fontSize: '1.5rem' }}>
          Conversor dolar a peso
        </h1>
        <div className={styles.grid} style={{ fontSize: '0.9rem', flexDirection: 'column', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
          <strong style={{ color: 'green' }}> COMPRA ARG {argPriceBuy} = 1 USD {' '}</strong>  <strong style={{ color: 'red' }}>{' '} VENTA ARG {argPriceSell} = 1 USD</strong>
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <strong>  1 ARG </strong> =  {isNaN(1 / argPriceSell) || (1 / argPriceSell) === Infinity ? 0 : (1 / argPriceSell)} USD
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <strong> Ultima actualizacion</strong>: {lastUpdate ? dayjs(lastUpdate).format('DD/MM/YYYY h:mm a') : ''}
        </div>
        <div style={{ marginTop: '2rem', flexDirection: 'row' }}>
          {' '}
          <strong>Usd:</strong>
          {' '}
          <OutlinedInput style={{ width: '8.5rem' }} size='small' placeholder='dolares' onChange={(e) => {
            const value = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)
            console.log("----------> ", value)
            setDolar(value)
          }} />
          {' '}
          <strong>Arg:</strong>
          {' '}
          <OutlinedInput style={{ width: '8.5rem' }} size='small' placeholder='pesos' value={arg} onChange={(e) => {
            const value = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)
            setArg(value);
          }} />

        </div>
      </main >
      <div ><Typography align="center" >By <strong>@jcastillovnz</strong></Typography></div>
    </div >
  )
}

export default Home
