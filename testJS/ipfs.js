const { Buffer } = require("buffer");
const { create } = require("ipfs-http-client");

const projectId = "2GP6hmvIjDCIGLy3xIv8FEtX6gr"
const projectSecret = "54c311eb5f5120891becb6a30380a04b"
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const createIPFS = async (name, description, image,price) => {
  const _json = {
    name,
    description,
    image,
    attributes: {price}
  };
  const metaData = await client.add(JSON.stringify(_json));

  const metaDataUrl = "https://nftpark.infura-ipfs.io/ipfs/" + metaData.path;

  console.log(metaDataUrl);
  return metaDataUrl;
};

createIPFS("BLACKPINK WORLD TOUR [BORN PINK] - 아부다비","NFT PARK 콘서트 티켓","","130000");