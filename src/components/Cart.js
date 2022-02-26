import React, {useState} from 'react';
import CheckBox from './CheckBox';
import "./index.css";

export default function Cart(props){

    const  [buyOptions, setBuyOptions] =  useState( [
        { name: "NFT", value: "NFT", checked: false },
        { name: "Product", value: "Product", checked: false }
    ]);

    function onCheck(name){
        const newBuyOpts = buyOptions.map(ele => ele.name === name ? {...ele, checked: !ele.checked } : ele );
        setBuyOptions( newBuyOpts ); 
    }

    function onBuyClick(ev){
        ev.preventDefault();
        props.buyOpts(buyOptions);
    }

    return (
        <div className="cart–container">
            <div>
                <img src= "https://picsum.photos/id/237/536/354" /> 
            </div>
            <div>
                <div className="checkbox–container"> 
                    {buyOptions.map( ele => 
                    <CheckBox 
                        key={`${ele.name}_${ele.checked}`  } 
                        name={ele.name} value={ele.value} 
                        checked={ele.checked} 
                        onCheck={onCheck} />  
                    )}
                </div>
            </div>
            <button style={{cursor: "pointer"}} onClick={onBuyClick}> Buy </button>
        </div>
    )
}