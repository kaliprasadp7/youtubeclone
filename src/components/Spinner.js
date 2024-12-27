import React from 'react'
import loading from '../assets/loading.gif'

function Spinner() {
  return (
    <div className='place-items-center'>
      <img src={loading} alt="Spinner" className='w-10'/>
    </div>
  )
}

export default Spinner
