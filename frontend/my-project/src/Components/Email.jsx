import React from 'react'
import CardLayout from '../shared/CardLayout/CardLayout'
import TextInput from '../shared/input/TextInput'
import Button from '../shared/Button/Button'
import { NextContext } from '../Pages/Login';
import { useContext } from 'react';

const Email = () => {

  const onNext = useContext(NextContext)

  return (
    <div>
        <CardLayout>
        <h1 className='text-2xl font-semibold mb-4'>Welcome to Our Chatting App</h1>
      <p className='text-gray-600 mb-6'>You can Login with Email</p>
      <div className='flex flex-col items-center mb-6'>
        <label className='text-gray-700 font-medium mb-2'>Email</label>
       <TextInput/>
      </div>
      <div>
       <Button onClick={onNext}/>
      </div>
        </CardLayout>
    </div>
  )
}

export default Email