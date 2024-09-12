import React from 'react'

const BudjetList = ({data}) => {
  return (
    <>  
        <tr className='border'>
            <td>{data.category}</td>
            <td>{data.amount}</td>
            <td>{data.place}</td>
        </tr>
    </>
  )
}

export default BudjetList
