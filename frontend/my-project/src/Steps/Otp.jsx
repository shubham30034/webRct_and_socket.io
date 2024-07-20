import React, { useState } from 'react'
import CardLayout from '../shared/CardLayout/CardLayout'
import Button from '../shared/Button/Button'
import TextInput from '../shared/input/TextInput'
const Otp = () => {

  const [otp,setOtp] = useState("")

  return (
     <div className=' flex justify-center'>
    <div className=' w-[40%]  my-[15%]'>
      <div>
        <CardLayout>
        <h1 className='text-2xl font-semibold mb-4'>Welcome to Our Chatting App</h1>
      <p className='text-gray-600 mb-6'>Please Enter your Otp</p>
      <div className='flex flex-col items-center mb-6'>
        <label className='text-gray-700 font-medium mb-2'>Otp</label>
       <TextInput  value={otp}  type={"number"}
        onChange={(e)=> setOtp(e.target.value)}
       />
      </div>
      <div>
       <Button/>
      </div>
        </CardLayout>
    </div>
    </div>
    </div>
  )
}

export default Otp