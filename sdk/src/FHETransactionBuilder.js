const ethers = require("ethers");

const eERC20_ABI = require("./constants/abi/eERC20.json");
const eERC20_ADDRESS = "";

export class FHETransactionBuilder {
  constructor(address) {
    this.address = address;
  }

  async getBalance() {
    const ethereum = window.ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum);

    const eERC20Contract = new ethers.Contract(
      eERC20_ADDRESS,
      eERC20_ABI,
      provider
    );

    // call balanceOf method to get encrypted balance of this.address
    const encryptedBalance = parseInt(
      await eERC20Contract.balanceOf(this.address)
    );

    // sign a message to prove owner of this.address
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const message = "FHE Transaction Builder for the win!";
    const signature = await signer.signMessage(message);

    // TODO: call API to get decrypted balance
    const decryptedBalance = 0;

    return decryptedBalance;
  }

  async sendTransaction({ to, amount }) {
    // TODO: call the API to get encrypted amount
    const cipherAmount = "";

    const ethereum = window.ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const eERC20Contract = new ethers.Contract(
      eERC20_ADDRESS,
      eERC20_ABI,
      signer
    );

    // call the transfer function with to, cipherAmount
    await eERC20Contract.transfer(to, cipherAmount);

    return true;
  }
}
