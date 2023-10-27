const { ethers } = require("ethers");
const axios = require("axios");
const { Alchemy, Network } = require("alchemy-sdk");
require("dotenv").config();
const { CovalentClient } = require("@covalenthq/client-sdk");

const eERC20_ABI = require("./constants/abi/eERC20.json");

const ADDRESS = {
  "0x8274F": "0xFEd1642e18C6Ff92e52d6E55a58525cdd1785608", // scroll sepolia
  "0x5a2": "0xFEd1642e18C6Ff92e52d6E55a58525cdd1785608", // 1442 zkevm testnet
  "0x1389": "0x24D5Ab77888c20430EB92402096882A2C2203c44",
  "0xAA36A7": "0x7cC82f365A448918Ea79e4DcA62ACeA24B0C3894", // sepolia 11155111
  "0x7A69": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" // erc20 locally deployed
};

const tokenContractAddresses = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
// '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';

const chainIdToChainName = {
  "0x8274F": "scroll-sepolia-testnet",
  "0x1389": "mantle-testnet",
};

const api = axios.create({
  baseURL: "https://sherlocked.azurewebsites.net/",
  // baseURL: "http://localhost:3000",
});

class FHETransactionBuilder {
  /**
   * FHETransactionBuilder constructor.
   * @param {string} address - The address to use for the transaction.
   * @param {string} chainId - The chain to use for the transaction in hex
   */
  constructor(address, chain) {
    this.address = address;
    this.chainId = chain;
  }

  async getBalance() {
    console.log("actual key", process.env.ALCHEMY_KEY);

    let config;
    // if (this.chainId === "0x5a2" || this.chainId === "0xAA36A7") {
    //   if (this.chainId === "0x5a2") {
    //     config = {
    //       apiKey: "rr0lriuMLr2BSPy-2FMXFGJuo7Jffoze",
    //       network: Network.POLYGONZKEVM_TESTNET,
    //     };

    //     if (this.chainId === "0xAA36A7") {
    //       config = {
    //         apiKey: "5gjoTutV1hu9Jzhd2QgDJqS9hYOJuv7Q",
    //         network: Network.ETH_SEPOLIA,
    //       };
    //     }
    //   }

    //   const alchemy = new Alchemy(config);

    //   //The below token contract address corresponds to USDT
      // const tokenContractAddresses = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      //  [ADDRESS[this.chainId]];
      console.log(' token address', tokenContractAddresses);

    //   const data = await alchemy.core.getTokenBalances(
    //     this.address,
    //     tokenContractAddresses
    //   );
    //   console.log(" output data ", data);

    //   const balanceInBigNumber = ethers.BigNumber.from(
    //     data.tokenBalances[0].tokenBalance
    //   );

    //   return balanceInBigNumber.toString();
    // } else {
    //   const covalentKey = 'ckey_92f7a815779a4451a77bb98f392';
    //   const client = new CovalentClient(covalentKey);
    //   const resp = await client.BalanceService.getTokenBalancesForWalletAddress(chainIdToChainName[this.chainId],this.address);
    //   const contractAddress = ADDRESS[this.chainId];
    //   const balances = resp.items.filter(data => data.contract_address.toLowerCase() === contractAddress);
    //   return balances[0].balance;
    //   // return "73786976294838206471" // returning this as balance for now which is equivalent to 1 token
    // }
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    console.log(' this is provider ', provider);
    const contract = new ethers.Contract(tokenContractAddresses, eERC20_ABI.abi, provider);
    console.log(' this is contract ', contract);

    const balance = await contract.balanceOf(this.address);
    console.log('balance fetched from contract', balance);

        const balanceInBigNumber = ethers.BigNumber.from(
        balance._hex
      );

      console.log(' this is balance ', balanceInBigNumber);

      return balanceInBigNumber.toString();

    return "73786976294838223271";
  }

  async getEncryptedBalance({ provider }) {
    const balance = await this.getBalance();

    return balance;
    // call balanceOf method to get encrypted balance of this.address
    // const sendTransaction = {
    //   to: ADDRESS[this.chainId],
    //   data: new ethers.utils.Interface(eERC20_ABI.abi).encodeFunctionData(
    //     "balanceOf",
    //     [this.address]
    //   ),
    //   value: "0",
    //   gasLimit: "100000",
    // };
    // console.log(' provider in sdk ', provider)
    //     // console.log(" this is the amount ", sendTransaction);
    //     const erc20Contract = new ethers.Contract(
    //       ADDRESS[this.chainId],
    //       eERC20_ABI.abi,
    //       provider
    //     );

    //     const balance = await erc20Contract.balanceOf(ADDRESS[this.chainId]);
    //     console.log(' this is balance ', balance);

    //     // call the transfer function with to, cipherAmount
    //     // const txn = await provider.sendTransaction(sendTransaction);

    //     // console.log("this is txn", txn);

    //     const encryptedBalance = 34234;
    // parseInt(txn.data);

    // return encryptedBalance;
  }

  async getDecryptedBalance({ signer }) {
    const encryptedBalance = await this.getEncryptedBalance({
      provider: signer,
    });

    // sign a message to prove owner of this.address
    const message = `I want to know my balance in decrypted form for the address ${this.address}`;
    const signature = await signer.signMessage(message);

    // call network of nodes to get decrypted balance
    const resp = await api.post("/decrypt-balance", {
      encryptedBalance,
      signature,
      address: this.address,
    });

    const { decryptedBalance } = resp.data;

    return decryptedBalance;
  }

  async sendTransaction({ to, amount, signer }) {
    // call the network of nodes to get encrypted amount
    const resp = await api.post("/encrypt-amount", {
      plainTextAmount: amount,
    });

    console.log(" this is rs p", resp);

    const { encryptedAmount } = resp.data;

    console.log("this is amount ", amount);

    console.log("encrpted amt ", encryptedAmount);
    console.log("paruint  amt ", ethers.utils.parseUnits(encryptedAmount, 0));

    console.log("this is signer ", signer);
    // ADDRESS[this.chainId]
    const sendTransaction = {
      to:  tokenContractAddresses,
      data: new ethers.utils.Interface(eERC20_ABI.abi).encodeFunctionData(
        "transfer",
        [to, ethers.utils.parseUnits(encryptedAmount, 0)]
      ),
      value: "0",
      // gasLimit: "100000",
    };

    console.log(" this is the amount ", sendTransaction);

    // call the transfer function with to, cipherAmount
    const txn = await signer.sendTransaction(sendTransaction);

    console.log("this is txn", txn);

    return true;
  }
}

module.exports = FHETransactionBuilder;
