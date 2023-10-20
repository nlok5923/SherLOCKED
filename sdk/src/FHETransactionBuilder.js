const { ethers } = require("ethers");
const axios = require("axios");

const eERC20_ABI = require("./constants/abi/eERC20.json");
const eERC20_ADDRESS = "0x7cC82f365A448918Ea79e4DcA62ACeA24B0C3894";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

class FHETransactionBuilder {
  constructor(address) {
    this.address = address;
  }

  async getEncryptedBalance({ provider }) {
    // call balanceOf method to get encrypted balance of this.address
    const sendTransaction = {
      to: eERC20_ADDRESS,
      data: new ethers.utils.Interface(eERC20_ABI.abi).encodeFunctionData(
        "balanceOf",
        [this.address]
      ),
      value: "0",
      gasLimit: "100000",
    };

    console.log(" this is the amount ", sendTransaction);

    // call the transfer function with to, cipherAmount
    const txn = await provider.sendTransaction(sendTransaction);

    console.log("this is txn", txn);

    const encryptedBalance = parseInt(trx.data);

    return encryptedBalance;
  }

  async getDecryptedBalance({ signer }) {
    const encryptedBalance = await this.getEncryptedBalance({
      provider: signer,
    });

    // sign a message to prove owner of this.address
    const message = "FHE Transaction Builder for the win!";
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

    const sendTransaction = {
      to: eERC20_ADDRESS,
      data: new ethers.utils.Interface(eERC20_ABI.abi).encodeFunctionData(
        "transfer",
        [to, ethers.utils.parseUnits(encryptedAmount, 0)]
      ),
      value: "0",
      gasLimit: "100000",
    };

    console.log(" this is the amount ", sendTransaction);

    // call the transfer function with to, cipherAmount
    const txn = await signer.sendTransaction(sendTransaction);

    console.log("this is txn", txn);

    return true;
  }
}

module.exports = FHETransactionBuilder;
