import type { NextPage } from "next";
import { RefObject, useRef, useState } from "react";
import Head from "next/head";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { OutlinedInput } from "@mui/material";
import styles from "../styles/Home.module.css";
import { getCurrenciesValues } from "./api";
import dayjs from "dayjs";

const Home: NextPage = () => {
  const [argBluePriceBuy, setargBluePriceBuy] = useState(0);
  const [argBluePriceSell, setargBluePriceSell] = useState(0);

  const [argOficialPriceBuy, setargOficialPriceBuy] = useState(0);
  const [argOficialPriceSell, setargOficialPriceSell] = useState(0);

  const [lastUpdate, setLastUpdate] = useState();

  const usdBlueInput = useRef<HTMLInputElement>(null);
  const argBlueInput = useRef<HTMLInputElement>(null);

  const usdOficialInput = useRef<HTMLInputElement>(null);
  const argOficialInput = useRef<HTMLInputElement>(null);

  const convertArgToUsd = (
    args: number,
    usdArgPriceSell: number,
    input: RefObject<HTMLInputElement>
  ) => {
    const usdToArg =
      isNaN(1 / usdArgPriceSell) || 1 / usdArgPriceSell === Infinity
        ? 0
        : 1 / usdArgPriceSell;
    const argToUsd = usdToArg * args;
    if (input?.current) {
      input.current.value = argToUsd.toLocaleString("es", {
        maximumFractionDigits: 2,
      });
    }
  };

  const convertUsdToArg = (
    usd: number,
    argPriceSell: number,
    input: RefObject<HTMLInputElement>
  ) => {
    const oneUsdToArg =
      isNaN(argPriceSell / 1) || argPriceSell / 1 === Infinity
        ? 0
        : argPriceSell / 1;
    const usdValue = usd * oneUsdToArg;
    if (input?.current) {
      input.current.value = usdValue.toLocaleString("es", {
        maximumFractionDigits: 2,
      });
    }
  };

  (async () => {
    try {
      const data = await getCurrenciesValues();
      /* BLUE */
      setargBluePriceBuy(data.blue.value_buy);
      setargBluePriceSell(data.blue.value_sell);
      /* OFICIAL */
      setargOficialPriceBuy(data.oficial.value_buy);
      setargOficialPriceSell(data.oficial.value_sell);
      setLastUpdate(data.last_update);
    } catch (error) {
      console.log(error);
    }
  })();

  return (
    <div className={styles.container}>
      <Head>
        <title>Conversor dolar a pesos argentinos</title>

        <meta
          name="google-site-verification"
          content="jLy-jCzipmoaCT6-hXgJARacqDIXXhb_clgvi86fN1c"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="description"
          content="Conversor dolar a peso, convertir dolar a pesos, precio de dolar argentina, conversor dolar a peso argentino, dólar a peso argentino blue"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div style={{ marginTop: "7rem" }}>
          <h1 style={{ fontSize: "1.2rem" }}>
            Conversor dolar a peso argentino
          </h1>
        </div>
        <div
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ marginTop: "0rem" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>DOLAR OFICIAL</TableCell>
                    <TableCell align="right">Compra {argOficialPriceBuy}</TableCell>
                    <TableCell align="right">Venta {argOficialPriceSell}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>DOLAR BLUE</TableCell>
                    <TableCell align="right">Compra {argBluePriceBuy}</TableCell>
                    <TableCell align="right">Venta {argBluePriceSell}</TableCell>
                  </TableRow>
                </TableHead>

              </Table>
            </TableContainer>
          </div>

          <div
            style={{
              flex: 1,
              marginTop: "2rem",
              marginBottom: "2rem",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              justifySelf: "center",
              textAlign: "center",
            }}
          >
            {" "}
            <OutlinedInput
              type="text"
              inputProps={{ step: 0.01, max: 10000000 }}
              style={{ width: "8rem" }}
              size="small"
              placeholder="Dolar Blue"
              inputRef={usdBlueInput}
              onChange={(e) => {
                const value = isNaN(parseFloat(e.target.value))
                  ? 0
                  : parseFloat(e.target.value);
                convertUsdToArg(value, argBluePriceSell, argBlueInput);
              }}
            />{" "}
            <OutlinedInput
              type="text"
              inputProps={{ step: 0.01, max: 10000000 }}
              style={{ width: "8rem" }}
              size="small"
              placeholder="Pesos"
              inputRef={argBlueInput}
              onChange={(e) => {
                const value = isNaN(parseFloat(e.target.value))
                  ? 0
                  : parseFloat(e.target.value);

                convertArgToUsd(value, argBluePriceSell, usdBlueInput);
              }}
            />{" "}
          </div>

          <div
            style={{
              flex: 1,
              marginTop: "2rem",
              marginBottom: "2rem",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              justifySelf: "center",
              textAlign: "center",
            }}
          >
            {" "}
            <OutlinedInput
              type="text"
              inputProps={{ step: 0.01, max: 10000000 }}
              style={{ width: "8rem" }}
              size="small"
              placeholder="Dolar oficial"
              inputRef={usdOficialInput}
              onChange={(e) => {
                const value = isNaN(parseFloat(e.target.value))
                  ? 0
                  : parseFloat(e.target.value);
                convertUsdToArg(value, argOficialPriceSell, argOficialInput);
              }}
            />{" "}
            <OutlinedInput
              type="text"
              inputProps={{ step: 0.01, max: 10000000 }}
              style={{ width: "8rem" }}
              size="small"
              placeholder="Pesos"
              inputRef={argOficialInput}
              onChange={(e) => {
                const value = isNaN(parseFloat(e.target.value))
                  ? 0
                  : parseFloat(e.target.value);
                convertArgToUsd(value, argOficialPriceSell, usdOficialInput);
              }}
            />{" "}
          </div>

          <div>
            <Typography
              style={{ marginTop: "2rem", marginBottom: "1.5rem" }}
              align="center"
            >
              <strong>Ultima actualizacion</strong>
            </Typography>
            <Typography align="center">
              {lastUpdate ? dayjs(lastUpdate).format("DD/MM/YYYY h:mm a") : ""}
            </Typography>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <Typography style={{ fontSize: "0.8rem" }} align="center">
              By <strong>@jcastillovnz</strong>
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
