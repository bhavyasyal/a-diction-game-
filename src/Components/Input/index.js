import React from 'react'
import "./style.css";
const Input = ({changeHandler,keyDownHandler,placeholder,value}) => {
    return (
     
                 <input
       className="input-container"
        type="text"
        placeholder={placeholder}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
        onTouchStart={keyDownHandler}
value={value}
      />
    ) 
  
}

export default Input
