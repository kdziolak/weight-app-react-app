import React from 'react'

const Pagination = () => {
  return (
  <ul id='myPager' className="pagination center-align">
    <li className="disabled"><a role='button'><i class="material-icons">chevron_left</i></a></li>
    {}
    <li className="active"><a role='button'>1</a></li>
    <li className="waves-effect"><a role='button'>1</a></li>
    <li className="waves-effect"><a role='button'><i class="material-icons">chevron_right</i></a></li>
  </ul>
  )
}

export default Pagination
