const ethers = require("ethers");
const express = require("express");
const cors = require('cors')

const app = express();
const port = 3001;

const constant = BigInt("73786976294838206464");
const corsOptions = {
  origin:
  "*",
  credentials: true,
  optionSuccessStatus: 200,
};


app.use(express.json())
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("This is the network of nodes");
});

const logBase7 = (x) => {
  return Math.log(x) / Math.log(7);
}

app.post("/decrypt-balance", (req, res) => {
  const { encryptedBalance, signature, address } = req.body;
  console.log(' this is body ', req.body)

  // Verify the signature
  const message = `I want to know my balance in decrypted form for the address ${address}`;
  const derivedAddress = ethers.verifyMessage(message, signature);
  console.log('verified address ', derivedAddress);

  console.log('user address', address);

  const isSignatureValid = String(derivedAddress).toLowerCase() === String(address).toLowerCase();

  if (!isSignatureValid) {
    res.status(401).json({ message: "Invalid signature received" });
  }

  // decrypt the balance
  const encryptedAmount = BigInt(encryptedBalance);

  const amount = encryptedAmount - constant; 
  const decryptedBalance = logBase7(Number(amount));

  res.json({ decryptedBalance });
});

app.post("/encrypt-amount", (req, res) => {
  console.log('request', req.body);
  // console.log(req)

  const { plainTextAmount } = req.body;

  const amount = parseInt(plainTextAmount);
  const tokenAmount = BigInt(String(7 ** amount));
  // encrypt the amount
  const encryptedAmount = String(tokenAmount + constant);
  console.log(' this is ep amt ', encryptedAmount);
  res.json({ encryptedAmount });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
