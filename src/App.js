import React, {useState} from 'react';
import axios from 'axios';
import {ethers} from 'ethers';
import WalletConfirmModal from './components/WalletConfirmModal';
// import WalletCard from './components/WalletCard';
import Cart from './components/Cart';
import './App.css';

function App() {

  const [walletAddress,setWalletAddresss] = useState(null);
  const [availableBalance,setBalance] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [buyList, setBuyList] = useState(null);

  function connectToWallet(){
    if(window.ethereum){
        window.ethereum.request({method: "eth_requestAccounts"}).then( 
            res => {
                accountChangeHandler(res[0]);
            }
        )
    }else{
        setErrMsg("pls Install MetaMask")
    }
}


  function buyOpts(opts){
    setBuyList(opts);
    if(opts.filter( ele => ele.name === 'NFT')[0].checked){
      connectToWallet();
    }else{

    }  
  }

  const accountChangeHandler = (account) => {
    setShowModal(true);
    setWalletAddresss(account);
    getBalance(account.toString());
}

  const getBalance = (address) => {
    window.ethereum.request({method : "eth_getBalance", params: [address, 'latest']}).then(
        res => {
          setBalance(ethers.utils.formatEther(res));
        }
  );
}

  const chainChangedHandler = () => {
    window.location.reload();
  }

  function confirmBuy(ev){
    ev.preventDefault();
    const payload = {
      walletAddress, 
      buyOpts: buyList,
      fileUrl : 'https://picsum.photos/id/237/536/354'
    };

    axios.post('/api/buy', payload).then(res => {
      console.log(res);
    })

  }


  if(window.ethereum){
    window.ethereum.on('accountsChanged',accountChangeHandler);
    window.ethereum.on('chainChanged',chainChangedHandler);
  }


  return (
    <div className="App">
      <Cart buyOpts={buyOpts}/>
      {/* <WalletCard /> */}
      {showModal ? <WalletConfirmModal confirmBuy={confirmBuy} account={walletAddress} balance={availableBalance}/> : null } 
    </div>
  );
}

export default App;
