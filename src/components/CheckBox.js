import React from 'react';

export default function CheckBox(props){
    return (
        <div> 
            <input 
                type="checkbox" 
                name={props.name} 
                value={props.value} 
                checked={props.checked}
                onChange={ ev =>  { ev.preventDefault();  props.onCheck(props.name)}}     
            />
            <span>  {props.name} </span>
        </div>
    )
};