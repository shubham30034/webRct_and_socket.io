import React from 'react'

const Button = (props) => {
  return (
    <div>
         <button {...props} className='border border-blue-300 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
          Next
        </button>
    </div>
  )
}

export default Button