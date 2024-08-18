import React from 'react'

function InpComp({type,val,text,setInputVal}) {
  return (
    <input 
    placeholder={text}
    value={val}
    type={type}
    onChange={(val)=>setInputVal(val)}
    />
  )
}

export default InpComp