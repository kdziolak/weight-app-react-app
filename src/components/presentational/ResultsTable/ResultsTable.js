import React from 'react'

const ResultsTable = (props) => {
    let tableContent = props.measurements.map((el, i) => {
        if(i < props.perPage && i >= props.lastPerPage)
        return(
            <tr key={i}>
                <td className='center-align'>{el.measurementDate}</td>
                <td className='center-align'>{el.measurementType}</td>
                <td className='center-align'>{el.weightValue}</td>
            </tr>
        );
    })
  return (
    <table id='myTable' className='highlight'>
        <thead>
            <tr>
                <th className='center-align'>Measurement date:</th>
                <th className='center-align'>Kind of measurement:</th>
                <th className='center-align'>Measurement value:</th>
            </tr>
        </thead>
        <tbody>
           {tableContent}
        </tbody>
  </table>
  )
}

export default ResultsTable
