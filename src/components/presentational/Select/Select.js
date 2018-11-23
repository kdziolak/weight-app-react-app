import React from 'react'

const Select = (props) => {
  return (
    <div className="input-field">
        <select onChange={(e) => props.onSelectHandle(e)}>
        {
          props.options.map(option => {
            return <option value={option}>{option}</option>
          })
        }
        </select>
        <label>Search by:</label>
    </div>
  )
}

export default Select
