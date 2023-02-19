const {ethers} =require("ethers");
const keccak256 = require('js-sha3').keccak256
const { SigningKey } = require("ethers/lib/utils");
const rpcUrl = "https://goerli.infura.io/v3/de74c835e3ef447a947651f8e7cff16b";

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

// const privateKey = "0x85385cbaf8d36ce8ca01358f11d6d8da4b53b80b27458e4ea97519c52cfab660"
const privateKey = "0xb052e428982277739c016f10ebf2dc7f8deb7b8e11a168a67486ab48646e8c30"

const publicAddress = "0x2B814A290C1EEb7cb7e739726133798CffB32f00"

const wallet = new ethers.Wallet(privateKey, provider)

const bytes32 = ethers.utils.arrayify(privateKey)
const signingKey = new SigningKey(bytes32)

// Private Key => Public key (true : compressedPublicKey || false : publicKey)
// const result = ethers.utils.computePublicKey("0xb052e428982277739c016f10ebf2dc7f8deb7b8e11a168a67486ab48646e8c30",false)
// Private Key,computePublicKey => address
const result = ethers.utils.computeAddress("0x0341908ab2a37d75252d6a1ecf21440d303580c6979c2e2a72623e8716c62d8d30")
console.log(result);

// const address = ethers.utils.keccak256("0x7668e954e5548bbd68019992442bdb3846442774ade67847bb0f9aa0f2fd91d6e486f95b01bfcf3081be2cce8f201555fdf38110a001d72197d954d367eacd16")
//0x19222E33Afb6AE475A40c323915849B90867070D
// console.log(address.slice(26));
// var crypto = require("crypto");

// var id = crypto.randomBytes(32).toString('hex')
// console.log(id);

// // const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
// const signer = provider.getSigner(address)

// signer.getBalance().then((data) => console.log(ethers.utils.formatEther(data)))

// const _signer = new ethers.VoidSigner(privateKey,provider)

// const tx = {
//     from:signer,
//     to:"0x488cE201b94191abfE897Bf214FdE317F66cb462",
//     value:ethers.utils.parseEther("0.001"),
//     gasPrice: ethers.utils.parseUnits("1.5","gwei")
// }
// wallet.sendTransaction(tx).then((Data) => console.log(Data))
// const wallet = ethers.Wallet.createRandom()
// wallet.privateKey
// console.log(ethers.Wallet.createRandom());

// {
//     address: '0x2B814A290C1EEb7cb7e739726133798CffB32f00',
//     privateKey: '0x85385cbaf8d36ce8ca01358f11d6d8da4b53b80b27458e4ea97519c52cfab660',
//     publicKey: '0x02b238b89abf707218c9184f3efd9568973d44f3ae5905e8f2bdcf9b2c90a40954',
//     identifier: '0x02b238b89abf707218c9184f3efd9568973d44f3ae5905e8f2bdcf9b2c90a40954'
//   }

let _gasPrice = ethers.utils.parseUnits("1.5","gwei");

const txR = {
    gasLimit : "120000",
    gasPrice: ethers.utils.formatUnits(_gasPrice,0)
}

// ethers.utils.formatUnits( ethers.utils.parseUnits("1","ether"),0)