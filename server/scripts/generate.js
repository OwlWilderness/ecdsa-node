const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const key = secp.utils.randomPrivateKey();

console.log('private key:',toHex(key));

const pubkey = secp.getPublicKey(key);

console.log('public key:', toHex(pubkey));

console.log('address:', toHex(getAddress(pubkey)))

function getAddress(publicKey) {
    //console.log(publicKey);
    const rest = publicKey.slice(1);
    //console.log(rest);
    const kek = keccak256(rest);
    //console.log(kek);
    const key = kek.slice(kek.length - 20);
    //console.log(key);
    return key;

}