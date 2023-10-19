const ethers = require("ethers");
const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("This is the network of nodes");
});

app.post("/decrypt-balance", (req, res) => {
  const { encryptedBalance, signature, address } = req.body;

  // Verify the signature
  const message = "FHE Transaction Builder for the win!";
  const derivedAddress = ethers.verifyMessage(message, signature);
  const isSignatureValid = derivedAddress === address;

  if (!isSignatureValid) {
    res.status(401).json({ message: "Invalid signature received" });
  }

  // TODO: decrypt the balance
  const decryptedBalance = "";

  res.json({ decryptedBalance });
});

app.post("/encrypt-amount", (req, res) => {
  const { plainTextAmount } = req.body;

  // TODO: encrypt the amount
  const encryptedAmount = "";

  res.json({ encryptedAmount });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
