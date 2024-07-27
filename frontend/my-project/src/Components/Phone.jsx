import React, { useState } from 'react';
import TextInput from '../shared/input/TextInput';
import Button from '../shared/Button/Button';
import CardLayout from '../shared/CardLayout/CardLayout';
import { NextContext } from '../Pages/Login';
import { useContext } from 'react';
import { sendOtp } from '../http';
import {useDispatch} from "react-redux"
import { sendOtps } from '../utils/slices/userSlice';

const Phone = () => {
  const dispatch = useDispatch()
  
   const onNext = useContext(NextContext)
   const[phone,setPhone] = useState("")


  async function submit (){
    // server request goes hhere
    // on next
    const data = {
      phone:phone
    }
    const res = await sendOtp(data)
    console.log(res.data);
    dispatch(sendOtps(res.data))
    onNext()

   }
  

  return (
    <>
      <CardLayout>
      <h1 className='text-2xl font-semibold mb-4'>Welcome to Our Chatting App</h1>
      <p className='text-gray-600 mb-6'>You Can login with Phone</p>
      <div className='flex flex-col items-center mb-6'>
        <label className='text-gray-700 font-medium mb-2'>Phone</label>
       <TextInput onChange={(e)=> setPhone(e.target.value)} type={"number"}/>
      </div>
      <div>
       <Button onClick={submit} />
      </div>
      </CardLayout>
   
    </>
  );
};

export default Phone;
