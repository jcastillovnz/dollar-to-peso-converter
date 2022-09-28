import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import { getCurrenciesValues } from './api';
import dayjs from 'dayjs';

const Home: NextPage = () => {

  const [ARGBuy, setARGBuy] = useState(0);

  const [ARGSell, setARGSell] = useState(0);

  const [usd, setDolar] = useState(0);

  const [arg, setArg] = useState(0);

  const [lastUpdate, setLastUpdate] = useState();

  useEffect(
    () => {
      const usdToArg = isNaN(1 / ARGSell) || (1 / ARGSell) === Infinity ? 0 : (1 / ARGSell);
      const argToUsd = usdToArg * arg;
      setDolar(argToUsd)
    },
    [ARGSell, arg],
  );

  useEffect(
    () => {
      const oneUsdToArg = isNaN(ARGSell / 1) || (ARGSell / 1) === Infinity ? 0 : (ARGSell / 1);
      const usdValue = usd * oneUsdToArg;
      setArg(usdValue)
    },
    [ARGSell, usd],
  );

  (async () => {
    try {
      const data = await getCurrenciesValues();
      setARGBuy(data.blue.value_buy);
      setARGSell(data.blue.value_sell);
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
        <meta name="description" content="Conversor dolar a peso, convertir dolar a pesos, precio de dolar argentina, conversor dolar a peso argentino" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>
          Conversor dolar a peso
        </h1>
        <div className={styles.grid}>
          COMPRA ARG {ARGBuy} = 1 USD | VENTA ARG {ARGSell} = 1 USD
        </div>
        <div style={{ marginTop: '1rem' }}>
          1 ARG =  {isNaN(1 / ARGSell) || (1 / ARGSell) === Infinity ? 0 : (1 / ARGSell)} USD
        </div>
        <div style={{ marginTop: '1rem' }}>
          Ultima actualizacion: {dayjs(lastUpdate).format('DD/MM/YYYY h:mm a')}
        </div>
        <div style={{ marginTop: '2rem' }}>
          {' '}
          USD:
          {' '}
          <input placeholder='dolares' value={usd} onChange={(e) => {
            const value = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)
            setDolar(value)
          }} />
          {' '}
          ARG:
          {' '}
          <input placeholder='pesos' value={arg} onChange={(e) => {
            const value = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)
            setArg(value);
          }} />

        </div>
      </main>
    </div>
  )
}

export default Home
