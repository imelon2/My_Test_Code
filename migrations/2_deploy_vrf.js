const _vrf = artifacts.require("VRFv2Consumer");
const dotenv = require('dotenv');
dotenv.config();

module.exports =async function (deployer, network, addresses) {
    if(network === "polyTestnet") {
       await deployer.deploy(_vrf,process.env.SUBSCRIPTION_ID);
    //    const Vrf = await _vrf.deployed();
    }
  };
  