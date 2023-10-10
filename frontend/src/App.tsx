import React, { FC, ReactNode, useMemo, useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Nav from "./components/header";
import { LoginInput } from "./models/LoginInput";
import {
  login,
  createProvider,
  createTaker
} from "./api/api";
import Landing from "./components/Landing";
import Servers from "./components/Servers";
import Jobs from "./components/Jobs";
import ListServer from "./components/ListServer";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

require('@solana/wallet-adapter-react-ui/styles.css');

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

require("./App.css");

const App: FC = () => {
  return (
    <Context>
  <Content />
  </Context>
  );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/solana-labs/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new UnsafeBurnerWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  const wallet = useWallet();
  const [guestBearer, setGuestBearer] = useState("");
  const [bearer, setBearer] = useState("");
  const [loginKey, setLoginKey] = useState<any>();

  const loginInput: LoginInput = {
    username: "guest",
    password: "ARISTOTLEAI",
  };

  useEffect(() => {
    login(loginInput)
      .then((response: any) => {
        setGuestBearer(response.data.access_token);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!wallet.connected) {
      return;
    }
    const loginKey = wallet.publicKey?.toBase58();
    if (!loginKey) {
      return;
    }
    setLoginKey(loginKey);
  }, [wallet.connected]);


  useEffect(() => {
    if (!loginKey) {
      return;
    }

    const loginData = {
      username: loginKey,
      password: "ARISTOTLEAI",
    };

    login(loginData)
      .then((response: any) => {
        setBearer(response.data.access_token);
        createProvider(response.data.access_token, loginKey);
        createTaker(response.data.access_token, loginKey);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [loginKey]);

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Router>
        <Nav></Nav>
          <Routes>
            <Route path="/" element={<Landing bearer={bearer} guestBearer={guestBearer} loginKey={loginKey}/>} />
            <Route path="/servers" element={<Servers bearer={bearer} guestBearer={guestBearer} loginKey={loginKey}/>} />
            <Route path="/jobs" element={<Jobs bearer={bearer} guestBearer={guestBearer} loginKey={loginKey}/>} />
            <Route path="/listserver" element={<ListServer bearer={bearer} guestBearer={guestBearer} loginKey={loginKey}/>} />
          </Routes>
        </Router>
    </div>
  );
};