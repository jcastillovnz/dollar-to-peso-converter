import type { NextPage } from "next";
import Script from "next/script";
import { RefObject, useEffect, useRef, useState } from "react";
import Head from "next/head";
import es from "dayjs/locale/es";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.locale(es);
import {
  Paper,
  Table,
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
import ReactGA from "react-ga4";

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

  const fetchApi = async () => {
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
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CONVERSOR DOLAR A PESO ARGENTINO</title>

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
          content={`Convierte dólares a pesos argentinos al tipo de cambio actual de Dólar Blue y Dólar Oficial. Cotización actualizada al ${dayjs().format(
            "DD/MM/YYYY"
          )}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} style={{ borderColor: "red" }}>
        <div style={{ marginTop: "3rem" }}>
          <h1 style={{ fontSize: "0.9rem" }}>
            CONVERSOR DOLAR A PESO ARGENTINO
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
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong style={{ fontSize: "0.7rem" }}>
                        TIPO CAMBIO
                      </strong>
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "0.7rem" }}>
                      <strong style={{ color: "green" }}>COMPRA</strong>
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "0.7rem" }}>
                      <strong style={{ color: "red" }}>VENTA</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong style={{ fontSize: "0.7rem" }}>DOLAR BLUE</strong>
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "0.7rem" }}>
                      <strong style={{ color: "green" }}>
                        {" "}
                        {argBluePriceBuy} ARS
                      </strong>
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "0.7rem" }}>
                      <strong style={{ color: "red" }}>
                        {" "}
                        {argBluePriceSell} ARS
                      </strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong style={{ fontSize: "0.7rem" }}>
                        DOLAR OFICIAL
                      </strong>
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "0.7rem" }}>
                      <strong style={{ color: "green" }}>
                        {argOficialPriceBuy} ARS
                      </strong>
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "0.7rem" }}>
                      <strong style={{ color: "red" }}>
                        {" "}
                        {argOficialPriceSell} ARS
                      </strong>
                    </TableCell>
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
              style={{ width: "10rem" }}
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
              style={{ width: "10rem" }}
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
              style={{ width: "10rem" }}
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
              style={{ width: "10rem" }}
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

          <div
            style={{
              marginTop: "2.9rem",
              marginBottom: "0rem",
              width: "18rem",
            }}
          >
            <Typography align="center" style={{ fontSize: "0.8rem" }}>
              <strong> Ultima actualizacion </strong> correspondiente de los
              precios del <strong>dolar blue</strong> y{" "}
              <strong>dolar oficial </strong> <strong>Argentina</strong>{" "}
              {lastUpdate
                ? dayjs(lastUpdate).format("dddd, D [de] MMMM [de] YYYY, H:MM")
                : ""}{" "}
            </Typography>
          </div>

          <div style={{ marginTop: "4rem" }}>
            <Typography style={{ fontSize: "0.8rem" }} align="center">
              <strong> conversor dolar a peso</strong> by{" "}
              <strong>@jcastillovnz</strong>
            </Typography>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
