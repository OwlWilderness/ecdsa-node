
const secp = require("ethereum-cryptography/secp256k1");
const keccak = require("ethereum-cryptography/keccak");
const utils = require("ethereum-cryptography/utils");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

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

  const { message, recipient } = req.body;

  //console.log( "MSG",message)
  //console.log( "SIG",message.sig)
  //console.log( "REC", message.rec)
  const amount = message.msg.amount;
  const msgkek = keccak.keccak256(utils.utf8ToBytes(JSON.stringify(message.msg)));

  const pubkey = secp.recoverPublicKey(msgkek, message.sig, message.rec);
  //console.log("PUB", utils.toHex(pubkey))
  const sender = getAddrFromPubKey(pubkey);
  //console.log(sender)
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

function getAddrFromPubKey(publicKey) {


  const rest = publicKey.slice(1);

  const kek = keccak.keccak256(rest);

  const address = utils.toHex(kek.slice(kek.length - 20));

  return address;

}