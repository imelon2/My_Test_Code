const { MerkleTree } = require('merkletreejs')
const KECCAK256 = require('keccak256');
const { concat } = require('ethers/lib/utils');
const { listeners } = require('process');

const signer = [
  "0xEaE8Af157623269a6461A0fb305A4a161048e511",
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
  "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
//   "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
//   "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
//   "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C",
//   "0xEaE8Af157623269a6461A0fb305A4a161048e511",
//   "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
//   "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
//   "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
//   "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
//   "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
//   "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
//   "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
//   "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C",
//   "0xEaE8Af157623269a6461A0fb305A4a161048e511",
//   "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
//   "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
//   "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
//   "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
//   "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
//   "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
//   "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
//   "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C",
//   "0xEaE8Af157623269a6461A0fb305A4a161048e511",
//   "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
//   "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
//   "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
//   "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
//   "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
//   "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
//   "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
//   "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C"
];

const encryList = signer.map(x => KECCAK256(x));
const tree = new MerkleTree(encryList, KECCAK256, { sortPairs: true })
const root = tree.getHexRoot();
const proof = tree.getHexProof(KECCAK256(signer[4]))


const _layers = tree.layers.map((i) => { return i.map((j) => {return j.toString('hex')})})
// console.log(_layers.length);
console.log(_layers);


const len = signer.length;
let _root = [];
for(let i = 0; i < len; i++) {
    _root.push(KECCAK256(signer[i]).toString('hex'))
}

while (_root.length !== 1) {
    const demo = [];
    for(let i = 0; i <_root.length; i+=2) {
        if(_root[i+1] == undefined) {
            demo.push(_root[i])
        } else {
            console.log(_root[i]+_root[i+1]);
            demo.push(KECCAK256(_root[i]+_root[i+1]).toString('hex'))
        }
    }
    // console.log(demo);
    _root = demo;
}

// console.log(_root);

console.log(KECCAK256("0x09f5de34ec4c7614cbaf4d354d0891ac26ed89d7ea9333c3af719692dca710bd5931b4ed56ace4c46b68524cb5bcbf4195f1bbaacbe5228fbd090546c88dd229").toString('hex'));