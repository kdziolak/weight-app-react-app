import React from 'react'
import Button from '../Button/Button'

const ResultsTable = (props) => {
    let tableContent = props.measurements.map((el, i) => {
        if (i < props.perPage && i >= props.lastPerPage)
            return (

                <tr key={el.id}>
                    <td>{el.measurementDate}</td>
                    <td>{el.measurementType}</td>
                    <td>{el.weightValue}</td>
                    {el.measurementType === 'not found' ? (
                        <td></td>
                    ) : (
                            <td><Button btnNumber={el.id} clickHandle={props.handleClick} classes='btn btn-floating red waves-effect waves-light' content={<i className="material-icons">delete</i>} /></td>
                        )}
                </tr>
            );
    })
    return (
        <table className='centered highlight responsive-table'>
            <thead>
                <tr>
                    <th >Measurement date:</th>
                    <th>Kind of measurement:</th>
                    <th>Measurement value:</th>
                    <th>Options:</th>
                </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </table>
    )
}

export default ResultsTable
