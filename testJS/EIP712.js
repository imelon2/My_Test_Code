const {ethers} =require("ethers");
const {TypedDataUtils} = require('ethers-eip712') 

// block chain RPC URL
const rpcUrl = "https://goerli.infura.io/v3/de74c835e3ef447a947651f8e7cff16b";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const privateKey = "0xb052e428982277739c016f10ebf2dc7f8deb7b8e11a168a67486ab48646e8c30"

const wallet = (_privateKey) => {
    return new ethers.Wallet(_privateKey, provider);
  };

const signer = wallet(privateKey).connect(provider);

const EIP712Domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
  ];

  const SignUpData = [
    { name: "_name", type: "string" },
    { name: "_age", type: "uint8" },
  ];

  const DomainData = {
    chainId: 1, // Network Chain ID
    name: "EIP712_BTD", // EIP Name
    verifyingContract: "0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c", // EIP Contract Address
    version: "1", // version
  };

  const SignUpDataData = {
    _name: "won",
    _age: 28
  };

  const SignatureParams = {
    domain: DomainData,
    message: SignUpDataData,
    primaryType: "SignUpData",
  types: {
    EIP712Domain: EIP712Domain,
    SignUpData: SignUpData,
  },
};

const getSignature_dataV4 = async() => {
    const sign = TypedDataUtils.encodeDigest(SignatureParams)

    const signature = await signer.signMessage(sign)

    return signature;
}

(async() => {
    const signature = await getSignature_dataV4();
    console.log(signature);
})();
