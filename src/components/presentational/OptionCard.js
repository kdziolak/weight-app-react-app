import React from 'react'
import { Link } from 'react-router-dom'
 
const OptionCard = () => {
  return (
    <div className='option-card container'>
        <div className="row">
            <div className="col s12 m6 l4">
                <Link to='/'>
                    <div className="card pink lighten-2">
                        <div className="card-content">
                            <span className="card-title white-text">
                                add weight measurement
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default OptionCard
