import React from 'react'
import { Link } from 'react-router-dom'
import Weight from '../../img/weight.png'

import './OptionCard.css'
 
const OptionCard = (props) => {
  return (
    <Link className='option-card col s12 m6' to='/'>
        <div className={'card ' + props.color + ' lighten-2'}>
            <div className="card-flex card-content">
                <div className='weight-img left-aling'>
                    <img className='responsive-img' src={props.img} alt=''/>
                </div>
                <span className="card-title white-text right-align">
                    {
                        props.content
                    }
                </span>
            </div>
        </div>
    </Link>
  )
}

export default OptionCard
