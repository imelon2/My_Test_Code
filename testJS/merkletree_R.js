const { Wallet, ethers } = require("ethers");
const { parseEther } = require("ethers/lib/utils");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { randomBytes } = require("crypto");
const Web3 = require("web3");
const web3 = new Web3(`https://polygon-mumbai.infura.io/v3/de74c835e3ef447a947651f8e7cff16b`);



const _address = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";

const addressList = new Array(15)
  .fill(0)
  .map(() => new Wallet(randomBytes(32).toString("hex")).address);
// console.log(addressList);


const merkleTree = new MerkleTree(
  addressList.concat(_address),
  keccak256,
  { hashLeaves: true, sortPairs: true }
);

const root = merkleTree.getHexRoot()
console.log(root);

const proof = merkleTree.getHexProof(keccak256(_address))
console.log(proof);

const draw = () => {
  // Example : 응모된 50개 계정 중, 10개 계정 당첨 시나리오
  const addressList = new Array(50)
  .fill(0)
  .map(() =>  web3.eth.accounts.wallet.add(randomBytes(32).toString("hex")).address)

  const winner = [];

  // 10명 무작위 추천(중복x)
  let i = 0;
  while (i < 10) {
    let n = Math.floor(Math.random() * addressList.length);
    if (! sameNum(addressList[n])) {
      winner.push(addressList[n]);
      i++;
    }
  }
  function sameNum (n) {
    return winner.find((e) => (e === n));
  }

  return winner
}

// console.log(draw());