import React, { useState } from "react";
import style from "./Currency.module.css";
//const API_KEY = "501ef8c0-4e12-11ec-8504-13bf43b3d0d2";
const Currency = () => {
  const [currency, setCurrency] = useState(0);
  const [output, setOutput] = useState(0);
  const SubmitHandler =  async(e) => {
    e.preventDefault();
    try{
    
        const DataJson=await fetch(`https://v1.nocodeapi.com/shre3444/cx/dgujjCNWbcDtWYpD/rates/convert?amount=${currency}&from=USD&to=INR`)
        const Data=await DataJson.json();
        setOutput(Data.result.toFixed(3));
    }
    catch(err){
        console.log(err)
    }
  };
  const InputHandler = (e) => {
    setCurrency(e.target.value);
  };
  return (
    <>
      <h1>Currency Converter </h1>
      <br />
      <div className={style.container}>
        <form onSubmit={SubmitHandler}>
          <label>Enter Value in USD($)</label>
          <input
            type="number"
            name="value"
            value={currency}
            onChange={InputHandler}
            required
            id="value"
          />
          <br />
          <label>Value in INR is ₹</label>
          <input
            value={output}
            disabled
            type="number"
            name="value"
            id="value"
          />{" "}
          <br />
          <button>Convert </button>
        </form>
      </div>
    </>
  );
};

export default Currency;
