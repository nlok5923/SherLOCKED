"use client";

import { useEffect, useRef } from "react";
import { useWallets, useConnectWallet } from "@web3-onboard/react";

import { ethers } from "ethers";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FHETransactionBuilder } from "sherlocked-sdk";

const DirectTransfer = () => {
  const [{ wallet }] = useConnectWallet();
  const connectedWallets = useWallets();

  const trxBuilder = useRef(null);
  const toAddressRef = useRef(null);
  const amountRef = useRef(null);

  useEffect(() => {
    if (!connectedWallets[0]?.accounts[0]?.address) {
      return;
    }

    trxBuilder.current = new FHETransactionBuilder(
      connectedWallets[0].accounts[0].address,
      connectedWallets[0].chains[0].id
    );
  }, [connectedWallets]);

  const sendTransaction = async () => {
    // create an ethers provider
    let provider = new ethers.BrowserProvider(wallet.provider, "any");

    if (!provider) {
      alert("Please connect a wallet first.");
      return;
    }

    const to = toAddressRef.current.value;
    const amount = amountRef.current.value;

    if (!to || !amount) {
      alert("Please provide a valid address and amount.");
      return;
    }

    // console.log('this is signer ', (await provider.getSigner()))
    const signer = await provider.getSigner();

    await trxBuilder.current?.sendTransaction({
      to,
      amount,
      signer
    });
  };

  return (
    <div className="flex flex-col items-center h-fit pt-4">
      <p className="text-sm text-slate-400 pb-4 text-center">
        Provide an address and an amount to send.
      </p>
      <Input
        ref={toAddressRef}
        className="my-2"
        type="text"
        placeholder="To (address)"
      />
      <Input
        ref={amountRef}
        className="my-2"
        type="number"
        placeholder="Amount (1 eERC20)"
      />
      <Button onClick={sendTransaction} className="mt-6">
        Send
      </Button>
    </div>
  );
};

export default DirectTransfer;
