const { create , urlSource} = require('ipfs-http-client');
/* Create an instance of the client */
const client = create('https://ipfs.infura.io:5001/api/v0')
module.exports = { 
    client
}
/* upload the file */
/* or a string */
