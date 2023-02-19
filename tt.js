const ERC20ABI = require("./abi/ERC20ABI.json")
const ERC721ABI = require("./abi/ERC721ABI.json")
const Web3 = require("web3");
const web3 = new Web3("http://54.201.29.196:8545");
const account = web3.eth.accounts.wallet.add("0x776f0cd2b7f90d3e1fdbb753a31ed0cb0afeda20888e3d0f4d3d5fdec4bceb25");

const erc721_address = "0xea09CdC95bF8a348432B38aFC37Aec8ac31058eB"
const erc20_address = "0xc507D8E0114E9dd12d542be40cf7cf41aDd26031"

const _allowance = async() => {
    const ERC20Contract = new web3.eth.Contract(
        ERC20ABI,
        erc20_address
      );
      const allowance_balance = await ERC20Contract.methods
      .allowance(account.address, erc721_address)
      .call();

      console.log(allowance_balance);
}
const approve = async() => {
    const ERC20Contract = new web3.eth.Contract(
        ERC20ABI,
        erc20_address
      );
      
      const transaction = {
        from: account.address,
        gas: 1900000,
        gasPrice: web3.utils.toWei("1.5", "gwei"),
      };
      const maxInt= new web3.utils.BN("2").pow(new web3.utils.BN("256").sub(new web3.utils.BN("1")));
      const result = await ERC20Contract.methods.approve(erc721_address,maxInt).send(transaction)
      
      console.log(result);
    }

const balanceOf = async() => {
    const ERC20Contract = new web3.eth.Contract(
        ERC20ABI,
        erc20_address
      );
      const current_balance = await ERC20Contract.methods
      .balanceOf(account.address)
      .call();

      console.log(current_balance);
      console.log(web3.utils.fromWei(current_balance, 'ether') +"Toke");
}

const getBalance = async() => {
	const _balance = await web3.eth.getBalance(account.address);
    console.log(_balance);
    console.log(web3.utils.fromWei(_balance, 'ether') +"ETH");
	return _balance;
}

const minting = async() => {
    let url = "https://project1.infura-ipfs.io/ipfs/QmQkz6Zr2tT9mE3Vzci4LpBegoy8TFKH2MqyCDgaCxDhiL"
    
    const transaction = {
        from: account.address,
        gas: 1900000,
        gasPrice: web3.utils.toWei("1.5", "gwei"),
      };

    const ERC721Contract = new web3.eth.Contract(
        ERC721ABI,
        erc721_address
      );

    // const MINTING = await ERC721Contract.methods
    //   .setToken(erc20_address)
    //   .send(transaction);
    const MINTING = await ERC721Contract.methods
      .safeMint(account.address, url)
      .send(transaction);

      console.log(MINTING);
}

const reviewNFT = async () => {
    const ERC721Contract = new web3.eth.Contract(
        ERC721ABI,
        erc721_address
      );

    const _balanceOf = await ERC721Contract.methods
      .balanceOf(account.address)
      .call();

    const view =[];
    for(let i = 0; i <_balanceOf; i++) {
        const _index = await ERC721Contract.methods
        .tokenOfOwnerByIndex(account.address,i)
        .call();

        const nftData = await ERC721Contract.methods
        .tokenURI(_index)
        .call();

        view.push(nftData)
    }
      console.log(view);
}


const decreaseAllowance = async() => {
  const ERC20Contract = new web3.eth.Contract(
      ERC20ABI,
      erc20_address
    );
    console.log(account.address);
    const transaction = {
      from: account.address,
      gas: 1900000,
      gasPrice: web3.utils.toWei("1.5", "gwei"),
    };
    const maxInt= new web3.utils.BN("2").pow(new web3.utils.BN("256").sub(new web3.utils.BN("1")));
    const result = await ERC20Contract.methods.decreaseAllowance(erc721_address,maxInt).send(transaction)
    
    console.log(result);
  }

const test = async () => {
  const url = "https://project1.infura-ipfs.io/ipfs/QmQkz6Zr2tT9mE3Vzci4LpBegoy8TFKH2MqyCDgaCxDhiL"
  const result = await fetch(url).then(res => res.json())

  console.log(result.image);
// .then(out =>
//   console.log('Checkout this JSON! ', out))
// .catch(err => { throw err });
}
// approve();
// _allowance();
// balanceOf();
// getBalance();
// minting();
// reviewNFT();
// decreaseAllowance();
// test()

console.log(100E18);

