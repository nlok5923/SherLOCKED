import { useRef, useState, useEffect } from "react";

import { useWallets, useConnectWallet } from "@web3-onboard/react";

import { Button } from "./ui/button";
import { ethers } from "ethers";
import { FHETransactionBuilder } from "sherlocked-sdk";

const Balance = () => {
  const trxBuilder = useRef(null);

  const [{ wallet }] = useConnectWallet();
  const connectedWallets = useWallets();

  const [isBalanceEncrypted, setIsBalanceEncrypted] = useState(true);
  const [balance, setBalance] = useState("Loading...");

  useEffect(() => {
    (async () => {
      if (!connectedWallets[0]?.accounts[0]?.address) {
        return;
      }

      // create an ethers provider
      let provider = new ethers.BrowserProvider(wallet.provider, "any");

      if (!provider) {
        alert("Please connect a wallet first.");
        return;
      }

      trxBuilder.current = new FHETransactionBuilder(
        connectedWallets[0].accounts[0].address
      );
      // const signer = await provider.getSigner();
      console.log(' this is provide ', provider)

      setBalance(await trxBuilder.current.getEncryptedBalance({ provider }));
    })();
  }, [connectedWallets]);

  const getDecryptedBalance = async () => {
    if (!connectedWallets[0]?.accounts[0]?.address) {
      return;
    }

    let provider = new ethers.BrowserProvider(wallet.provider, "any");

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

  return (
    <div className="flex flex-col justify-center items-center border-2 gap-y-3 border-purple-100 p-4">
      <div className="flex gap-x-2 w-fit">
        <h2 className="w-fit">Balance:</h2>
        <p className="w-fit">{balance}</p>
      </div>
      <Button className="w-fit" onClick={getDecryptedBalance}>
        {isBalanceEncrypted ? "Decrypt" : "Hide"}
      </Button>
    </div>
  );
};

export default Balance;
