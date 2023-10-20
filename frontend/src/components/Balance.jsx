import { useState } from "react";
import { Button } from "./ui/button";

const Balance = () => {
  const [isBalanceEncrypted, setIsBalanceEncrypted] = useState(true);
  const [balance, setBalance] = useState("Loading...");
  return (
    <div className="flex flex-col justify-center items-center border-2 gap-y-3 border-purple-100 p-4">
      <div className="flex gap-x-2 w-fit">
        <h2 className="w-fit">Balance:</h2>
        <p className="w-fit">{balance}</p>
      </div>
      <Button className="w-fit">
        {isBalanceEncrypted ? "Decrypt" : "Hide"}
      </Button>
    </div>
  );
};

export default Balance;
