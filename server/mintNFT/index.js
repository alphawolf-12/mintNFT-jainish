const {client} = require('../ipfs-client-settings')
const {mintNFT} = require('./mint-nft')
const  Axios = require('axios');
const Blob = require('node-blob');

async function publishFileToIPFS(orderMetaData){  
    const imgURL = orderMetaData.fileUrl;
    const file = await Axios.get(imgURL , {responseType : 'blob'}).then(res => {return res.data});
    const ipfsFileMetaData = await client.add(file);
    console.log("ipfsFileMetaData", ipfsFileMetaData);
    // const ipfsFileMetaData = await client.add(urlSource(imgURL));
    const ipfsFileUrl = `https://ipfs.infura.io/ipfs/${ipfsFileMetaData.path}`;
    const newMetaData = {...orderMetaData, fileUrl:ipfsFileUrl};
    // const metaDataFile = new Blob([JSON.stringify(newMetaData)],  {type: "application/json"});
    const uploadedMetaDataContent = await client.add({content : JSON.stringify(newMetaData)});
    console.log("SUCCESS  ===> uploadedMetaDataContent", uploadedMetaDataContent)

    return uploadedMetaDataContent;
}
async function mint(payload){
    const metaDataForMintingToken = await publishFileToIPFS(payload);
    return mintNFT(metaDataForMintingToken.path);
}
module.exports = {
    mint
}

