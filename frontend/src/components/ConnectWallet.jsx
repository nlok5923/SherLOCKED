"use client";

import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

import { Button } from "./ui/button";

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  // create an ethers provider
  let ethersProvider;

  if (wallet) {
    ethersProvider = new ethers.BrowserProvider(wallet.provider, "any");
  }

  // useEffect(() => {
  //   // If the wallet has a provider than the wallet is connected
  //   if (wallet?.provider) {
  //     setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
  //   // if using ethers v6 this is:
  //   // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
  //   }
  // }, [wallet])

  return (
    <Button
      disabled={connecting}
      onClick={() => (wallet ? disconnect(wallet) : connect())}
    >
      {connecting ? "Connecting" : wallet ? "Disconnect" : "Connect"}
    </Button>
  );
}
