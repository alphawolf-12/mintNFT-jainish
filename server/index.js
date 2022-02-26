
const {mint} = require('./mintNFT');
var path = require('path');
var express = require('express');
const app = express();
const webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config'); //webpack hot rloading middleware
const compiler = webpack(config); 

app.use(webpackDevMiddleware(compiler, {publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use(express.json());


app.get("/", function(req, res) {
    res.sendFile(__dirname + '../public/index.html')
})
  
app.post('/api/buy', (req,res,next) => {
    const payload = req.body;
    console.log(req.body)
    mint(payload).then(minTRes => {
        console.log(minTRes);   
        res.send(minTRes);
    });
    
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
