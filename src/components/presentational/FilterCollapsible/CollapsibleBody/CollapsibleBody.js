import React from 'react'
import Select from '../../Select/Select'
import InputField from '../../InputField/InputField'

const CollapsibleBody = ({search, onSelectHandle, onChangeHandle, showDatepicker}) => {
    console.log(showDatepicker)
  return (
    <div className='collapsible-body'>
        <div className="row">
            <div className="col s6 offset-s3">
            <Select 
                onSelectHandle={onSelectHandle}
                options={['date', 'type', 'value']} />
            </div>
        </div>
    {
    search === 'date' ?
      <div className="row">
        <div className="col s6">
          <InputField 
            type='text' 
            id='from-date-input' 
            htmlFor='from-date-input' 
            label='From' 
            showDatepicker={showDatepicker} 
            classes='datepicker blue-text text-darken-3 no-autoinit'/>
        </div>
        <div className="col s6">
              <InputField type='text' 
                id='to-date-input' 
                htmlFor='to-date-input' 
                label='To' 
                showDatepicker={showDatepicker} 
                classes='datepicker blue-text text-darken-3 no-autoinit'/>
        </div>
      </div>
        : null
  }
  {
    search === 'value' ?
      <div className="row">
        <div className="col s6">
          <InputField 
            dataKey='from' 
            changeValue={onChangeHandle}
            type='text' 
            id='from-weight-input' 
            htmlFor='from-weight-input' 
            label='From' 
            classes='blue-text text-darken-3'/>
        </div>
        <div className="col s6">
          <InputField
            dataKey='to' 
            changeValue={onChangeHandle}
            type='text' 
            id='to-weight-input' 
            htmlFor='to-weight-input' 
            label='To' 
            classes='blue-text text-darken-3'/>
        </div>
      </div>
        : null
  }
  {
    search === 'type' ? (
      <div className="row">
        <div className="col s6 offset-s3">
          <Select
            options={[`weight`]} 
            onSelectHandle={e => {}}/>
        </div>
      </div>
    )
      
        : null
  }

 </div>
  )
}

export default CollapsibleBody
