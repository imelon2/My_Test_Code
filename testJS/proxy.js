const proxyData = require("./build/contracts/Proxy.json");
const testData = require("./build/contracts/test.json");

const Web3 = require("web3");
const net = "https://rpc-mumbai.maticvigil.com/";
const web3 = new Web3(net);

const pk = "b052e428982277739c016f10ebf2dc7f8deb7b8e11a168a67486ab48646e8c30";
const account = web3.eth.accounts.wallet.add(pk);

// const proxyContract = "0x6E994597603ccd521d7F581F0294264b44Fa6636";
const proxyContract = "0xbF81d89C5970F2Da8e7d9cF0B4F0e4f01cdB30EC";
const testContract = "0x9150e67f12B180a0461b2498AFF6f4de2C04Ce0C";

async function proxyTest() {
    let data, gas, gasPrice, txData,tx, var1, var2, implementationVal, adminVal;
    
    
    const textWeb3 = new web3.eth.Contract(testData.abi,testContract);
    
     tx = textWeb3.methods.setName('steve');
    //  tx = textWeb3.methods.getMetic();
     data = tx.encodeABI();
    //  gas = await web3.eth.estimateGas({from:account})
     gas = 10000000;
     gasPrice = await web3.eth.getGasPrice();
     txData = {
         from:account,
         to:proxyContract,
         data,
         gas: gas + 50000,
         gasPrice,
        //  value : "100000000000000000"
     }

    let result = await web3.eth.sendTransaction(txData);

    console.log(result);
}

async function getName() {
    let data, gas, gasPrice, txData,tx, var1, var2, implementationVal, adminVal;
    
    
    const textWeb3 = new web3.eth.Contract(testData.abi,testContract);
    tx = textWeb3.methods.getName();
    data = tx.encodeABI();
    txData = {
        // from :account,
        to : proxyContract,
        data
    }
    const result = await web3.eth.call(txData);

    console.log(web3.utils.hexToString(result));
}

getName();
// proxyTest();
