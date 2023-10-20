"use client";

import { useRef, useEffect } from "react";
import { useConnectWallet, useWallets } from "@web3-onboard/react";
import { ethers } from "ethers";
import { FHETransactionBuilder } from "sherlocked-sdk";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import getLLMResponse from "@/utils/getLLMResponse";

const IntentTransfer = () => {
  const [{ wallet }] = useConnectWallet();
  const connectedWallets = useWallets();

  const trxBuilder = useRef(null);
  const intentInputRef = useRef(null);

  useEffect(() => {
    if (!connectedWallets[0]?.accounts[0]?.address) {
      return;
    }

    trxBuilder.current = new FHETransactionBuilder(
      connectedWallets[0].accounts[0].address
    );
  }, [connectedWallets]);

  const handleExecute = async () => {
    const intent = intentInputRef.current.value;
    console.log(intent);

    const amount = await getLLMResponse({
      question:
        "What amount of eERC20 tokens is the user trying to transfer? I want only the amount in number without the token name.",
      statement: intent,
    });

    const to = await getLLMResponse({
      question: "What is the recipient's address or ens?",
      statement: intent,
    });

    // create an ethers provider
    let provider = new ethers.BrowserProvider(wallet.provider, "any");

    if (!provider) {
      alert("Please connect a wallet first.");
      return;
    }

    if (!to || !amount) {
      alert("Please provide a valid address and amount.");
      return;
    }

    const signer = await provider.getSigner();

    await trxBuilder.current?.sendTransaction({
      to,
      amount,
      signer,
    });
  };

  return (
    <div className="flex flex-col items-center h-hit pt-4">
      <p className="text-sm text-slate-400 pb-4 text-center">
        Send an intent in natural language to transfer tokens.
      </p>
      <Input
        className="mt-2"
        type="text"
        ref={intentInputRef}
        placeholder="Transfer vitalik.eth 1 eERC20"
      />
      <Button onClick={handleExecute} className="mt-6">
        Execute
      </Button>
    </div>
  );
};

export default IntentTransfer;
