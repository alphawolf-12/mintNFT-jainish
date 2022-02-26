import React from "react";

export default function WalletConfirmModal(props){
    return (
        <div>
            <p> Account : {props.account} </p>
            <p> Balance : {props.balance} </p>
            <button onClick={props.confirmBuy}> Confirm and Buy </button>
         </div>
    )
}
 