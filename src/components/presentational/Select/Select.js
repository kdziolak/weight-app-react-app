import React from 'react'

const Select = (props) => {
  return (
    <div className="input-field">
        <select onChange={(e) => props.onSelectHandle(e)}>
            <option value="date">date</option>
            <option value="type">type</option>
            <option value="value">value</option>
        </select>
        <label>Search by:</label>
    </div>
  )
}

export default Select
