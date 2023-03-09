import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import * as keccak256 from "ethereum-cryptography/keccak";

function getAddress(privateKey) {
  const publicKey = secp.getPublicKey(privateKey);

  //console.log(publicKey);
  const rest = publicKey.slice(1);
  //console.log(rest);
  const kek = keccak256(rest);
  //console.log(kek);
  const address = kek.slice(kek.length - 20);
  //console.log(key);
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

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
