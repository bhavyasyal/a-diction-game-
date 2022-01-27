import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../../Components/Input";
import getDiction from "../../middleware/getDiction";
import "./style.css";
import { isMobile } from "react-device-detect";

const Games = () => {
  const [ques, setQues] = useState(getRandomString());
  const [ans, setAns] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [storeAns, setStoreAns] = useState([]);
  const [timerSeconds, setTimerSeconds] = useState(10);
  const [stopTimer, setStopTimer] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let timerId;
    if (stopTimer) {
      clearInterval(timerId);
    } else {
      timerId = setInterval(() => {
        setTimerSeconds((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [stopTimer]);
  useEffect(() => {
    if (timerSeconds === 0) {
      setStopTimer(true);
      setIsGameOver(true);
      setCounter(count+1)
    }
  }, [timerSeconds]);
  const pauseTimer = () => {
    setStopTimer(true);
  };
  

  function getRandomString(length = 1) {
    var randomVowels = "AEIOU";
    var randomConsonants = "BCDFGHJKLMNPQRSTVWXYZ";

    var resultConsonant = "";
    var resultVowel = "";
    for (var i = 0; i < length; i++) {
      resultConsonant += randomConsonants.charAt(
        Math.floor(Math.random() * randomConsonants.length)
      );
      resultVowel += randomVowels.charAt(
        Math.floor(Math.random() * randomVowels.length)
      );
    }
    return resultConsonant + resultVowel;
    //return "ER";
  }

  const playAgain = () => {
    
    setIsGameOver(false);
    setQues(getRandomString());
    setAns("");
    setStoreAns([]);
    setTimerSeconds(10);
    setStopTimer(false);
    setCounter(0)

  };

  const verifyHandler = async () => {
    pauseTimer();

    const result = await getDiction(ans);

    if (
      result?.data?.length === 0 ||
      result.data.every((elem) => typeof elem !== "object")
    ) {
      setIsGameOver(true);
      setCounter(count + 1);
    } else {
      //doubt

      // repeated words
      if (storeAns.includes(ans)) {
        setIsGameOver(true);
        setCounter(count + 1);
      } else {
        const savedAnswer = [...storeAns, ans];
        setStoreAns(savedAnswer);
        setQues(getRandomString());
        setTimerSeconds(10);
        setStopTimer(false);
        setAns("");
      }
    }
  };
  const wordHandler = (event) => {
    setAns(event.target.value);
  };

  const keyPressHandler = (event) => {
    console.log("CE", event);

    if (event.code === "Enter") {
      console.log("CAQ", ans, ques);
      submitHandler();
    }
  };

  const submitHandler = () => {
    if (ans.toUpperCase().includes(ques)) {
      verifyHandler();
    } else {
      setIsGameOver(true);
      setCounter(count+1)
    }
  };
  return (
    <div>
      <div className="timer-container">
        <h3>
          <center>{timerSeconds}</center>
        </h3>
      </div>

      <h1>
        <center> Score is {storeAns.length} </center>
      </h1>

      {isGameOver ? (
        <center>
          <button className="button" onClick={playAgain}>
            Play again
          </button>
        </center>
      ) : (
        <div>
          <center>
            <h1>{ques}</h1>
          </center>
          <center>
            {" "}
            <Input
              changeHandler={wordHandler}
              keyDownHandler={keyPressHandler}
              placeholder={"type your answer"}
              value={ans}
            />
            {isMobile ? (
              <button className="button" onClick={submitHandler}>
                Submit
              </button>
            ) : null}
          </center>
        </div>
      )}

      <center>
        <Link className="home-link" to="/">
          Back to Home
        </Link>
      </center>
    </div>
  );
};

export default Games;
/*

*/
