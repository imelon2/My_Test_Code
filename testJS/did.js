const {EthrDID, DelegateTypes} = require("ethr-did")
const {ethers} =require("ethers");
const {createVerifiableCredentialJwt, createVerifiablePresentationJwt,verifyPresentation,verifyCredential } =require("did-jwt-vc");
const { Resolver } =require ('did-resolver')
const { getResolver } =require ('ethr-did-resolver');

// Use Ethereum Mainnet
const chainNameOrId = 5;
const rpcUrl = "https://goerli.infura.io/v3/de74c835e3ef447a947651f8e7cff16b";


const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const address = "0x488cE201b94191abfE897Bf214FdE317F66cb462"

const privateKey = "211986914b7701d97a889e68a1d9df591f32f8d49e849430eae8e2c86e64c8f0"
const ethrDid = new EthrDID({
  chainNameOrId,
  // DID Identifier
  identifier: '0x488cE201b94191abfE897Bf214FdE317F66cb462',
  // The Controller Private Key (Private Key of identifier)
  privateKey: '211986914b7701d97a889e68a1d9df591f32f8d49e849430eae8e2c86e64c8f0',
  rpcUrl
});


// console.log('DID : ' + ethrDid.did);
// ethrDid.signer().then(data =>console.log(data))


const issuer = new EthrDID({
    chainNameOrId,
    // Example University Wallet Address
    identifier: '0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198',
    // Private Key of Example University Wallet
    privateKey: 'd8b595680851765f38ea5405129244ba3cbad84467d190859f4c8b20c1ff6c75',
    rpcUrl
  })


  const claims = {
    degree: {
      type: 'BachelorDegree',
      name: 'Example University'
    }
  }

  const vcPayload = {
    sub: 'did:ethr:0x435df3eda57154cf8cf7926079881f2912f54db4',
    nbf: 1562950282,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: claims
    }
  }



const _vcJwt = async () => {
    const result =  await createVerifiableCredentialJwt(vcPayload, issuer) ;
    console.log("vcJwt : "+ result);
}
// _vcJwt();
// const vcJwt = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImRlZ3JlZSI6eyJ0eXBlIjoiQmFjaGVsb3JEZWdyZWUiLCJuYW1lIjoiRXhhbXBsZSBVbml2ZXJzaXR5In19fSwic3ViIjoiZGlkOmV0aHI6MHg0MzVkZjNlZGE1NzE1NGNmOGNmNzkyNjA3OTg4MWYyOTEyZjU0ZGI0IiwibmJmIjoxNTYyOTUwMjgyLCJpc3MiOiJkaWQ6ZXRocjoweEYxMjMyRjg0MGYzYUQ3ZDIzRmNEYUE4NGQ2QzY2ZGFjMjRFRmIxOTgifQ.IBmPQ_D2ahgLAZ64Vxtoaya6BVHSCCuUuR5MWKfaK_de4bzl0MMzUcacaGOOQWJcED_jlQhznOQJahg5zAuE_QE"



// const vpPayload = {
//     vp: {
//       '@context': ['https://www.w3.org/2018/credentials/v1'],
//       type: ['VerifiablePresentation'],
//       verifiableCredential: [vcJwt]
//     }
//   }
  
// const _vpJwt = async () => {
//       const result = await createVerifiablePresentationJwt(vpPayload, issuer)
//       console.log("vpJwt : " + result);
// }

// _vpJwt();
const vpJwt = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltUmxaM0psWlNJNmV5SjBlWEJsSWpvaVFtRmphR1ZzYjNKRVpXZHlaV1VpTENKdVlXMWxJam9pUlhoaGJYQnNaU0JWYm1sMlpYSnphWFI1SW4xOWZTd2ljM1ZpSWpvaVpHbGtPbVYwYUhJNk1IZzBNelZrWmpObFpHRTFOekUxTkdObU9HTm1Oemt5TmpBM09UZzRNV1l5T1RFeVpqVTBaR0kwSWl3aWJtSm1Jam94TlRZeU9UVXdNamd5TENKcGMzTWlPaUprYVdRNlpYUm9jam93ZUVZeE1qTXlSamcwTUdZellVUTNaREl6Um1ORVlVRTROR1EyUXpZMlpHRmpNalJGUm1JeE9UZ2lmUS5JQm1QUV9EMmFoZ0xBWjY0Vnh0b2F5YTZCVkhTQ0N1VXVSNU1XS2ZhS19kZTRiemwwTU16VWNhY2FHT09RV0pjRURfamxRaHpuT1FKYWhnNXpBdUVfUUUiXX0sImlzcyI6ImRpZDpldGhyOjB4RjEyMzJGODQwZjNhRDdkMjNGY0RhQTg0ZDZDNjZkYWMyNEVGYjE5OCJ9.tpHnmhFcwRhRbN7yf5FuhIDeHjIUDhIny6Pig79VDqHcSNXx1rOS8ODtBgpYzwkqOKLDQAI8Uu52SaSfumQOnQE"

const _verifiedVP = async() => {
    const providerConfig = {
        rpcUrl: "https://goerli.infura.io/v3/de74c835e3ef447a947651f8e7cff16b",
        // registry: '0xdCa7EF03e98e0DC2B855bE647C39ABe984fcF21B'
        name: "goerli"
      }

    //   console.log(getResolver(providerConfig));
      const resolver = (await new Resolver(getResolver(providerConfig)).resolve(ethrDid.did)).didDocument
    //   const verifiedVC = await verifyPresentation(vpJwt, resolver)
      console.log(resolver)
}
// _verifiedVP();


// vcJwt().then( async (result) => {
//     console.log("result : " + result);
//       const holder = issuer;
    
//       const vpPayload = {
//         vp: {
//           '@context': ['https://www.w3.org/2018/credentials/v1'],
//           type: ['VerifiablePresentation'],
//           verifiableCredential: [result]
//         }
//       }

//     const vpJwt =  await createVerifiablePresentationJwt(vpPayload, holder)
//     console.log("vpJwt : " + vpJwt);

//     // const providerConfig = { rpcUrl, provider }
//     const providerConfig = {
//         rpcUrl:rpcUrl,
//         registry: '0xdCa7EF03e98e0DC2B855bE647C39ABe984fcF21B'
//       }
    
//     const resolver = new Resolver(getResolver(providerConfig))
//     const verifiedVP = await verifyPresentation(vpJwt, resolver)
//     // console.log(resolver.resolve());
//     console.log("verifiedVP : " + verifiedVP);
// })


