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

/*
PS C:\git\au\ecdsa-node\server> node scripts\generate.js
private key: c3e9abefe454dfcc18baa4a22affa28642fab0fff0de6b9c088a35b66d2e699a
public key: 04bb77f3757aa8c7a4b945499f253f9e908c607560d23b9c51a4e70fd2b3db77dafb35eb4a7b43b79f712206c6d4b11778c95097ceae0cbe71d5baba30ff49c2e0
address: e8f2ba1f995709bd238f5edad59d0eca161c0257
PS C:\git\au\ecdsa-node\server> node scripts\generate.js
private key: 6784026cd8bf6057ccbe033075399860f4ede020ef63baab60e56ae76a8fb27f
public key: 04cdfb2a53debf99354ba2a93a4b452f920084efc9026d0dce2c68cd38c3d8cc56f93a967742db69d1308f20db3fbe8c402d605918f991f4f5faf1beefa0716472
address: c1c9511c77d73fd0be9cfa3515c946439ad2ec88
PS C:\git\au\ecdsa-node\server> node scripts\generate.js
private key: 867eaf9feb7a9edcf56d8b2dc84b9e86fe819f2207b1fa15779a840052016b09
public key: 04b7ee98a014e8642f5dc5ca6f01b9b7960ab1485558ab521b7c50617d81e629c5b7676314ab76b0b2b74f3667a423b9e2d458ddeb4db0aace4ffda1c195a67aa0
address: 254980823c4e541c8b2bbf82d34fe317a12db57b
*/