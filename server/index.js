const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
import * as secp from "ethereum-cryptography/secp256k1";
import * as keccak from "ethereum-cryptography/keccak";
import * as utils from "ethereum-cryptography/utils";

app.use(cors());
app.use(express.json());

const balances = {
  "e8f2ba1f995709bd238f5edad59d0eca161c0257": 100,
  "c1c9511c77d73fd0be9cfa3515c946439ad2ec88": 50,
  "254980823c4e541c8b2bbf82d34fe317a12db57b": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  console.log(balance)
  res.send({ balance });
});

app.post("/send", (req, res) => {

  //get the signature from client
  //recover the address and set as sender
  console.log(req.body)
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
