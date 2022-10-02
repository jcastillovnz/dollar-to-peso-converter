import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import styles from '../styles/Home.module.css'
import { getCurrenciesValues } from './api';
import dayjs from 'dayjs';


const Home: NextPage = () => {

  const [argPriceBuy, setArgPriceBuy] = useState(0);

  const [argPriceSell, setArgPriceSell] = useState(0);

  const [lastUpdate, setLastUpdate] = useState();

  const usdInput = useRef<HTMLInputElement>(null);
  const argInput = useRef<HTMLInputElement>(null);

  const convertArgToUsd = (args: number) => {
    const usdToArg = isNaN(1 / argPriceSell) || (1 / argPriceSell) === Infinity ? 0 : (1 / argPriceSell);
    const argToUsd = usdToArg * args;
    if (usdInput?.current) {
      usdInput.current.value = argToUsd.toString()
    }

  }

  const convertUsdToArg = (usd: number) => {
    const oneUsdToArg = isNaN(argPriceSell / 1) || (argPriceSell / 1) === Infinity ? 0 : (argPriceSell / 1);
    const usdValue = usd * oneUsdToArg;
    if (argInput?.current) {
      argInput.current.value = usdValue.toString()
    }
  }


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
        <title>Conversor dolar a pesos argentinos</title>

        <meta name="google-site-verification" content="jLy-jCzipmoaCT6-hXgJARacqDIXXhb_clgvi86fN1c" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="description" content="Conversor dolar a peso, convertir dolar a pesos, precio de dolar argentina, conversor dolar a peso argentino, dólar a peso argentino blue" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 style={{ fontSize: '1.2rem' }}>
          Conversor dolar a peso argentino
        </h1>
        <div style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>


          <div style={{ marginTop: '1rem' }}>
            <Typography align="center">
              <strong style={{ color: 'green' }}> COMPRA  1 USD =  {argPriceBuy} ARG{' '}</strong>
            </Typography>
            <Typography align="center">
              <strong style={{ color: 'red' }}>{' '} VENTA 1 USD = {argPriceSell} ARG </strong>
            </Typography>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            <Typography align="center">
              <strong>1 dólar</strong> estadounidense equivale a {argPriceSell} pesos argentinos
            </Typography>
          </div>

          <Typography align="center">
            <strong>  1 peso argentino</strong> equivale a  =  {isNaN(1 / argPriceSell) || (1 / argPriceSell) === Infinity ? 0 : (1 / argPriceSell)} USD
          </Typography>


        </div>

        <div style={{ marginTop: '2rem', flexDirection: 'row' }}>
          {' '}
          <strong>Usd:</strong>
          {' '}
          <OutlinedInput style={{ width: '7.8rem' }} size='small' placeholder='dolares' inputRef={usdInput} onChange={(e) => {
            const value = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
            convertUsdToArg(value);
          }} />

          <strong>Arg:</strong>
          {' '}
          <OutlinedInput style={{ width: '7.8rem' }} size='small' placeholder='pesos' inputRef={argInput} onChange={(e) => {
            const value = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)
            convertArgToUsd(value)
          }} />
          {' '}

        </div>
      </main >
      <div style={{
        fontSize: '0.9rem',
        marginBottom: '3rem'
      }}>
        <Typography align="center">Ultima actualizacion</Typography>
        <Typography align="center" >{lastUpdate ? dayjs(lastUpdate).format('DD/MM/YYYY h:mm a') : ''}</Typography>
      </div>
      <div ><Typography align="center" >By <strong>@jcastillovnz</strong></Typography></div>
    </div >
  )
}

export default Home
