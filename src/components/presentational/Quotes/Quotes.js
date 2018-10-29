import React from 'react'
import './Quotes.css'

const Quotes = (props) => {
  const randNumber = Math.floor(Math.random() * props.quotes.length)
  const quot = props.quotes.length ? <blockquote className="quote-text flow-text white-text center-align">{props.quotes[randNumber].text}</blockquote>: null
  const author =  props.quotes.length ? <p className="author-text right white-text">{props.quotes[randNumber].from}</p>: null
  return (
    <div className='quotes quotes-bg'>
      <div className='quotes-bg-alpha'>
        <div className="quote-container">
          {
            quot
          }
          <br/>
          {
            author
          }
        </div>
      </div>
    </div>
  )
}

export default Quotes
