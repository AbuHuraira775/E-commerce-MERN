import React from 'react'

function BtnComp({btnFuc, btnText}) {
  return (
    <button onClick={btnFuc}>{btnText}</button>
  )
}

export default BtnComp