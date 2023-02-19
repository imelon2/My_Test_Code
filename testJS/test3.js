// const abi = require("./abi.json");
// const Web3 = require("web3");
// // const net = "wss://ws-mainnet.matic.network/";
// const net = "https://polygon-rpc.com/";

// const web3 = new Web3(net);

// // web3.eth.getBlockNumber().then(data => console.log(data)) 
// //25085490
// //32318200
// const contract = new web3.eth.Contract(abi.abi, abi.address);


// for(let i = 25085490; i < 32318200; i += 9999) {
//     contract.getPastEvents(
//       "Donation",
//       { fromBlock: i, toBlock: i+9999 },
//       (event) => {
//         console.log(event);
//       }
//     ).then(function (events) {
//         console.log(events); // same results as the optional callback above
//       });;
// }

let bin = "011111"
var a = parseInt(bin, 2); // === "123"
// var dec1 = dec.toString(2);
const chainNameOrId = 5;
const kp = {
  address: '0x6874e9852DbC7231bB2182cFEDB1Df0AA80d62e2',
  privateKey: '0x05a7d952c5b7616952e93137754d6be05b74c29a29a8c1bd8caf25983e71188f',
  publicKey: '0x03eb923fa37febb4efa6635e093e1d71ae6e64bd603faf6e0ad1237fa64303ef07',
  identifier: '0x03eb923fa37febb4efa6635e093e1d71ae6e64bd603faf6e0ad1237fa64303ef07'
}

console.log(Object.assign(Object.assign({},kp),{chainNameOrId}));