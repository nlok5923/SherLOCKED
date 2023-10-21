var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const constant = BigInt("73786976294838206464");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("This is the network of nodes");
});

const logBase7 = (x) => {
  return Math.log(x) / Math.log(7);
};

app.post("/decrypt-balance", (req, res) => {
  const { encryptedBalance, signature, address } = req.body;
  console.log(" this is body ", req.body);

  // Verify the signature
  const message = `I want to know my balance in decrypted form for the address ${address}`;
  const derivedAddress = ethers.verifyMessage(message, signature);
  console.log("verified address ", derivedAddress);

  console.log("user address", address);

  const isSignatureValid =
    String(derivedAddress).toLowerCase() === String(address).toLowerCase();

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
  console.log("request", req.body);
  // console.log(req)

  const { plainTextAmount } = req.body;

  const amount = parseInt(plainTextAmount);
  const tokenAmount = BigInt(String(7 ** amount));
  // encrypt the amount
  const encryptedAmount = String(tokenAmount + constant);
  console.log(" this is ep amt ", encryptedAmount);
  res.json({ encryptedAmount });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
