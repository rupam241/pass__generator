import React from "react";
import { useState, useCallback, useEffect,useRef } from "react";
import "./password.css";

function Password() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, SetPassword] = useState(null);
//   ref hooks
const passRef=useRef(null)

const copyPass=useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
    
},[password])


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:'";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    SetPassword(pass);
  }, [length, numAllowed, charAllowed, SetPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="container">
      <div className="input-field">
        <input type="text" placeholder="password" value={password} readOnly ref={passRef} />
        <button onClick={
            copyPass
        }
        
        >Copy</button>
      </div>
      <div className="footer">
        <div className="length">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <span>length{length}</span>
        </div>
        <div className="numbers">
          <input
            type="checkBox"
            defaultChecked={numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />

          <span>NUmbers</span>
        </div>

        <div className="char">
          <input
            type="checkBox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <span>Characters</span>
        </div>
      </div>
    </div>
  );
}

export default Password;
