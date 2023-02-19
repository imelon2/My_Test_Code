const { ethers,Contract } = require("ethers");
const {ES256KSigner,hexToBytes,verifyJWT} = require('did-jwt')
const { EthrDID } = require("ethr-did");
const {createVerifiableCredentialJwt, createVerifiablePresentationJwt,verifyPresentation,verifyCredential } =require("did-jwt-vc");
const { Resolver } =require ('did-resolver')
const { getResolver ,EthereumDIDRegistry,REGISTRY } =require ('ethr-did-resolver');

const chainNameOrId = 5;
const rpcUrl = "https://goerli.infura.io/v3/de74c835e3ef447a947651f8e7cff16b";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

const ISSUER_PK =
  "0x8d22a0aa9c43da157ebc24bc7d70c26d198381e042ab93434757752e3f0ee8e5";
const ISSUER_ADDRESS = "0xF76c9B7012c0A3870801eaAddB93B6352c8893DB";


const SUBJECT_PK =
  "0xd2ca24cdc508d5b13c946244bd68df7cbd5802087f38e5a34d2dbcf4fa8aee5a";
const SUBJECT_ADDRESS = "0x3aFA93a829a3d12D56336e6320559C8A372e76AE";


const AUDIENCE_PK =
  "0xab3fab62591d8ae45c22e91c6f61e053f2cfb471fa5a096824db0e50eafaec0f";
const AUDIENCE_ADDRESS = "0xF10A222B01a4610D417fa0AD7176C9737c8e85e5";

const wallet = (_privateKey) => {
    return new ethers.Wallet(_privateKey, provider);
  };

const AUDIENCE_Signer = wallet(AUDIENCE_PK).connect(provider);
const SUBJECT_Signer = wallet(SUBJECT_PK).connect(provider);
const ISSUER_Signer = wallet(ISSUER_PK).connect(provider);
  // Subject DID
  const ISSUER_Did = new EthrDID({
    identifier: ISSUER_ADDRESS,
    // privateKey:ISSUER_PK,
    // // signer:ISSUER_Did,
    // provider: ISSUER_Signer.provider,
    chainNameOrId,
    // txSigner: ISSUER_Signer,
    // alg: "ES256K",
  });

const SUBJECT_Did = new EthrDID({
    identifier: SUBJECT_ADDRESS,
    // privateKey:SUBJECT_PK,
    provider: SUBJECT_Signer.provider,
    chainNameOrId,
    txSigner: SUBJECT_Signer,
    alg: "ES256K",
  });


  const AUDIENCE_Did = new EthrDID({
    identifier: AUDIENCE_ADDRESS,
    // privateKey:AUDIENCE_PK,
    provider: AUDIENCE_Signer.provider,
    chainNameOrId,
    txSigner: AUDIENCE_Signer,
    alg: "ES256K",
  });


const vcPayload = {
    sub: SUBJECT_Did.did,
    vc: {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiableCredential"],
      credentialSubject: {
        user: {
          national: "Korea",
          name: "Baccalauréat en musiques numériques",
        },
      },
    },
  };

// ISSUER_Did.createSigningDelegate().then(async (result) =>{
//     const issuerDelegateKp = new EthrDID(Object.assign(Object.assign({},result.kp),{chainNameOrId}))
//     console.log(result.kp);
//     // const jwt = await issuerDelegateKp.signJWT(builtJWT.payload);
//     const vcJwt = await createVerifiableCredentialJwt(vcPayload,issuerDelegateKp);
//     console.log(vcJwt);
// });

  const signJWT = async() => {
    const _vp = await createVerifiableCredentialJwt(
        vcPayload,
        AUDIENCE_Did
      );

        console.log(_vp);
  }

//   signJWT();



const a = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Imlzc3VlciI6eyJBdXRob3JpdHkiOiJJQVRBIiwiTWVzc2FnZSI6IlRoaXMgQ3JlZGVudGlhbHMgaXMgdmFsaWQgZm9yIGFsbCBjb3VudHJpZXMgdW5sZXNzIG90aGVyd2lzZSBlbmRvcnNlZC4iLCJBZGRyZXNzIjoiMHhGNzZjOUI3MDEyYzBBMzg3MDgwMWVhQWRkQjkzQjYzNTJjODg5M0RCIn0sInVzZXIiOnsiZW1haWwiOiJpbWVsb24yNzlAZ21haWwuY29tIiwic3VyZV9uYW1lIjoiY2hvaSIsImdpdmVuX25hbWUiOiJ3b25oeWVvayIsIm5pY2tfbmFtZSI6Im1lbG9uIiwibmF0aW9uYWwiOiJLT1JFQSIsImNvdW50cnlfY29kZSI6Iis4MiIsInBob25lX251bWJlciI6MTA5MTYyODIzNSwid2FsbGV0X2FkZHJlc3MiOiIweDNhRkE5M2E4MjlhM2QxMkQ1NjMzNmU2MzIwNTU5QzhBMzcyZTc2QUUiLCJEYXRlT2ZJc3N1ZSI6IjIwMjItMTEtMjMifX19LCJzdWIiOiJkaWQ6ZXRocjoweDU6MHgzYUZBOTNhODI5YTNkMTJENTYzMzZlNjMyMDU1OUM4QTM3MmU3NkFFIiwiaXNzIjoiZGlkOmV0aHI6MHg1OjB4MDM0MTkwOGFiMmEzN2Q3NTI1MmQ2YTFlY2YyMTQ0MGQzMDM1ODBjNjk3OWMyZTJhNzI2MjNlODcxNmM2MmQ4ZDMwIn0.L6kf6lFPJ-T0YGiIQql7OKJw_F1pM8TLdHSr67ceeEjl7sOLF3rkcrp0ok5u59lOrQbp-67WXTMd2vOAsppklQA"
const didResolver = new Resolver(getResolver({ rpcUrl, name: "goerli" }));

const vpJwt = async () => {
  const vpJwt = await AUDIENCE_Did.verifyJWT(c,didResolver)

  console.log(vpJwt);
}
// vpJwt();

const t = async() => {
  return await verifyCredential(b,didResolver)
}
const run = async () => {
    const _result = await didResolver.resolve(ISSUER_Did.did)
    console.log(_result.didDocument.verificationMethod);
}
// run();


// (async() => {
//   const signature = await t();
//   console.log(signature);
// })();

const contract = new Contract(REGISTRY,EthereumDIDRegistry.abi,provider); 

const verifyValidDelegate = async(ID_Address) => {
  return await contract.validDelegate("0xF76c9B7012c0A3870801eaAddB93B6352c8893DB","0x766572694B657900000000000000000000000000000000000000000000000000",ID_Address)
}

(async()=> {
  console.log("go");
  const result = await verifyValidDelegate("0x0e1Eaf594F8645a963b9d78CBD275773e9818628")
  console.log(result);
})()