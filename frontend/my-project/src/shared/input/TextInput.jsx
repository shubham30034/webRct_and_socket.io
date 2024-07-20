import React from 'react'

const TextInput = (props) => {
  return (
    <div>
          <input {...props}
          
          className='w-72 border border-green-300 bg-slate-100 p-3 rounded-lg focus:outline-none focus:border-green-500'
        />
    </div>
  )
}

export default TextInput