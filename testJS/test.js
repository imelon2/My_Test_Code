const Web3 = require("web3");
const net = "https://polygon-rpc.com/";
const web3 = new Web3(net);
const { ethers } = require("ethers");

let result = ethers.utils.parseUnits("40","gwei")
let result1 = web3.utils.toWei("40", "gwei")
console.log(Number(result._hex).toString());
console.log(typeof result1);