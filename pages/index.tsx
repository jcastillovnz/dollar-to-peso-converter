import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getAllCurrenciesValues } from '../api/hello';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Conversor dolar a peso</title>
        <meta name="description" content="Conversor dolar a peso" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>
          Conversor dolar a peso
        </h1>
        <div className={styles.grid}>
          COMPRA ARG 200 = 1 USD | VENTA ARG 290 = 1
        </div>
      </main>
    </div>
  )
}

export default Home
