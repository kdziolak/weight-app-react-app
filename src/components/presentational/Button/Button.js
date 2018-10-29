import React from 'react'

const Button = (props) => {
  return (
    <button id={props.id} className={props.classes} onClick={props.clickHandle}>{props.content}</button>
  )
}

export default Button;
