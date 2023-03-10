import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import * as keccak from "ethereum-cryptography/keccak";
import * as utils from "ethereum-cryptography/utils";

function getAddress(privateKey) {
  console.log(privateKey)
  const publicKey = secp.getPublicKey(privateKey);

  console.log(publicKey);
  const rest = publicKey.slice(1);
  console.log(rest);
  const kek = keccak.keccak256(rest);
  console.log(kek);
  const address = utils.toHex(kek.slice(kek.length - 20));
  console.log(address);
  return address;

}

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    address = getAddress(privateKey);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type Private Key" value={privateKey} onChange={onChange}></input>
      </label>

      <div> Address: {address} </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
