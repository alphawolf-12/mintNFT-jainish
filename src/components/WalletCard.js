import React, {useState} from 'react';
import {ethers} from 'ethers';

export default function WalletCard(){

    const [walletAddress,setWalletAddresss] = useState(null);
    const [availableBalance,setBalance] = useState(null);
    const [connectBtnTxt, setConBtnText] = useState('Connect to Wallet');
    const [errMsg, setErrMsg] = useState(null);

    

    const accountChangeHandler = (account) => {
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

    const connectToWallet = () => {
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

    const chainChangedHandler = () => {
        window.location.reload();
    }

    window.ethereum.on('accountsChanged',accountChangeHandler);
    window.ethereum.on('chainChanged',chainChangedHandler);

    return (
    <div>
        <div>
            <p> Address : {walletAddress} </p>
            <p> Balance : {availableBalance} </p>
            <button onClick={connectToWallet}> {connectBtnTxt} </button>
        </div>
        <p> {errMsg} </p>
    </div>);
}