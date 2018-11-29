import React from 'react'

const Button = (props) => {
  return (
    <button id={props.id} data-key={props.btnNumber} className={props.classes} onClick={props.clickHandle}>{props.content}</button>
  )
}

export default Button;
