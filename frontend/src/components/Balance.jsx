import { useRef, useState, useEffect } from "react";

import { useWallets, useConnectWallet } from "@web3-onboard/react";

import { Button } from "./ui/button";
import { ethers } from "ethers";
import { FHETransactionBuilder } from "sherlocked-sdk";
import axios from 'axios'

const Balance = () => {
  const trxBuilder = useRef(null);

  const [{ wallet }] = useConnectWallet();
  const connectedWallets = useWallets();

  const [isBalanceEncrypted, setIsBalanceEncrypted] = useState(true);
  const [balance, setBalance] = useState("Loading...");
  const [encryptedBalance, setEncryptedBalance] = useState();
  const rpcUrl = 'http://localhost:8545';

  useEffect(() => {
    (async () => {
      if (!connectedWallets[0]?.accounts[0]?.address) {
        return;
      }

      // create an ethers provider
      let provider = new ethers.BrowserProvider(wallet.provider, "any");
      // let provider = new ethers.JsonRpcProvider(rpcUrl);

      if (!provider) {
        alert("Please connect a wallet first.");
        return;
      }

      console.log("connectedWallets", connectedWallets);

      trxBuilder.current = new FHETransactionBuilder(
        connectedWallets[0].accounts[0].address,
        connectedWallets[0].chains[0].id
      );
      // const signer = await provider.getSigner();
      console.log(' this is provide ', provider)
      const epBalance = await trxBuilder.current.getEncryptedBalance({ provider });
      setBalance(epBalance);
      setEncryptedBalance(epBalance);
    })();
  }, [connectedWallets]);

  const getDecryptedBalance = async () => {
    if (!connectedWallets[0]?.accounts[0]?.address) {
      return;
    }

    let provider = new ethers.BrowserProvider(wallet.provider, "any");
    // let provider = new ethers.JsonRpcProvider(rpcUrl);

    if (!provider) {
      alert("Please connect a wallet first.");
      return;
    }

    setIsBalanceEncrypted(false);
    setBalance(
      await trxBuilder.current.getDecryptedBalance({
        signer: await provider.getSigner(),
      })
    );
  };

  const balanceVisibility = () => {
    if(isBalanceEncrypted) {
      getDecryptedBalance();
    } else {
      getEncryptedBalanceFE();
    }
  }

  const getEncryptedBalanceFE = async () => {
    const api = axios.create({
      baseURL: 'https://sherlocked.azurewebsites.net/'
      // baseURL: "http://localhost:3000",
    });

    const resp = await api.post('/encrypt-amount', {
      plainTextAmount: balance,
    })

    const { encryptedAmount } = resp.data;
    setIsBalanceEncrypted(true);
    setBalance(encryptedAmount);
  }

  return (
    <div className="flex flex-col justify-center items-center border-2 gap-y-3 border-purple-100 p-4">
      <div className="flex gap-x-2 w-fit">
        <h2 className="w-fit">Balance:</h2>
        <p className="w-fit">{balance}</p>
      </div>
      <Button className="w-fit" onClick={() => balanceVisibility()}>
        {isBalanceEncrypted ? "Decrypt" : "Hide"}
      </Button>
    </div>
  );
};

export default Balance;
