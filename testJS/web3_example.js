const Web3 = require("web3");
const web3 = new Web3(`https://polygon-mumbai.infura.io/v3/de74c835e3ef447a947651f8e7cff16b`);
const abi = require('../abi/test2.json')
const Ticketing_abi = require('../abi/Ticketing.json').abi
const PARK = require('../abi/PARK.json').abi

const account = web3.eth.accounts.wallet.add("0x0602465e671a66465bb503b8e4f73fe09eb86d4cb624b30ba4151cc10b73f89a");

const transaction = {
    from: account.address,
    gas: 19000000,
    gasPrice: web3.utils.toWei("40", "gwei"),
  };

const Contract = new web3.eth.Contract(
    abi,
    "0xe826EE066aCc90Fbe2A9B24C6EF0bF8b5Cdc901e"
  );

const call = async() => {
    const result = await Contract.methods.callFunc().call();
    console.log(result);
}

const callPublic = async() => {
    const result = await Contract.methods.num().call();
    console.log(result);
}

const callWirhParam = async() => {
    const result = await Contract.methods.callFuncWithParam(10).call();
    console.log(result);
}

const send = async() => {
    const result = await Contract.methods.sendFunc(10).send(transaction);
    console.log(result);
}

const getGasPrice = async() => {
    return await web3.eth.getGasPrice()
}

const _encodePacked = async() => {
    const result = web3.utils.encodePacked(
        {value: "IU", type: 'string'},
      );
      console.log(result);
      let theValueYouNeed = web3.utils.soliditySha3({type: 'string', value: '2023 CRAVITY FAN-CON 〈Dear My LUVITY〉'});
      console.log(theValueYouNeed);
      console.log(web3.utils.soliditySha3(result));
}

// 응모 확인 여부
const isEnter = async() => {
    const contract = new web3.eth.Contract(Ticketing_abi,"0xbeeB8FBC2abc21E3C5FedD6654939De4F3A2d243");
    const cost = await contract.methods.isEntry("0xed5c8b44a088a3e1956a551b780c2b5913a7dc9af6225c132ea2170015875de9","0x78DC540cf3A5F76C0F871fc53a3eE3e0dD113C09").call();
    console.log(cost);
  }
//   isEnter();
const registerTicket = async() => {
    let cost = "130000000000000000000000"
    let theValueYouNeed = web3.utils.soliditySha3({type: 'string', value: '2023 CRAVITY FAN-CON 〈Dear My LUVITY〉'});
    console.log(theValueYouNeed);
    // const transaction = {
    //     from: account.address,
    //     gas: 19000000,
    //     gasPrice: await getGasPrice(),
    //   };
    //   const contract = new web3.eth.Contract(
    //     PARK,
    //     "0x557f1c23952BD96fe356Af349d1CbC59a3E0Ef4F"
    //   );
    
    //   const result = await contract.methods.registerTicket(theValueYouNeed,cost).send(transaction)
    //   console.log(result);
}

_encodePacked();