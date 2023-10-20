"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const IntentTransfer = () => {
  return (
    <div className="flex flex-col items-center h-hit pt-4">
      <p className="text-sm text-slate-400 pb-4 text-center">
        Send an intent in natural language to transfer tokens.
      </p>
      <Input
        className="mt-2"
        type="text"
        placeholder="Transfer vitalik.eth 1 eERC20"
      />
      <Button className="mt-6">Execute</Button>
    </div>
  );
};

export default IntentTransfer;
