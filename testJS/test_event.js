/* 공식문서 : https://docs.ethers.io/v5/api/contract/contract/#Contract-off */
const vrfABI = require('../build/contracts/VRFv2Consumer.json').abi;
const dotenv = require('dotenv');
dotenv.config();

const { ethers,Contract } = require("ethers");
const vrfAddress = "0x8E1AF799194AbEaac0ABC1753D45f70d189dCd61";
const url = process.env.MUMBAI_WEBSOCKET_URL;
const provider = new ethers.providers.WebSocketProvider(url);


const _contract = new Contract(vrfAddress,vrfABI,provider);

_contract.once("Result",(_1,_2,_3,_4,event) => {
    console.log(Number(_1),Number(_2),Number(_3),Number(_4));

    // console.log(event);
})

// _contract.on("Result",(_1,_2,_3,_4,event) => {
//     console.log(Number(_1),Number(_2),Number(_3),Number(_4));

//     // console.log(event);
// })

