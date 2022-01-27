import React, { useState } from "react";
import "./style.css";
import Input from "../../Components/Input"
import getDiction from "../../middleware/getDiction";
import {Link} from 'react-router-dom'
const Dictionary = () => {
  const [word, setWord] = useState("");
  const [results, setResults] = useState(null);
  const[message,setMessage]=useState("")
  const wordHandler = (event) => {
    setWord(event.target.value);
  };
  

  const submitHandler = async () => {
    try{

    const result = await getDiction(word);
    if( result?.data?.length>0 && result.data.every((elem)=>typeof elem==="object")){
    setResults(result);
    setMessage("")
    console.log("result", result);
    }
    else{
      setMessage("no result found")
      setResults(null)
    }
  }
    catch(error){
      console.log("error",error)

    }
  };

  const keyPressHandler=(event)=>{
      console.log("CE",event);
     if( event.keyCode== 13)
     {
         submitHandler();
     }
   
  };
  
  console.log("check");
  return (

    <div class="search-container">
  <Input changeHandler={wordHandler} keyDownHandler={keyPressHandler} placeholder={"search for the word"} value={word}/>
      <button className="submit-button" onClick={submitHandler}  > Submit </button>
{console.log("cr",results)}
      { results  ? (
        <div>
          <h2>{ results.data[0].hwi.hw}</h2>
          <h3>
            {
               results.data[0].shortdef[0]
             }
          </h3>
     
            
        
        </div>
      ) : 
 null}
     {message?<h1>{message}</h1>:null}       
<div className="game-link">
      <Link  to="/games">Let's play a Game</Link>
      </div>
    </div>
  );
};

export default Dictionary;
