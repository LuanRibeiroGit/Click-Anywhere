import React, { useState } from "react";

import './App.css';

export default props => {
const [list, setList] = useState([]);
const [unDid, setUnDid] = useState([]);

const handleClick = (event) => {
  const newDot = {
    clientX: event.clientX,
    clientY: event.clientY,//peger a position do click
  }

  
  setList((prev) => [...prev, newDot]);
  setUnDid([])
}

const handleUndo = (event) =>{
  event.stopPropagation()//nao ocorrer a div no button

  if(list.length === 0){
    return;
  }

  const lastItem = list[list.length - 1]
  setUnDid((prev) => [...prev, lastItem])

  setList((prev) => {
    const newArr = [...prev].slice(0,-1); //tira o ultimo element do array
      return newArr;
  })
}

const handleRedo = (event) =>{
  event.stopPropagation()

  
  if(unDid.length === 0){
    return;
  }

  const recoverDot = unDid[unDid.length -1]
  setUnDid((prev) => {
    const newArr = [...prev].slice(0,-1); //tira o ultimo element do array
      return newArr;
  })
  setList((prev) => [...prev, recoverDot]);
}

  return(
  
    <div id="page" onClick={handleClick}>
      <button onClick={handleUndo}>DESFAZER</button>
      <button onClick={handleRedo}>REFAZER</button>
      {list.map((item, index) => (
        <span 
        key={item.index}
        className="dot" style={{left: item.clientX, top: item.clientY}}/>
      ))}
      {/*{JSON.stringify(list)}*/}
    </div>
  )

}