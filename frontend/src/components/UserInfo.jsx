import { useConnectWallet } from "@web3-onboard/react";
import { useMemo } from "react";

const constainerStyles = "w-fit mx-auto ";

const UserInfo = () => {
  const [{ wallet }] = useConnectWallet();

  const userName = useMemo(() => {
    if (wallet?.accounts && wallet.accounts[0]?.address) {
      const address = wallet.accounts[0].address;
      if (address.toLowerCase() === "0x70997970C51812dc3A010C7d01b50e0d17dc79C8".toLowerCase()) {
        return "Bob";
      }
      if (address.toLowerCase() === "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720".toLowerCase()) {
        return "Alice";
      }
    }
    return "Anon";
  }, [wallet]);

  if (!wallet?.accounts || !wallet.accounts[0]?.address) {
    return <div className={constainerStyles}>Wallet isn't connected</div>;
  }

  return (
    <div
      className={
        constainerStyles +
        "text-[#702963] font-black drop-shadow-lg bg-purple-100 py-1 px-3 rounded text-center"
      }
    >
      {userName} ({wallet.accounts[0].address.substring(0, 15) + "..."})
    </div>
  );
};

export default UserInfo;
