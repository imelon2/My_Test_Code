// Link : https://docs.alchemy.com/reference/getnfts
// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
const { Network, Alchemy, NftExcludeFilters }  = require("alchemy-sdk");

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "3C2F0roE0mhCWrJ-q0raCmMqwyQgUJ7_", // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.

};

const alchemy = new Alchemy(settings);
const options = {
  contractAddresses : ["0x276f396df47C4eAD51BE77f8933442f35744a25f"],
  // excludeFilters:[NftExcludeFilters.AIRDROPS]
}
// Print all NFTs returned in the response:
alchemy.nft.getNftsForOwner("0xD18c6516E3F7650DA7149eBD2E244Cd69a19C7Cf",options).then((data) => {
  console.log(data.ownedNfts[0].contract);
  console.log(data.ownedNfts[0].rawMetadata);
  console.log(data.ownedNfts[0].media);
})
