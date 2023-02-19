
// 아래 콘솔창은 아래 파일입니다.
// vc를 발급할때 JWT로 암호화해서 발급할 수 있는거같은데,  payload 에 sub 필드에 새롭게 생성된 ethrDid를 넣었구요, 그래서 JWT 디코딩 했을때 sub필드에 값이 담기고, 해당 did 랑 address 가 동일함을 확인했습니다.

// Issuer 은 keypair 만들때, Address 랑 공개키 개인키 이것저것 주는데 임의 계정 뽑아서 하드코딩했습니다. 
// Image
// 아래 콘솔창은 이 위 파일입니다.
// vc를 발급할때 JWT로 암호화해서 발급할 수 있는거같은데,  payload 에 sub 필드에 새롭게 생성된 ethrDid를 넣었구요, 그래서 sub 필드 값이 did 랑 address 가 동일함을 확인했습니다.

// Issuer 은 keypair 만들때, Address 랑 공개키 개인키 이것저것 주는데 임의 계정 뽑아서 하드코딩했습니다.const {EthrDID} = require('ethr-did');
// const {Resolver} = require('did-resolver');
// const {getResolver} = require('ethr-did-resolver');
// Expand
// message.txt
// 3 KB
// .


// 그리고 이건 어제 작성한 코드에요! 

const {EthrDID} = require('ethr-did');
// const {Resolver} = require('did-resolver');
// const {getResolver} = require('ethr-did-resolver');

// const keypair = EthrDID.createKeyPair();
// const ethrDid = new EthrDID({...keypair});

// let chainNameOrId = 'goerli' // you can use the network name for the most popular [test] networks.
// const ethrDidOnGoerliNamed = new EthrDID({...keypair, chainNameOrId}) // 키페어와, chainNmaeOrId를 넣고,

// const didResolver = new Resolver(getResolver({ rpcUrl, name: "goerli" }));

// const a = async() => {
//   try{
//     const didDocument = (await didResolver.resolve(ethrDidOnGoerliNamed.did)).didDocument
//     console.log(didDocument)
//   } catch(e) {
//     console.log(e)
//   }
// }
// a();
// 이게 어제 작성한 코드 였습니다.
// ﻿
// 아래 콘솔창은 이 위 파일입니다.
// vc를 발급할때 JWT로 암호화해서 발급할 수 있는거같은데,  payload 에 sub 필드에 새롭게 생성된 ethrDid를 넣었구요, 그래서 sub 필드 값이 did 랑 address 가 동일함을 확인했습니다.

// Issuer 은 keypair 만들때, Address 랑 공개키 개인키 이것저것 주는데 임의 계정 뽑아서 하드코딩했습니다.const {EthrDID} = require('ethr-did');
const {Resolver} = require('did-resolver');
const {getResolver} = require('ethr-did-resolver');
const {Issuer} = require('did-jwt-vc');
const { JwtCredentialPayload, createVerifiableCredentialJwt, verifyCredential } = require('did-jwt-vc');
const Web3 = require('web3');
const rpcUrl = "https://goerli.infura.io/v3/5c093988cddb4e77a7d78369e7b2e384"


const keypair = EthrDID.createKeyPair();
const ethrDid = new EthrDID({...keypair});
// this creates a DID like:
// did:ethr:0x02ac49094591d32a4e2f93f3368da2d7d827e987ce6cdb3bd3b8a3390fde8fc33b
// console.log(ethrDid)

let chainNameOrId = 'goerli' // you can use the network name for the most popular [test] networks.
const ethrDidOnGoerliNamed = new EthrDID({...keypair, chainNameOrId}) // 키페어와, chainNmaeOrId를 넣고,
// did:ethr:goerli:0x02ac49094591d32a4e2f93f3368da2d7d827e987ce6cdb3bd3b8a3390fde8fc33b

chainNameOrId = 5 // goerli chain ID
const ethrDidOnGoerliChainId = new EthrDID({...keypair, chainNameOrId})
// did:ethr:0x5:0x02ac49094591d32a4e2f93f3368da2d7d827e987ce6cdb3bd3b8a3390fde8fc33b

const vcPayload = {
  sub: ethrDid,
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

const issuer = new EthrDID(
  {
    identifier: '0x3b2375f43F457247D4F59F720FfED2c653efF31b',
    privateKey: "0x0991feceef93ed987a30251dd01234493df64b2314e0495a769049c15aeada33"
  }
)

const b = async () => {

  try{
    const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer)
    console.log(vcJwt)
    //const verifiedVC = await verifyCredential(vcJwt, resolver)
    //console.log(verifiedVC)
  }catch(e) {
    console.log(e)
    return e;
  }
}

b();

// const didResolver = new Resolver(getResolver({ rpcUrl, name: "goerli" }));

// const a = async() => {
//   try{
//     const didDocument = (await didResolver.resolve(ethrDidOnGoerliNamed.did)).didDocument
//     console.log(didDocument)
//   } catch(e) {
//     console.log(e)
//   }
// }

// a();
