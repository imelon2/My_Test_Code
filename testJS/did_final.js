const { ethers } = require("ethers");
const {ES256KSigner,hexToBytes,verifyJWT} = require('did-jwt')
const { EthrDID,DelegateTypes } = require("ethr-did");
const {createVerifiableCredentialJwt, createVerifiablePresentationJwt,verifyPresentation,verifyCredential } =require("did-jwt-vc");
const { Resolver } =require ('did-resolver')
const { getResolver } =require ('ethr-did-resolver');


const chainNameOrId = 5;
const rpcUrl = "https://goerli.infura.io/v3/de74c835e3ef447a947651f8e7cff16b";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);


const ISSUER_PK =
  "0x8d22a0aa9c43da157ebc24bc7d70c26d198381e042ab93434757752e3f0ee8e5";
const ISSUER_ADDRESS = "0xF76c9B7012c0A3870801eaAddB93B6352c8893DB";
const PublicKEYENc = "z1RYkSD9lFFXqP2JNlctwg2woEmxwUOPS8HzLAO8eC0="

const SUBJECT_PK =
  "0xd2ca24cdc508d5b13c946244bd68df7cbd5802087f38e5a34d2dbcf4fa8aee5a";
const SUBJECT_ADDRESS = "0x3aFA93a829a3d12D56336e6320559C8A372e76AE";
const AUDIENCE_PK =
  "0xab3fab62591d8ae45c22e91c6f61e053f2cfb471fa5a096824db0e50eafaec0f";
const AUDIENCE_ADDRESS = "0xF10A222B01a4610D417fa0AD7176C9737c8e85e5";

const wallet = (_privateKey) => {
  return new ethers.Wallet(_privateKey, provider);
};
// const signer = provider.getSigner(wallet.address)
const ISSUER_Signer = wallet(ISSUER_PK).connect(provider);
const SUBJECT_Signer = wallet(SUBJECT_PK).connect(provider);
const AUDIENCE_Signer = wallet(AUDIENCE_PK).connect(provider);


// Tsigner().then(a => a(SUBJECT_PK).then(b => console.log(b)))
// Issuer DID
const ISSUER_Did = new EthrDID({
  identifier: ISSUER_ADDRESS,
  privateKey:ISSUER_PK,
  // signer:ISSUER_Did,
  provider: ISSUER_Signer.provider,
  chainNameOrId,
  txSigner: ISSUER_Signer,
  alg: "ES256K",
});
// const Tsigner = ES256KSigner(hexToBytes(PublicKEYENc), true)
// console.log(Tsigner);
// console.log(ISSUER_Did);

// Subject DID
const SUBJECT_Did = new EthrDID({
  identifier: SUBJECT_ADDRESS,
  // privateKey:SUBJECT_PK,
  provider: SUBJECT_Signer.provider,
  chainNameOrId,
  txSigner: SUBJECT_Signer,
  alg: "ES256K",
});

// Audience DID
const AUDIENCE_Did = new EthrDID({
  identifier: AUDIENCE_ADDRESS,
  provider: AUDIENCE_Signer.provider,
  chainNameOrId,
  txSigner: AUDIENCE_Signer,
  alg: "ES256K",
});
// console.log(ISSUER_Did.signer(PublicKEYENc));
const claims =  {
    user: {
      national: 'Korea',
      name: 'Baccalauréat en musiques numériques'
    }
  }

// const builtJWT = {
//     payload: {
//         iss: ISSUER_Did.did,
//         sub: SUBJECT_Did.did,
//         aud: AUDIENCE_Did.did,
//         privateClaim: claim,
//     }
// };
const vcPayload = {
    sub: SUBJECT_Did.did,
    nbf: 1562950282, 
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        user: {
          national: 'Korea',
          name: 'Baccalauréat en musiques numériques'
        }
      }
    }
  }

// (1) ISSUER : Add Delegate to ERC1056
// ISSUER_Did.createSigningDelegate().then(async (result) =>{
//     const issuerDelegateKp = new EthrDID(Object.assign(Object.assign({},result.kp),{chainNameOrId}))
//     console.log(result.kp);
//     // const jwt = await issuerDelegateKp.signJWT(builtJWT.payload);
//     const vcJwt = await createVerifiableCredentialJwt(vcPayload,issuerDelegateKp);
//     console.log(vcJwt);
// });
ISSUER_Did.createSigningDelegate(DelegateTypes.veriKey,86400).then((data) => console.log(data.kp))

// const test = async () => {
//     const Kp = EthrDID.createKeyPair()
//     const issuerDelegateKp = new EthrDID(Object.assign(Object.assign({},Kp),{chainNameOrId}))
//     // console.log(issuerDelegateKp);
//     const vcJwt = await createVerifiableCredentialJwt(vcPayload,issuerDelegateKp);
//     console.log(vcJwt);
// }
// test();
const _vcJwt = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InVzZXIiOnsibmF0aW9uYWwiOiJLb3JlYSIsIm5hbWUiOiJCYWNjYWxhdXLDqWF0IGVuIG11c2lxdWVzIG51bcOpcmlxdWVzIn19fSwic3ViIjoiZGlkOmV0aHI6MHg1OjB4Rjc2YzlCNzAxMmMwQTM4NzA4MDFlYUFkZEI5M0I2MzUyYzg4OTNEQiIsImlzcyI6ImRpZDpldGhyOjB4NToweDAyNGM5NTQ2YmE4M2Q1NDE5MjM5MDAzZjc2ODlhOWJhOWI1M2RhNjhlYzgzMzI3NDc1NmM5NTkxMTBhZTM1ZjRhMiJ9.5TKvguUUKvfEO3_dzu33Haw5O-iVKMIpFk4ZvU_vv-DPJS1oeEv3EuypMYD6Pnz-RecyfJAoDKe2W3V0jPtbZAA"


const vpPayload = {
    vp: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation'],
      verifiableCredential: [_vcJwt]
    }
  }

  // (2) Subject : create VP
// const vpJwt = async () => {
//     const vpJwt = await SUBJECT_Did.verifyJWT(_vcJwt)

//     console.log(vpJwt);
// }
// const vpJwt = async () => {
//     const vpJwt = await createVerifiablePresentationJwt(vpPayload, ISSUER_Did)

//     console.log(vpJwt);
// }
// vpJwt();


const _vpJwt = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0luVnpaWElpT25zaWJtRjBhVzl1WVd3aU9pSkxiM0psWVNJc0ltNWhiV1VpT2lKQ1lXTmpZV3hoZFhMRHFXRjBJR1Z1SUcxMWMybHhkV1Z6SUc1MWJjT3BjbWx4ZFdWekluMTlmU3dpYzNWaUlqb2laR2xrT21WMGFISTZNSGcxT2pCNE0yRkdRVGt6WVRneU9XRXpaREV5UkRVMk16TTJaVFl6TWpBMU5UbERPRUV6TnpKbE56WkJSU0lzSW01aVppSTZNVFUyTWprMU1ESTRNaXdpYVhOeklqb2laR2xrT21WMGFISTZNSGcxT2pCNE1ESmxZMkl5TkRjM016a3lObUZsWkdOaE9XVm1NRFEwTkRNeVpUWXhOelUyTURFNE5qYzFZMkk1WVRjNVpXTXpPVE5oTUdJNE0ySmxPV0kxTWpGbE1XTXpJbjAuS2s0ajc0WGtUT0NzcUk3UDdEbGUxdnZIazlET1Q1Q2s2Z2VTMnItT1pPY2ZTMGt2bWtLajR6Zm5nd1hyMW9aTW5pa3E0SnRiY0Jya2laZjVPN25ob1FFIl19LCJpc3MiOiJkaWQ6ZXRocjoweDU6MHgzYUZBOTNhODI5YTNkMTJENTYzMzZlNjMyMDU1OUM4QTM3MmU3NkFFIn0.ibcol_yg8Ng2L77wBbs8xTn4P7Qmkgkpi4kNTij2dFEv0xeWsXaAdkNBAtB6KO_vXc4p9nzBgJrYqdOHY9BX8gA"
const providerConfig = {
  networks: [
      { name: "0x5", provider: provider },
  ],
  registry: '0xdCa7EF03e98e0DC2B855bE647C39ABe984fcF21B' // optional as ethr-did-resolver sets this up as default
};
const resolver = new Resolver(getResolver(providerConfig));

// const verifiedVP = async() => {
//     const JWTVerify = await AUDIENCE_Did.verifyJWT(_vpJwt,resolver)
//     console.log(JWTVerify);
// }
const verifiedVP = async() => {
    const verifiedVP = await verifyPresentation(_vpJwt, resolver)
    console.log(verifiedVP);
}
// verifiedVP();


// (2) SUBJECT : Set Attribute to ERC1056
// SUBJECT_Did.setAttribute('did/pub/Secp256k1/veriKey',_jwt,undefined,undefined,{ gasLimit: 500000 }).then((setAttributeReceipt) => console.log(setAttributeReceipt))
const didResolver = new Resolver(getResolver({ rpcUrl, name: "goerli" }));

const run = async () => {
    const _result = await didResolver.resolve(ISSUER_Did.did)
    return _result.didDocument
}


// (async() => {
//     const result = await run();
//     console.log(result);
// })();
const a = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InVzZXIiOnsibmF0aW9uYWwiOiJLb3JlYSIsIm5hbWUiOiJCYWNjYWxhdXLDqWF0IGVuIG11c2lxdWVzIG51bcOpcmlxdWVzIn19fSwic3ViIjoiZGlkOmV0aHI6MHg1OjB4Rjc2YzlCNzAxMmMwQTM4NzA4MDFlYUFkZEI5M0I2MzUyYzg4OTNEQiIsImlzcyI6ImRpZDpldGhyOjB4NToweDAyZjkyYTIzM2NhOGQzYTJmYzA0ZjcyYWEwMTE3Y2QwYzdmYzk2YjdlYzM4ZDI5YjQ3MjVlNTljMzkwMjkwZWVmMCJ9.QOUqlsmQRiiG2Bn6SrUwap0ueyOuwylZ98v9nw4d1qQ-XvbfYAYc4A2JAxeGDVMef1THIeKQnYuBZRFCAwzrPAE"
const b = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InVzZXIiOnsibmF0aW9uYWwiOiJLb3JlYSIsIm5hbWUiOiJCYWNjYWxhdXLDqWF0IGVuIG11c2lxdWVzIG51bcOpcmlxdWVzIn19fSwic3ViIjoiZGlkOmV0aHI6MHg1OjB4M2FGQTkzYTgyOWEzZDEyRDU2MzM2ZTYzMjA1NTlDOEEzNzJlNzZBRSIsImlzcyI6ImRpZDpldGhyOjB4NToweEYxMEEyMjJCMDFhNDYxMEQ0MTdmYTBBRDcxNzZDOTczN2M4ZTg1ZTUifQ.EF3Jf_keJDCpUiAOyFxSHdGZqwGNy57EqDtJMEXITc0WvTUIt3yqxRNkvxzT4tDiJzWY_dsdr3hFI5kQq1rTBwA"

// const vpJwt = async () => {
//   const vpJwt = await ISSUER_Did.verifyJWT(a,didResolver)

//   console.log(vpJwt);
// }
// vpJwt();