"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DirectTransfer = () => {
  return (
    <div className="flex flex-col items-center h-fit pt-4">
      <p className="text-sm text-slate-400 pb-4 text-center">
        Provide an address and an amount to send.
      </p>
      <Input className="my-2" type="text" placeholder="To (address)" />
      <Input className="my-2" type="number" placeholder="Amount (1 eERC20)" />
      <Button className="mt-6">Send</Button>
    </div>
  );
};

export default DirectTransfer;
