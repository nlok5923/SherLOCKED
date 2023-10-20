const { ethers } = require("ethers");
const axios = require("axios");

const eERC20_ABI = require("./constants/abi/eERC20.json");
const eERC20_ADDRESS = "";

class FHETransactionBuilder {
  constructor(address) {
    this.address = address;
  }

  async getBalance({ signer }) {
    const eERC20Contract = new ethers.Contract(
      eERC20_ADDRESS,
      eERC20_ABI,
      signer
    );

    // call balanceOf method to get encrypted balance of this.address
    const encryptedBalance = parseInt(
      await eERC20Contract.balanceOf(this.address)
    );

    // sign a message to prove owner of this.address
    const message = "FHE Transaction Builder for the win!";
    const signature = await signer.signMessage(message);

    // call network of nodes to get decrypted balance
    const { decryptedBalance } = axios.post("/decrypt-balance", {
      encryptedBalance,
      signature,
      address: this.address,
    });

    return decryptedBalance;
  }

  async sendTransaction({ to, amount, signer }) {
    // call the network of nodes to get encrypted amount
    const { encryptedAmount } = axios.post("/encrypt-amount", {
      plainTextAmount: amount,
    });

    const eERC20Contract = new ethers.Contract(
      eERC20_ADDRESS,
      eERC20_ABI,
      signer
    );

    // call the transfer function with to, cipherAmount
    await eERC20Contract.transfer(to, encryptedAmount);

    return true;
  }
}

module.exports = FHETransactionBuilder;
