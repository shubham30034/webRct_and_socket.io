import React, { useState } from 'react'
import Phone from '../Components/Phone'
import Email from '../Components/Email'

const phoneEmailMap = {
  phone : Phone,
  email : Email
}


const LoginWithPhoneAndEmail = ({onNext}) => {

    const [type,setType] = useState("phone")

    const Component = phoneEmailMap[type]
 
    console.log(type);


  return (
    <>
    <div className=' flex justify-center w-[100%]'>
    <div className='  w-[40%]  my-[15%] '>
      <div className=' flex justify-end'>
      <button
        onClick={()=> setType("phone")}
      className=' bg-slate-400 border  border-gray-600 p-2 m-2  rounded'>Phone</button>
      <button
          onClick={()=> setType("email")}
      className=' bg-slate-400 border  border-gray-600 p-2 m-2  rounded'>email</button>
      </div>
      <div className=''>
    <Component onNext={onNext}/>
    </div>
    </div>
    
    </div>
    
    
      
       </>
  )
}

export default LoginWithPhoneAndEmail