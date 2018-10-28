import React from 'react'

const Paragraph = props => {
  return (
    <p className={props.classes}>{props.content}</p>
  )
}

export default Paragraph;