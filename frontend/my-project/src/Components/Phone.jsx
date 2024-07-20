import React from 'react';
import TextInput from '../shared/input/TextInput';
import Button from '../shared/Button/Button';
import CardLayout from '../shared/CardLayout/CardLayout';
import { NextContext } from '../Pages/Login';
import { useContext } from 'react';

const Phone = () => {
  
   const onNext = useContext(NextContext)
  

  return (
    <>
      <CardLayout>
      <h1 className='text-2xl font-semibold mb-4'>Welcome to Our Chatting App</h1>
      <p className='text-gray-600 mb-6'>You Can login with Phone</p>
      <div className='flex flex-col items-center mb-6'>
        <label className='text-gray-700 font-medium mb-2'>Phone</label>
       <TextInput/>
      </div>
      <div>
       <Button onClick={onNext} />
      </div>
      </CardLayout>
   
    </>
  );
};

export default Phone;
