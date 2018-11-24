import React from 'react'
import CollapsibleBody from './CollapsibleBody/CollapsibleBody'

const FilterCollapsible = ({search, onSelectHandle, onChangeHandle, showDatepicker }) => {
  return (
    <ul className="collapsible grey lighten-5">
        <li>
            <div className='collapsible-header'>Filter</div>
            <CollapsibleBody search={search} onSelectHandle={onSelectHandle} onChangeHandle={onChangeHandle} showDatepicker={showDatepicker}/>
        </li>
    </ul>
  )
}

export default FilterCollapsible
