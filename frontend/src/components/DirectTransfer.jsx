"use client";

import { useEffect } from "react";
import { useWallets } from "@web3-onboard/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FHETransactionBuilder } from "sherlocked-sdk";

const DirectTransfer = () => {
  const connectedWallets = useWallets();

  const trxBuilder = useRef(null);
  const toAddressRef = useRef(null);
  const amountRef = useRef(null);

  useEffect(() => {
    if (!connectedWallets[0]?.accounts[0]?.address) {
      return;
    }

    trxBuilder.current = new FHETransactionBuilder(
      connectedWallets[0].accounts[0].address
    );
  }, [connectedWallets]);

  const sendTransaction = async () => {
    const to = toAddressRef.current.value;
    const amount = amountRef.current.value;

    if (!to || !amount) {
      alert("Please provide a valid address and amount.");
      return;
    }

    await trxBuilder.current?.sendTransaction({
      to,
      amount,
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
