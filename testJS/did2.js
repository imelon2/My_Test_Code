const {EthrDID, DelegateTypes} = require("ethr-did")
const {ethers} =require("ethers");
const {createVerifiableCredentialJwt, createVerifiablePresentationJwt,verifyPresentation,verifyCredential } =require("did-jwt-vc");
const { Resolver } =require ('did-resolver')
const { getResolver } =require ('ethr-did-resolver')

const chainNameOrId = 5;
const rpcUrl = "https://goerli.infura.io/v3/de74c835e3ef447a947651f8e7cff16b";


const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
// const address = "0xD18c6516E3F7650DA7149eBD2E244Cd69a19C7Cf"
// const privateKey = "286005f20930d3ba4284f738ff49c73a15072b8ffad68d114955732f3fcc3c60"
const address = "0xEaE8Af157623269a6461A0fb305A4a161048e511"
const privateKey = "b052e428982277739c016f10ebf2dc7f8deb7b8e11a168a67486ab48646e8c30"
const wallet = new ethers.Wallet(privateKey, provider)
// const signer = provider.getSigner(wallet.address)
const signer = wallet.connect(provider)


const ethrDid = new EthrDID({
    // DID Identifier
    identifier: address,
    provider:signer.provider,
    chainNameOrId,
    txSigner:signer,
    alg: "ES256K"
  });


// ethrDid.createSigningDelegate().then((data) => console.log(data.kp))
// const kp = EthrDID.createKeyPair()
// console.log(kp);

const didResolver = new Resolver(getResolver({ rpcUrl, name: "goerli" }));

const run = async () => {
    const _result = await didResolver.resolve(ethrDid.did)
    return _result.didDocument
}

const a = await run();

(async() => {
    const result = await run();
    console.log(result);
})();

